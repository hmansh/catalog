import React, { useState, useEffect } from 'react';
import {DurationButton, StyledLine, whiteStraightLine} from './chart';
import {
    graphConfig,
    generateTimes,
    lineGraphConfig,
    generateFinancialModel,
    externalTooltipHandler
} from './utils';
import Button from "../../../component/button";
import Container from "../../../component/container";
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export const N = 100;
export const BASE_VALUE = 50;
export const GROWTH_RATE = 0.01;
export const VOLATILITY = 0.1;
export const UPDATE_DURATION = 2000;

const DURATIONS = [
    { id: 1, title: '1D' },
    { id: 2, title: '3D' },
    { id: 3, title: '1W' },
    { id: 4, title: '1M' },
    { id: 5, title: '6M' },
    { id: 6, title: '1Y' },
    { id: 7, title: 'ALL' },
];

const Chart = ({ data, setData }) => {
    const [activeView, setActiveView] = useState(1);

    useEffect(() => {
        const timerRef = setInterval(() => {
            const newValue = generateFinancialModel(
                1, data[data.length - 1], GROWTH_RATE, VOLATILITY
            )[0];
            setData(prev => [...prev, newValue]);
        }, UPDATE_DURATION);

        return () => {
            clearInterval(timerRef);
        };
    }, []);


    return (
        <Container style={{ padding: '16px', paddingBottom: 0, position: 'relative' }}>
            <Container style={{ display: 'flex' }}>
                <Button variant="secondary">
                    <OpenInFullRoundedIcon />
                    Fullscreen
                </Button>
                <Button variant="secondary">
                    <AddCircleOutlineRoundedIcon/>
                    Compare
                </Button>
                <Container style={{ marginLeft: 'auto', display: 'flex', columnGap: 8 }}>
                    {DURATIONS.map((duration) => (
                        <DurationButton
                            key={duration.id}
                            active={duration.id === activeView}
                            onClick={() => setActiveView(duration.id)}
                        >
                            {duration.title}
                        </DurationButton>
                    ))}
                </Container>
            </Container>
            <Container style={{ width: '100%', marginTop: 16 }}>
                <StyledLine
                    plugins={[whiteStraightLine]}
                    // height={800}
                    // width={1600}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                enabled: false,
                                external: (context) => {
                                    return externalTooltipHandler({...context, data});
                                }
                            },
                        },
                        scales: {
                            y: {
                                display: false,
                            },
                            x: {
                                // display: false,
                                ticks: {
                                    callback: () => '',
                                    color: '#6F7177',
                                    maxTicksLimit: 10,
                                },
                                grid: {
                                    color: '#EFF1F3',
                                }
                            }
                        }
                    }}
                    data={{
                        labels: generateTimes(data.length),
                        datasets: [{
                            type: 'line',
                            animations: {
                                y: {
                                    duration: 0,
                                },
                            },
                            pointRadius: (ctx) =>
                                ctx.chart.data.datasets[1].data[ctx.dataIndex] === ctx.chart.data.datasets[0].data[ctx.dataIndex] ? 5 : 0,
                            label: 'Price',
                            data: data,
                            ...graphConfig(),
                        }, {
                            type: 'line',
                            label: '',
                            animations: {
                                y: {
                                    duration: 500,
                                },
                            },
                            data: data.map(() => data[data.length - 1]),
                            ...lineGraphConfig(),
                        }],
                    }}
                />
            </Container>
        </Container>
    );
}

export default Chart;

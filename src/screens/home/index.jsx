import React, {useState} from 'react';
import { PriceChange, StyledHeader } from "./home";
import Tabs from "../../component/tabs";
import { tabs } from "./config";
import Container from "../../component/container";
import {generateFinancialModel} from "./chart/utils";
import { BASE_VALUE, GROWTH_RATE, N, VOLATILITY } from "./chart";

const Home = () => {
    const [data, setData] = useState(generateFinancialModel(
        N,
        BASE_VALUE,
        GROWTH_RATE,
        VOLATILITY
    ));

    const percentageChange = ((data[data.length - 1] - data[0]) / data[0] * 100).toFixed(2) + '%';
    const actualChange = (data[data.length - 1] - data[0]).toFixed(2);
    const actualChangeColor = actualChange > 0 ? 'green' : 'red';

    return (
        <Container>
            <Container style={{ marginBottom: 32 }}>
                <StyledHeader tag="h1">{data[data.length - 1]}</StyledHeader>
                <PriceChange
                    tag="p"
                    color={actualChangeColor}
                >
                    {`${actualChange} (${percentageChange})`}
                </PriceChange>
            </Container>
            <Container>
                <Tabs
                    tabsConfig={tabs}
                    childProps={{
                        setData,
                        data,
                    }}
                />
            </Container>
        </Container>
    );
}

export default Home;

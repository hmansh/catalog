import { renderToString } from "react-dom/server";

export const generateTimes = (n) => {
    const times = [];

    for (let i = 0; i < n; i++) {
        const date = new Date();
        date.setMinutes(date.getMinutes() - i);
        const result = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        times.push(result);
    }

    return times.reverse();
};

export const generateFinancialModel = (
    n,
    baseValue,
    growthRate,
    volatility,
) => {
    const data = [];
    let currentValue = baseValue;

    for (let i = 0; i < n; i++) {
        currentValue *= 1 + growthRate;
        const randomFactor = Math.random() * 2 * volatility - volatility;
        currentValue *= 1 + randomFactor;
        currentValue = Math.round(currentValue * 100) / 100;
        data.push(currentValue);
    }

    return data;
}

const stringifiesCustomTooltip = (dataIndex, data) => {
    return renderToString(data[dataIndex] + ' $');
};

export const getOrCreateTooltip = (
    chart,
    dataIndex,
    data
) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.classList.add("custom-tooltip");
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    tooltipEl.innerHTML = stringifiesCustomTooltip(dataIndex, data);
    return tooltipEl;
};

export const externalTooltipHandler = (context) => {
    const { chart, tooltip, data } = context;
    const tooltipEl = getOrCreateTooltip(chart, tooltip.dataPoints?.[0]?.dataIndex, data);

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    tooltipEl.style.opacity = 1;
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.left = `${positionX + tooltip.caretX - 80}px`;
    tooltipEl.style.top = `${positionY + 10 + tooltip.caretY}px`;
};

export const graphConfig = () => ({
    borderWidth: 1,
    fill: "start",
    borderColor: '#4B40EE',
    pointBorderColor: '#4B40EE',
    pointBackgroundColor: 'white',
    backgroundColor: (context) => {
        const { ctx } = context.chart;
        const gradient = ctx.createLinearGradient(0, 0, 0, 700);
        gradient.addColorStop(0, "rgba(232, 231, 255, 1)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        return gradient;
    },
    lineTension: 0.20
})

export const lineGraphConfig = () => ({
    borderWidth: 1,
    borderDash: [4],
    pointRadius: 0,
});

import Chart from 'chart.js/auto';
import { ReactElement, useEffect, useState } from 'react'
import './Chart.scss';

let iteration = 0;

const AppChart: React.FC<{
    chartData: [number[], number],
    setChartData(value: [number[], number] | undefined): void
}> = ({ chartData, setChartData }): ReactElement => {
    const [chart, setChart] = useState<Chart>();

    useEffect(() => {
        if (iteration % 2) {
            const element = document.getElementById(`chart`)! as HTMLCanvasElement;
            const ctx = element.getContext('2d')!;
            setChart(new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [{
                        data: chartData[0].map((value) => parseFloat(value.toFixed(2))),
                        borderColor: "blue",
                        backgroundColor: "none",
                        borderWidth: 2,
                    }],
                    labels: chartData[0].map((_, i) => {
                        if (chartData[1] && chartData[1] % 1000 && (chartData[1] - chartData[1] % 1000) / 1000 < i) {
                            return chartData[1]
                        }
                        else return 1000 * i
                    })
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    elements: {
                        point: {
                            radius: 3
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                color: "#444"
                            },
                            ticks: {
                                padding: 10
                            },
                        },
                        x: {
                            grid: {
                                color: "#444"
                            },
                        },
                    },
                }
            }))
        }
        return () => { iteration++ };
    }, [])

    return (
        <div id="chart_view">
            <div id="chart_head">
                <button className="back_button" onClick={() => setChartData(undefined)}>Retour</button>
                <h1 style={{ marginTop: 100 }}>Average reward every 1000 episodes</h1>
            </div>
            <div id="chart_container">
                <canvas id="chart" width="600" height="400"></canvas>
            </div>
        </div>
    );
}

export default AppChart
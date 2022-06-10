import { Chart } from 'chart.js';
import { useState } from 'react';
import './App.css';
import AppChart from './components/Chart';
import AppForm from './components/Form';
import AppLoading from './components/Loading';

function App() {
  const [chartData, setChartData] = useState<number[]>()
  const [loading, setLoading] = useState(false)
  return (
    <div className="App">
      <h1 style={{ fontSize: 35, marginTop: 0, marginBottom: 30, display: 'flex' }}>
      <img style={{height: 50, marginRight: 5}} src='taxi.png' />
        T-AIA-902 Taxi Driver
        <img style={{height: 50, marginLeft: 5}} src='taxi.png' /></h1>
      <div style={{ display: !loading && !chartData ? "block" : "none" }}>
        <AppForm setChartData={setChartData} setLoading={setLoading} />
      </div>
      {loading && <AppLoading />}
      {chartData && !loading && <AppChart chartData={chartData} setChartData={setChartData} />}
    </div>
  );
}

export default App;

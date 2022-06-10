import { Chart } from 'chart.js';
import { useState } from 'react';
import './App.css';
import AppChart from './components/Chart';
import AppForm from './components/Form';
import AppLoading from './components/Loading';
import AppSwitch from './components/Switch';

function App() {
  const [chartData, setChartData] = useState<number[]>()
  const [loading, setLoading] = useState(false)
  return (
    <div className="App">
      {!loading && !chartData && <AppForm setChartData={setChartData} setLoading={setLoading} />}
      {loading && <AppLoading />}
      {chartData && !loading && <AppChart chartData={chartData} setChartData={setChartData} />}
    </div>
  );
}

export default App;

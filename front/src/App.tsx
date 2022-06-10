import { useState } from 'react';
import './App.css';
import AppForm from './components/Form';
import AppSwitch from './components/Switch';

function App() {
  const [custom, setCustom] = useState(false)

  return (
    <div className="App">
      <AppSwitch setCustom={setCustom} />
      <AppForm custom={custom} />
    </div>
  );
}

export default App;

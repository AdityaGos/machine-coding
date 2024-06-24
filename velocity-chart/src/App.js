
import { useState } from 'react';
import './App.css';
import { departments } from './chartData';
import BarChart from './components/BarChart';

function App() {
  const [ showChart, setShowChart] = useState(false)
  return (
    <main className="container">
      <button 
      onClick ={()=>{ setShowChart(prev=>!prev)}}
      >
        Toggle Chart
      </button>
      { showChart ? <BarChart data={departments} /> :null }
    </main>
  );
}

export default App;

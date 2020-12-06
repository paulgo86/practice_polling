import './App.css';
import './style/components.css';

import A from './components/A';
import B from './components/B';
import Center from './components/Center';

function App() {
  return (
    <div className='App'>
      <div className='header'>
        <h2>Sync Data with timestamp</h2>
      </div>
      <div className='container'>
        <A/>      
        <Center/>
        <B/>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';

import './App.css';

function App(props) {
  const [ count, setCount ] = useState(0);

  return (
    <>
      <h1>{ props.title } (Vite + React)</h1>
      <div className="card">
        <button className='cbutton' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;

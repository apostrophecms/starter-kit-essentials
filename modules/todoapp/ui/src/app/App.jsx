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
      <div class="text-center">
        <span
          class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2"
        >
          Hello World <br />
          From Tailwind CSS
        </span>
      </div>
    </>
  );
}

export default App;

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const codeSubmitCode = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={codeSubmitCode}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

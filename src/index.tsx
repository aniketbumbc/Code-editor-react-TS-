import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';
import bundler from './bundler';
import CodeEditor from './components/code-editor';
import ReactDOM from 'react-dom';

import Preview from './components/preview';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const codeSubmitCode = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue='' onChange={(value) => setInput(value)} />
      <div>
        <button onClick={codeSubmitCode}>Submit Code</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

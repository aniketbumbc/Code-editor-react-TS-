import { useState } from 'react';
import bundler from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';

const CodeCell = () => {
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

export default CodeCell;

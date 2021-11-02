import { useState } from 'react';
import bundler from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizeable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const codeSubmitCode = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable>
          <CodeEditor initialValue='' onChange={(value) => setInput(value)} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

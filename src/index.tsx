import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import CodeEditor from './components/code-editor';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const iframeRef = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const codeSubmitCode = async () => {
    if (!ref.current) {
      return;
    }

    iframeRef.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    // setCode();

    // console.log('test', result.outputFiles[0].text);

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      '*'
    );
  };

  const html = `
  <html> 
  <head></head>
  <body>
  <div id="root"></div>
  <script>
  window.addEventListener('message',(event) => {
    try{
      eval(event.data);
    }catch(err){
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color:red;"> <h4>Runtime Error</h4>' + err + '</div>'
      console.error(err);
    }
   
  },false);
  </script>
  </body>
  </html>
  `;

  return (
    <div>
      <CodeEditor initialValue='' onChange={(value) => setInput(value)} />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={codeSubmitCode}>Submit Code</button>
      </div>

      <iframe
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={html}
        title='codeFrame'
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

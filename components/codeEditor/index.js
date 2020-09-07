import React from 'react';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = (props) => (
  <AceEditor
    defaultValue={props.content}
    width="736px"
    height="300px"
    mode="javascript"
    theme="monokai"
    onChange={props.onChange}
    name={props.name}
    editorProps={{ $blockScrolling: true }}
  />
);

export default CodeEditor;

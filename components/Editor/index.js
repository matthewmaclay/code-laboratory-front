import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import { markdownToDraft } from 'markdown-draft-js';
import { Box } from 'bumbag';

const Editor = ({ content, ...props }) => {
  const rawData = markdownToDraft(content);

  const contentState = convertFromRaw(rawData);
  const newEditorState = EditorState.createWithContent(contentState);
  const [editorState, setEditorState] = React.useState(newEditorState);
  const handleEditorChange = () => {
    if (props.onChange)
      props.onChange(
        editorState &&
          draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
      );
  };

  React.useEffect(() => {
    handleEditorChange();
  }, []);

  return (
    <Box border="default">
      <DraftEditor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(data) => {
          setEditorState(data);
          handleEditorChange();
        }}
      />
    </Box>
  );
};

export default Editor;

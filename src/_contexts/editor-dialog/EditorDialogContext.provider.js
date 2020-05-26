import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const EditorDialogContext = React.createContext();
const EditorDialogContextProvider = props => {
  const editorDialog = useSelector(state => state.editorDialog, shallowEqual);
  return <EditorDialogContext.Provider value={{ editorDialog }}>{props.children}</EditorDialogContext.Provider>;
};

export default EditorDialogContextProvider;

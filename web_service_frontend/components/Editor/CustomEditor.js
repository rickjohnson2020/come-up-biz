import EditorJs from "react-editor-js";
import Paragraph from '@editorjs/paragraph';



const CustomEditor = () => {
  const EDITOR_JS_TOOLS = {
    paragraph: Paragraph,
  };

  return (
    <EditorJs tools={EDITOR_JS_TOOLS}
      placeholder='本文'
      className='w-96 h-15 text-2xl placeholder-gray-500 placeholder-opacity-50 focus:placeholder-opacity-0 hover:placeholder-opacity-80 focus:outline-none'
    />
  );
}

export default CustomEditor;

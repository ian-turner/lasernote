import { MDXEditor, headingsPlugin } from '@mdxeditor/editor';


export default function Editor({ markdown, editorRef }) {
    return (
        <MDXEditor
            onChange={e => console.log(e)}
            ref={editorRef}
            markdown={markdown}
            plugins={[headingsPlugin()]}
        />
    );
}

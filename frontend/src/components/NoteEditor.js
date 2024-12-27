import {
    MDXEditor,
    headingsPlugin,
    toolbarPlugin,
    KitchenSinkToolbar,
} from '@mdxeditor/editor';


export default function Editor({ markdown, setMarkdown, editorRef }) {
    return (
        <div className='bg-light w-100'>
            <MDXEditor
                onChange={e => setMarkdown(e)}
                ref={editorRef}
                markdown={markdown}
                plugins={[
                    headingsPlugin(),
                    toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar/> }),
                ]}
            />
        </div>
    );
}

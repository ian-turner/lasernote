import {
    MDXEditor,
    headingsPlugin,
    toolbarPlugin,
    imagePlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CreateLink,
    InsertImage,
    ListsToggle,
    Separator,
} from '@mdxeditor/editor';


export default function Editor({ markdown, onChange, handleSave }) {
    return (
        <div className='bg-light w-100'>
            <MDXEditor
                onChange={onChange}
                markdown={markdown}
                plugins={[
                    headingsPlugin(),
                    imagePlugin(),
//                    toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar/> }),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
                                <Separator />
                                <BoldItalicUnderlineToggles />
                                <Separator />
                                <BlockTypeSelect />
                                <Separator />
                                <CreateLink />
                                <InsertImage />
                                <Separator />
                                <ListsToggle />
                                <div className='flex-grow-1'></div>
                                <button onClick={handleSave} className='btn btn-primary'>Save</button>
                            </>
                        )
                    }),
                ]}
            />
        </div>
    );
}

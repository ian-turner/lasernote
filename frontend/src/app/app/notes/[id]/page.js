'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const Editor = dynamic(() => import('../../../../components/NoteEditor.js'), {ssr: false});


export default function Note() {
    const params = useParams();
    const [title, setTitle] = useState('New note');
    const [markdown, setMarkdown] = useState('');

    function handleChange(text) {
        setMarkdown(text);
    }

    function handleSave() {
        console.log('save')
    }

    return (
        <div className='d-flex flex-column p-5'>
            <form className='d-flex w-full'>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{ outline: 'none' }}
                    className='h1 m-0 mb-3 w-100 bg-transparent outline-none border-0 text-dark'
                />
            </form>
            <div className='border border-1 rounded overflow-hidden'>
                <Editor handleSave={handleSave} onChange={handleChange} markdown={markdown}/>
            </div>
        </div>
    );
}

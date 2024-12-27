'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const Editor = dynamic(() => import('../../../../components/NoteEditor.js'), {ssr: false});


export default function Note() {
    const params = useParams();
    const [markdown, setMarkdown] = useState('');

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex w-full'>
                <input className='h1 m-0 p-3 w-100 bg-transparent outline-none border-0 text-white' type='text' />
            </div>
            <Editor markdown={markdown} setMarkdown={setMarkdown}/>
        </div>
    );
}

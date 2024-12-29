'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const Editor = dynamic(() => import('../../../../components/NoteEditor.js'), {ssr: false});
import Loading from '../../../../components/Loading.js';


export default function Note() {
    const params = useParams();
    const [title, setTitle] = useState('New note');
    const [markdown, setMarkdown] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [saving, setSaving] = useState(false);

    function handleChange(text) {
        setMarkdown(text);
    }

    async function handleSave() {
        setSaving(true);
        const res = await fetch('http://localhost:5000/notes/' + params.id, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ markdown, title })
        });
        if (res.ok) {
            setSaving(false);
        }
        else {
            // handle error here
        }
    }

    async function getData() {
        const res = await fetch('http://localhost:5000/notes/' + params.id, {
            mode: 'cors',
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            const note = data.note;
            setMarkdown(note.markdown);
            setTitle(note.title);
            setLoaded(true);
        }
        else {
            // handle error here
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='d-flex flex-column p-5'>
            {loaded ? <>
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
            </> : <div className='align-self-center'><Loading /></div>}
        </div>
    );
}

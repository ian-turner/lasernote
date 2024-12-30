'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from './Loading.js';


export default function FileBrowser() {
    const [files, setFiles] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    async function getData() {
        const res = await fetch('http://localhost:5000/notes', {
            mode: 'cors',
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            setFiles(data.notes);
            setLoaded(true);
        }
        else {
            // handle error here
        }
    }

    async function createNote() {
        const res = await fetch('http://localhost:5000/create-note', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            router.push('/app/notes/' + data.id);
        }
        else {
            // handle error here
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='p-3 d-flex flex-column justify-content-start align-items-center w-100 h-100'>
            <div className='p-1 d-flex flex-row justify-content-between align-items-center w-100 border-bottom mb-3'>
                <h4 className='h4 m-0'>Files</h4>
                <div role='button' className='fw-bold h3 m-0' onClick={createNote}>+</div>
            </div>
            {loaded ? <>
                {files.map(file =>
                    <Link
                        key={file.id}
                        className='hover:bg-gray-800 rounded cursor-pointer w-100 p-1'
                        href={'/app/notes/' + file.id}>
                        {file.title}</Link>
                )}
            </> : <Loading />}
        </div>
    );
}

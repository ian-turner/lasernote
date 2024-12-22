'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const Editor = dynamic(() => import('../../../../components/NoteEditor.js'), {ssr: false});


export default function Note() {
    const params = useParams();

    return (
        <div>
            <Editor markdown={'# Test'}/>
        </div>
    );
}

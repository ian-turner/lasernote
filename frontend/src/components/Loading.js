'use client';
import { useState, useEffect } from 'react';


export default function Loading() {
    const [num, setNum] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNum((num + 1) % 3);
        }, 200);

        return () => clearInterval(interval);
    }, [num]);

    return (
        <div className='text-dark h4'>Loading{'.'.repeat(num+1)}</div>
    );
}

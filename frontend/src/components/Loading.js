'use client';
import { useState, useEffect } from 'react';


export default function Loading(props) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNum((num + 1) % 3);
        }, 200);

        return () => clearInterval(interval);
    }, [num]);

    return (
        <div {...props}>Loading{'.'.repeat(num+1)}</div>
    );
}

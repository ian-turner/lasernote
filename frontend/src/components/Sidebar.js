"use client";

import { useState, useEffect, useRef } from 'react';


export default function Sidebar() {
    const [minWidth, maxWidth, defaultWidth] = [200, 500, 400]
    const [width, setWidth] = useState(defaultWidth);
    const isResized = useRef(false);

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            if (!isResized.current)
                return;
            setWidth(previous => Math.max(Math.min(previous + e.movementX, maxWidth), minWidth));
        });

        window.addEventListener('mouseup', () => {
            isResized.current = false;
        });
    }, []);

    return (
        <div
            onMouseDown={() => {
                isResized.current = true;
            }}
            style={{
                width: width
            }}
            className='p-3 d-flex align-items-center justify-content-center border-end border-secondary'>
            test
        </div>
    );
}

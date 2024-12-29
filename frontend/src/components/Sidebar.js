"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import FileBrowser from './FileBrowser.js';
import Settings from './Settings.js';
import filesIcon from '../../public/files.svg';
import settingsIcon from '../../public/settings.svg';


export default function Sidebar() {
    const [minWidth, maxWidth, defaultWidth] = [200, 500, 300]
    const [width, setWidth] = useState(defaultWidth);
    const [tab, setTab] = useState(0);
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
        style={{
            width: width,
            backgroundColor: '#111115',
        }}
        className='d-flex align-items-center justify-content-between'>
            <div className='d-flex flex-column justify-content-start w-100 h-100'>
                <div className='p-2 d-flex flex-row justify-content-center align-items-center gap-2'>
                    <Image
                        className='rounded'
                        style={tab === 0 ? {
                            backgroundColor: 'rgb(100, 100, 100)',
                        } : {}}
                        onClick={() => {
                            setTab(0);
                        }}
                        width={30}
                        priority
                        src={filesIcon}
                        alt='File browser tab'
                    />
                    <Image
                        className='p-1 rounded'
                        style={tab === 1 ? {
                            backgroundColor: 'rgb(100, 100, 100)',
                        } : {}}
                        onClick={() => {
                            setTab(1);
                        }}
                        width={30}
                        priority
                        src={settingsIcon}
                        alt='Settings tab'
                    />
                </div>
                {tab === 0 ? <FileBrowser /> : <Settings />}
            </div>
            <div
                onMouseDown={() => {
                    isResized.current = true;
                }}
                style={{ width: 5, height: '100vh', cursor: 'col-resize', }}>
            </div>
        </div>
    );
}

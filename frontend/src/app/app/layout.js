export default function AppLayout({ children }) {
    return (
        <div style={{
                width: '100vw',
                height: '100vh',
            }} className='d-flex flex-row'>
            <div className='p-3 d-flex align-items-center justify-content-center border-end border-secondary'>
                test
            </div>
            <div>
                test
            </div>
            <div className='w-100'>
                {children}
            </div>
        </div>
    );
}

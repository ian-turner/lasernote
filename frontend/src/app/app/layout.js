import Sidebar from '../../components/Sidebar.js';


export default function AppLayout({ children }) {
    return (
        <div style={{ width: '100vw', height: '100vh' }} className='d-flex flex-row'>
            <Sidebar />
            <div className='w-100'>
                {children}
            </div>
        </div>
    );
}

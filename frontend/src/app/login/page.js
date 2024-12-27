'use client';
import { useState } from 'react';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log({email, password});
    }

    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{
                width: '100vw',
                height: '100vh',
            }}>
            <form
                className='p-5 container form-control bg-light'
                style={{ maxWidth: '400px' }}
                onSubmit={handleSubmit}>
                <h1 className='h1 mb-4 text-center'>Login</h1>
                <div className='mb-4'>
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='form-control'
                        type='email'
                        placeholder='EMAIL'/>
                </div>
                <div className='mb-4'>
                    <label>Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='form-control'
                        type='password'
                        placeholder='PASSWORD'/>
                </div>
                <button className='btn btn-primary w-100' type='submit'>Login</button>
            </form>
        </div>
    );
}

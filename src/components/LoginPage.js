import React from 'react';
import Login from './Login';

function LoginPage({}) {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <div
                style={{
                    alignSelf: 'flex-start',
                    width: '100vw',
                    height: '64px',
                    backgroundColor: 'rgba(24, 144, 255, .6)',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div
                    className="logo"
                    style={{
                        width: '177px',
                        height: '64px',
                        margin: 0,
                    }}
                ></div>
            </div>
            <Login />                
        </div>
    )
}

export default LoginPage;
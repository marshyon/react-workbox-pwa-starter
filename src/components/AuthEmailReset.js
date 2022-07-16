import React from 'react'
// import { auth } from '../firebase/db'
// import { sendPasswordResetEmail } from 'firebase/auth'

export default function AuthEmailReset() {


    const handleForgotSubmit = (e) => {
        e.preventDefault()
        console.log('reset requested...')
        const email = 'marshyon@gmail.com'
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log(`sent reset to ${email} ....`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("failure : ", errorCode, errorMessage)
            });

    }
    return (
        <div className="wrapper">    
            <form onSubmit={handleForgotSubmit}>
                <button type="submit">Email Reset Link</button>
            </form>
        </div>
    )
}

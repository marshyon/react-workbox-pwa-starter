import React from 'react'
import { auth } from '../firebase/db'
import { signOut } from 'firebase/auth'

export default function AuthLogout() {
    
    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log('logged out user')
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handle submit ran ...')
        logout()
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <button type="submit">Logout</button>
            </form>

        </div>
    )
}

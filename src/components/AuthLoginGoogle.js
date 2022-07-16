import React, { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase/db'

export default function AuthLoginGoogle() {

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState("");

    const provider = new GoogleAuthProvider()

    const handleSubmit = ev => {
        ev.preventDefault()
        setSubmitting(true);
        console.log('logging in using Google ...')

        signInWithPopup(auth, provider)
            .then((result) => {
                setSubmitting(false)
                // The signed-in user info.
                const user = result.user;

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                console.log('logged in with Google', user, accessToken)
            })
            .catch((error) => {
                setSubmitting(false)
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);

                console.log('failed to login google ', errorCode, errorMessage)
                setLoginError(`please try another login method`)
            });

    }

    return (
        <div className="wrapper">
            {loginError &&
            <div>{loginError} </div>
            }
            {submitting &&
                <div>
                    You are being logged in using google.
                </div>
            }
            <form onSubmit={handleSubmit}>
                <button type="submit">Login with google</button>
            </form>
        </div>
    )

}
import React, { useState } from 'react'
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import { auth } from '../firebase/db'

export default function AuthLoginFacebook() {

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setloginError] = useState("");

    const provider = new FacebookAuthProvider()

    const handleSubmit = ev => {
        ev.preventDefault()
        setSubmitting(true);
        console.log('logging in using Facebook ...')

        signInWithPopup(auth, provider)
            .then((result) => {
                setSubmitting(false)
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                console.log('logged in with facebook', user, accessToken)
            })
            .catch((error) => {
                setSubmitting(false)
                // Handle Errors here.
                const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = FacebookAuthProvider.credentialFromError(error);

                console.log('failed to login facebook ', errorCode)
                setloginError(`please try another login method`)
            });

    }

    return (
        <div className="wrapper">
            {loginError &&
                <div>{loginError}</div>
            }
            {submitting &&
                <div>
                    You are being logged in using Facebook.
                </div>
            }
            <form onSubmit={handleSubmit}>
                <button type="submit">Login with Facebook</button>
            </form>
        </div>
    )

}
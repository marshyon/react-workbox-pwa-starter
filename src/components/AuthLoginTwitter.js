import React, { useState } from 'react'
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth'
import { auth } from '../firebase/db'

export default function AuthLoginTwitter() {

  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const provider = new TwitterAuthProvider()

  const handleSubmit = ev => {
    ev.preventDefault()
    setSubmitting(true);
    console.log('logging in using Twitter ...')
    signInWithPopup(auth, provider)
      .then((result) => {
        setSubmitting(false)
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;

        // The signed-in user info.
        const user = result.user;
        console.log('logged in to twitter', token, secret, user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
        setLoginError(`please try another login method`)
        console.log('ERROR ', errorCode, errorMessage, credential)
      });



  }

  return (
    <div className="wrapper">
      {loginError &&
        <div>{loginError} </div>
      }
      {submitting &&
        <div>
          You are being logged in using Twitter.
        </div>
      }
      <form onSubmit={handleSubmit}>
        <button type="submit">Login with Twitter</button>
      </form>
    </div>
  )

}
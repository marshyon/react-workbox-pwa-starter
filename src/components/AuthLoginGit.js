import React, { useState } from 'react'
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { auth } from '../firebase/db'

export default function AuthLoginGit() {

  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const provider = new GithubAuthProvider();
  const handleSubmit = ev => {
    ev.preventDefault()
    setSubmitting(true);
    console.log('logging in using Github ...')
    signInWithPopup(auth, provider)
      .then((result) => {
        setSubmitting(false)
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('logged in with user : ', user)
        console.log('user token : ', token)
        // ...
      }).catch((error) => {
        setSubmitting(false)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log('ERROR : ', errorCode, errorMessage, email, credential)
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
          You are being logged in using Git.
        </div>
      }
      <form onSubmit={handleSubmit}>
        <button type="submit">Login with Github</button>
      </form>
    </div>
  )

}
import React, { useState, useReducer } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from './firebase/db'

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            password: '',
            name: '',
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function AuthCreate() {

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleSubmit = ev => {
        ev.preventDefault()
        setSubmitting(true);
        console.log('submitting form ...')
        console.log(formData)
        console.log(formData.email)
        console.log(formData.password)
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((cred) => {
                console.log('user created : ', cred.user)
                setSubmitting(false);
                setFormData({
                    reset: true
                })
                console.log('attempting to set email confirmation message ...')


                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('SENT EMAIL')
                        // ...
                    }).catch((err) => {
                        console.log('ERROR sending email : ', err)
                    });






            })
            .catch((err) => {
                console.log(err.message)
                setLoginError(err.message)
                setSubmitting(false);
                setFormData({
                    reset: true
                })
            })

    }
    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    return (

        <div className="wrapper">
            <h1>Create a new user</h1>
            {loginError &&
                <div>Error creating user account : {loginError}</div>
            }
            {submitting &&
                <div>
                    You are submitting the following:
                    <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                        ))}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>user</p>
                        <input name="email" onChange={handleChange} value={formData.email || ''} />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <p>password</p>
                        <input type="password" name="password" onChange={handleChange} value={formData.password || ''} />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

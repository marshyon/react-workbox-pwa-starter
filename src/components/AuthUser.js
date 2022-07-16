
import React from 'react'
import { useSelector } from 'react-redux'
import AuthLogin from './AuthLogin';
import AuthLoginGit from './AuthLoginGit';
import AuthLoginFacebook from './AuthLoginFacebook';
import AuthLoginTwitter from './AuthLoginTwitter';
import AuthLoginGoogle from './AuthLoginGoogle';




export default function AuthUser() {
    const userState = useSelector((state) => state.userstate.results);
    if ( userState ) return (
        <></>
    )
    if( !userState ) return (
        <>
            <p>auth user</p>

            <AuthLogin />
            <p>or</p>
            
            <AuthLoginGit />
            <AuthLoginGoogle />
            <AuthLoginFacebook />
            <AuthLoginTwitter />

        </>
    )
}

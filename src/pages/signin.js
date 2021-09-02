import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
    mutation signUp($email: String!, $password: String!) {
        signUp(email: $email, password: $password)
    }
`;

const SignIn = props => {
    useEffect(() => {
        document.title = 'Sign In - Notedly';
    });

    const client = useApolloClient();

    const [signIn, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signIn);
            client.writeData({ data: { isLoggedIn: true }});
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {loading && <p>Loading...</p>}
            {error && <p>Error signin in!</p>}
        </React.Fragment>
    );
};

export default SignIn;
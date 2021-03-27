import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessTokenSelector } from './authenticationSelectors';
import { login, setAccessToken } from './authenticationSlice';

type ownProps = {
    children: ReactNode
}

function AuthenticationWrapper({ children }: ownProps) {
    const dispatch = useDispatch();
    const accessToken = useSelector(getAccessTokenSelector());

    const { location } = window;
    const regex = /.*access_token=(?<accesToken>[^&]*)/gi;
    const params = regex.exec(location.hash);

    if(!accessToken && !params) {
        dispatch(login());
    }

    useEffect(() => {
        if(params && params[1]) {
            dispatch(setAccessToken({ accessToken: params[1] }));
        }
    }, []);
    

    return (<>
        {children}
    </>);
}

export default AuthenticationWrapper;
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'
import { authActions } from '../../redux/auth/actions';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';

interface Props {
    children: React.ReactElement;
    path: string;
    exact?: boolean;
}

const PrivateRoute = ({ children, ...rest }: Props) => {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    // useEffect(() => {
    //     if (authState.status !== ActionStatus.Success) {
    //         dispatch(authActions.loginCheck());
    //     }
    // }, [])

    return (
        <Route
            {...rest}
            render={() =>
                authState.status === ActionStatus.Success ?
                    children :
                    <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute;
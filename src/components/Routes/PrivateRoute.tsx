import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';

interface Props {
    children: React.ReactElement;
    path: string;
    exact?: boolean;
}

const PrivateRoute = ({ children, ...rest }: Props) => {
    const login = useSelector((state: RootState) => state.auth);
    return (
        <Route
            {...rest}
            render={() =>
                login.status === ActionStatus.Success ?
                    children :
                    <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute;
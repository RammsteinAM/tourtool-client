import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'
import { DisconnectedActionStatus } from '../../redux/auth/types';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';

interface Props {
    children: React.ReactElement;
    path: string;
    location?: any;
    exact?: boolean;
}

const PublicRoute = ({ children, ...rest }: Props) => {
    const authStatus = useSelector((state: RootState) => state.auth.status);
    return (
        <Route
            {...rest}
            render={() =>
                (authStatus !== ActionStatus.Success && authStatus !== DisconnectedActionStatus.Disconnected) ?
                    children :
                    <Redirect to={rest.location.state?.from || "/"} />
            }
        />
    )
}

export default PublicRoute;
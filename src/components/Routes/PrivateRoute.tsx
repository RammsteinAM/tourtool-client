import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'
import { authActions } from '../../redux/auth/actions';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useHistory } from "react-router-dom";
import { DisconnectedActionStatus } from '../../redux/auth/types';

interface Props {
    children: React.ReactElement;
    path: string;
    exact?: boolean;
}

const generateFromValue = (path: string) => {
    if (/(lms|elimination)\/[1-9]+/g.test(path)) {
        return path;
    }
    return '/';
}

const PrivateRoute = ({ children, ...rest }: Props) => {
    const authState = useSelector((state: RootState) => state.auth);
    const history = useHistory();
    const from = generateFromValue(history.location.pathname)

    return (
        <Route
            {...rest}
            render={() =>
                (authState.status === ActionStatus.Success || authState.status === DisconnectedActionStatus.Disconnected) ?
                    children :
                    <Redirect to={{ pathname: "/login", state: { from } }} />
            }
        />
    )
}

export default PrivateRoute;
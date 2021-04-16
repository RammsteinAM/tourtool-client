import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'
import { authActions } from '../../redux/auth/actions';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { useHistory } from "react-router-dom";

interface Props {
    children: React.ReactElement;
    path: string;
    exact?: boolean;
}

const PrivateRoute = ({ children, ...rest }: Props) => {
    const authState = useSelector((state: RootState) => state.auth);
    const history = useHistory();

    return (
        <Route
            {...rest}
            render={() =>
                authState.status === ActionStatus.Success ?
                    children :
                    <Redirect to={{ pathname: "/login", state: { from: history.location.pathname } }} />
            }
        />
    )
}

export default PrivateRoute;
import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {allRoutes, publicRoutes} from "../router/router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {allRoutes.map((route, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.element />}
                    />
                )}
                <Route path="/*" element={<Navigate to="/posts" replace />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.element />}
                    />
                )}
                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
    );
};

export default AppRouter;
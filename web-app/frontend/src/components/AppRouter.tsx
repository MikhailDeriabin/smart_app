import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Settings from "../pages/Settings";
import Error from "../pages/Error";
import Main from "../pages/Main";


const AppRouter = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;

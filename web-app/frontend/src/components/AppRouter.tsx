import {Navigate, Route, Routes,} from "react-router-dom";
import Settings from "../pages/Settings";
import Error from "../pages/Error";
import Main from "../pages/Main";
import Devices from "../pages/Devices";
import Groups from "../pages/Groups";

const AppRouter = () => {
    return (
        <>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/devices" element={<Devices/>}/>
                    <Route path="/groups" element={<Groups/>}/>
                    <Route path="404"  element={<Error/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="404" replace />}
                    />
                </Routes>
        </>
    );
}

export default AppRouter;

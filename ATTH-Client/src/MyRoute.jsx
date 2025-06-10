import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarComponent from "./Components/NavBarComponern";
import HomePageComponent from "./Components/HomePageComponent";
import HomeComponent from "./Components/HomeComponent";
import LoginComponent from "./Components/LoginComponent";
import HelpComponent from "./Components/HelpComponent";
import ReportComponent from "./Components/ReportComponent";
import ProfileComponent from "./Components/ProfileComponent";
import AdminPageComponent from "./Components/AdminPageComponent";
import NavBeforeLoginComponent from "./Components/NavBeforeLoginComponent";


const MyRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/report" element={<><NavBarComponent /><ReportComponent /></>} />
                <Route path="/home" element={<><NavBarComponent /><HomePageComponent /></>} />
                <Route path="/login" element={<><NavBarComponent /><LoginComponent /></>} />
                <Route path="/help" element={<><NavBarComponent /><HelpComponent /></>} />
                <Route path="/profile" element={<><NavBarComponent /><ProfileComponent /></>} />
                <Route path="/home/admin" element={<AdminPageComponent />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoute;

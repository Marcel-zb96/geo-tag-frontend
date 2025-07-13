import { Outlet } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import HomeButton from "./HomeButton";


const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("GeoNotesToken"));

    useEffect(() => {
        const handleStorage = () => {
            setIsLoggedIn(!!localStorage.getItem("GeoNotesToken"));
        };
        window.addEventListener("authChange", handleStorage);
        return () => {
            window.removeEventListener("authChange", handleStorage);
        };
    }, []);

    return <>
        <div className="flex flex-row text-amber-50 bg-blue-600 items-center w-full h-fit font-stretch-120% font-bold justify-between">
            <div className="m-7 text-5xl">
            <HomeButton title="GEO-NOTES" />
            </div>
            <div className="flex flex-row mr-10 text-3xl">
                {isLoggedIn ? <LogoutButton /> : <LoginButton />}
            </div>
        </div>
        <Outlet />
    </>
}

export default Header;
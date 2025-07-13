import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("GeoNotesToken")
        window.dispatchEvent(new Event("authChange"));
        navigate("/")
    } 

    return <>
    <button className="" onClick={() => handleLogout()}>Logout</button>
    </>
}

export default LogoutButton;
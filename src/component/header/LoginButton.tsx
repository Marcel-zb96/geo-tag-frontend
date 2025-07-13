import { useNavigate } from "react-router-dom";

const LoginButton = () => {

    const navigate = useNavigate();

    return <>
    <button className="" onClick={() => navigate("/login")}>LogIn</button>
    </>
}

export default LoginButton;
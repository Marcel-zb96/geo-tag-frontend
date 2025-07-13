import { useNavigate } from "react-router-dom";

const RegisterButton = () => {

    const navigate = useNavigate();

    return <>
    <button className="" onClick={() => navigate("/register")}>Register</button>
    </>
}

export default RegisterButton;
import { useNavigate } from "react-router-dom";

const HomeButton = ({title}: {title: string}) => {

    const navigate = useNavigate();

    return <>
    <button className="" onClick={() => navigate("/")}>{title}</button>
    </>
}

export default HomeButton;
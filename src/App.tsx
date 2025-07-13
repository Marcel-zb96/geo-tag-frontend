import { useNavigate } from "react-router-dom";
import LoginButton from "./component/header/LoginButton";
import { useEffect } from "react";
import RegisterButton from "./component/header/RegisterButton";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('GeoNotesToken');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/map');
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) return null;

  return (
    <div className="flex flex-col w-full justify-center items-center mt-30">
      <div className="mb-10 text-3xl font-semibold">
        Welcome to Geo Notes!
      </div>
      <div className="flex flex-col gap-5" >
        <div className="flex flex-col text-white text-3xl rounded-xl bg-blue-600 pt-3 pb-3 pr-5 pl-5">
          <LoginButton />
        </div >
        <div className="flex flex-col text-white text-3xl rounded-xl bg-blue-600 pt-3 pb-3 pr-5 pl-5">
          <RegisterButton />
        </div>
      </div>
    </div>
  );
};

export default App;

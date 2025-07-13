import { type SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../component/form/FormInput";
import { useMutation } from "@tanstack/react-query";
import type { CreateUserDTO, LoginDTO } from "../../types/form";
import { useNavigate } from "react-router";
import { loginUser } from "../../query/query";

const Login = () => {

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
        window.dispatchEvent(new Event("authChange"));
        navigate("/map");
        alert("Login successful!");
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    mutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDTO>({
    defaultValues: {
      userName: "",
      password: "",
      email: "",
    },
  });

  return (
    <form
      className="w-full mt-30 flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="self-center justify-self-center text-3xl font-bold">
        Login
      </div>
      <div className="mt-15">
        <FormInput
          type="text"
          label="email"
          register={register("email", { required: "Email is required" })}
        />
        {errors.userName && (
          <span className="text-red-500 text-sm">
            {errors.userName.message}
          </span>
        )}
      </div>
      <div>
        <FormInput
          type="password"
          label="Password"
          register={register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password?.message}
          </span>
        )}
      </div>
      
      <button className="mt-10 border-3 font-bold rounded-md pr-5 pl-5 pt-2 pb-2 border-blue-300 bg-blue-500 self-center font-stretch-120% text-black hover:bg-white hover:text-black">
        login
      </button>
    </form>
  );
};

export default Login;

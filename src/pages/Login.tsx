import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FROM } from "../data";
import InputErrorMessage from "../components/InputErrorMessabe";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interface";

interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      // ** fulfilled => success(optional)
      const { status } = await axiosInstance.post("/auth/local", data);

      if (status === 200) {
        toast.success(
          "you will navigate to the login page after 4 secand to login !",
          {
            position: "bottom-center",
            duration: 4000,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );
      }
    } catch (errors) {
      //** rejected => field => (optional) */

      // ** to return error from axios
      const errorObject = errors as AxiosError<IErrorResponse>;
      console.log(errorObject.response?.data.error.message);
      toast.error(`${errorObject.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  // ** Render
  const renderlofinForm = LOGIN_FROM.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />

        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderlofinForm}

        <Button fullWidth isLoading={isLoading}>
          Login{" "}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;

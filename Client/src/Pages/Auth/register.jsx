import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../store/authThunk/asyncThunk";

const schema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  
  const {register,handleSubmit,formState: { errors },reset,} = useForm({
    resolver: zodResolver(schema),
  });

  const onHandleSubmit = async (data) => {
    console.log(data);
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      reset();
      setTimeout(() => navigate("/auth/login"), 1500);
    }
  };


  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="flex flex-col justify-center items-center p-7 gap-5">

        {/* Name */}
        <div className="flex flex-col items-start">

          <Label>UserName</Label>

          {/* <input
            className="border border-red-600 p-2"
            {...register("name")}
          /> */}
          <Input   {...register("name")} />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col items-start">
          <Label>Email</Label>
          {/* <input
            className="border border-red-600 p-2"
            {...register("email")}
          /> */}
          <Input   {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col items-start">
          <Label>Password</Label>
          {/* <input
            type="password"
            className="border border-green-600 p-2"
            {...register("password")}
          /> */}

          <Input type="password"

            {...register("password")} />
          {errors.password && (
            <p className="">{errors.password.message}</p>
          )}
        </div>

        {/* <button
          type="submit"
          className="bg-pink-700 text-white rounded-2xl shadow-md p-4"
        >
          Register
        </button> */}

        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default Register;

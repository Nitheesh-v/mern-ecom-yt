import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from "react-redux";

import { loginUser } from "../../store/authThunk/asyncThunk";



const schema = z.object({
  
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { isLoading, error, } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

 
  const onHandleSubmit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      reset();
      navigate("/shop/home");
    }
  }

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="flex flex-col justify-center items-center p-7 gap-5">


       

        {/* Email */}
        <div className="flex flex-col items-start">
        <Label>Email</Label>
         
          <Input   {...register("email")}/>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col items-start">
        <Label>Password</Label>

          <Input  type="password"
        
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
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

 

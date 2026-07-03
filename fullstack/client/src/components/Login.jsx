import { useForm } from "react-hook-form";
import { Link } from "react-router";
import axiosInstance from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
function Login({ setToggle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data);
    const res = await axiosInstance.post("/user/login", data);
    dispatch(addUser(res.data.user));
    console.log(res);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>

        <p className="text-gray-500 mb-6">Login to continue.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="john@gmail.com"
              className="w-full mt-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="********"
              className="w-full mt-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            to="/register"
            className="cursor-pointer text-blue-600 font-medium"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

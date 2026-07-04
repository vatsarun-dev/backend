import React from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../config/axiosInstance";
const Home = () => {
  let dispatch = useDispatch();
  const handleLogout = async () => {
    await axiosInstance.get("/user/logout");
    dispatch(removeUser());
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      this is home page
      <div>
        <button
          onClick={handleLogout}
          className="text-white bg-blue-600 p-3 block"
        >
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;

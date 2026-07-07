import React from "react";
import axiosInstance from "./config/axiosInstance";
import { useState } from "react";
const App = () => {
  const [data, setData] = useState(null);
  const formData = new FormData();
  formData.append("image", data);
  const handleSubmit = async () => {
    try {
      console.log("button clicked");
      const res = await axiosInstance.post("/file/upload-files", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen gap-3 text-white text-4xl font-bold flex flex-col justify-center items-center">
      Send file{" "}
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => setData(e.target.files[0])}
      />
      <button onClick={handleSubmit} className="text-white bg-gray-800 p-4">
        Submit
      </button>
    </div>
  );
};

export default App;

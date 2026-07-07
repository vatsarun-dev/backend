import React from "react";
import axiosInstance from "./config/axiosInstance";
import { useState } from "react";
const App = () => {
  // THIS PART IS FOR SINGLE FILE ACCEPTANCE

  // const [data, setData] = useState(null);
  // const formData = new FormData();
  // formData.append("image", data);
  // const handleSubmit = async () => {
  //   try {
  //     console.log("button clicked");
  //     const res = await axiosInstance.post("/file/upload-files", formData);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // THIS IS FOR MULTIPLE FILE TO SEND

  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (let file of data) {
        formData.append("image", file);
      }

      const res = await axiosInstance.post(
        "/file/multiple-upload-files",
        formData,
      );
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
        multiple
        // THIS IS ALSO FOR SINGLE FILE ACCEPTANCE
        // onChange={(e) => setData(e.target.files[0])}
        onChange={(e) => setData(e.target.files)}
      />
      <button onClick={handleSubmit} className="text-white bg-gray-800 p-4">
        Submit
      </button>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import Register from "./components/Register.jsx";
import Paise from "./components/Paise.jsx";

const App = () => {
  const [register, setRegister] = useState(false);
  return (
    <div className=" bg-[url(./public/image.png)] repeat min-h-screen w-full flex items-center justify-center">
      {" "}
      {register ? <Paise /> : <Register setRegister={setRegister} />}
    </div>
  );
};

export default App;

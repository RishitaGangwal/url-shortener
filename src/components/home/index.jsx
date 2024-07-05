import React, { useState } from "react";
import InputShortener from "../../InputShortener";
import LinkResult from "../../LinkResult";
import Navbar from "../Navbar/Navbar.js"

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <Navbar />
      <InputShortener setInputValue={setInputValue} />
      <LinkResult inputValue={inputValue} />
    </div>
  );
};

export default Home;

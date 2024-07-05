import React, { useState } from "react";

const InputShortener = ({ setInputValue }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  };

  return (
    <div className="inputContainer">
      <h1>
        URL <span>Shortener</span>
      </h1>
      <div className="url-container">
        Create shortened, tidy links effortlessly with our free URL Shortener.
      </div>
      <input
        type="text"
        placeholder="Paste your untidy link to shorten it."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>Shorten URL</button>
    </div>
  );
};

export default InputShortener;

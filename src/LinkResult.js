import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "x-api-key": "sk_49d12e39c36143c38866e5547b7c4b69", 
  };

  const inputBody = JSON.stringify({
    url: inputValue,
    expiry: "5m",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.manyapis.com/v1-create-short-url",
        {
          method: "POST",
          body: inputBody,
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Shortened URL data:", data); 
      setShortenLink(data.shortUrl);
    } catch (error) {
      setError(error.message);
      console.error("Fetch error:", error); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }

  if (error) {
    return <p className="noData">Something went wrong :(</p>;
  }

  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              Copy to Clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;

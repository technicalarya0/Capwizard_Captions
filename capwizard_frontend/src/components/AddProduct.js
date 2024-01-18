import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Configuration, OpenAIApi } from "openai";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyTwoTone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import gif from "../usables/machine.gif";
import loader from "../usables/my_loader.gif";

const AddProduct = () => {
  let userIdVal = localStorage.user;
  userIdVal = JSON.parse(userIdVal);

  const [showLoader, setShowLoader] = useState(false);
  const [caption, setCaption] = useState({
    name: "",
    platform: "",
    mood: "",
    length: "",
    description: "",
    caption: "",
    userId: userIdVal.email,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // for verifying the user
  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    let check = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/verify`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
      }
    );
    check = await check.json();
    if (check.result === "logout") {
      localStorage.removeItem("user");
      localStorage.removeItem("auth");
      navigate("/home");
    }
  };

  // Function for dealing with onSubmit
  const handleGenerate = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 2000);
    if (
      !caption.name ||
      !caption.platform ||
      !caption.description ||
      !caption.length ||
      !caption.mood
    ) {
      setError(true);
      return false;
    } else {
      setShowLoader(true);
      fetchCaption();
      // console.log(caption);
    }
  };

  // for openai API
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.REACT_APP_API_KEYS,
    })
  );
  const fetchCaption = async () => {
    console.log("called");
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a ${caption.length} caption for ${caption.platform} post mention that ${caption.description}. Write the caption in ${caption.mood} mood and not include the hashtags`,
          },
        ],
      })
      .then((res) => {
        console.log(res);
        setShowLoader(false);
        let ans = res.data.choices[0].message.content;
        setCaption({ ...caption, caption: ans });
      });
    console.log("done");
  };

  // for saving caption to DB
  const saveCaption = async (e) => {
    e.preventDefault();
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/addproduct`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
        body: JSON.stringify(caption),
      }
    );
    result = await result.json();
    // console.log(result);
    navigate("/");
  };

  // handling change
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCaption({ ...caption, [name]: value });
  };

  const options = [
    "Normal",
    "Happy",
    "Sarcastic",
    "Romantic",
    "Professional",
    "Felling Low",
    "Angry",
    "Emotional",
    "Musical",
    "Poetic",
    "Inspirational",
    "Creative",
  ];
  const socialMedias = [
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Twitter",
    "VK",
    "Tumblr",
    "Reddit",
  ];

  // reset the state
  const removeCaption = () => {
    setCaption({
      platform: "",
      mood: "",
      length: "",
      caption: "",
      description: "",
    });
  };

  return (
    <div className="formPage">
      <article>
        <div className="gif">
          <img className="gif_image" src={gif} alt="image" />
        </div>
        <form className="form" onSubmit={handleGenerate}>
          <div className="form_content">
            <div className="logo">
              <h1>CAPWIZARD</h1>
            </div>
            <div className="form-control">
              <label htmlFor="name">Name your Post: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={caption.name}
                onChange={changeHandler}
              />
            </div>
            {error && !caption.name && (
              <span className="form-error-message">Please Enter Name</span>
            )}
            <div className="form-control">
              <label htmlFor="price">Platform : </label>
              <select
                type="platform"
                id="platform"
                name="platform"
                value={caption.platform}
                onChange={changeHandler}
              >
                <option>Select</option>
                {socialMedias.map((socialMedia, index) => {
                  return <option key={index}>{socialMedia}</option>;
                })}
              </select>
            </div>
            {error && !caption.platform && (
              <span className="form-error-message">
                Please Enter Name of the Platform
              </span>
            )}
            <div className="form-control">
              <label htmlFor="price">Mood : </label>
              <select
                type="mood"
                id="mood"
                name="mood"
                value={caption.mood}
                onChange={changeHandler}
              >
                <option>Select</option>
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
            </div>
            {error && !caption.mood && (
              <span className="form-error-message">
                Please Enter Mood of the caption
              </span>
            )}
            <div>
              <label htmlFor="catagory">Length:</label>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="length"
                    value="Short"
                    checked={caption.length === "Short"}
                    onChange={changeHandler}
                  />
                  Short
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="length"
                    value="Medium"
                    checked={caption.length === "Medium"}
                    onChange={changeHandler}
                  />
                  Medium
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="length"
                    value="Long"
                    checked={caption.length === "Long"}
                    onChange={changeHandler}
                  />
                  Long
                </label>
              </div>
            </div>
            {error && !caption.length && (
              <span className="form-error-message">
                Please Enter Length of the caption
              </span>
            )}

            <div className="form-control description">
              <label htmlFor="catagory">Description:</label>
              <textarea
                type="description"
                id="description"
                name="description"
                value={caption.description}
                onChange={changeHandler}
              />
            </div>
            {error && !caption.description && (
              <span className="form-error-message">Please Enter catagory</span>
            )}
            <div className="button-container">
              <button type="submit">Generate Caption</button>
            </div>
          </div>
        </form>
      </article>
      {showLoader ? (
        <div className="loader-container">
          <img src={loader} alt="Loading...." />
        </div>
      ) : (
        caption.caption && (
          <div className="caption-result">
            {`${caption.caption}`}
            <div className="button-container">
              <Button
                className="save-button"
                variant="outlined"
                onClick={saveCaption}
                startIcon={<FileUploadIcon />}
              >
                Save
              </Button>
              <Button
                className="copy-button"
                variant="outlined"
                onClick={() => navigator.clipboard.writeText(caption.caption)}
                startIcon={<FileCopyTwoToneIcon />}
              >
                Copy
              </Button>
              <Button
                className="delete-button"
                variant="outlined"
                onClick={() => removeCaption()}
                startIcon={<DeleteIcon />}
              >
                Discard
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AddProduct;

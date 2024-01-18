import React from "react";
import { useNavigate } from "react-router-dom";
import consfused from "../usables/confused.png";
import hashtag from "../usables/hashtag.gif";
import caption from "../usables/caption.gif";
import "../CSS/landing.css";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <ul className="cover_box">
        <li>
          <img
            className="landing_cover"
            alt="this is a gif"
            src={consfused}
          ></img>
        </li>
        <li className="quote">
          <h1>Didn't know what to write in your post?</h1>
          <p>
            "Don't worry, we've got your back. We are committed to assisting you
            and finding solutions to resolve your problem with the help of
            modern day tool i.e. Artificial Intelligence or simply AI."
          </p>
          <button
            className="joinusButton"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Join Us
          </button>
        </li>
      </ul>
      <div className="services">
        <ul className="box">
          <li className="box_text">
            <h1>Generates Caption</h1>
            <p>
              "If you fell difficulty in writing caption of your post than this
              one id for you. You can get AI generated captions for your posts
              within a click. You need to provide some basic details of your
              post"
            </p>
          </li>
          <li>
            <img alt="this is a gif" src={caption}></img>
          </li>
        </ul>
        <ul className="box ">
          <li>
            <img alt="this is a gif" src={hashtag}></img>
          </li>
          <li className="box_text">
            <h1>Generates Hashtags</h1>
            <p>
              "If you struggles at finding best hashtags for your post. You
              donst know which hashtags best suits your post. Then here we also
              have feature to generate hashtags for making your life more
              easier."
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Landing;

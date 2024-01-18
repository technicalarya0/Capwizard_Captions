import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/home.css";

const Home = () => {
  const [captions, setCaptions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // verify();
    getcaption();
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
      navigate("/login");
    }
  };

  const getcaption = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/getcaptions`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
      }
    );
    result = await result.json();
    // console.log(result);
    let activeUserId = localStorage.getItem("user");
    activeUserId = JSON.parse(activeUserId);
    activeUserId = activeUserId.email;
    if (result) {
      result = result.filter((product) => {
        if (product.userId === activeUserId) {
          return product;
        }
      });
      setCaptions(result);
    }
  };

  const deleteproduct = async (id) => {
    // console.log(id);
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/deletecaption/${id}`,
      {
        method: "delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
      }
    );
    getcaption();
  };

  function myFunction(caption) {
    navigator.clipboard.writeText(caption);
  }

  const searchHandler = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/search/${key}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
          },
        }
      );
      result = await result.json();
      let activeUserId = localStorage.getItem("user");
      activeUserId = JSON.parse(activeUserId);
      activeUserId = activeUserId.email;
      result = result.filter((product) => {
        if (product.userId === activeUserId) {
          return product;
        }
      });
      if (result) {
        setCaptions(result);
      } else {
        console.log("no value found");
      }
    } else {
      getcaption();
    }
  };
  return (
    <div className="page">
      <input
        type="text"
        placeholder="search product"
        className="searchTerm"
        onChange={searchHandler}
        id="input_text"
      ></input>
      {captions.length > 0 ? (
        <div className="product-container">
          <ol style={{ "--length": `${captions.length}` }}>
            {captions.map((item, index) => (
              <li style={{ "--i": `${index + 1}` }} key={item._id}>
                <div className="content">
                  <h3>{item.name}</h3>
                  <div className="post-about">
                    <p>{item.platform} post</p>
                    <p>{item.mood} mood</p>
                    <p>{item.length} length</p>
                  </div>
                  <div className="front-quote">❝</div>
                  <div className="quote-content">
                    <p id="myInput">{item.caption}</p>
                  </div>
                  <div className="back-quote">❞</div>
                </div>
                <div className="button-container">
                  <Button
                    className="updatebutton"
                    variant="outlined"
                    onClick={() => navigator.clipboard.writeText(item.caption)}
                    startIcon={<FileCopyTwoToneIcon />}
                  >
                    Copy
                  </Button>
                  <Button
                    className="deletebutton"
                    variant="outlined"
                    onClick={() => deleteproduct(item._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>
                {/* <Link
              className="update?Button"
              startIcon={<DeleteIcon />}
              to={`/product/${item._id}`}
            >
              Update
            </Link> */}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <h1>No result Found</h1>
      )}
    </div>
  );
};

export default Home;

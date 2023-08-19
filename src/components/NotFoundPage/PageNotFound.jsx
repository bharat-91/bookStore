import React from "react";
import data from "../../assets/notFound404.json";
import Lottie from "react-lottie";
import "./PageNotFound.css";
import Navbar from "../Navbar/Navbar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function PageNotFound() {
  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Navbar />
      <div className="main-404">
        <Lottie
          options={defaultOption}
          height={300}
          width={300}
          className="animate-404"
        />
        <Button variant="primary">
          <Link to={"/HomePage"}>Go back to Home Page</Link>
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;

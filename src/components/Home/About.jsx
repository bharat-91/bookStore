import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import WithAuth from "../../layout/WithAuth";

function About() {
  return (
    <div>
      <Navbar />
      <div>
        <h1>hello this is About us page</h1>
      </div>
      <Footer />
    </div>
  );
}

export default WithAuth(About);

import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import WithAuth from "../../layout/WithAuth";

function Shopping() {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Shopping Page</h1>
      </div>
      <Footer />
    </div>
  );
}

export default WithAuth(Shopping);

import React, { useState } from "react";
import WithAuth from "../../layout/WithAuth";
import "./HomePage.css";
import Navbar from "../Navbar/Navbar";
import { useContext } from "react";
import { UserData } from "../../App";
import BookList from "./BookList";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function HomePage() {
  const userInfo = useContext(UserData);
  // console.log(userInfo.name);
  const [product, setProduct] = useState("");
  const handleInputChange = (event) => {
    setProduct(event.target.value);
  };
  return (
    <>
      <Navbar />
      <MDBCarousel showControls showIndicators dark fade>
        <MDBCarouselItem
          className="w-100 d-block h-100"
          itemId={1}
          src="https://i.guim.co.uk/img/media/77e3e93d6571da3a5d77f74be57e618d5d930430/0_0_2560_1536/master/2560.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=b1b288d92b51ba3c1a48a97ecf154d5e"
          alt="..."
        ></MDBCarouselItem>
        <MDBCarouselItem
          className="w-100 d-block h-100px"
          itemId={2}
          src="https://foreignpolicy.com/wp-content/uploads/2021/11/Best-books-of-202-foreign-policy.jpg?w=1000"
          alt="..."
        ></MDBCarouselItem>

        <MDBCarouselItem
          className="w-100 d-block h-100"
          itemId={3}
          src="https://suburbanturmoil.com/wp-content/uploads/2018/12/Top-10-Books-of-2018.jpg"
          alt="..."
        ></MDBCarouselItem>
      </MDBCarousel>
      <BookList />
    </>
  );
}

export default WithAuth(HomePage);

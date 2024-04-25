import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import footerlogo from "../Assets/Images/Logo/Footer-logo.png";
import twitter from "../Assets/Images/Icons/twitter.svg";
import telegram from "../Assets/Images/Icons/telegram.svg";
import linkdin from "../Assets/Images/Icons/linkdln.svg";
import medium from "../Assets/Images/Icons/medium.svg";
import socialicon5 from "../Assets/Images/Icons/Vector.svg";

import {
  Github,
  Linkedin,
  Medium,
  Telegram,
  Twitter,
  pdfUrlwhitePaper,
} from "../Const/const";
function Footer({ scrollToFaq, scrollToDis, scrollToWork }) {
  const navigate = useNavigate();
  const scrollToSection = () => {
    const section = document.getElementById("aboutSection");
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToSectionFaq = () => {
    // navigate('/')
    const section = document.getElementById("frequently");
    // if (section) {

    // // }
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  
  const scrollToSectionhowdao = () => {
    // navigate('/')
    const section = document.getElementById("howDaoWroks");
    // if (section) {

    // // }
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  

  const onButtonClick = () => {
    const pdfUrl = pdfUrlwhitePaper;

    // Download the PDF
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrlwhitePaper; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };
  const location = useLocation();

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    window.scrollTo({ behavior: "smooth" });
  };
  return (
    <>
      <Container className="footer" fluid>
        <Row>
          <Container>
            <Row>
              <Col xl="12" lg="12" className="text-center">
                <img src={footerlogo} alt="Footer Logo" />
                <ul className="footer-list">
                  <li>
                    <Link
                      to="/"
                      className={`${location.pathname === "/" ? "active" : ""}`}
                      onClick={scrollToTop} // Attach onClick event handler
                    >
                      Home
                    </Link>
                  </li>
                  <li onClick={onButtonClick}>
                    <Link to="javascript:void(0);">Docs</Link>
                  </li>
                  <li>
                    <Nav.Link href={void 0} onClick={() => scrollToWork()}>
                    How Dao Works
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link href={void 0} onClick={() => scrollToFaq()}>
                      FAQ
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link href={void 0} onClick={() => scrollToDis()}>
                      Disclaimer
                    </Nav.Link>
                    {/* <a href=""></a> */}
                  </li>
                </ul>
                <ul className="footer-social-list">
                  <li>
                    <Link to={Twitter} target="_blank">
                      <img className="imgbtn" src={twitter} alt="Footer Logo" />
                    </Link>
                  </li>
                  <li>
                    <Link to={Telegram} target="_blank">
                      <img
                        className="imgbtn"
                        src={telegram}
                        alt="Footer Logo"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to={Github} target="_blank">
                      <img
                        className="imgbtn"
                        src={socialicon5}
                        alt="Footer Logo"
                      />
                    </Link>
                  </li>
                  {/* <li>
                    <Link to='#' >
                      <img className="imgbtn" src={linkdin} alt="Footer Logo" />
                    </Link>
                  </li> */}
                  <li>
                    <Link to={Medium} target="_blank">
                      <img className="imgbtn" src={medium} alt="Footer Logo" />
                    </Link>
                  </li>
                </ul>
                <div className="flex-div-md align-items-center">
                  {/* <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      English <i className="fa fa-angle-down"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="javascript:void(0);">
                        English
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void(0);">
                        Urdu
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void(0);">
                        Spanish
                      // </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  <p className="m-0">
                  Copyright © 2024 All rights reserved. Veritas Ecosystems.                   </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}
export default Footer;

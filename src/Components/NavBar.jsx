import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Logo from "../Assets/Images/MakerDao.svg";
import cross from "../Assets/Images/Vector.png";
import bars from "../Assets/Images/Group 1029.png";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import BuyEursd from "./BuyEursd";
import Toast from "../utils/Toast/toast";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useChainId,
  useDisconnect,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import {
  Linkedin,
  Medium,
  ChainIds,
  oraclePrice,
  getRate,
  DocFile,
} from "../Const/const";
import { Telegram } from "../Const/const";
import { Twitter } from "../Const/const";
import { Github } from "../Const/const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faTelegram,
  faGithub,
  faLinkedin,
  faMediumM,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Web3 from "web3";

function NavBar({ scrollToFaq, scrollToDis, scrollToWork, ethAmount }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to track Navbar.Toggle toggle

  const address = useAddress();
  const disconnect = useDisconnect();
  const chainId = useChainId();
  const isWrongBlockcahin = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [Walletaddress, setWalletAddress] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    if (isWrongBlockcahin) {
      switchNetwork(ChainIds);
    }
  }, [address, isWrongBlockcahin, switchNetwork]);
  const onButtonClick = () => {
    const pdfUrl = "ERUSD_Whitepaper.pdf";

    // Download the PDF
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = DocFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };

  const isWrongUrl = useLocation.pathname !== "/"; // Adjust this condition based on your URL structure

  const handleNavLinkClick = () => {
    setIsNavbarOpen(false); // Close the mobile menu when a Nav.Link is clicked
  };
  const handleMenuClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavItemClick = () => {
    setCollapseOpen(false);
  };

  useEffect(() => {
    setCollapseOpen(false);
  }, []);
 
  return (
    <>
      <Navbar
        expand="lg"
        className={`${collapseOpen ? "navbar-open" : ""}`}
        id="navbar"
      >
        <Container>
          <Navbar.Brand href="">
            <div>
              {isWrongUrl ? (
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              ) : (
                <img src={Logo} alt="Logo" />
              )}
              
            </div>
          </Navbar.Brand>
          {/* <Navbar.Toggle id="navbarScroll" aria-controls="navbarScroll" /> */}
          <div
                className="collaspbtn"
                onClick={() => {
                  setCollapseOpen(!collapseOpen);
                }}
              >
                {collapseOpen ? (
                  <img src={cross} className="cross" />
                ) : (
                  <img src={bars} className="Bars" />
                )}
              </div>
          <Navbar.Collapse in={collapseOpen}>
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link
                as={Link}
                to="/"
                className={`${useLocation().pathname == "/" ? "active" : ""}`}
                onClick={() => {
                  handleNavItemClick();
                  handleMenuClick();
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                to="/MyAssets"
                as={Link}
                className={`${
                  useLocation().pathname == "/MyAssets" ? "active" : ""
                }`}
                onClick={() => {
                  handleNavItemClick();
                  handleMenuClick();
                }}
              >
                My Assets
              </Nav.Link>
              <Nav.Link onClick={onButtonClick}>Docs</Nav.Link>
              <Nav.Link
                href={void 0}
                onClick={() => {
                  scrollToWork();
                  handleNavItemClick();
                }}
              >
                How Dao Works
              </Nav.Link>
              <Nav.Link
                //  className={`${useLocation().pathname == "/" ? "active" : ""}`}

                href={void 0}
                onClick={() => {
                  scrollToFaq();
                  handleNavItemClick();
                }}
              >
                FAQ
              </Nav.Link>
              <Nav.Link
                href={void 0}
                onClick={() => {
                  scrollToDis();
                  handleNavItemClick();
                }}
              >
                Disclaimer
              </Nav.Link>
              <NavDropdown title="Social">
                <NavDropdown.Item href={Twitter} target="_blank">
                  <FontAwesomeIcon icon={faXTwitter} /> Twitter
                </NavDropdown.Item>
                <NavDropdown.Item href={Telegram} target="_blank">
                  <FontAwesomeIcon icon={faTelegram} /> Telegram
                </NavDropdown.Item>
                <NavDropdown.Item href={Github} target="_blank">
                  <FontAwesomeIcon icon={faGithub} /> Github
                </NavDropdown.Item>
                {/* <NavDropdown.Item href='#'>
                  <FontAwesomeIcon icon={faLinkedin} /> Linkedin
                </NavDropdown.Item> */}
                <NavDropdown.Item href={Medium} target="_blank">
                  <FontAwesomeIcon icon={faMediumM} /> Medium
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="d-flex mobile-btn-cntnr">
              <Button className="reg-btn dark">COMMUNITY</Button>
              {address && chainId == ChainIds ? (
                <>
                  <Button className="reg-btn white" onClick={disconnect}>
                    {address?.slice(0, 7) + "..." + address?.slice(-6)}
                  </Button>
                </>
              ) : (
                <>
                  <ConnectWallet
                    welcomeScreen={{
                      title: "Maker Dao",
                    }}
                    className="reg-btn white"
                    btnTitle={"LAUNCH APP"}
                    switchToActiveChain={true}
                  />
                </>
              )}

            </div>
            <div className="line"></div>
            <div className="etc-amount">
              <p> ETC :</p>
              <p className="etc-balance">${ethAmount ? ethAmount : "0"}</p>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;

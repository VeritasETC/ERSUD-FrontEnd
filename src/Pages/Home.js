import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import FrequentlyQuestion from "../Components/FrequentlyQuestion";
import partner1 from "../Assets/Images/Wallets/wallet-1.png";
import partner2 from "../Assets/Images/Wallets/wallet-2.png";
import partner3 from "../Assets/Images/Wallets/wallet-3.png";
import partner4 from "../Assets/Images/Wallets/wallet-4.png";
import partner5 from "../Assets/Images/Wallets/wallet-5.png";
import partner6 from "../Assets/Images/Wallets/wallet-6.png";
import partner7 from "../Assets/Images/Wallets/wallet-7.png";
import userbg from "../Assets/Images/BG/bg-half-home.png";
import MintERUSD from "../Assets/Images/MintERUSD.jpg";
import Voting from "../Assets/Images/Voting.jpg";
import Utility from "../Assets/Images/Utility.jpg";

import feather1 from "../Assets/Images/BG/feather-up.png";
import feather2 from "../Assets/Images/BG/feather-down.png";
import logo from "../Assets/Images/Logo/logo-white.png";
import RoadMap from "../Assets/Images/BG/Batch.png";
import bg from "../Assets/Images/BG/bg.png";
import BuyEursd from "../Components/BuyEursd";
import {
  balanceTotalCollateral,
  totalSupply,
  userCount,
} from "../utils/Web3/metamask";
import addresses, { ERUSDToken } from "../Const/const";
import { vault } from "../Const/const";
import { ETHJoin } from "../Const/const";

function Home({
  address,
  liquidationAssest,
  ErusdAssest,
  EthAssest,
  handleArray,
  percentageeth,
  scrollToFaq,
  scrollToDis,
  scrollToWork,
  ethAmount,
}) {
  const [ersudCircular, setErsudCircular] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalColletral, settotalColletral] = useState(0);
 
  useEffect(() => {
    if (address) {
      UserCount();
      TotalSupply();
      balanceCollateral();
    }
  }, [address,ersudCircular,totalUser,totalColletral]);
  useEffect(()=>{
   if (!address) {
    setErsudCircular(0)
    setTotalUser(0)
    settotalColletral(0)
   }

  },[address])
  
  const balanceCollateral = () => {
    try {
      balanceTotalCollateral(addresses.ETHJoin).then((x) => {
        settotalColletral(x);
      });
    } catch (error) {
      return;
    }
  };
  const UserCount = () => {
    try {
      userCount(addresses.vault).then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        if (!isNaN(decimalResult)) {
          setTotalUser(decimalResult);
        }
      });
    } catch (error) {
      return;
    }
  };

  const TotalSupply = () => {
    try {
      totalSupply(addresses.ERUSDToken).then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        const EthResult = decimalResult / 10 ** 18;
        setErsudCircular(EthResult);
      });
    } catch (error) {
      return;
    }
  };
  const aboutRef = useRef(null);

  return (
    <>
      <header>
        <Container>
          <Row>
            <Col xl="12" lg="12">
              <BuyEursd
                address={address}
                EthAssest={EthAssest}
                ErusdAssest={ErusdAssest}
                liquidationAssest={liquidationAssest}
                handleArray={handleArray}
                TotalSupply={TotalSupply}
                UserCount={UserCount}
                balanceCollateral={balanceCollateral}
                percentageeth={percentageeth}
                ethAmount={ethAmount}
              />
            </Col>
          </Row>
        </Container>
      </header>
      {/* Total Panel */}
      <Container className="roadmap-container" fluid>
        <Row>
          <Container>
            <Row>
              <Col xl="12" lg="12" className="text-center">
                <div className="total-ammount-pnl">
                  <div className="total-post left-pnl">
                    <div
                      className="bg-layer"
                      style={{ backgroundImage: `url(${userbg})` }}
                    ></div>
                    <img src={logo} alt="logo" />
                    <h1>{totalUser ?? "0"}</h1>
                    <p>Total Users</p>
                  </div>
                  <div className="right-pnl">
                    <div className="total-post small">
                      <div
                        className="bg-layer"
                        style={{ backgroundImage: `url(${feather1})` }}
                      ></div>
                      <h2>{ersudCircular ? ersudCircular : "0"}</h2>
                      <p>ERUSD in Circulation</p>
                    </div>
                    <div className="total-post small">
                      <div
                        className="bg-layer"
                        style={{ backgroundImage: `url(${feather2})` }}
                      ></div>
                      <h2>
                        {totalColletral
                          ? parseFloat(totalColletral).toFixed(4)
                          : "0"}
                      </h2>
                      <p>Total Collateral</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xl="12" lg="12" ref={scrollToDis}>
                <div className="roadmap-panel">
                  <div className="text-center">
                    <img
                      src={RoadMap}
                      alt="Rodamap"
                      className="mobile-view-display road-img"
                    />
                    <h4>Road Map</h4>
                    <div className="spacer-30"></div>
                  </div>
                  <div className="road-map-post-cntnr">
                    <span></span>
                    <span></span>
                    <span></span>
                    <img
                      src={RoadMap}
                      alt="Rodamap"
                      className="web-view-display"
                    />
                    <div className="roadmap-post">
                      <div className="roadmap-post-inner">
                        <h5>
                          Q1: Statement for quarter one goals and ambitions
                        </h5>
                        <ul className="dot-list">
                          <li>
                            This quarter we want to focus on developing our
                            stablecoin ERUSD (ETC Reserve USD). We plan to have
                            a MVP (Minimum Viable Product) for the stablecoin
                            nearing the end of quarter 1 of 2024.
                          </li>
                          <li>Oracle</li>
                          <li>Planned Interview's</li>
                          <div id="aboutSection"></div>
                          <li>Jade Release date</li>
                          <li>Planned Interview's</li>
                          <li>Jade Auction</li>
                          <li>Quarterly Spending Report</li>
                          <li>Quarterly Progress Report</li>
                        </ul>
                      </div>
                    </div>
                    <div className="roadmap-post revers">
                      <div className="roadmap-post-inner">
                        <h5>
                          Q2: Statement for quarter one goals and ambitions
                        </h5>
                        <ul className="dot-list">
                          <li>
                            This quarter we want to focus on cleaning up any
                            loose ends for our stablecoin ERUSD (ETC Reserve
                            USD). We want to make sure that there is no secuirty
                            flaws which could cause vunerabilities in the
                            system, we are also wanting to have the audits for
                            the Stablecoin completed by the end of quarter 2 of
                            2024
                          </li>
                          <li>New Whitepaper</li>
                          <li>Audits</li>
                          <li>Set Up liquidity pools</li>
                          <li>Release Trailer for the DAO</li>
                          <li>Release How to guide for ERUSD</li>
                          <li>Release How to guide for DAO</li>
                          <li>Create Gitbook Page</li>
                          <li>Quarterly Spending Report</li>
                          <li>Quarterly Progress Report</li>
                        </ul>
                      </div>
                    </div>
                    <div className="roadmap-post">
                      <div className="roadmap-post-inner">
                        <h5>
                          Q3: Statement for quarter one goals and ambitions
                        </h5>
                        <ul className="dot-list">
                          <li>
                            This quarter we want to if we have not already by
                            this time begin to clear up the legality side of our
                            stablecoin ERUSD (ETC Reserve USD). We do not want
                            to put the users at risk of being scrutinized by the
                            by the laws of the EU or United States.
                          </li>
                          <li>Setup Medium Articles</li>
                          <li>
                            Release the VTS governance token similar to
                            MakerDAO's MKR token.
                          </li>
                          <li>Discuss with legal offices</li>
                          <li>
                            Setup the foundation and activly does work on the
                            ERUSD protocol
                          </li>
                          <li>Setup Marketplace for ERUSD NFT Memberships</li>
                          <li>Quarterly Spending Report</li>
                          <li>Quarterly Progress Report</li>
                        </ul>
                      </div>
                    </div>
                    <div className="roadmap-post revers">
                      <div className="roadmap-post-inner">
                        <h5>
                          Q4: Statement for quarter one goals and ambitions
                        </h5>
                        <ul className="dot-list">
                          <li>
                            This quarter will be the the final step in our work
                            for this regarding ERUSD. We are planning by this
                            time everything is completed for our protocol and is
                            more than able to be self sufficent from there we
                            will focus on building TVL and other products to
                            supplement usuage of our protocol.
                          </li>
                          <li>Complete Guide on the What, How, Why of ERUSD</li>
                          <li>Explore the Multi-Peg option for ERUSD</li>
                          <li>Planned Interviews</li>
                          <li>New Collaborations</li>
                          <li>Explore Bridging onto new chains</li>
                          <li>Quarterly Spending Report</li>
                          <li>Quarterly Progress Report</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      {/* Total Panel */}

      {/* How Dao Works */}
      <Container id='howDaoWroks' className="How-dao-works" fluid ref={scrollToWork}>
        <Row>
          <Container>
            <Row>
              <Col xl="12" lg="12" className="text-center">
                <h3>How Dao Works</h3>
              </Col>
              <Col xl="12" lg="12">
                <ul className="how-dao-works-list">
                  <li>
                    <img src={MintERUSD} alt="Mint ERUSD" />
                    <h4>Mint ERUSD</h4>
                    <h6>
                    Deposit ETC as collateral and generate ERUSD against it

                    </h6>
                  </li>
                  {/* <li>
                    <img src={Voting} alt="Voting" />
                    <h4>Voting</h4>
                    <h6>
                      Lorem ipsum dolor sit amet consectetur. Porta orci vitae
                      laoreet morbi. Vitae quis arcu donec nulla pellentesque
                      netus.
                    </h6>
                  </li> */}
                  <li>
                    <img src={Utility} alt="Utility" />
                    <h4>Utility </h4>
                    <h6>
                    Allows ERUSD users to store their assets on the Ethereum Classic blockchain in a stable format


                    </h6>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      {/* How Dao Works */}
      {/* Our Partner */}
      <Container className="Our-partner" fluid>
        <Row>
          <Container>
            <Row>
              <Col xl="12" lg="12" className="text-center">
                <h3>Our Partners</h3>
              </Col>
              <Col xl="12" lg="12">
                <div className="partner-list-container">
                  <ul className="partner-list">
                    <li>
                      <img src={partner1} alt="Partner" />
                    </li>
                    <li>
                      <img src={partner2} alt="Partner" />
                    </li>
                    <li>
                      <img src={partner3} alt="Partner" />
                    </li>
                    <li>
                      <img src={partner4} alt="Partner" />
                    </li>
                    <li>
                      <img src={partner5} alt="Partner" />
                    </li>
                    <li>
                      <img src={partner6} alt="Partner" />
                    </li>
                    <li>
                      <img src={partner7} alt="Partner" />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      {/* Our Partner */}
      {/* Frequently Asked Questions */}
      <Container className="frquent-question-panel" fluid ref={scrollToFaq}>
        <Row>
          <Container>
            <Row>
              <Col xl="12" lg="12" className="text-center"  id="frequently">
                <h3>Frequently Asked Questions</h3>
              </Col>
              <Col xl="12" lg="12">
                <div className="fr-question-cntnr">
                  <FrequentlyQuestion />
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      {/* Frequently Asked Questions */}
    </>
  );
}
export default Home;

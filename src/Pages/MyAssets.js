import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import userbg from "../Assets/Images/BG/bg-half-home.png";
import loader from "../Assets/Images/Dual_Ring-1.2s-177px.gif";
import BuyEursd from "../Components/BuyEursd";
import addresses, { APYContract, TransactionHistory, contractAddress, minutesToMilliseconds, vault } from "../Const/const";
import { APYFee, APY_CALCULATE, DEFAULT_COLLATERAL, WITHDRAW_APY_AMOUNT, erusdAssest, transactionhistorylenght } from "../utils/Web3/metamask";
import Pagination from "../Const/pagination";
import ProgressBar from "react-bootstrap/ProgressBar";
import Web3 from "web3";
import moment from "moment";
import Toast, { NotificationTypes, showNotification } from "../utils/Toast/toast";
import { PulseLoader } from "react-spinners";
import laoder from "../Assets/Images/laoder.gif";


const CONSTANT_COLLATERAL = 150;
function MyAssets({
  eth,
  erusd,
  colletral,
  colletrallimit,
  userAmount,
  userCreated,
  userType,
  address,
  UserTransaction,
  userlength,
  colletrallimitdollar,
}) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [percentagebar, setpercentagebar] = useState(0);
  const [percentagelenght, setpercentagelenght] = useState(0);
  const [usererusdAmount, setusererusdAmount] = useState(0);
  // const [defaultColletral, setdefaultColletral] = useState(null);
  const [apyAmount, setapyAmount] = useState(0);
  const [SellerusdFee, setSellErusdfee] = useState(0);
  const [loading, setLoading] = useState(false);

  const TransactionType = {
    DEPOSITED: 0,
    GENERATED: 1,
    WITHDRAW: 2,
    REPAID: 3,
    APY_WITHDRAW: 4,
    Fee_Collected:5
  };


  const DEFAULT_COLLATERAL_VALUE = () => {
    try {
      const web3 = new Web3(window.ethereum)
      DEFAULT_COLLATERAL(addresses.vault, address).then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        const EthResult = decimalResult / 10 ** 18;
        setusererusdAmount(EthResult)
      })

    } catch (error) {
    }
  };



  const DEFAULT_ERUSD_VALUE = () => {
    try {
      const web3 = new Web3(window.ethereum)
      erusdAssest(addresses.vault, address).then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        const EthResult = decimalResult / 10 ** 18;
        const final_colletral = (usererusdAmount / EthResult) * 100
        // setdefaultColletral(final_colletral)
      })

    } catch (error) {
    }
  };



  useEffect(() => {
    // Initial call
    APY_CALCULATE_VALUE();

    // Set interval to update every minute
    const interval = setInterval(() => {
      APY_CALCULATE_VALUE();
    }, minutesToMilliseconds); // 1 minute

    return () => clearInterval(interval);
  }, [address, colletral]);



  const APY_CALCULATE_VALUE = () => {
    try {
      const web3 = new Web3(window.ethereum)
      APY_CALCULATE(addresses.APYContract, address).then((x) => {
        if (x) {
          const apyResult = parseInt(x[0]?._hex, 16);
          const finalapyResult = apyResult / 10 ** 18;
          setapyAmount(finalapyResult)
        }
      })

    } catch (error) {
    }
  };



  const APY_WITHDRAW = async () => {
    if (apyAmount <= 0) { // Check if apyAmount is zero or less than zero
      showNotification( "You have no APY",NotificationTypes.ERROR)
      setLoading(false);

      return
    }
    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      await WITHDRAW_APY_AMOUNT(addresses.contractAddress)
      showNotification("Transaction has been confirmed", NotificationTypes.SUCCESS);

      let previousAmount = apyAmount;
      
      const interval = setInterval(async () => {
        try {
          await APY_CALCULATE_VALUE();
          
          if (apyAmount !== previousAmount) {
            clearInterval(interval);
          }
          
          previousAmount = apyAmount;
        } catch (error) {
          // Log error from APY_CALCULATE_VALUE
          // Handle error from APY_CALCULATE_VALUE
        }
      }, 2000);
    } catch (error) {
      showNotification("Transaction has been rejected", NotificationTypes.ERROR);
    } finally {
      setLoading(false); // Stop loader in all cases
    }
    
  };



  useEffect(() => {
    DEFAULT_COLLATERAL_VALUE()
    DEFAULT_ERUSD_VALUE()
    // showbarcal()
    if (address) {

      Apyfee()
    }
    else {
      setpercentagebar(0)
    }
  }, [colletral, colletrallimit, usererusdAmount, address])


  useEffect(() => {
    const interval = setInterval(() => {
      showbarcal();
    }, 3000);

    return () => clearInterval(interval); 
  }, [colletral, colletrallimit]);


  const showbarcal = () => {
    const distance = Math.abs(colletral - colletrallimit);
    const maxDistance = Math.abs(CONSTANT_COLLATERAL - colletrallimit);
    let progressPercentage;
    if (colletral == 0) {
      progressPercentage = 0;
    }
    else if (colletral < colletrallimit && colletrallimit && colletral) {
      progressPercentage = 100;
    } else if (colletral >= 150) {
      progressPercentage = 0;

    } else {
      progressPercentage = ((maxDistance - distance) / maxDistance) * 100;
    }
    setpercentagebar(parseFloat(progressPercentage));

  }


  const Apyfee = async (address) => {
    APYFee(addresses.APYContract)
      .then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        const EthResult = decimalResult / 10 ** 18;

        setSellErusdfee(EthResult * 365);
      })
      .catch((err) => { });
  };



  useEffect(() => {
    setIsLoading(true);

    UserTransaction(page - 1)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [page, userlength, apyAmount]);



  const handlePageChange = (page) => {
    UserTransaction(page - 1);

    setPage(page);
  };
  useEffect(() => {
    if (!address ) {
      setapyAmount(0);
      setSellErusdfee(0)
    
    }
  }, [address]);

  return (
    <>
      <Container className="inner-page myasset-page" fluid>
        <Row>
          <Container>
            <Row>
              <Col xl="12" lg="12">
                <h4>My Assets</h4>
                <div className="spacer-50 mobile-hide"></div>
              </Col>
              {loading&& (
        <div className="full-screen-loader">
                      <img src={laoder} alt="" className="loader-spinner"  />
        </div>
      )}
              <Col xl="3" lg="3" md="6" sm='6'>
                <div className="assets-post mid">
                  <div
                    className="bg-layer"
                    style={{ backgroundImage: `url(${userbg})` }}
                  ></div>
                  <h1>{!erusd ? 0 : parseFloat(erusd)}</h1>
                  <p>Total ERUSD Borrow</p>
                </div>
              </Col>
              <Col xl="3" lg="3" md="6" sm='6'>
                <div className="assets-post mid">
                  <div
                    className="bg-layer"
                    style={{ backgroundImage: `url(${userbg})` }}
                  ></div>
                  <span>
                    ETC Value $: <t>{!colletrallimitdollar ?0 :colletrallimitdollar.toFixed(4)}</t>
                  </span>
                  <h1>{!eth ? 0 : parseFloat(eth).toFixed(4)}</h1>
                  <p>Total Deposit ETC </p>
                </div>
              </Col>
              <Col xl="3" lg="3" md="6" sm='6'>
                <div className="assets-post mid">
                  <div
                    className="bg-layer"
                    style={{ backgroundImage: `url(${userbg})` }}
                  ></div>
                  <span>
                    Liq Limit: <t>{colletrallimit}%</t>
                  </span>
                  <h1>{colletral ?? "0"}%</h1>
                  <p>Collateral Ratio</p>
                  <div className="spacer-20"></div>
                  <div className="progress-bar1">
                    <ProgressBar now={percentagebar ? percentagebar : 0} />
                  </div>
                  <div className="progress-lenght text-left w-100">
                    <p>
                      {percentagebar
                        ? parseFloat(percentagebar).toFixed(2)
                        : "0"}
                      %
                    </p>
                  </div>
                </div>
              </Col>

              <Col xl="3" lg="3" md="6" sm='6'>
                <div className="assets-post mid">
                  <div
                    className="bg-layer"
                    style={{ backgroundImage: `url(${userbg})` }}
                  ></div>
                  <span>
                    APY Percentage: <t>{SellerusdFee}%</t>
                  </span>
                  <h1 className="d-flex align-items-end">{parseFloat(apyAmount).toFixed(6) ?? 0} </h1>
                   <p>ETC APY Rewards </p>
                 
            
                 
                      <Button   disabled={ !address} onClick={APY_WITHDRAW} className="reg-btn  w-100">Claim Reward</Button>
                    
                    
                    
      

                </div>
              </Col>
              <Col xl="12" lg="12">
                <h4>CDP History</h4>
              </Col>
              <Col xl="12" lg="12">
                <div className="histroy-table-container">
                  <div className="histroy-table-container-inner">
                    <Table className="history-table">
                      {
                        !isLoading ? (
                          <tbody>
                            { userlength > 0 ? (
                              userAmount.map((amount, index) => (
                                <tr key={index}>
                                  <td>
                                    <p>{userCreated && userCreated[index] ? userCreated[index].toLocaleString() : ""}</p>
                                    <h6>
                                      {
                                        userType &&
                                        (
                                          userType[index] === TransactionType.GENERATED ? "Generated" :
                                          userType[index] === TransactionType.Fee_Collected ? " Fee Collected" :
                                            userType[index] === TransactionType.WITHDRAW ? "Withdraw" :
                                              userType[index] === TransactionType.REPAID ? "Repaid" :
                                                userType[index] === TransactionType.APY_WITHDRAW ? "APY Withdraw" :
                                                  "Deposited"
                                        )
                                      }

                                      {""}   {parseFloat(amount).toFixed(5)} {userType && userType[index] === TransactionType.GENERATED ? "ERUSD " : "ETC"} from your CDP{" "}
                                    </h6>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="2">No Transaction</td>
                              </tr>
                            )}
                          </tbody>
                        ) : (
                          <div className="loader-container">
                            <img src={loader} alt="Loading..." className="loader" />
                          </div>
                        )
                      }



                    </Table>
                    {userlength > 0 && (
                      <Col xl="12" lg="12" md="12">
                        <div className="text-center">
                          <div className="pag">
                            <Pagination
                              currentPage={page}
                              itemsPerPage={5}
                              totalItems={userlength} // Assuming 'length' is the total number of items
                              onPageChange={handlePageChange}
                            />
                          </div>


                          <div className='spacer-20'></div>
                        </div>
                      </Col>
                    )}

                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}
export default MyAssets;

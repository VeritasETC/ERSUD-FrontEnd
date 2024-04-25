import React, { useEffect, useRef, useState } from "react";
import { Button, Tab, Tabs, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import coin1 from "../Assets/Images/Token_01.png";
import coin2 from "../Assets/Images/Token_02.png";
import coin3 from "../Assets/Images/Token_03.png";
import laoder from "../Assets/Images/laoder.gif";
import Logo from "../Assets/Images/Logo/Logo.png";
import svg from "../Assets/Images/MakerDao_logo_02 2.svg";
import info from "../Assets/Images/Group 314.svg";
import hexagone from "../Assets/Images/MakerDao_logo_02 2.png";
import hexagone1 from "../Assets/Images/MakerDao_logo_02 3.png";
import Toast, { NotificationTypes, showNotification } from "../utils/Toast/toast";
import Web3 from "web3";
import { contract_api } from "../utils/Web3/actions_abi";
import validator from "validator";
import addresses, { contractAddress, APYContract, getRate, colletralratiovalue, PRECISION, SOME_VALUE } from "../Const/const";
import { BigNumber } from 'bignumber.js';
import { DEFAULT_COLLATERAL, ETC_AMOUNT } from "../utils/Web3/metamask";


import {
  APYFee,
  APY_CALCULATE,
  getERUSDCalculatedAmount,
  getETHCalculatedAmount,
  getbalanceOf,
  lockAndDraw,
  minCollateralRatio,
  stabilityFee,
  withdrawCollateral,
} from "../utils/Web3/metamask";
import { ERUSDToken } from "../Const/const";
import { getBalance } from "../utils/Web3/metamask";
import PulseLoader from "react-spinners/PulseLoader";
import { ChainIds } from "../Const/const";
import { MyWeb3URL } from "../Const/const";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useChainId,
  useDisconnect,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";



function BuyEursd({
  ErusdAssest,
  EthAssest,
  liquidationAssest,
  handleArray,
  balanceCollateral,
  UserCount,
  TotalSupply,
  percentageeth,
  ethAmount,
}) {
  const MyWeb3 = new Web3.providers.HttpProvider(MyWeb3URL);
  const [copied, setCopied] = useState(false);
  const [erusd, setErusd] = useState("");
  const [Sellerusd, setSellErusd] = useState("");
  const [colletral, setColletral] = useState("");
  const [colletralErr, setColletralErr] = useState("");
  const [erusdErr, setErusdErr] = useState("");
  const [spin, setSpin] = useState(false);
  const [loader, setLoader] = useState(false);
  const [sellerusdErr, setSellErusdErr] = useState("");
  const [ethResult, setethResult] = useState("");
  const [erusdFee, setErusdfee] = useState("");
  const [SellerusdFee, setSellErusdfee] = useState(0);
  const [AnualFeeErusd, setAnualFeeErusd] = useState("");
  const [SumErusd, setSumErusd] = useState("");
  const [BuyErusd, setBuyErusd] = useState("");
  const [stabilityfee, setstabilityfee] = useState("");
  const [balance, setbalance] = useState("");
  const [balanceErr, setbalanceErr] = useState("");
  const [balanceOf, setbalanceOf] = useState("");
  const [Etcbalance, setEtcbalance] = useState("");

  const [apyAmount, setapyAmount] = useState(0);
  const chainId = useChainId();
  const isWrongBlockcahin = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const []
  // setTransaction

  const addressRef = React.createRef();


  const address= useAddress()
  useEffect(()=>{
  },[ethAmount])
  //                            Copy Address
  const handleCopyClick = () => {
    const addressText = address;

    if (addressText) {
      navigator.clipboard.writeText(addressText);
      setCopied(true);
      showNotification("Address Copied",NotificationTypes.SUCCESS);

      // Reset copied state after a short delay
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  //                            Input ERUSD
  useEffect(() => {
    APY_CALCULATE_VALUE()
  },)
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

  const handleErusdChange = async (e) => {
    if (!ethAmount) {
      return;
    }
    const numericValue = e.target.value;
    const input = numericValue.replace(/[^\d.]/g, ""); // Allow digits and dot

    if (input.split(".").length > 2) {
      return;
    }

    if (balance <= 0) {
      // Assuming balance is a variable accessible within this scope
      return;
    }
   
    if (input.length > 9) {
      return;
    }

    setErusd(input);
    const floatValue = parseFloat(input);

    if (floatValue <= 0 || floatValue < 0.01) {
      setErusdErr("ERUSD Amount must be  at least 0.01");
      setSumErusd('')
      return;
    } else {
      setErusdErr("");
    }
    try {
      const web3 = new Web3(window.ethereum);

     const respone = await getRate()



    

      const value=input*colletral/100

const ethe= (value / ethAmount);
const finalresult = (ethe *stabilityfee)
const lastresult = finalresult/100
const result = lastresult+SOME_VALUE
      const SumofErusd =   (result+ethe);

      if (ethAmount) {
        setethResult(ethe);
        setErusdfee(result);
        setSumErusd(SumofErusd);
        setBuyErusd(input);
        setEtcbalance(ethAmount)

      }
    } catch (error) { }
    // }
  };
  useEffect(() => {
    if (!ethAmount || !erusd) {
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const value=(erusd*colletral)/100

      const ethe= (value / ethAmount);
      const finalresult = (ethe * stabilityfee)
      // console.log("dffd",stabilityfee)
      const lastresult = finalresult/100
      const result = lastresult+SOME_VALUE
            const SumofErusd =  (result+ethe);
// 
  
      setethResult(ethe);
      setErusdfee(result);
      setSumErusd(SumofErusd);
      setBuyErusd(erusd);
      setEtcbalance(ethAmount)
    } catch (error) {
      // Handle error
    }
  }, [ethAmount, stabilityfee, colletral, erusd]);
  //                            Input Colletral
  const handleColletralChange = async (e) => {
    const input = e.target.value; // Only allow numbers, plus, and minus signs
    const numericValue = input.replace(/[^\d]/g, "");
    if (numericValue.length > 9) {
      return;
    }

    setColletral(`${numericValue}`);

    if (parseFloat(numericValue) < 150 || numericValue == "") {
      setColletralErr("Collateral ratio must be greater than 150%");
      setethResult("");
      setErusdfee("");
      setSumErusd("");
      setBuyErusd("");
      return;
    } else {
      try {
        const web3 = new Web3(window.ethereum);
        const amountInWei = web3.utils.toWei(erusd, "ether");
        const result = await getETHCalculatedAmount(
          addresses.contractAddress,
          amountInWei,
          numericValue
        );
        const decimalResult = parseInt(result?._hex, 16);
        const EthResult = decimalResult / 10 ** 18;
        const ErusdFee = EthResult * 0.04;
        const SumofErusd = EthResult + ErusdFee;

        if (result) {
          setethResult(EthResult);
          setErusdfee(ErusdFee);
          setSumErusd(SumofErusd);
          // setBuyErusd(sanitizedInput);
          setColletralErr("");
        }
      } catch (error) { }
    }
  };

 
    const fetchDataSell = async () => {
        if (!balanceOf) {
            setAnualFeeErusd('');
            return;
        }
        try {
            const web3 = new Web3(window.ethereum);
            const result = await DEFAULT_COLLATERAL(addresses.vault, address);

            if (result) {
                const decimalResult = parseInt(result?._hex, 16);

                const EthResult = decimalResult / 10 ** 18;
                const percentAnnualFee= EthResult/ethAmount
                const finalResults =percentAnnualFee+apyAmount
                setAnualFeeErusd(finalResults);

            }
        } catch (error) {
            setAnualFeeErusd('');
        }
    };
    useEffect(() => {
    fetchDataSell();
}, [ balanceOf,ethAmount]);
    const fetchData = async () => {
      if (!address || chainId !== ChainIds) {
        setbalance("");
        setSellErusd('');
        return;
      }
  
      try {
        const web3 = new Web3(window.ethereum);
        const x = await minCollateralRatio(addresses.contractAddress);
        setColletral(x);
      } catch (error) {
        // Handle error if needed
      }
    };
    useEffect(() => {
        fetchData();
    }, [address]);


  const buyErusd = async () => {
    if (!address) {
        showNotification("Please Connect with Wallet", NotificationTypes.ERROR);
        setLoader(false);
        return;
    }
    if (erusd <= 0 || erusd < 0.01||erusd === '.') {
        showNotification("ERUSD Amount is not valid", NotificationTypes.ERROR);
        setSpin(false);
        return;
    }
    if (!Etcbalance) {
      setSpin(false);
      return;
  }
    setSpin(true);
    try {
        const web3 = new Web3(window.ethereum);
         await lockAndDraw(
            addresses.contractAddress,
            web3.utils.toWei(erusd, "ether"),
            colletral,
            SumErusd,
            // web3.utils.toWei(SumErusd.toFixed(6), "ether"),
             
        );
        // Successful transaction
        showNotification("Transaction has been confirmed", NotificationTypes.SUCCESS);
        // State updates and other actions
        setSumErusd('');
        setethResult('');
        setErusdfee('');
        setErusd('');
        setBuyErusd('');
        GetBalance(address);
        fetchData();
        EthAssest();
    } catch (error) {
      setSpin(false);

        showNotification("Transaction has been rejected", NotificationTypes.ERROR);
    } finally {
        // Regardless of success or failure, set the loader state to false
        setSpin(false);
    }
  }
  //                            GetBalance
  const GetBalance = async (address) => {
    if (chainId != ChainIds) {
      setbalance("")
      setErusd('')
      return;
  }
    getBalance(address)
      .then((x) => {
        const balance = x;
        setbalance(balance);
      })
      .catch((err) => { });
  };
  //                            GetBalanceErusd
  const GetBalanceErusd = async (ERUSDToken, address) => {
    if (chainId != ChainIds) {
      setbalanceOf("")
      setSellErusd('')
      return;
  }
    getbalanceOf(addresses.ERUSDToken, address)
      .then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        const EthResult = decimalResult / 10 ** 18;
        setbalanceOf(EthResult);
      })
      .catch((err) => { });
  };
  //                            Sell Erusd
  const sellErusd = async () => {
    setLoader(true);

    if (!address) {
      showNotification( "Please Connect with Wallet",NotificationTypes.ERROR);
      setLoader(false);
      return;
    }

   
    if (!balanceOf) {
      showNotification("ERUSD Amount is not valid",NotificationTypes.ERROR);
      setLoader(false); // Set spinner to false if validation fails
      return;
    }
    const web3 = new Web3(window.ethereum);
    withdrawCollateral(addresses.contractAddress)
      .then(() => {
        showNotification("Transaction has been confirmed", NotificationTypes.SUCCESS);
        setSellErusd('');
        setAnualFeeErusd("");   
        GetBalance(address);
        EthAssest()
        setLoader(false);
        // setSellErusd('')

      })
      .catch((err) => {
        showNotification("Transaction has been rejected", NotificationTypes.ERROR);
        setLoader(false);
      }).finally(() => {
        setLoader(false);
      })
  };

  const Apyfee = async (address) => {
    APYFee(addresses.APYContract)
      .then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        const EthResult = decimalResult / 10 ** 18;

        setSellErusdfee(EthResult * 365);
      })
      .catch((err) => { });
  };
  //                           Set Satability Fee
  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    stabilityFee(addresses.contractAddress)
      .then((x) => {
        const decimalResult = parseInt(x?._hex, 16);
        setstabilityfee(decimalResult);
      })
      .catch(() => { });
  }, []);
  //                            Set Colletral Ratio
  useEffect(() => {
    if (!balance || balance === "0" || balance === "0." || !address) {
      setErusd('');
      setethResult("");
      setErusdfee("");
      setSumErusd("");
      setSellErusd("");
      setbalance('')
    }
  }, [balance ,address]);
 

  useEffect(() => {
    if (address) {
      const balanceInterval = setInterval(() => {
        GetBalance(address);
      }, 1000);
  
      const erusdBalanceInterval = setInterval(() => {
        GetBalanceErusd(addresses.ERUSDToken, address);
      }, 1000);
  
      return () => {
        clearInterval(balanceInterval);
        clearInterval(erusdBalanceInterval);
      };
    }
  }, [address, chainId,balance]);
  

  //                             Set APYFee of contractAddress
  useEffect(() => {
    Apyfee();
  }, [address]);
  const resetStates = () => {
    setSellErusd('');
    setbalanceErr('');
    setSellErusdErr('');
    setErusd('');
    setethResult('');
    setErusdfee('');
    setSumErusd('');
    setAnualFeeErusd('');
    setErusdErr('')
    if (!address) {
      setbalanceOf('');
    }
  };
  useEffect(() => {
    if (!balanceOf || balanceOf === "0" || balanceOf === "0." || !address ||chainId != ChainIds) {
      resetStates();
    }
  }, [balanceOf, address,chainId]);
  

  const initialTab = localStorage.getItem("activeTab") || "UseErusd";
  const [key, setKey] = useState(initialTab);

  useEffect(() => {
    localStorage.setItem("activeTab", key);
  }, [key]);
  
  useEffect(() => {
    if (balance < SumErusd) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [balance, SumErusd]);

  return (
    <>
      {/* <MyAssets balance={balance} /> */}
      <div className="buyerusd-pnl" id="myHome">
      
        <span>
          <img src={coin1} alt="Coin" />
        </span>
        <span>
          <img src={coin2} alt="Coin" />
        </span>
        <span>
          <img src={coin3} alt="Coin" />
        </span>
        {(spin ||loader)&& (
        <div className="full-screen-loader">
                      <img src={laoder} alt="" className="loader-spinner"  />
        </div>
      )}
        <div className="tab-cntn">
          <img className="hex-img" src={svg} alt="hexagone" />
          {/* <svg/> */}
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 gap-2"
          >
            <Tab eventKey="UseErusd" title="Use ERUSD">
              <div className="spacer-20"></div>
              <div className="flex-div-xs">
                <div className="d-inline-flex">
                  <p className="m-0">
                    <b ref={addressRef} className=" wallet-tag">
                      {address && chainId == ChainIds
                        ? `${address?.slice(0, 7)}...${address?.slice(-6)}`
                        : "Not Connected With Wallet"}
                    </b>
                  </p>
                  {address && chainId == ChainIds &&
                   (
                    <div className="icon" onClick={handleCopyClick}>
                      <FaCopy />
                    </div>
                  )}
                </div>
                <p className="m-0 ethbalance">
                  <b>ETC Balance: {(!balance) ? 0 : parseFloat(balance).toFixed(4)}</b>
                </p>
              </div>
              <hr></hr>
              <div className="spacer-30"></div>
              <div className="flex-div align-items-center">
                <h4 className="small">
                  <img src={svg} alt="hexagone" /> 
                  
                  ERUSD
                </h4>
                <input
                disabled={spin} 
                  type="text"
                  placeholder="0.00"
                  value={balance == "0" ? "0" : erusd}
                  className="erusd-field"
                  onChange={handleErusdChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !erusdErr && balance >= SumErusd && SumErusd != 0 &&ethResult!=0 &&erusdFee!=0) {
                      buyErusd();
                    }
                  }}
                />
              </div>
              {erusdErr && <p className="err-msg">{erusdErr}</p>}
              <div className="spacer-10"></div>
              <div className="flex-div align-items-center">
                <h4 className="big">Collateral Ratio</h4>
                <input
                disabled={spin} 
                  type="text"
                  placeholder="0"
                  className="erusd-field"
                  value={`${colletral}`} // Fix the variable name here
                  onChange={handleColletralChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !erusdErr && balance >= SumErusd && SumErusd != 0 &&ethResult!=0 &&erusdFee!=0) {
                      buyErusd();
                    }
                  }}
                />
                <div class="percentVal" style={{ fontSize: "30px" }}>
                  <b>%</b>{" "}
                </div>
              </div>
              {colletralErr && <p className="error-text">{colletralErr}</p>}
              <div className="spacer-20"></div>
              <hr className="mb-3"></hr>
              <div className="flex-div">
                <p className="mb-2">
                  <b>ETC amount:</b>
                </p>
                <p className="mb-2">
                  <b>
                    {ethResult
                      ? Number(ethResult)
                        .toFixed(4)
                        .replace(/\.?0+$/, "")
                      : "0.00"}
                  </b>
                </p>
              </div>
              <div className="flex-div">
                <p className="mb-3">
                  <b>Buy ERUSD fee:</b>
                </p>
                <p className="mb-3">
                  <b>{erusdFee ? parseFloat(erusdFee).toFixed(6) : "0.00"}</b>
                </p>
              </div>
              <hr></hr>
              <div className="text-center mt-3 mb-4 ">
                <div className="EtcBalance">
                <p className="payable">You will have to pay {SumErusd ? Number(SumErusd).toFixed(PRECISION).replace(/\.?0+$/, '') : "0"} ETC to buy {erusd || "0"}  ERUSD</p>
                <div className="info">
                <div className="inner-info">
                <img src={info} alt="pic" />
                      <div className="title-info">The price of ETC could fluctuate by up to 1 percent </div>
                </div>
              </div>
                </div>
                
                
               
                {(balance < SumErusd) && <p style={{ color: "red" }}>Insuffient balance</p>}

                {
                  spin ? (
                    <Button className="reg-btn-buy dark w-100">
                      {/* <div className="static-spans">
                        <PulseLoader
                          color={'#D9D9D9'}
                          size={15}
                          margin={2}
                        />
                      </div> */}
                                              BUY ERUSD
                    </Button>
                  ) :
                    (
                      <Button className="reg-btn1 dark w-100" disabled={isButtonDisabled || (colletral < colletralratiovalue) ||!balance ||erusdErr   } onClick={buyErusd} >
                                                BUY ERUSD
                      </Button>
                    )
                }


              </div>
              
            </Tab>
            <Tab eventKey="Sell" title="Sell">
              <div className="spacer-20"></div>
              <div className="flex-div-xs">
                <div className="d-inline-flex">
                  <p className="m-0">
                    <b ref={addressRef} className="m-0 wallet-tag">
                      {address && chainId == ChainIds 
                        ? `${address?.slice(0, 7)}...${address?.slice(-6)}`
                        : "Not Connected With Wallet"}
                    </b>
                  </p>
                  {address && chainId == ChainIds && (
                    <div className="icon" onClick={handleCopyClick}>
                      <FaCopy />
                    </div>
                  )}
                </div>
                <p className="m-0 ethbalance" style={{ color: "black" }}>
                  <b>
                    ERUSD Balance:{" "}
                    {balanceOf
                      ? Number(balanceOf)
                        .toFixed(4)
                        .replace(/\.?0+$/, "")
                      : "0"}
                  </b>
                </p>
              </div>
              <hr></hr>
              <div className="spacer-30"></div>
              <div className="flex-div align-items-center">
                <h4 className="small">
                  <img src={svg} alt="hexagone" /> ERUSD
                </h4>
                <input
                  type="text"
                  placeholder="0.00"
                  readOnly
                  // value={Sellerusd}
                  value= {balanceOf
                    ? Number(balanceOf)
                      .toFixed(4)
                      .replace(/\.?0+$/, "")
                    : "0.00"}
                  className="erusd-field"
                  // onChange={handleSellChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter'&&!sellerusdErr &&!balanceErr) {
                      sellErusd();
                    }
                  }}
                />
                        {/* <input                   className="erusd-field"
  value={balanceOf} /> */}

              </div>
              {sellerusdErr && <p className="err-msg">{sellerusdErr}</p>}
              {/* <div className="spacer-20"></div> */}
              <hr className="mb-3"></hr>
              <div className="flex-div">
                <p className="mb-3">
                  <b>APY:</b>
                </p>
                <p className="mb-3">
                  <b>{SellerusdFee ? `${SellerusdFee}%` : "0"} </b>
                </p>
              </div>
              <hr></hr>
              <div className="text-center mt-3 mb-4">
                {
                  balanceErr ? (
                    <p style={{ color: "red" }}>{balanceErr}</p>
                  ) : (
                    <p>You will Get {(parseFloat(AnualFeeErusd).toFixed(4) !== 'NaN' ? parseFloat(AnualFeeErusd).toFixed(4) : '0.0000')} ETC</p>

                  )
                }

                {
                  loader ? (
                    <Button className="reg-btn-buy dark w-100">
                      {/* <div className="static-spans">

                        <PulseLoader
                          color={'#D9D9D9'}
                          size={15}
                          margin={2}
                        />
                      </div> */}
                      SELL ERUSD

                    </Button>
                  ) : (
                    <Button className="reg-btn1 dark w-100" disabled={(Sellerusd > balanceOf) ||!balanceOf ||sellerusdErr || !AnualFeeErusd ||!ethAmount} onClick={sellErusd}>SELL ERUSD</Button>
                  )
                }
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default BuyEursd;

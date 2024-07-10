import React, { useEffect, useState,useRef } from "react";
import "./Assets/Scss/App.scss";
import { Route, Routes ,useNavigate} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import MyAssets from "./Pages/MyAssets";
import { Usertransactionhistory, transactionhistorylenght, connectToMetamask, erusdAssest, ethAssest, liquidation_amount, getAmountpercentage, liquidation_amountLimit } from "./utils/Web3/metamask";
import Web3 from "web3";
import addresses, { Liquidation, TransactionHistory, getRate, oraclePrice, vault } from "./Const/const";
import moment from "moment"
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useChainId,
  useDisconnect,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
const { ethers } = require("ethers");

function NotFound() {

  return (
    <div className="pagenotfound">
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
function Router() {
  const nav  = useNavigate()

  const faqRef = useRef(null);

  const scrollToFAQ = () => {
    nav('/');

    setTimeout(() => {

      if (faqRef.current) {
        faqRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); 
  };
  const disRef = useRef(null);

  const scrollToDis = () => {
    nav('/');

    setTimeout(() => {

      if (disRef.current) {
        disRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); 
  };
  const HowTowork = useRef(null);

  const scrollToWork = () => {
    nav('/');

    setTimeout(() => {

      if (HowTowork.current) {
        HowTowork.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); 
  };
  
  const address= useAddress()
    const [colletrallimit, setColletrallimit] = useState(0)
    const [ethAmount, setEthAmount] = useState(0);
  const [colletrallimitdollar, setColletrallimitdollar] = useState(0)
  const [colletral, setColletral] = useState(0)
  const [erusd, setErusd] = useState('')
  const [userAmount, setuserAmount] = useState([])
  const [userCreated, setuserCreated] = useState([])
  const [userType, setuserType] = useState([])
  const [Transactionslenght, setTransactionslenght] = useState('')
  const [eth, setETH] = useState('')
  const [loader, setloader] = useState(false)

  useEffect(() => {
    if(address){
    ErusdAssest()
    EthAssest()
    // percentageeth()
    }
  }, [address,eth])
  useEffect(() => {
    if(address){
      const interval = setInterval(() => {
        liquidationAssest();
      }, 3000);
  
      return () => clearInterval(interval); 
    }
  }, [colletral,address,eth,colletrallimit])

  const liquidationAssest = () => {
    liquidation_amount(addresses.Liquidation, address).then((x) => {
      // const limitResult = parseInt(x[1]?._hex, 16);
      const colletralResult = parseInt(x?._hex, 16);
      const finalresult= colletralResult / 10 ** 18
      setColletral(finalresult)
      
      liquidation_amountLimit(addresses.Liquidation, address).then((limitX) => {
        const limitFetchResult = parseInt(limitX?._hex, 16);
        const finalLimit = limitFetchResult / 10 ** 18;
        setColletrallimit(limitFetchResult)
      }).catch((error) => {
        console.error("Error fetching limit:", error);
      });

      
    }).catch(() => {
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRate();
        const multipliedValue = data?.Data * eth;
        setColletrallimitdollar(multipliedValue)
        setEthAmount(data?.Data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(() => {
      
        fetchData();
      
    }, 5000);
    return () => clearInterval(interval);
  
  }, [ethAmount,address,eth]);


  const ErusdAssest = () => {
    erusdAssest(addresses.vault, address).then((x) => {
      const erusdResult = parseInt(x?._hex, 16);
      const erusdBalanceInEth = erusdResult / 10 ** 18;
      setErusd(erusdBalanceInEth)
    }).catch(() => {
    })
  }
  const EthAssest = () => {
    const web3 = new Web3(window.ethereum);
    ethAssest(addresses.vault, address).then((x) => {
      const EthResult = parseInt(x?._hex, 16);
      const ethBalanceInEth = EthResult / 10 ** 18;
      setETH(ethBalanceInEth)
    }).catch(() => {
    })
  }
  const UserTransaction = async (currentPage) => {
    setloader(true)
    await transactionhistorylenght(addresses.TransactionHistory, address).then(async (x) => {
      const txtlenght = parseInt(x?._hex, 16);
      setTransactionslenght(txtlenght)
      if (txtlenght > 0) {
        await Usertransactionhistory(addresses.TransactionHistory, address, currentPage).then((x) => {
          handleArray(x)
          setloader(false)
        }).catch((err) => {
          return err
        })

      }
      else {
        setloader(false)
      }
    }).catch((err) => {
      setloader(false)
    })
  }
  const handleArray = (x) => {
    const amountsInWei = x.map((entry) => entry.amount);
    const amountsInEth = amountsInWei.map((amount) => amount / 10 ** 18);
    setuserAmount(amountsInEth);
    const createdDates = x.map(entry => moment.unix(entry.createdAt).format('dddd, DD MMMM YYYY HH:mm:ss'));

    setuserCreated(createdDates);
    const types = x.map((entry) => entry[2]);
    setuserType(types);
  }
  useEffect(() => {
    if(address){
    UserTransaction()
    }
  }, [address, Transactionslenght])
  useEffect(() => {
    if (!address ) {
      setColletrallimit(0);
      setETH('')
      setColletral(0);
      setEthAmount(0)
      setErusd("");
      setTransactionslenght("");
      setColletrallimitdollar(0)
    }
  }, [address]);

  return (
    <>
      <NavBar address={address} scrollToFaq={scrollToFAQ}scrollToDis={scrollToDis} scrollToWork={scrollToWork} ethAmount={ethAmount}/>
      <Routes>
        <Route exact path="/" element={<Home address={address} EthAssest={EthAssest} ErusdAssest={ErusdAssest} liquidationAssest={liquidationAssest} handleArray={UserTransaction} scrollToFaq={faqRef}   scrollToDis={disRef} scrollToWork={HowTowork} ethAmount={ethAmount}/>} />

        <Route path="/MyAssets" element={<MyAssets address={address} eth={eth} erusd={erusd} colletral={colletral} colletrallimit={colletrallimit} userAmount={userAmount} userCreated={userCreated} userType={userType} UserTransaction={UserTransaction} userlength={Transactionslenght} colletrallimitdollar={colletrallimitdollar} />} />



        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer scrollToFaq={scrollToFAQ} scrollToDis={scrollToDis}scrollToWork={scrollToWork}/>
    </>
  );
}
export default Router;

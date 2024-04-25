import axios from "axios"

const addresses = {
  contractAddress: '0xeB3d48325149424b510515a997da703E8C493d0C',
  TransactionHistory: '0xC24fE3134a55dFb4eA5e215654E7E807264C6Add',
  APYContract: '0xF8C265B16A0d89f47d2e43EB23a0947d05B8409d',
  vault: '0x3a88Fc7f1668682f4787018291B227890874AA32',
  ERUSDToken: '0x36de70C38A9D70DF83667fDf7b47fA04D9AE5850',
  ERUSDJoin: '0x84e889d3E79F8866B959E79924D1635239bC6832',
  ETHJoin: '0x6078817196E60Df2188fb35ef1a8eE8Ac5c433eB',
  oraclePrice: '0xff18b0C9546B588723a79d60A1853673cD3d13E4',
  Liquidation: '0x23624AAE60E500074382433D285c765492F5c0BE'
};

export default addresses;

export const MyWeb3URL = "https://geth-mordor.etc-network.info/"
export const Twitter = "https://twitter.com/Veritas_ETC"
export const Telegram = "https://t.me/VeritasEcosytem"
export const Github = "https://github.com/VeritasETC"
export const Linkedin = "https://www.linkedin.com/company/92883666/admin/feed/posts/"
export const Medium = "https://medium.com/@Veritas_ETC"
export const ChainIds = 63
export const pdfUrlwhitePaper = "ERUSD_Whitepaper_1.0.pdf";
export const minutesToMilliseconds =  60000; // 1 minute = 60000 milliseconds
// export const Base_Url = "https://veritas-dao-be.ammag.tech/";
export const Base_Url = "https://veritas-dao-be.erusd.io/";
export const getRate = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`getRate`, {
        baseURL: Base_Url,
      });
      resolve(response?.data);
  
    } catch (error) {
  
      reject(error); 
    }
  });
  };
  export const colletralratiovalue= 150
  export const PRECISION = 6;
  export const SOME_VALUE = 0.0000002;

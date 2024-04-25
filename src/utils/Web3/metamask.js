
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers"
import { contract_api } from "./actions_abi";
import Toast from "../Toast/toast";
import { token_abi } from "./token_abi"
import { vault_abi } from "./vault_abi"
import { liquidation_abi } from "./liquidation";
import { TransactionHistoryAbi } from "./TransactionHistory_abi"
import { oracle_Abi } from "./oracle_abi"
import { apy_api } from "./apy_abi";
import { Base_Url } from "../../Const/const";
import axios from "axios";




export const Current_owner = async (tokenAddress) => {
  const Web3 = require('web3');
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://dataseed2.redlightscan.finance/'));
  const web3 = new Web3(new Web3.providers.HttpProvider('https://dataseed2.redlightscan.finance/'));
  return new Promise((resolve, reject) => {

    const contract = new web3.eth.Contract(contract_api, tokenAddress);

    contract.methods.owner().call().then(resp => {
      resolve(resp)

    }).catch(error => {
      reject(error)
    })

  })

}
export const getETHCalculatedAmount = async (tokenaddress, erusd, collateral) => {
  const provider = await detectEthereumProvider();
  const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);

  const signer = web3Provider.getSigner();

  const contract = new ethers.Contract(tokenaddress, contract_api, signer);

  try {
    const result = await contract.getETHCalculatedAmount(erusd, collateral);
    await result;
    return result;
  } catch (error) {
    throw error;
  }
};




export const stabilityFee = async (tokenaddress) => {
  const provider = await detectEthereumProvider();
  const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);

  const signer = web3Provider.getSigner();

  const contract = new ethers.Contract(tokenaddress, contract_api, signer);

  try {
    const result = await contract.stabilityFee();
    await result;
    return result;
  } catch (error) {
    throw error;
  }
};
export const getERUSDCalculatedAmount = async (tokenaddress, tokenAmount) => {
  const provider = await detectEthereumProvider();
  const web3Provider =
    provider !== window.ethereum
      ? new ethers.providers.Web3Provider(provider)
      : new ethers.providers.Web3Provider(window.ethereum);

  const signer = web3Provider.getSigner();

  const contract = new ethers.Contract(tokenaddress, contract_api, signer);
  try {
    const result = await contract.getERUSDCalculatedAmount(tokenAmount);
    return result;
  } catch (error) {
  }
};

export const minCollateralRatio = async (tokenaddress) => {
  const provider = await detectEthereumProvider();
  const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);

  const signer = web3Provider.getSigner();

  const contract = new ethers.Contract(tokenaddress, contract_api, signer);

  try {
    const result = await contract.minCollateralRatio();
    await result;
    return result;
  } catch (error) {
    throw error;
  }
};
export const APYFee = async (tokenaddress) => {
  const provider = await detectEthereumProvider();
  const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);

  const signer = web3Provider.getSigner();

  const contract = new ethers.Contract(tokenaddress, apy_api, signer);

  try {
    const result = await contract.APYPercentage();
    await result;
    return result;
  } catch (error) {
    throw error;
  }
};
export const getbalanceOf = async (ERUSDToken, address) => {

  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(ERUSDToken, token_abi, signer);
    const result = await contract.balanceOf(address);

    return result;
  } catch (error) {
    throw error;
  }
};

export const totalSupply = async (ERUSDToken) => {

  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(ERUSDToken, token_abi, signer);
    const result = await contract.totalSupply();
    return result;
  } catch (error) {

  }
}
export const userCount = async (ERUSDToken) => {

  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(ERUSDToken, vault_abi, signer);
    const result = await contract.userCount();
    return result;
  } catch (error) {

  }
}

export const getBalance = async (account) => {
  try {
    // Check if the user has MetaMask installed
    if (window.ethereum && account) {
      const web3 = new Web3(window.ethereum);

      // Request account access if needed
      await window.ethereum.enable();

      // Get the balance using the current provider
      const balanceWei = await web3.eth.getBalance(account);

      // Convert Wei to Ether and return the result
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      return balanceEth;
    } else {
      throw new Error('MetaMask not detected. Please install MetaMask and try again.');
    }
  } catch (error) {
    return '0';
  }
};
export const balanceTotalCollateral = async (account) => {
  try {
    // Check if the user has MetaMask installed
    if (window.ethereum && account) {
      const web3 = new Web3(window.ethereum);

      // Request account access if needed
      await window.ethereum.enable();

      // Get the balance using the current provider
      const balanceWei = await web3.eth.getBalance(account);

      // Convert Wei to Ether and return the result
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      return balanceEth;
    } else {
      throw new Error('MetaMask not detected. Please install MetaMask and try again.');
    }
  } catch (error) {
    return '0';
  }
};

export const switchingToRLC = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x3F' }],
    });

  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x3F',
              chainName: 'ETH Classic',
              rpcUrls: ['https://geth-mordor.etc-network.info/'],
              blockExplorerUrls: ['https://blockscout.com/etc/mordor'],
              nativeCurrency: {
                symbol: 'ETC',
                decimals: 18
              }
            }
          ],
        })
      } catch (addError) {
      }
    }
  }
}
export const lockAndDraw = async (constraceAddress, erusd, collatrael, AmountPayable) => {
  // const Amount =AmountPayable+0000.1.toString();
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    axios.post(`${Base_Url}UpdateContract`)
    .then(response => {
      if (response?.data?.Message === "successfully updated") {
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider1.getSigner();
        const contract = new ethers.Contract(constraceAddress, contract_api, signer);
        const web3 = new Web3(window.ethereum);
        const amountInWei = web3.utils.toWei(AmountPayable, 'ether');
        // console.log("signing",erusd,collatrael,amountInWei)
        contract.lockAndDraw(erusd, collatrael, {
          value: amountInWei,
          // gasLimit: 3000000,
                      //  376601
          
        })
        .then(async (res) => {
          await res.wait(); 
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
      } else {
        reject(new Error("API response indicates failure"));
      }
    })
    .catch(error => {
      reject(error);
    });
  });
};
export const withdrawCollateral = async (contractAddress, sellErusd) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
      window.web3 = new Web3(provider);
  } else {
      window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
      axios.post(`${Base_Url}UpdateContract`)
          .then(response => {
              if (response?.data?.Message === "successfully updated") {
                  const provider1 = new ethers.providers.Web3Provider(window.ethereum);
                  const signer = provider1.getSigner();
                  const contract = new ethers.Contract(contractAddress, contract_api, signer);
                   contract.withdrawCollateral( 
                   ).then(async (res) => {
                    await res.wait().then((x) => {
                          resolve(res);
                      }).catch((error) => {
                          reject(error);
                      });
                  }).catch((error) => {

                      reject(error);
                  });
              } else {
                  reject(new Error("API response indicates failure"));
              }
          })
          .catch((error) => {
              reject(error);

          });
  });
};




export const erusdAssest = async (VaultToken, address) => {

  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(VaultToken, vault_abi, signer);
    const result = await contract.ERUSD(address);
    return result;
  } catch (error) {

  }
}
export const ethAssest = async (VaultToken, address) => {

  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(VaultToken, vault_abi, signer);
    const result = await contract.eth(address);
    return result;
  } catch (error) {

  }
}

export const liquidation_amount = async (liquidation, address) => {

  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(liquidation, liquidation_abi, signer);

    const result = await contract.getLiquidationPercentage(address);
    return result;
  } catch (error) {

  }
}

export const Usertransactionhistory = async (transactionHistory, address, page) => {
  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(transactionHistory, TransactionHistoryAbi, signer);
    const result = await contract.getUserTransactions(address, page, 5);
    return result;
  } catch (error) {

  }
}

export const transactionhistorylenght = async (transactionHistory, address) => {
  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(transactionHistory, TransactionHistoryAbi, signer);
    const result = await contract.getUserTransactionLength(address);
    return result;
  } catch (error) {

  }
}

export const getAmountpercentage = async (oraclePrice, ethInWei) => {
  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(oraclePrice, oracle_Abi, signer);
    const result = await contract.getAmount(ethInWei);
    return result;
  } catch (error) {

  }
}
export const DEFAULT_COLLATERAL = async (vault, address) => {
  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(vault, vault_abi, signer);
    const result = await contract.userUSDTAmount(address);
    return result;
  } catch (error) {

  }
}


export const APY_CALCULATE = async (apy, address) => {
  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(apy, apy_api, signer);
    const result = await contract.calculate(address);
    return result;
  } catch (error) {

  }
}
export const WITHDRAW_APY_AMOUNT = async (action) => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const provider1 = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider1.getSigner();
      let contract = new ethers.Contract(action, contract_api, signer);
      
      const res = await contract.withdrawAPYAmount();
      const receipt = await res.wait();
      
      resolve(receipt);
    } catch (error) {
      reject(error);
    }
  });
};

export const ETC_AMOUNT = async (oracle, eth) => {
  try {
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found.');
    }
    const web3Provider = provider !== window.ethereum ? new ethers.providers.Web3Provider(provider) : new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(oracle, oracle_Abi, signer);
    const result = await contract.getAmount(eth);
    return result;
  } catch (error) {

  }
}







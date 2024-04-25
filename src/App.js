import React from 'react';
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MordorTestnet } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
 function App() {
  return (
    <>
      <ThirdwebProvider
     activeChain={ MordorTestnet }
    >
     <Layout />
    </ThirdwebProvider>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}


export default App;
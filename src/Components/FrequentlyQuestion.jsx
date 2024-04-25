import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
function FrequentlyQuestion() {
  return (
    <>
      <Accordion>
      <div ></div>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is ERUSD?</Accordion.Header>
          <Accordion.Body>
          ERUSD, or ETC Reserve USD, is a stablecoin constructed on the Ethereum Classic blockchain. It operates as a crypto-collateralized stablecoin backed solely by Ethereum Classic, making it a singular asset peg at present. Notably, ERUSD represents the inaugural native stablecoin on the chain, distinguishing itself from bridged stablecoins.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What blockchain is ERUSD built on?</Accordion.Header>
          <Accordion.Body>
          ERUSD is constructed on the Ethereum Classic blockchain, which stands out as one of the largest Proof-of-Work chains hosting smart contracts. Its Proof-of-Work consensus mechanism provides a distinct advantage, as it typically undergoes less scrutiny compared to Proof-of-Stake chains.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Why on Ethereum Classic?</Accordion.Header>
          <Accordion.Body>
          We believe now the time is right to build a stablecoin on the Ethereum Classic blockchain since it has a larger amount of defi projects on chain than it ever has had before, as well as the chain being a proof of work chain and having no stablecoin,
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>What are the benefits of using ERUSD?</Accordion.Header>
          <Accordion.Body>
          By using ERUSD, you gain access to one of the last stablecoins on a Proof-of-Work chain, which means it faces less scrutiny from governments. This stablecoin is also crypto-backed, meaning it is not tied to any government capable of endlessly printing money with no oversight, potentially causing the value to inflate at any moment.
          </Accordion.Body>
        </Accordion.Item>
      
      </Accordion>
    </>
  );
}
export default FrequentlyQuestion;

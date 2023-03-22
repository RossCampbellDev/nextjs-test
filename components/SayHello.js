import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants"; // specify the folder instead of 2 files, cos index.js auto-covers the whole folder

import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

export default function SayHello() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis(); // gives us the hex version of our chainID
  const chainId = parseInt(chainIdHex); // same name as above line doesn't matter, we rename it above to chainIdHex
  const testAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  console.log(`chainId: ${chainId}`);
  console.log(`Contract Address: ${testAddress}`);

  const [helloMsg, setHelloMsg] = useState("");

  const { runContractFunction: hello } = useWeb3Contract({
    abi: abi,
    contractAddress: testAddress,
    functionName: "hello",
    params: {},
  });

  async function sayHello() {
    console.log("calling from useEffect");
    console.log(`${chainId} - ${testAddress}`);
    const helloMsg = await hello();
    console.log(`hello msg ${helloMsg}`);
    setHelloMsg(helloMsg);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      sayHello();
    }
  }, [isWeb3Enabled]);

  return testAddress ? (
    <div>this is the msg: {helloMsg}</div>
  ) : (
    <div>this is the say hello component</div>
  );
}

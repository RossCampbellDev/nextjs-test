import Head from "next/head";
import styles from "@/styles/Home.module.css";
//import ManualHeader from "../components/ManualHeader";
import Header from "../components/Header";
import ManualHeader from "../components/ManualHeader";
import SayHello from "../components/SayHello";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ross Test App</title>
        <meta name="description" content="Test run by Ross" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <hr />
      <SayHello />
      <hr />
    </>
  );
}

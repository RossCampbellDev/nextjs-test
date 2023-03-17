import {useMoralis} from "react-moralis";
import {useEffect} from "react";

export default function ManualHeader() {
    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3} = useMoralis();

    // check if we have an existing connected wallet.  if we do, make sure web3 is enabled and set "connected" state item.
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    // if we don't have a connected wallet, remove the state item "connected" and deactivate web3
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                //assume they disconnected
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (<div>Connected to {account.slice(0,6)}...{account.slice(account.length-4)}</div>) : (
                <button onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected");
                        }
                    }}>
                    Connect
                </button>
            )}
        </div>
    )
}
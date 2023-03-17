import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div>
      <h1>Here we go!</h1>
      <ConnectButton moralisAuth={false} />
    </div>
  );
}

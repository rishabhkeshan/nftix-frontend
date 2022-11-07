import "./LoginScreen.scss";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import AssetMantleFunctions from "../../blockchain/assetmantle";
import Api from "../../utils/api";
import Loader from "../../components/Loader/Loader";

export default function WalletCreationScreen() {
  const [showLoading,setShowLoading]=useState(false);
  useEffect(() => {
    handleSubmit();
  }, []);
  const mantleFunctions = new AssetMantleFunctions(
    localStorage.getItem("username")
  );
  const api = new Api(localStorage.getItem("jwt"));
  const [walletAddress, setWalletAddress] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const encryptData = (payload) => {
    return CryptoJS.AES.encrypt(
      payload,
      localStorage.getItem("xrc")
    ).toString();
  };
  const handleSubmit = async () => {
    setShowLoading(true);
    const resp = await mantleFunctions.createWallet();
    const walletUpdateResponse = await api.walletUpdate({
      wallet_id: resp.walletId,
      hashed_nem: encryptData(resp.mnemonic),
      nub_id: resp.nubId,
    });
    setWalletAddress(resp.walletId);
    setMnemonic(resp.mnemonic);
    setShowLoading(false);
    //localStorage.removeItem("xrc");
  };
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([encryptData(mnemonic)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "secret.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  return (
    <article
      style={{ filter: showLoading ? "blur(10px)" : "none" }}
      className="loginscreen"
    >
      <Loader showLoading={showLoading} />
      <section className="loginscreen_maincontainer">
        <div className="loginscreen_maincontainer_title">
          Wallet Address
        </div>
        <div
          style={{ fontSize: "12px" }}
          className="loginscreen_maincontainer_textcontainer"
        >
          {walletAddress}
        </div>

        <div className="loginscreen_maincontainer_subtitle">Mnemonic</div>
        <div className="loginscreen_maincontainer_textcontainer">
          {mnemonic}
        </div>
      </section>
      <section className="loginscreen_bottomcontainer">
        <div
          onClick={downloadTxtFile}
          className="loginscreen_bottomcontainer_btncontainer"
        >
          Download JSON
        </div>
      </section>
    </article>
  );
}

import "./LoginScreen.scss";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import AssetMantleFunctions from "../../blockchain/assetmantle";
import Api from "../../utils/api";
import Loader from "../../components/Loader/Loader";
import { useHistory } from "react-router-dom";

export default function WalletCreationScreen() {
  const [showLoading, setShowLoading] = useState(false);
  const [seedphraseDownloaded, setSeedphraseDownloaded] = useState(false);
  const history = useHistory();
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
      JSON.stringify({ payload }),
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
        <div className="loginscreen_maincontainer_title">Wallet Address</div>
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
          onClick={()=>{
            downloadTxtFile();
            setSeedphraseDownloaded(true);
          }}
          style={{ fontSize: "16px" }}
          className="loginscreen_maincontainer_subtitle underline cursor-pointer "
        >
          Download Seed Phrase
        </div>
        <div
          onClick={() => {
            history.push("/");
          }}
          style={{
            opacity: seedphraseDownloaded ? "100%" : "50%",
            pointerEvents: seedphraseDownloaded ? "auto" : "none",
          }}
          className="loginscreen_bottomcontainer_btncontainer"
        >
          Attend Events Now!
        </div>
      </section>
    </article>
  );
}

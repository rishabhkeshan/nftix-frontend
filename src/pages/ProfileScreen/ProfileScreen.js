import "./ProfileScreen.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AssetMantleFunctions from "../../blockchain/assetmantle";

export default function ProfileScreen() {
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState(0);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const data = JSON.parse(localStorage.getItem("deto"));
      if (!data) {
        history.push("/login");
      }
      setUserData(data);
      const mantleFunctions = new AssetMantleFunctions(data.username);
      mantleFunctions.walletId = data.wallet_id;
      const bal = await mantleFunctions.getAccountBalance();
      setBalance(bal);
    })();
  }, []);

  return (
    <div className="profilescreen">
      <div className="profilescreen_maincontainer">
        <div>
          <div className="profilescreen_maincontainer_title">Username</div>
          <div className="profilescreen_maincontainer_subtitle">
            {userData?.username}
          </div>
        </div>
        <div>
          <div className="profilescreen_maincontainer_title">Email</div>
          <div className="profilescreen_maincontainer_subtitle">
            {userData?.email}
          </div>
        </div>
        <div>
          <div className="profilescreen_maincontainer_title">Identity ID</div>
          <div className="profilescreen_maincontainer_subtitle">
            {userData?.nub_id}
          </div>
        </div>
        <div></div>
        <div className="profilescreen_maincontainer_title">Mantle Address</div>
        <div className="profilescreen_maincontainer_subtitle">
          {userData?.wallet_id}
        </div>
        <div className="profilescreen_maincontainer_title">Balance</div>
        <div className="profilescreen_maincontainer_subtitle">
          {balance === 0 ? "Loading" : balance} MNTL
        </div>
      </div>
    </div>
  );
}

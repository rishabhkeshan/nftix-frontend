import "./EventBuyScreen.scss";
import React, { useEffect, useState } from "react";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Loader from "../../components/Loader/Loader";
import PasswordModal from "./PasswordModal";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import Api from "../../utils/api";
import { Link, useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import AssetMantleFunctions from "../../blockchain/assetmantle";

export default function EventBuyScreen({ match }) {
  let history = useHistory();
  const [showLoading, setShowLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [event, setEvent] = useState({
    event_info: {
      _id: "63667fe1e08d08237aefe57b",
      name: "Abu Dhabi F1 GP Grand Prix 2022",
      location: "California, USA",
      description:
        "Specualte the finals between Hamilton and Verstappen live at Abu Dhabi, buy your tickets here!",
      banner_url: "https://ggwp.com/lmao.png",
      category: "fun",
      organiser: "63667fd1e08d08237aefe579",
      nft: "63667fe1e08d08237aefe57a",
      tickets_available: 100,
    },
    date: "Happening Now",
    nft_info: {
      _id: "6368b96362f2b983959b2763",
      price: "10",
      toWallet: "mntl",
      event: "6368b96362f2b983959b2764",
      toId: "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|YkM2ZT8UEjwntQMy3_cBN1m0dRs=",
      fromId:
        "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|YkM2ZT8UEjwntQMy3_cBN1m0dRs=",
      classificationID: "devnet-mantle-1.j0Uuu1ZA7krYEQ036oQVnzmkQVs=",
      mutableProperties: "burn:H|1,lock:H|1",
      immutableProperties:
        "URI:S|aHR0cHM6Ly9kZW1vLWFzc2V0bWFudGxlLm15cGluYXRhLmNsb3VkL2lwZnMvUW1ZZVRlZ1QyUWhaUFdnQTJxeUJUYW1tWDNpd1AyVllyaHcxaWo3OG5naWc5ei9Nb2JDb29sLnBuZw=,name:S|YXNkZg=,description:S|YXNkZg=,category:S|YXJ0cw",
      mutableMetaProperties: "propertyName:S|AA=,type:S|asset",
      immutableMetaProperties:
        "URI:S|aHR0cHM6Ly9kZW1vLWFzc2V0bWFudGxlLm15cGluYXRhLmNsb3VkL2lwZnMvUW1ZZVRlZ1QyUWhaUFdnQTJxeUJUYW1tWDNpd1AyVllyaHcxaWo3OG5naWc5ei9Nb2JDb29sLnBuZw=,name:S|YXNkZg=,description:S|YXNkZg=,category:S|YXJ0cw",
      name: "asdf",
      description: "asdf",
      claimable: ["adsf"],
      image:
        "https://demo-assetmantle.mypinata.cloud/ipfs/QmYeTegT2QhZPWgA2qyBTammX3iwP2VYrhw1ij78ngig9z/MobCool.png",
      org: "6368b298fbd38ea3f8b23444",
      properties: [
        {
          propertyName: "asdf",
          propertyValue: "asdf",
        },
      ],
    },
  });
  const location = useLocation();
  const routePath = location.pathname;
  const eventID = routePath.substring(routePath.lastIndexOf("/") + 1);
  const api = new Api(localStorage.getItem("jwt"));
  const { enqueueSnackbar } = useSnackbar();
  const showErrorSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const showSuccessSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  useEffect(() => {
    (async () => {
      const eventResponse = await api.getEvent(eventID);
      if (eventResponse.status) {
        setShowLoading(false);
        setEvent(eventResponse.data);
      } else {
        setShowLoading(false);
        console.log("api error");
      }
    })();
  }, []);
  const [passwordModal, setPasswordModal] = useState(false);
  const handleClose = () => {
    setPasswordModal(false);
  };

  const decryptPassword = (cipher, password) => {
    try {
      var bytes = CryptoJS.AES.decrypt(cipher, password);
      const data = bytes.toString(CryptoJS.enc.Utf8);
      const json = JSON.parse(data);
      return json.payload;
    } catch (e) {
      showErrorSnack("wrong password!");
      setShowLoading(false);
    }
  };

  const handlePasswordSubmit = async (password) => {
    console.log(password);
    setPassword(password);
    setPasswordModal(false);
    setShowLoading(true);
    const user = JSON.parse(localStorage.getItem("deto"));
    const nem = decryptPassword(user.hashed_nem, password);
    console.log(nem);
    const mantleFunctions = new AssetMantleFunctions(user.username);
    await mantleFunctions.walletFromWords(nem);
    console.log(event.nft_info.properties);
    const data = await mantleFunctions.mintToken(
      event.nft_info.name,
      event.nft_info.description,
      event.nft_info.image,
      event.nft_info.properties
    );
    console.log(
      `https://devnet.explorer.assetmantle.one/transactions/${data.txhash}`
    );
    console.log(data);
    await mantleFunctions.transactMntl(
      event.nft_info.toWallet,
      `${event.nft_info.price}000000`
    );
    const resp = await api.purchaseTicket({
      event_id: event.event_info._id,
      mint_id: data.txhash,
    });
    if (resp.status) {
      console.log("bought ticket!");
      showSuccessSnack("Your ticket has been purchased succesfully!");
      setShowLoading(false);
      history.push("/mytickets")
    } else {
      console.log("failure in buying ticket!");
      showErrorSnack("something went wrong in purchasing your ticket :(");
      setShowLoading(false);
    }
  };
  return (
    <article
      style={{ filter: passwordModal ? "blur(10px)" : "none" }}
      className="eventbuyscreen"
    >
      <Loader showLoading={showLoading} />
      <PasswordModal
        passwordModal={passwordModal}
        handleClose={handleClose}
        submit={handlePasswordSubmit}
      />
      <section className="eventbuyscreen_maincontainer">
        <div className="eventbuyscreen_eventcontainer">
          <div className="eventbuyscreen_eventcontainer_event">
            <div className="flex justify-between">
              <div className="eventbuyscreen_eventcontainer_event_detailscontainer">
                <div className="eventbuyscreen_eventcontainer_event_detailscontainer_title">
                  {event.event_info.name}
                </div>
                <div className="eventbuyscreen_eventcontainer_event_detailscontainer_subtitle">
                  <img
                    className="w-5 mr-1"
                    src={location_icon}
                    alt="location"
                  />
                  {event.event_info.location}
                </div>
                <div className="eventbuyscreen_eventcontainer_event_detailscontainer_subtext">
                  <img className="w-5 mr-1" src={seat_icon} alt="seat" />

                  {`Only ${event.event_info.tickets_available} seats left`}
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url("https://demo-assetmantle.mypinata.cloud/ipfs/QmYeTegT2QhZPWgA2qyBTammX3iwP2VYrhw1ij78ngig9z/MobCool.png")`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }}
                className="eventbuyscreen_eventcontainer_event_imagecontainer"
              ></div>
            </div>
            <div className="eventbuyscreen_eventcontainer_event_detailscontainer_title mt-6">
              Event Details
            </div>
            <div className="eventbuyscreen_eventcontainer_event_detailscontainer_subtitle text-left mb-8">
              {event.event_info.description}
            </div>
            <div className="eventbuyscreen_eventcontainer_event_detailscontainer_title mt-6">
              Ticket
            </div>
            <div className="eventbuyscreen_nftcontainer_event">
              <div
                style={{
                  backgroundImage: `url("https://demo-assetmantle.mypinata.cloud/ipfs/QmYeTegT2QhZPWgA2qyBTammX3iwP2VYrhw1ij78ngig9z/MobCool.png")`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }}
                className="eventbuyscreen_nftcontainer_event_imagecontainer"
              ></div>
              <div className="eventbuyscreen_nftcontainer_event_detailscontainer">
                <div className="eventbuyscreen_nftcontainer_event_detailscontainer_highlighttext">
                  {event.nft_info.date}
                </div>
                <div className="eventbuyscreen_nftcontainer_event_detailscontainer_title">
                  {event.nft_info.name}
                </div>
                <div className="eventbuyscreen_nftcontainer_event_detailscontainer_subtitle">
                  <img
                    className="w-3 mr-1"
                    src={location_icon}
                    alt="location"
                  />
                  {event.nft_info.description}
                </div>
                <div
                  onClick={() => {
                    setPasswordModal(true);
                  }}
                  className="eventbuyscreen_nftcontainer_event_detailscontainer_buycontainer"
                >
                  Buy for {event.nft_info.price} MNTL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

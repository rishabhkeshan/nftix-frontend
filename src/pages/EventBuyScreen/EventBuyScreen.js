import "./EventBuyScreen.scss";
import React, { useEffect, useState } from "react";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import PasswordModal from "./PasswordModal";
export default function EventBuyScreen({ match }) {
  useEffect(() => {
    console.log(match.params.ticker);
  }, []);
    const [passwordModal, setPasswordModal] = useState(false);
    const handleClose = () => {
      setPasswordModal(false);
    };
  const event = {
    event_info: {
      _id: "63667fe1e08d08237aefe57b",
      name: "Abu Dhabi F1 GP Grand Prix 2022",
      location: "California, USA",
      description: "Specualte the finals between Hamilton and Verstappen live at Abu Dhabi, buy your tickets here!",
      banner_url: "https://ggwp.com/lmao.png",
      category: "fun",
      organiser: "63667fd1e08d08237aefe579",
      nft: "63667fe1e08d08237aefe57a",
      tickets_available: 100,
    },
    date: "Happening Now",
    nft_info: {
      name: "Abu Dhabi F1 GP Grand Prix 2022",
      location: "California, USA",
      tickets: 100,
      date: "Happening Now",
    },
  };
  return (
    <article
      style={{ filter: passwordModal ? "blur(10px)" : "none" }}
      className="eventbuyscreen"
    >
      <PasswordModal passwordModal={passwordModal} handleClose={handleClose} />
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
                  {event.nft_info.location}
                </div>
                <div
                  onClick={() => {
                    setPasswordModal(true);
                  }}
                  className="eventbuyscreen_nftcontainer_event_detailscontainer_buycontainer"
                >
                  Buy for 5 MNTL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

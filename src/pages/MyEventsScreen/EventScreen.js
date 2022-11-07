import "./EventScreen.scss";
import React, { useEffect, useState } from "react";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import QRScanModal from "./QRScanModal";
import Loader from "../../components/Loader/Loader";

export default function EventScreen({ match }) {
  const [showLoading,setShowLoading]=useState(true);

  useEffect(() => {
    console.log(match.params._id);
  }, []);
  const [showScanner, setShowScanner] = useState(false);
  const event = {
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
      name: "Abu Dhabi F1 GP Grand Prix 2022",
      location: "California, USA",
      tickets: 100,
      date: "Happening Now",
    },
  };
  return (
    <article
      style={{ filter: showScanner ? "blur(10px)" : "none" }}
      className="eventscreen"
    >
      <QRScanModal showScanner={showScanner} />
      <section className="eventscreen_maincontainer">
        <div className="eventscreen_eventcontainer">
          <div className="eventscreen_eventcontainer_event">
            <div className="flex justify-between">
              <div className="eventscreen_eventcontainer_event_detailscontainer">
                <div className="eventscreen_eventcontainer_event_detailscontainer_title">
                  {event.event_info.name}
                </div>
                <div className="eventscreen_eventcontainer_event_detailscontainer_subtitle">
                  <img
                    className="w-5 mr-1"
                    src={location_icon}
                    alt="location"
                  />
                  {event.event_info.location}
                </div>
                <div className="eventscreen_eventcontainer_event_detailscontainer_subtext">
                  <img className="w-5 mr-1" src={seat_icon} alt="seat" />

                  {`Only ${event.event_info.tickets_available} seats left`}
                </div>
              </div>
              <div className="eventscreen_eventcontainer_event_imagecontainer"></div>
            </div>
            <div className="eventscreen_eventcontainer_event_detailscontainer_title mt-6">
              Event Details
            </div>
            <div className="eventscreen_eventcontainer_event_detailscontainer_subtitle text-left mb-8">
              {event.event_info.description}
            </div>
            <div className="eventscreen_eventcontainer_event_detailscontainer_title mt-6">
              Statistics
            </div>
            <div className="eventscreen_nftcontainer_event">
              <div className="eventscreen_nftcontainer_event_imagecontainer"></div>
              <div className="eventscreen_nftcontainer_event_detailscontainer">
                <div className="eventscreen_nftcontainer_event_detailscontainer_highlighttext">
                  {event.nft_info.date}
                </div>
                <div className="eventscreen_nftcontainer_event_detailscontainer_title">
                  {event.nft_info.name}
                </div>
                <div className="eventscreen_nftcontainer_event_detailscontainer_subtitle">
                  {`36 people bought the ticket`}
                </div>
                <div className="eventscreen_nftcontainer_event_detailscontainer_subtitle">
                  {"24 people have checked in"}
                </div>
                <div
                  onClick={() => {
                    setShowScanner(true);
                  }}
                  className="eventscreen_nftcontainer_event_detailscontainer_buycontainer"
                >
                  Scan QR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

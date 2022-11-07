import "./MyTicketsScreen.scss";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import redeemable_icon from "../../assets/redeemable_icon.svg";
import transaction_icon from "../../assets/transaction_icon.svg";
import Api from "../../utils/api";
import Loader from "../../components/Loader/Loader";

export default function MyTicketsScreen() {
  const api = new Api(localStorage.getItem("jwt"));
  const [tempData, setTempData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const data = await api.getTickets();
      setShowLoading(false);
      if (data.status) {
        if (data.data) {
          setTempData(data.data);
        }
        console.log(data.data);
      }
    })();
    
  }, []);
  return (
    <div
      style={{ filter: showLoading ? "blur(10px)" : "none" }}
      className="myticketsscreen"
    >
      <Loader showLoading={showLoading} />
      <div className="myticketsscreen_maincontainer">
        <div className="myticketsscreen_eventscontainer">
          {tempData.map((event, index) => {
            return (
              <div
                key={event.Ticket._id}
                onClick={() => {
                  history.push({
                    pathname: `/ticket/${event.Ticket._id}`,
                    event: event,
                  });
                }}
                className="myticketsscreen_eventscontainer_event"
              >
                <div
                  style={{
                    backgroundImage: `url(${event.Nft.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className="myticketsscreen_eventscontainer_event_imagecontainer"
                ></div>
                <div className="myticketsscreen_eventscontainer_event_detailscontainer">
                  <div className="myticketsscreen_eventscontainer_event_detailscontainer_highlighttext">
                    {event.date}
                  </div>
                  <div className="myticketsscreen_eventscontainer_event_detailscontainer_title">
                    {event.Nft.name}
                  </div>
                  <div className="myticketsscreen_eventscontainer_event_detailscontainer_subtitle">
                    <img
                      className="w-3 mr-1"
                      src={location_icon}
                      alt="location"
                    />
                    {event.Nft.description}
                  </div>
                  <div className="myticketsscreen_eventscontainer_event_detailscontainer_subtitle">
                    <img
                      className="w-3 mr-1"
                      src={redeemable_icon}
                      alt="location"
                    />
                    {`Redeemables: ${event.Ticket.claimable.length}`}
                  </div>
                  <div className="myticketsscreen_eventscontainer_event_detailscontainer_subtitle">
                    <img
                      className="w-3 mr-1"
                      src={transaction_icon}
                      alt="location"
                    />
                    {`Tx Hash: ${event.Ticket.userMintId.substring(
                      0,
                      4
                    )}...${event.Ticket.userMintId.substring(0,-4)}`}
                  </div>

                  {/* <div className="myticketsscreen_eventscontainer_event_detailscontainer_subtext">
                  <img className="w-3 mr-1" src={seat_icon} alt="seat" />

                  {`Only ${event.tickets} seats left`}
                </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

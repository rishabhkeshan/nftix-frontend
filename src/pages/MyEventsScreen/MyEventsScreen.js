import "./MyEventsScreen.scss";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Api from "../../utils/api";

export default function MyEventsScreen() {
  const api = new Api(localStorage.getItem("jwt"));
  const [eventsData, setEventsData] = useState("");
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const data = await api.getEvent();
      if (data.status) {
        setEventsData(data.data);
        console.log(data.data);
      }
    })();
  }, []);
  const tempData = [
    {
      event_info: {
        _id: "63667fe1e08d08237aefe57b",
        name: "Abu Dhabi F1 GP Grand Prix 2022",
        location: "California, USA",
        description: "gg event",
        banner_url: "https://ggwp.com/lmao.png",
        category: "fun",
        organiser: "63667fd1e08d08237aefe579",
        nft: "63667fe1e08d08237aefe57a",
        tickets_available: 100,
      },
      date: "Happening Now",
    },
    {
      event_info: {
        _id: "63667fe1e08d08237aefe57b",
        name: "Abu Dhabi F1 GP Grand Prix 2022",
        location: "California, USA",
        description: "gg event",
        banner_url: "https://ggwp.com/lmao.png",
        category: "fun",
        organiser: "63667fd1e08d08237aefe579",
        nft: "63667fe1e08d08237aefe57a",
        tickets_available: 100,
      },
      date: "Happening Now",
    },
    {
      event_info: {
        _id: "63667fe1e08d08237aefe57b",
        name: "Abu Dhabi F1 GP Grand Prix 2022",
        location: "California, USA",
        description: "gg event",
        banner_url: "https://ggwp.com/lmao.png",
        category: "fun",
        organiser: "63667fd1e08d08237aefe579",
        nft: "63667fe1e08d08237aefe57a",
        tickets_available: 100,
      },
      date: "Happening Now",
    },
  ];

  return (
    <div className="eventsscreen">
      <div className="eventsscreen_maincontainer">
        <Link to="/create" className="eventsscreen_maincontainer_createevent">
          Create a new event here!
        </Link>
        <div className="eventsscreen_eventscontainer">
          {tempData.map((event, index) => {
            return (
              <div
                onClick={() => {
                  history.push({
                    pathname: `/myevent/${event.event_info._id}`,
                    event: event,
                  });
                }}
                className="eventsscreen_eventscontainer_event"
              >
                <div
                  style={{
                    backgroundImage: `url("https://demo-assetmantle.mypinata.cloud/ipfs/QmYeTegT2QhZPWgA2qyBTammX3iwP2VYrhw1ij78ngig9z/MobCool.png")`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                  className="eventsscreen_eventscontainer_event_imagecontainer"
                ></div>
                <div className="eventsscreen_eventscontainer_event_detailscontainer">
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_highlighttext">
                    {event.date}
                  </div>
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_title">
                    {event.event_info.name}
                  </div>
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_subtitle">
                    <img
                      className="w-3 mr-1"
                      src={location_icon}
                      alt="location"
                    />
                    {event.event_info.location}
                  </div>
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_subtext">
                    <img className="w-3 mr-1" src={seat_icon} alt="seat" />

                    {`Only ${event.event_info.tickets_available} seats left`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

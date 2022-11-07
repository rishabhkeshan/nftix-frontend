import "./MyEventsScreen.scss";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Api from "../../utils/api";
import Loader from "../../components/Loader/Loader";

export default function MyEventsScreen() {
  const api = new Api(localStorage.getItem("jwt"));
  const [tempData, setTempData] = useState([]);
  const [eventsData, setEventsData] = useState("");
    const [showLoading, setShowLoading] = useState(true);

  const history = useHistory();
  useEffect(() => {
    (async () => {
      const data = await api.getOrgEvent();
      console.log(data.data);
      if (data.status) {
        if (data.data) {
          setTempData(data.data);
        }
        setShowLoading(false);
        console.log(data.data);
      }
    })();
  }, []);
  // const tempData = [
  //   {
  //     event_info: {
  //       _id: "63667fe1e08d08237aefe57b",
  //       name: "Abu Dhabi F1 GP Grand Prix 2022",
  //       location: "California, USA",
  //       description: "gg event",
  //       banner_url: "https://ggwp.com/lmao.png",
  //       category: "fun",
  //       organiser: "63667fd1e08d08237aefe579",
  //       nft: "63667fe1e08d08237aefe57a",
  //       tickets_available: 100,
  //     },
  //     date: "Happening Now",
  //   },
  //   {
  //     event_info: {
  //       _id: "63667fe1e08d08237aefe57b",
  //       name: "Abu Dhabi F1 GP Grand Prix 2022",
  //       location: "California, USA",
  //       description: "gg event",
  //       banner_url: "https://ggwp.com/lmao.png",
  //       category: "fun",
  //       organiser: "63667fd1e08d08237aefe579",
  //       nft: "63667fe1e08d08237aefe57a",
  //       tickets_available: 100,
  //     },
  //     date: "Happening Now",
  //   },
  //   {
  //     event_info: {
  //       _id: "63667fe1e08d08237aefe57b",
  //       name: "Abu Dhabi F1 GP Grand Prix 2022",
  //       location: "California, USA",
  //       description: "gg event",
  //       banner_url: "https://ggwp.com/lmao.png",
  //       category: "fun",
  //       organiser: "63667fd1e08d08237aefe579",
  //       nft: "63667fe1e08d08237aefe57a",
  //       tickets_available: 100,
  //     },
  //     date: "Happening Now",
  //   },
  // ];

  return (
    <div
      style={{ filter: showLoading ? "blur(10px)" : "none" }}
      className="eventsscreen"
    >
      <Loader showLoading={showLoading} />
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
                    pathname: `/myevent/${event._id}`,
                    event: event,
                  });
                }}
                className="eventsscreen_eventscontainer_event"
              >
                <div
                  style={{
                    backgroundImage: `url(${event.banner_url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className="eventsscreen_eventscontainer_event_imagecontainer"
                ></div>
                <div className="eventsscreen_eventscontainer_event_detailscontainer">
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_highlighttext">
                    {event.date}
                  </div>
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_title">
                    {event.name}
                  </div>
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_subtitle">
                    <img
                      className="w-3 mr-1"
                      src={location_icon}
                      alt="location"
                    />
                    {event.location}
                  </div>
                  <div className="eventsscreen_eventscontainer_event_detailscontainer_subtext">
                    <img className="w-3 mr-1" src={seat_icon} alt="seat" />

                    {`Only ${event.tickets_available} seats left`}
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

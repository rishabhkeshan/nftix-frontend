import "./MyTicketsScreen.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Api from "../../utils/api";

export default function MyTicketsScreen() {
      const api = new Api(localStorage.getItem("jwt"));
      const [eventsData, setEventsData] = useState("");

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
      name: "Abu Dhabi F1 GP Grand Prix 2022",
      location: "California, USA",
      tickets: 100,
      date: "Happening Now",
    },
    {
      name: "Abu Dhabi F1 GP Grand Prix 2022",
      location: "California, USA",
      tickets: 100,
      date: "Happening Now",
    },
    {
      name: "Abu Dhabi F1 GP Grand Prix 2022",
      location: "California, USA",
      tickets: 100,
      date: "Happening Now",
    },
  ];
return (
  <div className="myticketsscreen">
    <div className="myticketsscreen_maincontainer">
      <div className="myticketsscreen_eventscontainer">
        {tempData.map((event, index) => {
          return (
            <div className="myticketsscreen_eventscontainer_event">
              <div className="myticketsscreen_eventscontainer_event_imagecontainer"></div>
              <div className="myticketsscreen_eventscontainer_event_detailscontainer">
                <div className="myticketsscreen_eventscontainer_event_detailscontainer_highlighttext">
                  {event.date}
                </div>
                <div className="myticketsscreen_eventscontainer_event_detailscontainer_title">
                  {event.name}
                </div>
                <div className="myticketsscreen_eventscontainer_event_detailscontainer_subtitle">
                  <img
                    className="w-3 mr-1"
                    src={location_icon}
                    alt="location"
                  />
                  {event.location}
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

import "./MyTicketsScreen.scss";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Api from "../../utils/api";

export default function MyTicketsScreen() {
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
      Ticket: {
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
      Nft: {
        name: "Abu Dhabi F1 GP Grand Prix 2022",
        location: "California, USA",
        tickets: 100,
        date: "Happening Now",
      },
    },
    {
      Ticket: {
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
      Nft: {
        name: "Abu Dhabi F1 GP Grand Prix 2022",
        location: "California, USA",
        tickets: 100,
        date: "Happening Now",
      },
    },
    {
      Ticket: {
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
      Nft: {
        name: "Abu Dhabi F1 GP Grand Prix 2022",
        location: "California, USA",
        tickets: 100,
        date: "Happening Now",
      },
    },
  ];
return (
  <div className="myticketsscreen">
    <div className="myticketsscreen_maincontainer">
      <div className="myticketsscreen_eventscontainer">
        {tempData.map((event, index) => {
          return (
            <div
              onClick={() => {
                history.push({
                  pathname: `/ticket/${event.Ticket._id}`,
                  event: event,
                });
              }}
              className="myticketsscreen_eventscontainer_event"
            >
              <div className="myticketsscreen_eventscontainer_event_imagecontainer"></div>
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
                  {event.Nft.location}
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

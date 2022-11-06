import "./MyEventsScreen.scss";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Api from "../../utils/api";

export default function MyEventsScreen() {
    const api = new Api(localStorage.getItem("jwt"));
    const [eventsData, setEventsData] = useState("");
    
useEffect(() => {
 (async()=>{
    const data = await api.getEvent();
    if(data.status){
      setEventsData(data.data);
      console.log(data.data);
    }
  })();
}, [])
const tempData = [
  {
    name: "Abu Dhabi F1 GP Grand Prix 2022",
    location:"California, USA",
    tickets:100,
    date:"Happening Now",
    
  },
  {
    name: "Abu Dhabi F1 GP Grand Prix 2022",
    location:"California, USA",
    tickets:100,
    date:"Happening Now",

  },
  {
    name: "Abu Dhabi F1 GP Grand Prix 2022",
    location:"California, USA",
    tickets:100,
    date:"Happening Now",

  },
];

  return (
    <div className="eventsscreen">
      <div className="eventsscreen_maincontainer">
        <Link to="/create" className="eventsscreen_maincontainer_createevent">
          Create a new event here!
        </Link>
        <div className="eventsscreen_eventscontainer">
          {tempData.map((event,index)=>{
            return (
              <div className="eventsscreen_eventscontainer_event">
                <div className="eventsscreen_eventscontainer_event_imagecontainer"></div>
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
                    <img
                      className="w-3 mr-1"
                      src={seat_icon}
                      alt="seat"
                    />

                    {`Only ${event.tickets} seats left`}
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

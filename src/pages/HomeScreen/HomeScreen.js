import "./HomeScreen.scss";
import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Api from "../../utils/api";
import Loader from "../../components/Loader/Loader";

function HomeScreen() {
  const [tempData, setTempData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const api = new Api(localStorage.getItem("jwt"));
      (async () => {
        const resp = await api.getProfile();
        if (resp.status) {
          if (resp.data.is_new) {
            history.push("/wallet-create");
          } else {
            localStorage.setItem("deto", JSON.stringify(resp.data));
            const data = await api.getAllEvents();
            setTempData(data.data);
            setShowLoading(false);
          }
        }
      })();
    }
  }, []);
  const [dashboardModal, setDashboardModal] = useState(false);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  const history = useHistory();
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
    <article className="homescreen">
      <Loader showLoading={showLoading} />
      <section className="homescreen_herocontainer">
        <div className="homescreen_herocontainer_title">Events</div>
        <div className="homescreen_eventscontainer">
          {tempData.map((event, index) => {
            return (
              <div
                onClick={() => {
                  history.push({
                    pathname: `/event/${event.event_info._id}`,
                    event: event,
                  });
                }}
                className="homescreen_eventscontainer_event"
              >
                <div className="homescreen_eventscontainer_event_imagecontainer"></div>
                <div className="homescreen_eventscontainer_event_detailscontainer">
                  <div className="homescreen_eventscontainer_event_detailscontainer_highlighttext">
                    {event.date}
                  </div>
                  <div className="homescreen_eventscontainer_event_detailscontainer_title">
                    {event.event_info.name}
                  </div>
                  <div className="homescreen_eventscontainer_event_detailscontainer_subtitle">
                    <img
                      className="w-3 mr-1"
                      src={location_icon}
                      alt="location"
                    />
                    {event.event_info.location}
                  </div>
                  <div className="homescreen_eventscontainer_event_detailscontainer_subtext">
                    <img className="w-3 mr-1" src={seat_icon} alt="seat" />

                    {`Only ${event.event_info.tickets_available} seats left`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

export default HomeScreen;

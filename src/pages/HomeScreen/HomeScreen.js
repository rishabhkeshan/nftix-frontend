import "./HomeScreen.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import Api from "../../utils/api";
import Loader from "../../components/Loader/Loader";
import LandingBanner from "../../assets/LandingBanner.png";

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
            if (data.data) {
              setTempData(data.data);
            }

            setShowLoading(false);
          }
        }
      })();
    } else {
      setShowLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const [dashboardModal, setDashboardModal] = useState(false);
  // const handleCloseSelectDashboard = () => {
  //   setDashboardModal(false);
  // };
  const history = useHistory();
  return (
    <article
      style={{ filter: showLoading ? "blur(10px)" : "none" }}
      className="homescreen"
    >
      <Loader showLoading={showLoading} />
      <section className="homescreen_herocontainer">
        <img className="pr-6" src={LandingBanner} alt="Landing Banner"/>
        <div className="homescreen_herocontainer_title">Events</div>
        <div className="homescreen_eventscontainer">
          {tempData.map((event, index) => {
            return (
              <div
                key={event.event_info._id}
                onClick={() => {
                  history.push({
                    pathname: `/event/${event.event_info._id}`,
                    event: event,
                  });
                }}
                className="homescreen_eventscontainer_event"
              >
                <div
                  style={{
                    backgroundImage: `url(${event.event_info.banner_url})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                  className="homescreen_eventscontainer_event_imagecontainer"
                ></div>
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

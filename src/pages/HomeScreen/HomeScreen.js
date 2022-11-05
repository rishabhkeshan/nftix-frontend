import "./HomeScreen.scss";
import { Carousel } from "react-responsive-carousel";

// import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
function HomeScreen() {
  const [dashboardModal, setDashboardModal] = useState(false);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  return (
    <article className="homescreen">
      <section className="homescreen_herocontainer content-area">
        <Carousel showStatus={false} axis={"horizontal"}>
          <div className="w-screen">
            <Link to="/contest">
              <img
                src="https://assets-in.bmscdn.com/promotions/cms/creatives/1667563433150_theapp.jpg"
                className="drop-shadow-2xl"
                alt="1"
              />
              {/* <p className="legend"></p> */}
            </Link>
          </div>
        </Carousel>
      </section>
      {/* <Footer centered /> */}
    </article>
  );
}

export default HomeScreen;

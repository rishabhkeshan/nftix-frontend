import "./TicketScreen.scss";
import React, { useEffect } from "react";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import { QRCodeSVG } from "qrcode.react";
export default function TicketScreen({ match }) {
  useEffect(() => {
    console.log(match.params.ticker);
  }, []);
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
    <article className="ticketscreen">
      <section className="ticketscreen_maincontainer">
        <div className="ticketscreen_eventcontainer">
          <div className="ticketscreen_eventcontainer_event">
            <div className="ticketscreen_nftcontainer_event">
              <div className="ticketscreen_nftcontainer_event_imagecontainer">
                <QRCodeSVG value="Hemanth Lodu Hai" />
              </div>
              <div className="ticketscreen_nftcontainer_event_detailscontainer">
                <div className="ticketscreen_nftcontainer_event_detailscontainer_highlighttext">
                  {event.nft_info.date}
                </div>
                <div className="ticketscreen_nftcontainer_event_detailscontainer_title">
                  {event.nft_info.name}
                </div>
                <div className="ticketscreen_nftcontainer_event_detailscontainer_subtitle">
                  {`36 people bought the ticket`}
                </div>
                <div className="ticketscreen_nftcontainer_event_detailscontainer_subtitle">
                  {"24 people have checked in"}
                </div>
                <div className="ticketscreen_nftcontainer_event_detailscontainer_buycontainer">
                  Check In
                </div>
              </div>
            </div>
            <div className="ticketscreen_eventcontainer_event_detailscontainer_title mt-6">
              Redeemables
            </div>
            <div className="ticketscreen_redeemablecontainer mt-6">
              <div className="ticketscreen_redeemablecontainer_text">
                Claim your free T-shirt
              </div>
              <div className="ticketscreen_redeemablecontainer_button">Show QR</div>
            </div>
            <div className="ticketscreen_redeemablecontainer mt-3">
              <div className="ticketscreen_redeemablecontainer_text">
                Claim your free Schwags
              </div>
              <div className="ticketscreen_redeemablecontainer_button">Show QR</div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

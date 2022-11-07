import "./TicketScreen.scss";
import React, { useEffect, useState } from "react";
import location_icon from "../../assets/location_icon.svg";
import seat_icon from "../../assets/seat_icon.svg";
import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";
import Api from "../../utils/api";
import { useSnackbar } from "notistack";
import QRModal from "./QRModal";

export default function TicketScreen({ match }) {
  const [showLoading, setShowLoading] = useState(true);
  const [QRSecret, setQRSecret] = useState("");
  const [QRValue, setQRValue] = useState({});
  const [showQR, setShowQR]= useState(false);
  const [cValue,setCValue] = useState({});
  const [ticket, setTicket] = useState({
    Ticket: {
      _id: "6368fe23f8cad1a120e1bcf8",
      event_id: "6368f5f2f8cad1a120e1bcf1",
      user_id: "6368fdfef8cad1a120e1bcf7",
      NFT_id: "6368f5f2f8cad1a120e1bcf0",
      userMintId:
        "DDA11FA27C910EC98E8C08F689942A63778B03F39571F160BB22D4BFA99CA0B3",
      claimed: [],
      claimable: ["Samosa"],
      timeOfAttendance: "0001-01-01T00:00:00Z",
    },
    Nft: {
      _id: "6368f5f2f8cad1a120e1bcf0",
      price: "100",
      toWallet: "mantle17yq4m3gp87kvr206sxlypfznf34ttek92trpdg",
      event: "6368f5f2f8cad1a120e1bcf1",
      classificationID: "devnet-mantle-1.j0Uuu1ZA7krYEQ036oQVnzmkQVs=",
      mutableProperties: "burn:H|1,lock:H|1",
      immutableProperties:
        "URI:S|aHR0cHM6Ly9kZW1vLWFzc2V0bWFudGxlLm15cGluYXRhLmNsb3VkL2lwZnMvUW1adU5nTXFpVTRpeW1rdWo1N1NFakxSNEdCYXdwSDhWNWdLM2FSM2dIREJ0Yy9nZy5wbmc=,name:S|Wm9tYWxhbmRORlQ=,description:S|VGlja2V0IGZvciBab21hbGFuZA=,category:S|YXJ0cw",
      mutableMetaProperties:
        "propertyName:S|W3sicHJvcGVydHlWYWx1ZSI6IjFnIiwicHJvcGVydHlOYW1lIjoib3JnIn1d=,type:S|asset",
      immutableMetaProperties:
        "URI:S|aHR0cHM6Ly9kZW1vLWFzc2V0bWFudGxlLm15cGluYXRhLmNsb3VkL2lwZnMvUW1adU5nTXFpVTRpeW1rdWo1N1NFakxSNEdCYXdwSDhWNWdLM2FSM2dIREJ0Yy9nZy5wbmc=,name:S|Wm9tYWxhbmRORlQ=,description:S|VGlja2V0IGZvciBab21hbGFuZA=,category:S|YXJ0cw",
      name: "ZomalandNFT",
      description: "Ticket for Zomaland",
      claimable: ["Samosa"],
      image:
        "https://demo-assetmantle.mypinata.cloud/ipfs/QmZuNgMqiU4iymkuj57SEjLR4GBawpH8V5gK3aR3gHDBtc/gg.png",
      org: "6368f405f8cad1a120e1bcef",
      properties: [{ propertyName: "org", propertyValue: "1g" }],
    },
  });
  const location = useLocation();
  const routePath = location.pathname;
  const ticketID = routePath.substring(routePath.lastIndexOf("/") + 1);
  const api = new Api(localStorage.getItem("jwt"));
    const { enqueueSnackbar } = useSnackbar();
    const showErrorSnack = (message) => {
      enqueueSnackbar(message, {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    };
    const showSuccessSnack = (message) => {
      enqueueSnackbar(message, {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    };
    useEffect(() => {
          (async () => {
            const eventResponse = await api.getTicket(ticketID);
            const secretResponse = await api.getQRSecret();
            if (eventResponse.status) {
              setShowLoading(false);
              console.log(eventResponse);
              // setTicket(eventResponse.data);
              setQRSecret(secretResponse.secret);
              setQRValue({ secret: secretResponse.secret, event_data_id: ticket.Ticket._id });
            } else {
              setShowLoading(false);
              console.log("api error");
            }
          })();
    }, []);
  return (
    <article
      style={{ filter: showQR ? "blur(10px)" : "none" }}
      className="ticketscreen"
    >
      <QRModal showQR={showQR} setShowQR={setShowQR} cValue={cValue} />
      <section className="ticketscreen_maincontainer">
        <div className="ticketscreen_eventcontainer">
          <div className="ticketscreen_eventcontainer_event">
            <div className="ticketscreen_nftcontainer_event">
              <div style={{backgroundColor:"white"}} className="ticketscreen_nftcontainer_event_imagecontainer">
                <QRCode size={128} value={ticket.Ticket._id} />
              </div>
              <div className="ticketscreen_nftcontainer_event_detailscontainer">
                <div className="ticketscreen_nftcontainer_event_detailscontainer_highlighttext">
                  {}
                </div>
                <div className="ticketscreen_nftcontainer_event_detailscontainer_title">
                  {ticket.Nft.name}
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
            {ticket.Ticket.claimable.map((value, index) => {
              return (
                <div className="ticketscreen_redeemablecontainer mt-6">
                  <div className="ticketscreen_redeemablecontainer_text">
                    Claim your free {value}
                  </div>
                  <div
                    onClick={() => {
                      setShowQR(true);
                      setCValue(
                        JSON.stringify({
                          ticket_id: ticket.Ticket._id,
                          claimable: value,
                        })
                      );
                      // setCValue(`${ticket.Ticket._id},${value}`)
                    }}
                    className="ticketscreen_redeemablecontainer_button"
                  >
                    Show QR
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}

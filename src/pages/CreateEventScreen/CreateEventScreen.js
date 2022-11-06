import "./CreateEventScreen.scss";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Api from "../../utils/api";
import { useSnackbar } from "notistack";
import plus_icon from "../../assets/plus_icon.svg";
import NFTDropzone from "./NFTDropzone";
export default function CreateEventScreen() {
    const [contestImage, setContestImage] = useState(null);
    const [nftImage, setNFTImage] = useState(null);
  const api = new Api(localStorage.getItem("jwt"));


  const [eventInputFields, setEventInputFields] = useState({
    name: "",
    location: "",
    description: "",
    banner_url:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-680.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCA1IE5vdg%3D%3D,ots-36,otc-FFFFFF,oy-617,ox-24:q-80/et00340636-czpuszcbfj-portrait.jpg",
    category: "",
    tickets_available: "",
  });
  const [NFTInputFields, setNFTInputFields] = useState({
    name: "",
    description: "",
    claimable: [""],
    properties: [{ propertyName: "", propertyValue: "" }],
    image: "https://in.bmscdn.com/webin/movies/superstar/rewards_login.png",
    toID: "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|GcAhsH9xprQZWkrKZZJgMPk9ztA=",
    fromID:
      "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|GcAhsH9xprQZWkrKZZJgMPk9ztA=",
    classificationID: "devnet-mantle-1.j0Uuu1ZA7krYEQ036oQVnzmkQVs=",
    mutableProperties: "burn:H|1,lock:H|1",
    immutableProperties: "style:S|Blue",
    mutableMetaProperties:
      "propertyName:S|W3sicHJvcGVydHlOYW1lIjoibG9jYXRpb24iLCJwcm9wZXJ0eVZhbHVlIjoiYWNtdmlsbGEifSx7InByb3BlcnR5TmFtZSI6Im9yZ2FuaXNhdGlvbk5hbWUiLCJwcm9wZXJ0eVZhbHVlIjoibGF3ZGFsYXNzYW4ifSx7InByb3BlcnR5TmFtZSI6ImRhdGUiLCJwcm9wZXJ0eVZhbHVlIjoidGluZGVycGVtaWxlZ2EifV0=,type:S|asset",
    immutableMetaProperties:
      "URI:S|aHR0cHM6Ly9kZW1vLWFzc2V0bWFudGxlLm15cGluYXRhLmNsb3VkL2lwZnMvUW1adU5nTXFpVTRpeW1rdWo1N1NFakxSNEdCYXdwSDhWNWdLM2FSM2dIREJ0Yy9nZy5wbmc=,name:S|ZG9jc2JhbmFkb2JoYWk=,description:S|cGxlYXNl=,category:S|YXJ0cw=",
  });
  let history = useHistory();
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
  const handleSubmit = async () => {
    console.log(NFTInputFields);
    const payload = { event_info: eventInputFields, nft_info: NFTInputFields };
    const data = await api.addEvent(payload);
    if (data.status) {
      showSuccessSnack(data.data);
    } else {
      showErrorSnack(data?.description);
    }
  };
  const _base64ToArrayBuffer = (base64) => {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const handleDrop = (file) => {
    let reader = new window.FileReader();
    reader.readAsDataURL(file.data);
    reader.onloadend = () => {
      let arrayBuff = null;
      arrayBuff = _base64ToArrayBuffer(reader.result.split(",")[1]);
      if (file.type === "contest") {
        setContestImage(arrayBuff);
      } else {
        setNFTImage(arrayBuff);
      }
    };
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        border: "1px solid white",
      },
      //   "&:hover": { border: "1px solid white" },
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    input: { color: "white" },
  };
  return (
    <article className="createventscreen">
      <section className="createventscreen_maincontainer">
        <div className="createventscreen_maincontainer_title">
          Create an Event
        </div>
        <div className="createventscreen_maincontainer_subtitle">
          Event Details
        </div>

        <div className="createventscreen_maincontainer_inputcontainer">
          <div className="flex justify-center items-center">
            <NFTDropzone type={"contest"} handleDrop={handleDrop} height="h-80" />
          </div>
          <div className="createventscreen_maincontainer_subtext justify-center items-center text-center m-0 p-0">
            Upload Event Banner
          </div>
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            label="Event Name"
            value={eventInputFields.name}
            onChange={(e) =>
              setEventInputFields({
                ...eventInputFields,
                name: e.target.value,
              })
            }
            sx={inputStyle}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            value={eventInputFields.description}
            onChange={(e) =>
              setEventInputFields({
                ...eventInputFields,
                description: e.target.value,
              })
            }
            sx={inputStyle}
            label="Event Description"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            value={eventInputFields.location}
            onChange={(e) =>
              setEventInputFields({
                ...eventInputFields,
                location: e.target.value,
              })
            }
            sx={inputStyle}
            label="Location"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            value={eventInputFields.category}
            onChange={(e) =>
              setEventInputFields({
                ...eventInputFields,
                category: e.target.value,
              })
            }
            sx={inputStyle}
            label="Category"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            value={eventInputFields.tickets_available}
            typinputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) =>
              setEventInputFields({
                ...eventInputFields,
                tickets_available: isNaN(parseInt(e.target.value, 10))
                  ? 0
                  : parseInt(e.target.value, 10),
              })
            }
            sx={inputStyle}
            label="No. of Tickets"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <div className="createventscreen_maincontainer_subtitle">
            NFT Details
          </div>
          <div className="flex justify-center items-center">
            <NFTDropzone type={"nft"} handleDrop={handleDrop} height="h-64" />
          </div>{" "}
          <div className="createventscreen_maincontainer_subtext justify-center items-center text-center m-0 p-0">
            Upload NFT Image
          </div>
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            label="NFT Name"
            value={NFTInputFields.name}
            onChange={(e) =>
              setNFTInputFields({
                ...NFTInputFields,
                name: e.target.value,
              })
            }
            sx={inputStyle}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            value={NFTInputFields.description}
            onChange={(e) =>
              setNFTInputFields({
                ...NFTInputFields,
                description: e.target.value,
              })
            }
            sx={inputStyle}
            label="NFT Description"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <div className="flex w-full createventscreen_maincontainer_subtext">
            <div className="">Claimables</div>
            <div
              onClick={() => {
                setNFTInputFields({
                  ...NFTInputFields,
                  claimable: [...NFTInputFields.claimable, ""],
                });
              }}
              className="ml-4"
            >
              <img src={plus_icon} alt="plus" />
            </div>
          </div>
          {NFTInputFields.claimable.map((value, index) => {
            return (
              <TextField
                id="outlined-basic"
                className="createventscreen_maincontainer_inputcontainer_inputfield"
                value={NFTInputFields.claimable[index]}
                onChange={(e) =>
                  setNFTInputFields({
                    ...NFTInputFields,
                    claimable: NFTInputFields.claimable.map((el, i) =>
                      i === index ? e.target.value : el
                    ),
                  })
                }
                sx={inputStyle}
                label={`Enter Claimable ${index + 1}`}
                variant="outlined"
                margin="dense"
                fullWidth
              />
            );
          })}
          <div className="flex w-full createventscreen_maincontainer_subtext">
            <div className="">Properties</div>
            <div
              onClick={() => {
                setNFTInputFields({
                  ...NFTInputFields,
                  properties: [
                    ...NFTInputFields.properties,
                    { propertyName: "", propertyValue: "" },
                  ],
                });
              }}
              className="ml-4"
            >
              <img src={plus_icon} alt="plus" />
            </div>
          </div>
          {NFTInputFields.properties.map((value, index) => {
            return (
              <div className="flex gap-5">
                <TextField
                  id="outlined-basic"
                  className="createventscreen_maincontainer_inputcontainer_inputfield"
                  value={value.propertyName}
                  onChange={(e) =>
                    setNFTInputFields({
                      ...NFTInputFields,
                      properties: NFTInputFields.properties.map((el, i) =>
                        i === index
                          ? {
                              propertyName: e.target.value,
                              propertyValue: el.propertyValue,
                            }
                          : el
                      ),
                    })
                  }
                  sx={inputStyle}
                  label={`Property ${index + 1}`}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  className="createventscreen_maincontainer_inputcontainer_inputfield"
                  value={value.propertyValue}
                  onChange={(e) =>
                    setNFTInputFields({
                      ...NFTInputFields,
                      properties: NFTInputFields.properties.map((el, i) =>
                        i === index
                          ? {
                              propertyValue: e.target.value,
                              propertyName: el.propertyName,
                            }
                          : el
                      ),
                    })
                  }
                  sx={inputStyle}
                  label={`Value ${index + 1}`}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
              </div>
            );
          })}
        </div>
      </section>
      <section className="createventscreen_bottomcontainer">
        <div
          onClick={handleSubmit}
          className="createventscreen_bottomcontainer_btncontainer"
        >
          Continue
        </div>
      </section>
    </article>
  );
}

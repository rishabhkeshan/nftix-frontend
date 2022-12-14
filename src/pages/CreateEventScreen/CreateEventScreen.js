import "./CreateEventScreen.scss";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Api from "../../utils/api";
import { useSnackbar } from "notistack";
import plus_icon from "../../assets/plus_icon.svg";
import NFTDropzone from "./NFTDropzone";
import axios from "axios";
import FormData from "form-data";
import AssetMantleFunctions from "../../blockchain/assetmantle";
import Loader from "../../components/Loader/Loader";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


export default function CreateEventScreen() {
  const [contestImage, setContestImage] = useState(null);
  const [nftImage, setNFTImage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

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
    toWallet: "",
    name: "",
    description: "",
    price: "10",
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
    setShowLoading(true);
    const mantleFunctions = new AssetMantleFunctions(
      localStorage.getItem("email")
    );
    console.log(NFTInputFields);
    if (nftImage && contestImage) {
      let res = await handleUpload(nftImage, nftImage.name, true);
      const nftImageUrl =
        "https://demo-assetmantle.mypinata.cloud/ipfs/" +
        res.IpfsHash +
        "/" +
        nftImage.name;
      let res2 = await handleUpload(contestImage, contestImage.name, true);
      const bannerImageUrl =
        "https://demo-assetmantle.mypinata.cloud/ipfs/" +
        res2.IpfsHash +
        "/" +
        contestImage.name;
      console.log(nftImageUrl, bannerImageUrl);

      const eif = eventInputFields;
      const nif = NFTInputFields;

      const walletId = JSON.parse(localStorage.getItem("deto")).wallet_id;
      mantleFunctions.walletId = walletId;
      eif.banner_url = bannerImageUrl;
      nif.image = nftImageUrl;

      const template = mantleFunctions.getMintTemplate(
        nif.name,
        nif.description,
        nif.image,
        nif.properties
      );
      nif.toID = template.value.toID;
      nif.fromID = template.value.fromID;
      nif.immutableMetaProperties = template.value.immutableMetaProperties;
      nif.immutableProperties = template.value.immutableMetaProperties;
      nif.mutableMetaProperties = template.value.mutableMetaProperties;
      nif.mutableMetaProperties = template.value.mutableMetaProperties;
      const user = JSON.parse(localStorage.getItem("deto"));
      nif.toWallet = user.wallet_id;
      const payload = {
        event_info: eventInputFields,
        nft_info: NFTInputFields,
      };
      const data = await api.addEvent(payload);
      if (data.status) {
        setShowLoading(false);
        showSuccessSnack(data.data);
        history.push("/myevents");
      } else {
        setShowLoading(false);
        showErrorSnack(data?.description);
      }
    } else {
      showErrorSnack("Please select images!");
    }
  };

  const handleDrop = (file) => {
    if (file.type === "contest") {
      setContestImage(file.data);
    } else {
      setNFTImage(file.data);
    }
  };

  const getApiConfig = async () => {
    const config = {
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjYwZmRmYi1lZmRjLTRmZTktOGYwYi1jZjg4OTExOGFmMjkiLCJlbWFpbCI6InB1bmVldEBwZXJzaXN0ZW5jZS5vbmUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTAyMWI1MWMzZWVlOGQ2NWU0MjciLCJzY29wZWRLZXlTZWNyZXQiOiJiNzQyMmQ5ZDNhNGQyNzViYmI0M2VhMDU1OTlmNzA2ODgzZTUxNjMyNzcxMjRiYjZlOWM5Yjg2YjBkZDBhNGUyIiwiaWF0IjoxNjM0NjQ5MTg4fQ.i514LU4xYYu95OvuZJ6vhWKgUqmXxnkhMMmDw-GmpCg`,
      },
    };
    return config;
  };

  const handleUpload = async (selectedFiles, customName, wrapWithDirectory) => {
    try {
      const data = new FormData();
      if (customName && customName !== "") {
        const metadata = JSON.stringify({
          name: customName,
        });
        data.append("pinataMetadata", metadata);
      }

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          data.append(`file`, file);
        });
      } else {
        data.append("file", selectedFiles, selectedFiles.name);
      }
      if (wrapWithDirectory === true) {
        const pinataOptions = JSON.stringify({
          wrapWithDirectory: true,
        });
        data.append("pinataOptions", pinataOptions);
      }
      const res = await axios.post(
        `https://api.pinata.cloud/pinning/pinFileToIPFS`,
        data,
        await getApiConfig()
      );
      return res.data;
    } catch (error) {
      console.log(error);
      //  Handle error
    }
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
        <Loader showLoading={showLoading} />
        <div className="createventscreen_maincontainer_title">
          Create an Event
        </div>
        <div className="createventscreen_maincontainer_subtitle">
          Event Details
        </div>

        <div className="createventscreen_maincontainer_inputcontainer">
          <div className="flex justify-center items-center">
            <NFTDropzone
              type={"contest"}
              handleDrop={handleDrop}
              height="h-80"
            />
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
            inputProps={{ maxLength: 20 }}
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
            inputProps={{ maxLength: 50 }}
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
            inputProps={{ maxLength: 10 }}
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
            type={"number"}
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
            inputProps={{ maxLength: 20 }}
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
            inputProps={{ maxLength: 20 }}
            sx={inputStyle}
            label="NFT Description"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="createventscreen_maincontainer_inputcontainer_inputfield"
            value={NFTInputFields.price}
            typinputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) =>
              setNFTInputFields({
                ...NFTInputFields,
                price: e.target.value,
              })
            }
            sx={inputStyle}
            type={"number"}
            label="Price"
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

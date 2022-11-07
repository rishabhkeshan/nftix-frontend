import "./EventBuyScreen.scss";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function PasswordModal({ passwordModal, handleClose, submit }) {
  const [password, setPassword] = useState("");
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
    <Modal
      open={passwordModal}
      onClose={handleClose}
      aria-labelledby="nft-buy"
      aria-describedby="password-enter"
      className="flex justify-center items-center modal outline-none"
    >
      <div
        style={{ backgroundColor: "#000000" }}
        className="w-80 p-8 rounded-xl"
      >
        <div className="font-bold text-xl mb-3">Sign Transaction</div>
        <TextField
          id="outlined-basic"
          className="loginscreen_maincontainer_inputcontainer_inputfield"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyle}
          type={"password"}
          label="Password"
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <div
          style={{ backgroundColor: "#074286" }}
          onClick={() => submit(password)}
          className="flex justify-center items-center p-3 mt-8 rounded-lg"
        >
          Submit
        </div>
      </div>
    </Modal>
  );
}

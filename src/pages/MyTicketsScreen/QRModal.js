import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import nftix_logo from "../../assets/nftix_logo_white.svg";
import { QrReader } from "react-qr-reader";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useSnackbar } from "notistack";
import QRCode from "react-qr-code";


export default function QRModal({ showQR,setShowQR,cValue }) {
  const [data, setData] = useState("No result");
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
  return (
    <Modal
      open={showQR}
      aria-labelledby="loader"
      aria-describedby="loading"
      className="align-middle justify-center items-center outline-none justify-items-center flex h-screen"
    >
      <div className="outline-none h-80 w-80 flex flex-col justify-center items-center">
        <div className="p-4 bg-white rounded-lg">
          <QRCode size={256} value={cValue} />
        </div>

        <div
          className="font-bold text-xl underline"
          onClick={() => {
            setShowQR(false);
          }}
        >
          Close
        </div>
      </div>
    </Modal>
  );
}

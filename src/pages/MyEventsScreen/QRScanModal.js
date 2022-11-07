import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import nftix_logo from "../../assets/nftix_logo_white.svg";
import { QrReader } from "react-qr-reader";
import { useSnackbar } from "notistack";

export default function QRScanModal({ showScanner }) {
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
      open={showScanner}
      aria-labelledby="loader"
      aria-describedby="loading"
      className="align-middle justify-center items-center outline-none justify-items-center flex h-screen"
    >
      <div className="outline-none h-80 w-80">
        <QrReader
        scanDelay={5000}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              console.log(result?.text);
              showSuccessSnack(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%", }}
        />
      </div>
    </Modal>
  );
}

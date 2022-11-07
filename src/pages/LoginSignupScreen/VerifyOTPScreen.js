import "./LoginScreen.scss";

// import Footer from "../../components/Footer/Footer";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import OtpInput from "react-otp-input";
import Api from "../../utils/api";
import { useSnackbar } from "notistack";

function VerifyOTPScreen() {
  const location = useLocation();
  const api = new Api();
  let history = useHistory();

  const [dashboardModal, setDashboardModal] = useState(false);
  const [OTPInputFields, setOTPInputFields] = useState({
    email: location.email,
    OTP: "",
    username: location.username,
  });

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
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  const handleSubmit = async () => {
    console.log(OTPInputFields);
    const data = await api.verify(OTPInputFields);
    if (data.status) {
      localStorage.setItem("jwt", data.data.token);
      localStorage.setItem("username", OTPInputFields.username);
      showSuccessSnack(`Welcome to nftix ${OTPInputFields.username}`);
      history.push("/");
    }
    else{
      showErrorSnack("User already exists/ Invaild OTP");
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
    <article className="loginscreen">
      <section className="loginscreen_maincontainer">
        <div className="loginscreen_maincontainer_title">Enter OTP</div>
        <div className="loginscreen_maincontainer_OTPcontainer">
          <OtpInput
            value={OTPInputFields.OTP}
            onChange={(otp) =>
              setOTPInputFields({
                ...OTPInputFields,
                OTP: otp,
              })
            }
            numInputs={4}
          />
          {/* <TextField
            id="outlined-basic"
            className="loginscreen_maincontainer_inputcontainer_inputfield"
            value={loginInputFields.password}
            onChange={(e) =>
              setLoginInputFields({
                ...loginInputFields,
                password: e.target.value,
              })
            }
            sx={inputStyle}
            label="Password"
            variant="outlined"
            margin="dense"
            fullWidth
          /> */}
        </div>
      </section>
      <section className="loginscreen_bottomcontainer">
        {/* <div className="loginscreen_bottomcontainer_textcontainer">
          New User?{" "}
          <span className="loginscreen_bottomcontainer_textcontainer_highlighttext">
            <Link to="/signup">Sign up here</Link>
          </span>
        </div> */}
        <div
          onClick={handleSubmit}
          className="loginscreen_bottomcontainer_btncontainer"
        >
          Continue
        </div>
      </section>
    </article>
  );
}

export default VerifyOTPScreen;

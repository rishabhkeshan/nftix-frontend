import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Header from "./components/Header/Header";
import LoginScreen from "./pages/LoginSignupScreen/LoginScreen";
import SignupScreen from "./pages/LoginSignupScreen/SignupScreen";
import VerifyOTPScreen from "./pages/LoginSignupScreen/VerifyOTPScreen";
import Footer from "./components/Footer/Footer";
import MyTicketsScreen from "./pages/MyTicketsScreen/MyTicketsScreen";
import AboutScreen from "./pages/AboutScreen/AboutScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import MyEventsScreen from "./pages/MyEventsScreen/MyEventsScreen";
import CreateEventScreen from "./pages/CreateEventScreen/CreateEventScreen";
import EventBuyScreen from "./pages/EventBuyScreen/EventBuyScreen";

//check user login or not
// const token = localStorage.getItem("authorizationToken")
// const loggedInUser = JSON.parse(localStorage.getItem("user"))

const App = () => (
  <Router>
    <Header/>
    <Switch>
      <Route exact path="/" component={HomeScreen}/>
      <Route exact path="/login" component={LoginScreen}/>
      <Route exact path="/signup" component={SignupScreen}/>
      <Route exact path="/verify" component={VerifyOTPScreen}/>
      <Route exact path="/mytickets" component={MyTicketsScreen}/>
      <Route exact path="/myevents" component={MyEventsScreen}/>
      <Route exact path="/about" component={AboutScreen}/>
      <Route exact path="/profile" component={ProfileScreen}/>
      <Route exact path="/create" component={CreateEventScreen}/>
      <Route exact path="/event/:_id" component={EventBuyScreen}/>


    </Switch>
    <Footer/>
  </Router>
);

export default App;

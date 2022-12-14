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
import EventScreen from "./pages/MyEventsScreen/EventScreen";
import TicketScreen from "./pages/MyTicketsScreen/TicketScreen";
import TestScreen from "./pages/TesterScreen/TestScreen";
import WalletCreationScreen from "./pages/LoginSignupScreen/WalletCreationScreen";

//check user login or not
// const token = localStorage.getItem("authorizationToken")
// const loggedInUser = JSON.parse(localStorage.getItem("user"))

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/signup" component={SignupScreen} />
        <Route exact path="/verify" component={VerifyOTPScreen} />
        <Route exact path="/wallet-create" component={WalletCreationScreen} />
        <Route exact path="/mytickets" component={MyTicketsScreen} />
        <Route exact path="/myevents" component={MyEventsScreen} />
        <Route exact path="/about" component={AboutScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/create" component={CreateEventScreen} />
        <Route exact path="/event/:_id" component={EventBuyScreen} />
        <Route exact path="/myevent/:_id" component={EventScreen} />
        <Route exact path="/ticket/:_id" component={TicketScreen} />
        <Route exact path="/test" component={TestScreen} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;

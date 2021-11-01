// then based on the path show each components using react-router components
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import FullCalendar from './components/Calendar/Calendar';
import TopNav from './components/TopNav/TopNav';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/booking/Home";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={FullCalendar} />
        <PrivateRoute exact path="/dashboard/admin" component={FullCalendar} />
        <Route exact path="/calendar" component={FullCalendar} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

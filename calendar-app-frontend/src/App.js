// import those pages in App.js
// then based on the path show each components using react-router components
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav/TopNav";
import PrivateRoute from "./components/PrivateRoute";
import NewRoom from "./pages/rooms/NewRoom";
import EditRoom from './pages/rooms/EditRoom'
import ViewRoom from './pages/rooms/ViewRoom'
// components
import Home from "./pages/booking/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardAdmin from './pages/user/admin/DashboardAdmin'


function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/rooms/new" component={NewRoom} />
        <PrivateRoute exact path="/dashboard" component={DashboardAdmin} />
        <PrivateRoute exact path="/room/edit/:hotelId" component={EditRoom} />
        <Route exact path="/rooms/:roomId" component={ViewRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

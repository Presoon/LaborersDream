import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Navtop from "../components/layout/Navtop";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Tickets from "../pages/Tickets";
import NewTicket from "../pages/NewTicket";
import Inventory from "../pages/Inventory";
import InventoryAdd from "./subpages/InventoryAdd";
// import InventoryScrapped from "./subpages/InventoryScrapped";
// import InventoryEdit from "./subpages/InventoryEdit";
import Check from "../pages/Check";
import Localizations from "../pages/Localizations";
import UsersLayout from "./UsersLayout";

class MainLayout extends Component {
  render() {
    return (
      <>
        <div id="wrapper">
          <Navbar />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Navtop />
              <div className="container-fluid">
                <Route path="/home" exact component={Home} />
                <Route path="/newticket" component={NewTicket} />
                <Route path="/tickets" component={Tickets} />
                <Route path="/inventory" exact component={Inventory} />
                <Route path="/inventory/add" component={InventoryAdd} />
                {/* <Route path="/inventory/edit" component={InventoryEdit} />
                <Route path="/inventory/scrapped" component={InventoryScrapped} /> */}
                <Route path="/check" component={Check} />
                <Route path="/users" component={UsersLayout} />
                <Route path="/localizations" component={Localizations} />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default MainLayout;

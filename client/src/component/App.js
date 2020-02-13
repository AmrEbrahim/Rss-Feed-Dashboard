import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import Sidebar from "./Sidebar";
import NewFeed from "./NewFeed";
import RssContent from "./Content";
import FeedDelete from "./DeleteFeed";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./colors.css";

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <div className="row">
          <Sidebar />
          <div className="col-lx-9 col-md-9 col-sm-12 p-0 bg-bage d-flex justify-content-center">
            <div className="col-11 p-0">
              <NewFeed />
              <div
                // style={{div:nth-child(2n+1) }}
                className="bg-white mt-5 border"
                style={{ height: "55vh", overflowY: "scroll" }}
              >
                <Route path="/rss/:id" exact component={RssContent}></Route>
                <Route path="/delete/:id" exact component={FeedDelete}></Route>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Videos from "./videos/Videos";
import VideoView from "./videos/VideoView";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    {/* pages */}
    <RouteWithSidebar exact path={Routes.Dashboard.path} component={Videos} />
    <RouteWithSidebar exact path={Routes.Videos.path} component={Videos} />
    <RouteWithSidebar
      exact
      path={Routes.VideoView.path}
      component={VideoView}
    />
  </Switch>
);

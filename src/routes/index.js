import React from "react";
import {Route, Switch ,Router} from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import SidebarContent from "../containers/Sidebar/SidebarContent";

const App = ({match}) => (

  <div className="gx-main-content-wrapper">

    <Switch>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage/index'))}/>
      <Route path={`${match.url}content`} component={asyncComponent(() => import('./SamplePage/contet'))}/>
    </Switch>
  </div>

);

export default App;

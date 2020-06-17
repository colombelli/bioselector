/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import UserPage from "views/User.jsx";

import Project from "views/Project.jsx";
import Datasets from "views/Datasets.jsx";
import Experiments from "views/Experiments/Experiments.jsx";
import Analysis from "views/Analysis.jsx";
import Selection from "views/Selection.jsx";
import Classifier from "views/Classifier.jsx";
import Guide from "views/Guide.jsx";

var routes = [
  {
    path: "/project",
    name: "Project",
    icon: "nc-icon nc-paper",
    component: Project,
    layout: "/index"
  },
  {
    path: "/datasets",
    name: "Datasets",
    icon: "nc-icon nc-bullet-list-67",
    component: Datasets,
    layout: "/index"
  },
  {
    path: "/experiments",
    name: "Experiments",
    icon: "nc-icon nc-atom",
    component: Experiments,
    layout: "/index"
  },
  {
    path: "/analysis",
    name: "Analysis",
    icon: "nc-icon nc-chart-pie-36",
    component: Analysis,
    layout: "/index"
  },
  {
    path: "/selection",
    name: "Selection",
    icon: "nc-icon nc-bulb-63",
    component: Selection,
    layout: "/index"
  },
  {
    path: "/classifier",
    name: "Classifier",
    icon: "nc-icon nc-compass-05",
    component: Classifier,
    layout: "/index"
  },
  {
    path: "/guide",
    name: "Guide",
    icon: "nc-icon nc-hat-3",
    component: Guide,
    layout: "/index"
  },
/*

  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/index"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/index"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/index"
  },
*/

];
export default routes;

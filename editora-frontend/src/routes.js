import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import Noticias from "views/Noticias.jsx";

const dashboardRoutes = [
  {
    path: "/noticias",
    name: "Gestão de Notícias",
    icon: "pe-7s-note2",
    component: Noticias,
    layout: "/admin"
  },
  {
    path: "/desenvolvimento",
    name: "Desenvolvimento",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  }
  
];

export default dashboardRoutes;

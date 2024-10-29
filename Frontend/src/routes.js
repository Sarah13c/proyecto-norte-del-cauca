import { MdPerson, MdHome, MdSecurity, MdHealthAndSafety, MdBook, MdWarning } from "react-icons/md";
import { FaChartLine} from 'react-icons/fa';
import MainDashboard from "./pages/dashboard/inicio";
import Profile from "./pages/dashboard/demografia";
import Health from "./pages/dashboard/salud";
import Security from "./pages/dashboard/seguridad";
import Violence from "./pages/dashboard/violencia";
import Education from "./pages/dashboard/educacion";


const routes = [
  {
    name: "Inicio",
    layout: "/dashboard",
    path: "/inicio",
    icon: MdHome,
    component: MainDashboard,
  },
  {
    name: "Indicadores",
    category: true,
    items: [
      {
        name: "Demografía",
        layout: "/dashboard",
        path: "/demografia",
        icon: MdPerson,
        component: Profile,
      },
      {
        name: "Salud",
        layout: "/dashboard",
        path: "/salud",
        icon: MdHealthAndSafety,
        component: Health,
      },
      {
        name: "Seguridad",
        layout: "/dashboard",
        path: "/seguridad",
        icon: MdSecurity,
        component: Security,
      },
      {
        name: "Violencia",
        layout: "/dashboard",
        path: "/violencia",
        icon: MdWarning,
        component: Violence,
      },
      {
        name: "Educación",
        layout: "/dashboard",
        path: "/educacion",
        icon: MdBook,
        component: Education,
      },
      {
        name: "Modelo Predictivo",
        icon: FaChartLine, 
        external: "http://93.127.213.95:5003",
      },
    ],
  },
];

export default routes;

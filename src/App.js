import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ModalComponent from "./components/ModalComponent";
import Dashboard from "./components/Dashboard";
import TotalDownloads from "./components/TotalDownloads";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { setAuthorizationToken } from "./axios/instance";
import apis from "./axios/api";

function App() {
  const [dashboardData, setdashboardData] = useState(null);

  const auth = localStorage.getItem("token");
  useEffect(() => {
    console.log(auth);
    if (auth) {
      console.log("Hello");
      setAuthorizationToken(JSON.parse(auth));
    }
  }, [auth]);

  const GetData = async () => {
    try {
      const result = await apis.getLatestStats();
      console.log(result);
      const key = Object.keys(result?.data).map((dt) => {
        const val = dt.replaceAll("_", " ");
        return val;
      });
      const values = Object.values(result?.data);
      console.log(key, values);

      let arr = [];
      for (let i = 0; i < key.length; i++) {
        let obj = {};
        // obj[key[i]] = values[i]
        obj["name"] = key[i];
        obj["value"] = values[i];
        arr.push(obj);
      }
      console.log(arr);
      setdashboardData(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) GetData();
  }, [auth]);

  // if (!auth) {
  //   return (
  //   <Router>
  //     <Routes>
  //       <Route path="*" element={<Login />}/>
  //     </Routes>
  //   </Router>
  //   )
  // }
  return (
    <div className="App">
      <Router>
        <Routes>
         <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Dashboard dashboardData={dashboardData} />}
          />
          <Route
            path="/totaldownloads"
            element={<TotalDownloads data={dashboardData} />}
          ></Route>
         
          <Route path="/Modal" element={<ModalComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

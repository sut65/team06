import Home from "./components/Home";
import HomeStudent from "./components/Home-Student";
import HomeAdmin from "./components/Home-Admin";
import DataStudent from "./components/Student/DataStudent";
import CreateStudent from "./components/Student/CreateStudent";
import UpdateStudent from "./components/Student/UpdateStudent";
import SearchStudent from "./components/Student/SearchStudent";
import StudentLogin from "./components/Login-Student";
import AdminLogin from "./components/Login-Admin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/StudentLogin" element={<StudentLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/HomeStudent" element={<HomeStudent />} />
          <Route path="/HomeAdmin" element={<HomeAdmin />} />
          <Route path="/DataStudent" element={<DataStudent />} />
          <Route path="/CreateStudent" element={<CreateStudent />} />
          <Route path="/DataStudent/UpdateStudent/:id" element={<UpdateStudent />} />
          <Route path="/DataStudent/SearchStudent/:id" element={<SearchStudent />} />

        </Routes>

  );
}
export default App;

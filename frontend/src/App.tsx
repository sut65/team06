import Home from "./components/Home";
import HomeStudent from "./components/Home-Student";
import HomeAdmin from "./components/Home-Admin";
import DataStudent from "./components/Student/DataStudent";
import CreateStudent from "./components/Student/CreateStudent";
import UpdateStudent from "./components/Student/UpdateStudent";
import SearchStudent from "./components/Student/SearchStudent";
import StudentLogin from "./components/Login-Student";
import AdminLogin from "./components/Login-Admin";
import DataCourse from "./components/Course/DataCourse";
import CreateCourse from "./components/Course/CreateCourse";
import UpdateCourse from "./components/Course/UpdateCourse";
import SearchCourse from "./components/Course/SearchCourse";

import CreateAdmin from "./components/Admin/CreateAdmin";
import DataAdmin from "./components/Admin/DataAdmin";
import UpdateAdmin from "./components/Admin/UpdateAdmin";

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
          <Route path="/DataCourse" element={<DataCourse />} />
          <Route path="/CreateCourse" element={<CreateCourse />} />
          <Route path="/DataCourse/UpdateCourse/:id" element={<UpdateCourse />} />
          <Route path="/DataCourse/SearchCourse/:id" element={<SearchCourse />} />

          <Route path="/CreateAdmin" element={<CreateAdmin />} />         
          <Route path="/DataAdmin" element={<DataAdmin />} />
          <Route path="/DataAdmin/UpdateAdmin/:id" element={<UpdateAdmin/>} />
          
        </Routes>

  );
}
export default App;

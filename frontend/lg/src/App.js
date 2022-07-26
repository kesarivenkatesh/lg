import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./Components/User";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import UserCourses from "./Components/UserCourses";
import About from "./Components/About";
import ContributorLogin from "./Components/ContributorLogin";
import ContributorHome from "./Components/ContributorHome";
import ContributorSignup from "./Components/ContributorSignup";
import ContributorAdd from "./Components/ContributorAdd";
import Adminlogin from "./Components/Adminlogin";
import AdminHome from "./Components/AdminHome";
import UploadCoursePdf from "./Components/UploadCoursePdf";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>

          <Route path="/about" element={<About />}></Route>

          <Route path="/user/login" element={<Home />}></Route>
          <Route path="/user/register" element={<User />}></Route>
          <Route path="/user/homepage" element={<UserCourses />}></Route>

          <Route path="/admin/login" element={<Adminlogin />}></Route>
          <Route path="/admin/homepage" element={<AdminHome />}></Route>

          <Route
            path="/contributor/signup"
            element={<ContributorSignup />}
          ></Route>
          <Route
            path="/contributor/login"
            element={<ContributorLogin />}
          ></Route>
          <Route
            path="/contributor/homepage"
            element={<ContributorHome />}
          ></Route>
          <Route path="/contributor/add" element={<ContributorAdd />}></Route>
          <Route path="/upload" element={<UploadCoursePdf />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

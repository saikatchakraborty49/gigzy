//Edit job button for client ka functionality is left
// accept reject proposal is left --- DONE
// payment integration --- PAYOUT IS LEFT
// chat box
// Log out modal 
// proposal which are pending can only be seen by client
// archived proposal ka api banao
// agar job ka proposal accept ho gaya toh voh koi aur page pe jayega --- ONGOING PROPOSAL PE JAYEGA

import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Components/Core/Dashboard/SidebarElements/Common/MyProfile";
import Settings from "./Components/Core/Dashboard/SidebarElements/Common/Settings";
import JobsPosted from "./Components/Core/Dashboard/SidebarElements/Client/JobsPosted";
import { useDispatch, useSelector } from "react-redux";
import MyJobs from "./Components/Core/Dashboard/SidebarElements/Freelancer/MyJobs";
import BrowseJobs from "./Components/Core/Dashboard/SidebarElements/Freelancer/BrowseJobs";
import PostAJob from "./Components/Core/Dashboard/SidebarElements/Client/PostAJob";
import CategoryPage from "./Pages/CategoryPage";
import SendProposalFrom from "./Components/Core/Dashboard/SidebarElements/Freelancer/BrowseJob.jsx/SendProposalFrom";
import SeeProposal from "./Components/Core/Dashboard/SidebarElements/Client/SeeProposal";
import OngoingJobs from "./Components/Core/Dashboard/SidebarElements/Client/OngoingJobs";
import CompletedJobs from "./Components/Core/Dashboard/SidebarElements/Client/CompletedJobs";
import SeeMoreOngoingJob from "./Components/Core/Dashboard/SidebarElements/Client/Components/SeeMoreOngoingJob";
import SeeMoreCompletedJob from "./Components/Core/Dashboard/SidebarElements/Client/Components/SeeMoreCompletedJob";
import JobDetails from "./Components/Core/Dashboard/SidebarElements/Freelancer/MyJobsComponent/JobDetails";
import { useEffect } from "react";
import Withdraw from "./Components/Core/Razorpay/Withdraw";
import VerifyContactNumber from "./Components/Core/Dashboard/SidebarElements/Common/VerifyContactNumber";
import FileComplaint from "./Components/Core/Dashboard/SidebarElements/Client/Components/FileComplaint";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
  const {user}=useSelector((state)=>state.profile)
    
  return (
   <div className="bg-richblack-900 flex flex-col items-center justify-between  min-h-screen h-auto w-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/log-in" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
          } />
        <Route path="/sign-up" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
          } />
        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>
            <Route path="my-profile" element={<MyProfile/>}/>
            <Route path="settings" element={<Settings/>}/>
            <Route path="withdraw" element={<Withdraw/>}/>
            <Route path="verify-contact-number" element={<VerifyContactNumber/>}/>


            {
              user?.role=="Client" && (
                <>
                  <Route path="jobs-posted" element={<JobsPosted/>}/>
                  <Route path="post-a-job" element={<PostAJob/>}/>
                  <Route path="ongoing-jobs" element={<OngoingJobs/>}/>
                  <Route path="completed-jobs" element={<CompletedJobs/>}/>
                  <Route path="see-proposals/:jobId" element={<SeeProposal/>}/>
                  <Route path="see-more-ongoing-job/:jobId" element={<SeeMoreOngoingJob/>}/>
                  <Route path="see-more-completed-job/:jobId" element={<SeeMoreCompletedJob/>}/>
                  <Route path="file-a-complaint/:jobId" element={<FileComplaint/>}/>
                </>
              )
            }

            {
              user?.role=="Freelancer" && (
                <>
                  <Route path="my-jobs" element={<MyJobs/>}/>
                  <Route path="browse-jobs" element={<BrowseJobs/>}/>
                  <Route path="send-proposal/:jobId" element={<SendProposalFrom/>}/>
                  <Route path="job/:jobId" element={<JobDetails/>}/>
                </>
              )
            }
          </Route>
      </Routes>
      <Footer/>
   </div>
  );
}

export default App;

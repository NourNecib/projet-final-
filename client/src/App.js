import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import './App.css';
import NavigationBar from './Components/NavigationBar';
import ReportForm from "./Components/ReportForm";
import MyReports from "./Components/MyReports";
import AdminReports from "./Components/AdminReports";
import ParkingMap from "./Components/ParkingMap";
import AdminParkingMap from "./Components/AdminParkingMap";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Dashboard/>
      <Routes>
        
        {/* <Route path="/" element={<ParkingMap />} /> */}
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute allowedRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
         path="/report"
         element={
          //  <PrivateRoute allowedRole="user">
             <ReportForm />
          //  </PrivateRoute>
  }
         />
         <Route
         path="/my-reports"
         element={
           <PrivateRoute allowedRole="user">
             <MyReports />
            </PrivateRoute>
  }
/>
         <Route
         path="/admin-reports"
         element={
            <PrivateRoute allowedRole="admin">
              <AdminReports />
           </PrivateRoute>
  }
/>

<Route path="/test" element={<AdminParkingMap/>} />
      </Routes>
    </Router>
  );
}
export default App;
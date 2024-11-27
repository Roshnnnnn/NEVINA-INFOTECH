import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        {/* <Sidebar /> */}
        <Outlet />
      </div>
    </>
  );
}

export default App;

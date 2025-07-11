import "./App.css";
import MyRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter> {/* Wrap routes with BrowserRouter */}
      <div className="App">
        <ToastContainer/>
        <MyRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;

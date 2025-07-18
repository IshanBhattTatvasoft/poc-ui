import "./App.css";
import MyRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketProvider } from "./context/WebSocketContext";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Wrap routes with BrowserRouter */}
      <WebSocketProvider>
        <div className="App">
          <ToastContainer />
          <MyRoutes />
        </div>
      </WebSocketProvider>
    </BrowserRouter>
  );
}

export default App;

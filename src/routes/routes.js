import { Route, Routes } from "react-router-dom";
import ToDoList from "../components/ToDoList";
import HomePage from "../components/HomePage"; // import HomePage if needed

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-tasks" element={<ToDoList />} />
    </Routes>
  );
}

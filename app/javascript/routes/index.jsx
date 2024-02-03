import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "../components/TodoList";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<TodoList />} />
    </Routes>
  </Router>
);

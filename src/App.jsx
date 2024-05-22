import React from "react";
import Login from "./components/login/Login";
import Todo from "./components/todo/Todo";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/todo" element={<Todo />} />
            </Routes>
        </BrowserRouter>
    </>;
}
export default App;
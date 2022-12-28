import "./App.css";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import { useState } from "react";
import NoteState from "./Context/Notes/NoteState";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/SignUp";


function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.classList.add('bg-gray-900');
    } else {
      setMode("light");
      document.body.classList.remove('bg-gray-900');

    }
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <div className={mode}>
            <NavBar toggleMode={toggleMode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

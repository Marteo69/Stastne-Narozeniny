// Vsechno nejlepsi

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Puzzle from "./Puzzle";
import Win from "./Win";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Puzzle/>} />
        <Route path="/Vsechno-Nejlepsi" element={<Win/>}/>
      </Routes>
    </BrowserRouter>
  )
}
// Vsechno nejlepsi

import { HashRouter, Route, Routes } from "react-router-dom";
import Puzzle from "./Puzzle";
import Win from "./Win";

export default function App() {
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<Puzzle/>} />
        <Route path="/Vsechno-Nejlepsi" element={<Win/>}/>
      </Routes>
    </HashRouter>
  )
}

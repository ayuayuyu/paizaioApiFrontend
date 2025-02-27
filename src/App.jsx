import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Paiza from "./Paiza";\
import FixCode from "./components/FixCode";
import GetCode from "./components/GetCode";
import Room from "./components/Room";
import Home from "./components/Home";
import Explanation from "./components/Explanation";
import TestFixCode from "./components/TestFixCode";
import TestSeikai from "./components/TestSeikai";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/Explanation`} element={<Explanation />} />
        <Route path={`/Room`} element={<Room />} />
        <Route path={`/Get`} element={<GetCode />} />
        <Route path={`/Fix`} element={<FixCode />} />
        <Route path={`/Test`} element={<TestFixCode />} />
        <Route path={`/Tests`} element={<TestSeikai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

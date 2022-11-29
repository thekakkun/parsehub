import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  return (
    <Router>
      <Breadcrumb></Breadcrumb>
    </Router>
  );
}

export default App;

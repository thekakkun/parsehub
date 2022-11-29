import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Breadcrumb from "./components/Explorer/Breadcrumb";
import Files from "./components/Explorer/Files";

function App() {
  return (
    <Router>
      <Breadcrumb></Breadcrumb>
      <Files></Files>
    </Router>
  );
}

export default App;

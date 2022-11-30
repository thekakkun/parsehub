import { BrowserRouter as Router } from "react-router-dom";

import styles from "./App.module.scss";
import Breadcrumb from "./components/Breadcrumb";
import Files from "./components/Files";

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Breadcrumb></Breadcrumb>
        <Files></Files>
      </Router>
    </div>
  );
}

export default App;

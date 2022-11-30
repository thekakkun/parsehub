import { Link } from "react-router-dom";

import styles from "./Breadcrumb.module.scss";
import useBreadcrumbLevels from "../hooks/useBreadcrumbLevels";

export default function Breadcrumb() {
  let breadcrumbLevels = useBreadcrumbLevels();

  return (
    <nav>
      <ol className={styles.wrapper}>
        <li className={styles.link}>
          <Link to="/">🏠 root</Link>
        </li>
        {breadcrumbLevels.map((level) => (
          <li key={level.name} className={styles.link}>
            <Link to={level.link}>{level.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

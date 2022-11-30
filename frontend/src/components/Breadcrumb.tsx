import { Link } from "react-router-dom";

import styles from "./Breadcrumb.module.scss";
import useBreadCrumbElements from "../hooks/useBreadcrumbElements";

export default function Breadcrumb() {
  let breadcrumbElements = useBreadCrumbElements();

  return (
    <nav>
      <ol className={styles.wrapper}>
        <li className={styles.link}>
          <Link to="/">root</Link>
        </li>
        {/* #TODO: only show levels below 'root' element. */}
        {breadcrumbElements.map((level) => (
          <li key={level.name} className={styles.link}>
            <Link to={level.link}>{level.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

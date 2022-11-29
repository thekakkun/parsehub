import { Link } from "react-router-dom";
import useBreadcrumbLevels from "../../hooks/useBreadcrumbLevels";

export default function Breadcrumb() {
  let breadcrumbLevels = useBreadcrumbLevels();

  return (
    <nav>
      <ol>
        {breadcrumbLevels.map((level) => (
          <li key={level.name}>
            <Link to={level.link}>{level.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

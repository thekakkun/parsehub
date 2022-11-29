import { useLocation } from "react-router-dom";

export default function useBreadcrumbLevels() {
  const location = useLocation();
  const pathComponents = location.pathname.split("/");

  return pathComponents.filter(Boolean).map((path, i) => ({
    link: pathComponents.slice(0, i + 2).join("/"),
    name: path,
  }));
}

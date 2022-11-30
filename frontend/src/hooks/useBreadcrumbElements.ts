import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface BreadcrumbElement {
  name: string;
  link: string;
}

export default function useBreadcrumbElements() {
  const location = useLocation();

  const [bcElements, setBcElements] = useState<BreadcrumbElement[]>([]);

  useEffect(() => {
    setBcElements(path2BcElements(location.pathname));
  }, [location.pathname]);

  return bcElements;
}

/**
 * Break down current url path for use in breadcrumb.
 * @param path Current path
 * @returns List of BreadcrumbElement objects, for each level of the current path from shallowest to deepest level.
 */
function path2BcElements(path: string): BreadcrumbElement[] {
  const pathComponents = path.split("/").filter(Boolean);

  return pathComponents.map((path, i) => ({
    name: path,
    link: pathComponents.slice(0, i + 1).join("/"),
  }));
}

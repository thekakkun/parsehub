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

function path2BcElements(path: string): BreadcrumbElement[] {
  const pathComponents = path.split("/").filter(Boolean);

  return pathComponents.map((path, i) => ({
    name: path,
    link: pathComponents.slice(0, i + 1).join("/"),
  }));
}

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Response } from "../types/explorer";

export default function useFileContents(): Response | null {
  const [response, setResponse] = useState<null | Response>(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchContents() {
      let response = await fetch(
        `http://localhost:5000/path${location.pathname}`
      );
      let contents: Response = await response.json();

      setResponse(contents);
    }

    fetchContents();
  }, [location.pathname]);

  return response;
}

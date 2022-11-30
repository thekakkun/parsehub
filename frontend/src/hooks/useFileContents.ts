import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Response, Error } from "../types/explorer";

export default function useFileContents() {
  const [response, setResponse] = useState<null | Response>(null);
  const [error, setError] = useState<null | Error>(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchContents() {
      let response = await fetch(
        `http://localhost:5000/path${location.pathname}`
      );
      let contents: Response | Error = await response.json();

      if ("error" in contents) {
        setError(contents);
      } else {
        setResponse(contents);
      }
    }

    fetchContents();
  }, [location.pathname]);

  return error || response;
}

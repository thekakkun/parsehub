import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DB_URL = "http://localhost:5000";

interface Directory {
  name: string;
  type: "dir";
  content: { [contentName: string]: { type: "file" | "dir" } };
}
interface File {
  name: string;
  type: "file";
  content: string;
}

type Response = Directory | File;

interface Error {
  error: string;
}

/**
 * Attempt to get contents of path.
 * @returns Contents of target path or error.
 */
export default function useFileContents() {
  const location = useLocation();
  const [response, setResponse] = useState<null | Response>(null);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    async function fetchContents() {
      try {
        let response = await fetch(`${DB_URL}/path${location.pathname}`);
        let contents: Response | Error = await response.json();

        if ("error" in contents) {
          setError(contents);
        } else {
          setResponse(contents);
        }
      } catch (e) {
        setError({ error: String(e) });
      }
    }

    fetchContents();
  }, [location.pathname]);

  return response || error;
}

import { Link } from "react-router-dom";

import styles from "./Files.module.scss";
import useFileContents from "../hooks/useFileContents";

export default function Files() {
  const response = useFileContents();

  if (response === null) {
    return <p>...</p>;
  } else if ("error" in response) {
    return <p>{response.error}</p>;
  } else if (response.type === "dir") {
    return (
      <ol className={styles.wrapper}>
        {Object.entries(response.content).map(([k, v]) => (
          <li key={k} className={styles.item}>
            <Link to={k} relative="path">
              {`${(v as any).type === "dir" ? "📁" : "📄"} ${k}`}
            </Link>
          </li>
        ))}
      </ol>
    );
  } else if (response.type === "file") {
    return <p>{response.content}</p>;
  } else {
    return <p>Unknown type</p>;
  }
}

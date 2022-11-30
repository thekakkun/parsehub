import { Link } from "react-router-dom";

import styles from "./Files.module.scss";
import useFileContents from "../hooks/useFileContents";

export default function Files() {
  const files = useFileContents();

  if (files === null) {
    return <p>Not found!</p>;
  } else if (files.type === "dir") {
    return (
      <ol className={styles.wrapper}>
        {Object.entries(files.content).map(([k, v]) => (
          <li key={k} className={styles.item}>
            <Link to={k} relative="path">
              {`${(v as any).type === "dir" ? "📁" : "📄"} ${k}`}
            </Link>
          </li>
        ))}
      </ol>
    );
  } else if (files.type === "file") {
    return <p>{files.content}</p>;
  } else {
    return <p>Unknown type</p>;
  }
}

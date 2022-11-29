import { Link } from "react-router-dom";
import useFileContents from "../../hooks/useFileContents";

export default function Files() {
  const files = useFileContents();

  if (files === null) {
    return <p>Not found!</p>;
  } else if (files.type === "dir") {
    return (
      <ol>
        {Object.entries(files.content).map(([k, v]) => (
          <li key={k}>
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

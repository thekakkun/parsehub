import useFileContents from "../../hooks/useFileContents";

export default function Files() {
  const files = useFileContents();

  return (
    <ol>
      {files &&
        Object.entries(files.content).map(([k, v]) => (
          <li key={k}>{`${k}: ${v.type}`}</li>
        ))}
    </ol>
  );
}

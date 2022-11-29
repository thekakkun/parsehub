interface Directory {
  type: "dir";
  contents: { [string]: { type: "file" | "dir" } };
}

interface File {
  type: "file";
  contents: string;
}

export interface Response {
  name: string;
  type: "file" | "dir";
  content: Directory | File;
}

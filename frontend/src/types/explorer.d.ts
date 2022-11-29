interface Directory {
  name: string;
  type: "dir";
  content: { [string]: { type: "file" | "dir" } };
}

interface File {
  name: string;
  type: "file";
  content: string;
}

export type Response = Directory | File;

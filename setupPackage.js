import fs from "fs";
import path from "path";

const __dirname = path.resolve();

function main() {
  const source = fs.readFileSync(__dirname + "/package.json").toString("utf-8");
  const sourceObj = JSON.parse(source);
  sourceObj.main = "./index.es.js";
  sourceObj.types = "./index.es.d.ts";
  sourceObj.module = "./index.es.js";
  sourceObj.exports = {
    ".": {
      types: "./index.es.d.ts",
      import: "./index.es.js",
      require: "./index.es.js",
      "./style.css": "./style.css",
    },
  };
  console.log(sourceObj);
  if (sourceObj.main.startsWith("/dist/")) {
    sourceObj.main = sourceObj.main.slice(5);
  }
  fs.writeFileSync(
    __dirname + "/dist/package.json",
    Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8")
  );

  fs.copyFileSync(__dirname + "/README.md", __dirname + "/dist/README.md");
}

main();

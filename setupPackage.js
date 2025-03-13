import fs from "fs";
import path from "path";

const __dirname = path.resolve();

function main() {
  const source = fs.readFileSync(__dirname + "/package.json").toString("utf-8");
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};
  if (sourceObj.main.startsWith("/dist/")) {
    sourceObj.main = sourceObj.main.slice(5);
  }
  fs.writeFileSync(
    __dirname + "/dist/package.json",
    Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8")
  );
}

main();

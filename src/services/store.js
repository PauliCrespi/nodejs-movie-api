const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const dataDir = path.join(__dirname, "../../data");

async function load(name) {
  try {
    const text = await readFile(path.join(dataDir, `${name}.json`), "utf8");
    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function save(name, data) {
  await writeFile(
    path.join(dataDir, `${name}.json`),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

module.exports = { load, save };

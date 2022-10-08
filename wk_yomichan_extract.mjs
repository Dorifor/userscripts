import { open, writeFile } from "node:fs/promises";

let filehandle;

try {
  filehandle = await open("kanji_meta_bank_1.json", "r");
  const filecontent = JSON.parse(await filehandle.readFile({ encoding: "utf-8" }));
  const kanjiLevelList = {}
  filecontent.forEach(kanji => {
    kanjiLevelList[kanji[0]] = kanji[2];
  })
  writeFile("kanji_level.json", JSON.stringify(kanjiLevelList)).then(() => console.log("finito"))
} finally {
  await filehandle?.close();
}

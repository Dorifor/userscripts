// I just got myself a visually similar kanji db from https://lars.yencken.org/datasets/kanji-confusion/ and I want to only keep values >= 2
// Abandoned probably, a year later I rediscover this I don't even remember starting it.
// It must have been a start for a 'similar kanji' addon for JPDB

const yaml = require('js-yaml');
const fs = require('fs');

const similarDB = {}

// Get document, or throw exception on error
try {
  const kanjiList = yaml.loadAll(fs.readFileSync('kanjiexp_judgements.yaml', 'utf8'), (kanji) => {
    delete kanji.participantId
    if (kanji.value >= 2) similarDB[kanji.kanjiA] = similarDB[kanji.kanjiA] && !similarDB[kanji.kanjiA]?.includes(kanji.kanjiB) ? [...similarDB[kanji.kanjiA], kanji.kanjiB] : [kanji.kanjiB]
    // console.log(kanji)
  });
  console.log(Object.keys(similarDB));
} catch (e) {
  console.log(e);
}
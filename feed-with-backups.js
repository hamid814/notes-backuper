const files = fs.readdirSync('./backups');

let noteNum = 0;
let tagNum = 0;
let totalNum = 0;

files.forEach(async (file) => {
  const fileContent = fs.readFileSync(`./backups/${file}`, 'utf-8');

  console.log(file.startsWith('note-'));
  if (file.startsWith('note-')) {
    // file is a note
    try {
      await Note.create(JSON.parse(fileContent));
      noteNum++;
      totalNum++;
      console.log(`notes are ${noteNum} now`);
      console.log(`all are ${totalNum} now`);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      await Tag.create(JSON.parse(fileContent));
      tagNum++;
      totalNum++;
      console.log(`tags are ${tagNum} now`);
      console.log(`all are ${totalNum} now`);
    } catch (err) {
      console.log(err);
    }
  }
});

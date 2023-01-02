const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Note = require('./modelNote');
const Tag = require('./modelTag');
const { notStrictEqual } = require('assert');
require('colors');

dotenv.config({ path: './config/config.env' });

const writeToFile = (path, txt) => {
  fs.writeFileSync(path, txt);
};

(async () => {
  // connect DB
  try {
    // to evoid deprication warning
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });

    console.log(conn.connection.host.red);
  } catch (err) {
    console.log(err);
  }

  // get all from cloud
  // const notes = await Note.find()
  //   .populate(JSON.parse(process.env.TAG_POPULATE))
  //   .populate(JSON.parse(process.env.OTHER_TAGS_POPULATE));

  // notes.forEach((note) => {
  //   writeToFile(
  //     `./backups-2/note-${note.id}.txt`,
  //     JSON.stringify(note, null, 2)
  //   );
  // });

  await Tag.deleteMany();

  process.exit(1);
})();

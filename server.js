const fs = require('fs');
const express = require('express');
var morgan = require('morgan');

const PORT = 3000;
const publicFolder = 'public';

const app = express();

app.use(morgan('tiny'));

app.get('/notes', async (req, res) => {
  const notes = [];

  const list = await fs.readdirSync('./backups');

  console.log(list.length);

  list.forEach((note) => {
    notes.push(JSON.parse(fs.readFileSync(`./backups/${note}`, 'utf-8')));
  });

  res.json(notes);
});

app.use(express.static(publicFolder));

app.listen(PORT, () => {
  console.log(`listening on port ` + PORT);
  console.log(`content served from ` + publicFolder);
});

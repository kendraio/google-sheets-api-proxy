import * as express from 'express';
import * as cors from 'cors';
import { SheetDB } from "./sheet-db";

export const app = express();
app.use(cors());

const sheet = new SheetDB(process.env.SHEETS_ID, process.env.SHEETS_KEY);

app.get('/', (req, res) => {
  sheet.getSheets().then(sheetsNames => {
    res.json(sheetsNames);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(`Not found ${err.message}`);
  });
});


app.get('/:table', (req, res) => {
  sheet.listItems(req.params.table).then(items => {
    res.json(items);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(`Not found ${err.message}`);
  });
});

app.get('/:table/all', (req, res) => {
  sheet.getAll(req.params.table).then(result => {
    res.json(result);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(`Not found ${err.message}`);
  })
});

app.get('/:table/:id', (req, res) => {
  sheet.getItem(req.params.table, +req.params.id).then(data => {
    res.json({ id: +req.params.id, ...data });
  }).catch((err) => {
    console.log(err);
    res.status(404).send(`Not found ${err.message}`);
  });
});

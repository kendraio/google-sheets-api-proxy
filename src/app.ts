import * as express from 'express';
import * as bodyParser from "body-parser";
import { SheetDB } from "./sheet-db";

export const app = express();

const sheet = new SheetDB(process.env.SHEETS_ID, process.env.SHEETS_KEY);

app.get('/', (req, res) => {
  sheet.getSheets().then(sheetsNames => {
    res.json(sheetsNames);
  }).catch(() => {
    res.status(404).send('Not found');
  });
});

app.get('/:table', (req, res) => {
  sheet.listItems(req.params.table).then(items => {
    res.json(items);
  }).catch(() => {
    res.status(404).send('Not found');
  });
});

app.get('/:table/:id', (req, res) => {
  sheet.getItem(req.params.table, +req.params.id).then(data => {
    res.json(data);
  }).catch(() => {
    res.status(404).send('Not found');
  });
});

app.use(bodyParser.json());

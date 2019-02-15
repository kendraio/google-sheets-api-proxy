import { google } from "googleapis";

export class SheetDB {

  private sheets = google.sheets({
    version: 'v4',
    auth: this.apiKey
  });

  constructor(
    private readonly spreadsheetId: string,
    private readonly apiKey: string
  ) {
  }

  getSheets() {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      }, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        const { data: { sheets }} = response;
        resolve(sheets.map(({ properties }) => properties.title));
      });
    });
  }

  listItems(sheetId) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetId}!A1:A`
      }, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        const { data: { values: [ header, ...values ] }} = response;
        const fieldName = header[0].trim();
        resolve(values.map(([ value ], id) => ({ id: id + 1, [fieldName]: value })));
      });
    });
  }

  getItem(sheetId, id) {
    return new Promise(((resolve, reject) => {
      this.sheets.spreadsheets.values.batchGet({
        spreadsheetId: this.spreadsheetId,
        ranges: [
          `${sheetId}!1:1`,
          `${sheetId}!${id + 1}:${id + 1}`
        ]
      }, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        if (!response.data.valueRanges[1].values) {
          reject('Missing data');
          return;
        }
        const { data: { valueRanges: [ { values: [ header ]}, { values: [ data ]}] }} = response;
        resolve(header.reduce((result, item, i) => {
          result[item] = data[i];
          return result;
        }, {}));
      });
    }));
  }

  getAll(sheetId) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetId}`
      }, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        const { data: { values: [ header, ...data ] }} = response;
        resolve({ header, data });
      });
    });
  }
}

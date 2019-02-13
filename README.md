# Mock API

Convert a Google Docs Spreadsheet into an API for development or testing
purposes. 

## Usage

Each of the "Sheets" within the Spreadsheet will have its own 
endpoint. The endpoint will use the sheet name in the URL.
You can get a list of the available sheets by accessing the root 
path of the API. For example:

    http://localhost:3000/

Add the sheet name to get to the listing endpoint:

    http://localhost:3000/Products

The listing endpoint returns the IDs (generated from the row number) 
and the title of each entry. This assumes that the title or label of
each item is in the first column.

Use the ID (generated from the row number) to access a full record 
via the API. For example:

    http://localhost:3000/Products/1

## Local (Development) Install

Download from GitHub and install using NPM:

    git clone https://github.com/kendraio/kendraio-mock-api.git
    npm install

Add the spreadsheet ID into the `now.json` configuration file. 
You can find the spreadsheet ID by looking at the URL
of your sheet on Google Docs. It will look like this:

    https://docs.google.com/spreadsheets/d/[SPREADSHEET-ID]/edit

You need to use the value from `[SPREADSHEET-ID]` in the URL and
enter it into the `.env` file as the `SHEETS_ID`.

Create a file called `now-secrets.json` as documented [here](https://github.com/zeit/now-env)
You will need to enter an API key as `SHEETS_KEY` into `now-secrets.json`.
You can find this by going to the 
[Google Cloud Platform Console](https://console.cloud.google.com/apis/credentials)
and registering an app. Generate an API key and enable the Google Sheets API.
Create the `now-secrets.json` file and enter:

```
{
  "@sheets-key": "ENTER KEY HERE!"
}
```

After you have configured `.env` you can run the server locally using 
the provided NPM script:

    npm run start

## Deployment

Prior to deployment, run the build script provided. This will
run the TypeScript compiler to convert the TypeScript source code
into JavaScript.

    npm run build
    
You can then start the server with `npm run start` or deploy the
built JavaScript version from the generated `dist` folder.

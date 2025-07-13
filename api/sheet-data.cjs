const { google } = require('googleapis');

// Helper function to parse credentials from environment variable
const getCredentials = () => {
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!credentialsJson) {
    throw new Error('The GOOGLE_SHEETS_CREDENTIALS environment variable is not set.');
  }
  try {
    // Vercel may escape the JSON string, so we need to handle that.
    return JSON.parse(credentialsJson);
  } catch (error) {
    console.error('Failed to parse GOOGLE_SHEETS_CREDENTIALS:', error);
    throw new Error('The GOOGLE_SHEETS_CREDENTIALS environment variable is not valid JSON.');
  }
};

const SPREADSHEET_ID = '1mfi0JtuIT032ss2I9XdQKFdlGnxrhkyMZJR6iWUIAOE';
const RANGE = 'Sheet1';

async function getSheetData() {
  const credentials = getCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return [];
  }

  const header = rows[0].map(h => h.replace(/\s+/g, '')); // Remove spaces for key mapping
  const data = rows.slice(1).map((row) => {
    const rowData = {};
    header.forEach((key, index) => {
      rowData[key] = row[index];
    });
    return rowData;
  });

  return data;
}

// The Vercel Serverless Function handler
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const data = await getSheetData();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: 'Failed to fetch data from Google Sheet', details: errorMessage });
  }
};

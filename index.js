'use strict';
const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const axios = require('axios');
const moment = require('moment-timezone');

const credentials = require(process.env.CREDENTIALS || './credentials.json');

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3001;
const SHEET = process.env.GOOGLE_SHEET;

// If these changesin the sheet, these need to be updated
const EMAIL = 'Email';
const DATE = 'Fecha';
const REACHED = 'Contactado';

const doc = new GoogleSpreadsheet(SHEET);
let sheet;

(async function () {
  
  await doc.useServiceAccountAuth(credentials);

  await doc.loadInfo();

  sheet = doc.sheetsByIndex[0];
  await sheet.loadHeaderRow();
  
  const headers = sheet.headerValues;

  if (!headers.includes(DATE)) {
    await sheet.setHeaderRow([...headers, DATE, REACHED]);
  }
  
  app.post('/subscribe', async (req, res) => {
    try {
      // Validate Captcha

      const { data: validation } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${req.body.recaptcha}`);

      if (!validation.success) {
        return res.status(400).send('Invalid Captcha token');
      }

      const payload = headers.reduce((acc, header) => {
        acc[header] = req.body[header];
        return acc;
      }, {});


      // Get sheet rows, find if email was already put in
      const rows = await sheet.getRows();

      const duplicate = rows.some((row) => row[EMAIL] === payload[EMAIL]);

      if (!duplicate) {
        await sheet.addRow({
          ...payload,
          [DATE]: moment().tz('America/Panama').format('YYYY-MM-DD hh:mm A'),
          [REACHED]: 'no'
        });
      }

    } catch (e) {
      console.error(e);
    }

    return res.status(201).send('OK');
  });
  
  app.listen(PORT, () => {
    console.log(`Contact form listening on port ${PORT}.`)
  });
})();

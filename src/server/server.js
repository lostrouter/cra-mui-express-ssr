import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import App from '../shared/App'
import theme from '../shared/theme';

const PORT = 8080
const app = express()

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    const sheets = new ServerStyleSheets();
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      )
    );
    const css = sheets.toString();
    let result = '';

    result = data.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    ).replace(
      '<style id="jss-server-side"></style>',
      `<style id="jss-server-side">
        ${css}
      </style>`
    );

    return res.send(result);
  })
}
app.use('/dist',
  express.static(path.resolve(__dirname, '../../', 'build'), { maxAge: '30d' })
)
app.use(serverRenderer)

// app.use(express.static('./build'))
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})
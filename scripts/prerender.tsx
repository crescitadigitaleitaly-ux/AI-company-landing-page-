import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFileSync, writeFileSync } from 'node:fs';
import App from '../src/App';
const file = 'dist/index.html';
writeFileSync(
  file,
  readFileSync(file, 'utf8').replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(<App />)}</div>`,
  ),
);
console.log('Prerendered landing page: content available before JavaScript.');

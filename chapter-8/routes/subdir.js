const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(
    // first we go back into the root directory with ..
    // then get into the views and subdir to locate its index file
    path.join(__dirname, '..', 'views', 'subdir', 'index.html')
  );
});

router.get('/test(.html)?', (req, res) => {
  res.sendFile(
    // first we go back into the root directory with ..
    // then get into the views and subdir to locate its test file
    path.join(__dirname, '..', 'views', 'subdir', 'test.html')
  );
});

module.exports = router;

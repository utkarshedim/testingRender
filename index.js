const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.post('/testGads', (req, res) => {
  console.log(req.body,req)
  return res.status(200).json({ status: 'success', message: 'Project Data Available'});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

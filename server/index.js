const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = '190b503a33edb71da486f46f37c2167c85a0116cdfe588c60c39aa15c642a8e6';

app.post('/gift', (req, res) => {
  const body = req.body;
  const { name, proof } = body;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof that 'Chakshu Jain' is in the list
  const name = 'Chakshu Jain';
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);


  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof
  });

  console.log({ gift });
}

main();
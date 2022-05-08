const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'famous weird identify hint tiny grace photo bonus black cheese warrior faint',
  'https://rinkeby.infura.io/v3/0311aec30e154a1fa63c030901b3a08d'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(interface);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

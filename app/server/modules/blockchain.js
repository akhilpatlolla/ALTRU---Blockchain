
var    express = require('express'),
app = express(),
path = require('path'),
less = require('less-middleware');
const SHA256 = require("crypto-js/sha256");
console.log(">>> launching AltruBit :");

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, type = "", previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
        this.type = type;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.type +this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 1;
    }

    createGenesisBlock() {
        return new Block(Date.parse("2017-01-01"), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            // rules come into picture
            // check the value 
            // check the source

        }

        return true;
    }
}


app.use(less(path.join(__dirname,'source','less'),{
    dest: path.join(__dirname, 'dashboard'),
    options: {
        compiler: {
            compress: false,
        },
    },
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace('/css/','/'); 
        },
    },
    force: true,
}));
// serve static content
app.use(express.static(path.join(__dirname, 'dashboard')));
console.log("Creating a user Akhil Patlolla");
add1 = SHA256('akhilpatlolla').toString();

console.log("Creating a user Ximena");
add2 = SHA256('ximena').toString();

console.log("Creating MINER: Xavier");
miner = SHA256('xavier').toString();
console.log(">>> custom blockchain created");
let ALTRU_coin = new Blockchain();
console.log("ALTRU is ready to launch, Have good time mining it. :D :D ");

console.log("Akhil  is sending 100 to Ximena for 100 hours");
ALTRU_coin.createTransaction(new Transaction(add1, add2, 100));

console.log("Ximena is sending 50 to Akhil for some purchase in university ");
ALTRU_coin.createTransaction(new Transaction(add2, add1, 50));

console.log('Xavier is Starting the miner...');
ALTRU_coin.minePendingTransactions(miner);

console.log('Balance of xavier is', ALTRU_coin.getBalanceOfAddress(miner));

console.log('Xavier is Starting the miner again...');
ALTRU_coin.minePendingTransactions('miner');

console.log('Balance of xavier is', ALTRU_coin.getBalanceOfAddress(miner));
console.log('Balance of Akhil is ',ALTRU_coin.getBalanceOfAddress(add1));
console.log('Balance of Ximena is ',ALTRU_coin.getBalanceOfAddress(add2));


module.exports = {Blockchain, Block, Transaction, ALTRU_coin};

console.log("AltruBit is listening to 1337 port number : http:localhost:1337");
var server = app.listen(1337);

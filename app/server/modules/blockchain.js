const SHA256 = require("crypto-js/sha256");
console.log(">>> launching ALTRU Coin:");

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
console.log(">>> custom blockchain created");
let ALTRU_coin = new Blockchain();
console.log("ALTRU Coin is ready to launch, Have good time mining it. :D :D ");
console.log("Off to debug log.");

console.log("address 1 is sending 100 to address 2");
ALTRU_coin.createTransaction(new Transaction('address1', 'address2', 100));

console.log("address 2 is sending 50 to address 1");
ALTRU_coin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
ALTRU_coin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', ALTRU_coin.getBalanceOfAddress('xaviers-address'));

console.log('\n Starting the miner again...');
ALTRU_coin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', ALTRU_coin.getBalanceOfAddress('xaviers-address'));

console.log('\nBalance of xavier is', ALTRU_coin.getBalanceOfAddress('xaviers-address'));

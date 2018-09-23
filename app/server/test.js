
ALTRU_coin.createTransaction(new Transaction('address1', 'address2', 100));
ALTRU_coin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
ALTRU_coin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', ALTRU_coin.getBalanceOfAddress('xaviers-address'));

console.log('\n Starting the miner again...');
ALTRU_coin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', ALTRU_coin.getBalanceOfAddress('xaviers-address'));
let balance = 1000.00;
let transactions = [];

const balanceElement = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const depositBtn = document.getElementById('depositBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const messageElement = document.getElementById('message');
const transactionList = document.getElementById('transactionList');

function updateBalance() {
    balanceElement.textContent = `$${balance.toFixed(2)}`;
}

function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = 'message';
    }, 3000);
}

function addTransaction(type, amount) {
    const date = new Date().toLocaleString();
    transactions.unshift({ type, amount, date });
    updateTransactionHistory();
}

function updateTransactionHistory() {
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.className = `transaction-${transaction.type}`;
        li.innerHTML = `
            <span>${transaction.type === 'deposit' ? '+' : '-'} $${transaction.amount.toFixed(2)}</span>
            <span>${transaction.date}</span>
        `;
        transactionList.appendChild(li);
    });
}

function deposit() {
    const amount = parseFloat(amountInput.value);
    
    if (!amount || amount <= 0) {
        showMessage('Please enter a valid amount', 'error');
        return;
    }
    
    balance += amount;
    updateBalance();
    addTransaction('deposit', amount);
    showMessage(`Successfully deposited $${amount.toFixed(2)}`, 'success');
    amountInput.value = '';
}

function withdraw() {
    const amount = parseFloat(amountInput.value);
    
    if (!amount || amount <= 0) {
        showMessage('Please enter a valid amount', 'error');
        return;
    }
    
    if (amount > balance) {
        showMessage('Insufficient funds', 'error');
        return;
    }
    
    balance -= amount;
    updateBalance();
    addTransaction('withdraw', amount);
    showMessage(`Successfully withdrawn $${amount.toFixed(2)}`, 'success');
    amountInput.value = '';
}

depositBtn.addEventListener('click', deposit);
withdrawBtn.addEventListener('click', withdraw);

amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        deposit();
    }
});
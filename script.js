let balance = -50.00; // Starting balance (can be negative)
const overdraftLimit = -1000.00;

function updateDisplay() {
    document.getElementById("balance").textContent = `R${balance.toFixed(2)}`;
}

function addTransaction(type, amount) {
    const list = document.getElementById("transaction-list");
    const item = document.createElement("li"); // Create a new list item

    if (type === "deposit") {
        item.textContent = `Deposited R${amount.toFixed(2)}`;
        item.classList.add("deposit");
    } else if (type === "withdraw") {
        item.textContent = `Withdrew R${amount.toFixed(2)}`;
        item.classList.add("withdraw");
    }

    list.prepend(item); // Add new transaction at the top
}

function deposit() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    balance += amount;
    updateDisplay();
    addTransaction("deposit", amount);  // Add to transaction history
    document.getElementById("amount").value = "";
}

function withdraw() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (balance - amount < overdraftLimit) {
        alert(`Withdrawal denied. Overdraft limit of R${overdraftLimit.toFixed(2)} exceeded.`);
        return;
    }
    balance -= amount;
    updateDisplay();
    addTransaction("withdraw", amount); // Add to transaction history
    document.getElementById("amount").value = "";
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// Initialize display on page load
updateDisplay();

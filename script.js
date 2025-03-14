// Load inventory on page load
document.addEventListener("DOMContentLoaded", loadInventory);

function addMedicine() {
    let name = document.getElementById("medicineName").value;
    let quantity = document.getElementById("quantity").value;

    if (name.trim() === "" || quantity.trim() === "") {
        alert("⚠️ Please enter medicine name and quantity!");
        return;
    }

    let medicine = { name, quantity };

    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push(medicine);
    localStorage.setItem("inventory", JSON.stringify(inventory));

    document.getElementById("medicineName").value = "";
    document.getElementById("quantity").value = "";
    loadInventory();
}

function loadInventory() {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    let inventoryList = document.getElementById("inventoryList");
    inventoryList.innerHTML = "";

    inventory.forEach((med, index) => {
        let li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between");

        li.innerHTML = `
            ${med.name} - <strong>${med.quantity}</strong> 
            <div>
                <button class="btn btn-warning btn-sm" onclick="editMedicine(${index})">✏️ Edit</button>
                <button class="btn btn-danger btn-sm" onclick="removeMedicine(${index})">❌ Remove</button>
            </div>
        `;
        inventoryList.appendChild(li);
    });
}

function removeMedicine(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    inventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    loadInventory();
}

function editMedicine(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    let newName = prompt("📝 Enter new medicine name:", inventory[index].name);
    let newQuantity = prompt("🔢 Enter new quantity:", inventory[index].quantity);

    if (newName && newQuantity) {
        inventory[index].name = newName;
        inventory[index].quantity = newQuantity;
        localStorage.setItem("inventory", JSON.stringify(inventory));
        loadInventory();
    }
}

function searchMedicine() {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    let inventoryList = document.getElementById("inventoryList");

    inventoryList.innerHTML = "";

    inventory
        .filter(med => med.name.toLowerCase().includes(query))
        .forEach((med, index) => {
            let li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between");

            li.innerHTML = `
                ${med.name} - <strong>${med.quantity}</strong> 
                <div>
                    <button class="btn btn-warning btn-sm" onclick="editMedicine(${index})">✏️ Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeMedicine(${index})">❌ Remove</button>
                </div>
            `;
            inventoryList.appendChild(li);
        });
}

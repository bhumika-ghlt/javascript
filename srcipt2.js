/* script.js */
let currentModule = 'inventory';
let data = {
    inventory: [{ name: 'MacBook Pro', val: 2500 }, { name: 'Dell Monitor', val: 400 }],
    staff: [{ name: 'Alice Smith', val: 28 }, { name: 'Bob Jones', val: 34 }]
};

function switchModule(module, el) {
    currentModule = module;
    // Update active class
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    
    // Update UI
    document.getElementById('module-title').innerText = module.charAt(0).toUpperCase() + module.slice(1);
    renderTable();
}

function renderTable() {
    const head = document.getElementById('table-head');
    const body = document.getElementById('table-body');
    body.innerHTML = '';

    // Set Headers based on module
    head.innerHTML = currentModule === 'inventory' 
        ? '<th>Product Name</th><th>Price ($)</th><th>Action</th>' 
        : '<th>Employee Name</th><th>Age</th><th>Action</th>';

    // Set Rows
    data[currentModule].forEach((item, index) => {
        body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.val}</td>
                <td><button onclick="deleteItem(${index})" style="color: #ff4444; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button></td>
            </tr>
        `;
    });
    updateStats();
}

function updateStats() {
    const totalItems = data[currentModule].length;
    const totalValue = data[currentModule].reduce((sum, item) => sum + Number(item.val), 0);
    
    document.getElementById('total-items').innerText = totalItems;
    document.getElementById('total-value').innerText = currentModule === 'inventory' ? `$${totalValue}` : 'N/A';
}

// Modal Logic
const modal = document.getElementById('modal');
function openModal() { modal.classList.remove('hidden'); }
function closeModal() { modal.classList.add('hidden'); }

function saveRecord() {
    const name = document.getElementById('input1').value;
    const val = document.getElementById('input2').value;
    
    if(name && val) {
        data[currentModule].push({ name, val });
        renderTable();
        closeModal();
    }
}

function deleteItem(index) {
    data[currentModule].splice(index, 1);
    renderTable();
}

// Initial Load
renderTable();

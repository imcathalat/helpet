




var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["Desc"] = document.getElementById("Desc").value;
    formData["pix"] = document.getElementById("pix").value;
    formData["v1"] = document.getElementById("v1").value;
    formData["v2"] = document.getElementById("v2").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.Desc;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.pix;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.v1;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.v2;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("Desc").value = selectedRow.cells[0].innerHTML;
    document.getElementById("pix").value = selectedRow.cells[1].innerHTML;
    document.getElementById("v1").value = selectedRow.cells[2].innerHTML;
    document.getElementById("v2").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = Desc;
    selectedRow.cells[1].innerHTML = formData.pix;
    selectedRow.cells[2].innerHTML = formData.v1;
    selectedRow.cells[3].innerHTML = formData.v2;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("Desc").value = '';
    document.getElementById("pix").value = '';
    document.getElementById("v1").value = '';
    document.getElementById("v2").value = '';
    selectedRow = null;
}
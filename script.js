var indx = 0;
function mydeleteRow(e) {
    if (e.target.classList.contains("deletebtn")) {
        if (confirm("Are you sure, you want to delete it?")) {
            const btn = e.target;
            btn.closest("tr").remove();
        } else {
            return;
        }
    }
}

function searchData() {
    let filter = document.getElementById("search-box").value.toUpperCase();

    let myTable = document.getElementById("myTable");

    let tr = myTable.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            let name = td.textContent || td.innerHTML;

            if (name.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function validateInput(name, contact) {
    if (name == "" || contact.length != 10 || name == undefined) {
        alert("Please Enter all the Data correctly");
        return false;
    }

    let tbody = myTable.querySelector("tbody");
    let rows = tbody.querySelectorAll("tr");
    rows = rows.isArray ? rows : Object.values(rows);

    for (var i = 0; i < rows.length; i++) {
        var userName = rows[i].children[1].innerHTML.toUpperCase().trim(),
            userContact = rows[i].children[2].innerHTML.toUpperCase().trim();
        if (
            userName == name.toUpperCase() ||
            userContact == contact.toUpperCase()
        ) {
            alert("User Already Exists");
            return false;
        }
    }

    return true;
}

function submitIt(event) {
    event.preventDefault();
    var tbl = document.querySelector("tbody");

    const fname = document.getElementById("firstName").value;
    const lname = document.getElementById("lastName").value;
    const name = fname + " " + lname;
    const cntct = document.getElementById("phone").value;

    if (validateInput(name, cntct)) {
        indx += 1;
        tbl.innerHTML += `<tr class="table-row">
            <td class="align-center table-col attendance-text">${indx}</td>
            <td class="align-center table-col attendance-text">${name}</td>
            <td class="align-left table-col attendance-text">${cntct}</td>
            <td class="align-left table-col attendance-text"><input class="deletebtn" type="checkbox"></td>
        </tr>`;

        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phone").value = "";
    }

    tbl.addEventListener("click", mydeleteRow);
}

function sortName() {
    let myTable = document.getElementById("myTable");

    let tbody = myTable.querySelector("tbody");
    let rows = tbody.querySelectorAll("tr");

    rows = rows.isArray ? rows : Object.values(rows);

    function compare(a, b) {
        aText = a.children[1].innerHTML.toUpperCase().trim();
        bText = b.children[1].innerHTML.toUpperCase().trim();

        return aText < bText ? -1 : 1;
    }

    rows.sort(compare);
    tbody.innerHTML = "";

    let i = 0;
    while (i < rows.length) {
        tbody.appendChild(rows[i]);
        i++;
    }
}

var formEve = document.getElementById("userInputForm");
formEve.addEventListener("submit", submitIt);

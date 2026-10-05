const API_URL = "http://localhost:8080/api/users";

let selectedUid = null;

async function loadUsers() {

    try {

        const response = await fetch(API_URL);
        const result = await response.json();

        const tableBody =
            document.getElementById("userTableBody");

        tableBody.innerHTML = "";

        if (!result.success) {
            showMessage(result.message);
            return;
        }

        result.data.forEach(user => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.uid}</td>
                <td>${user.name}</td>
                <td>
                    <button
                        class="btn-edit"
                        onclick="editUser('${user.uid}', '${user.name}')">
                        Edit
                    </button>

                    <button
                        class="btn-delete"
                        onclick="deleteUser('${user.uid}')">
                        Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {

        showMessage("Unable to connect to the backend.");

    }
}


document
    .getElementById("userForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const uid =
            document.getElementById("uid").value.trim();

        const name =
            document.getElementById("name").value.trim();

        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    uid: uid,
                    name: name
                })

            });

            const result = await response.json();

            if (result.success) {

                showMessage("User added successfully.");

                clearForm();

                await loadUsers();

            } else {

                showMessage(result.message);

            }

        } catch (error) {

            showMessage("Unable to connect to the backend.");

        }

    });


function editUser(uid, name) {

    selectedUid = uid;

    document.getElementById("uid").value = uid;

    document.getElementById("name").value = name;

    document.getElementById("uid").disabled = true;

    showMessage(
        "User selected. Change the name and click Update User."
    );
}


async function updateUser() {

    if (!selectedUid) {

        showMessage(
            "Please click Edit for a user first."
        );

        return;
    }

    const name =
        document.getElementById("name").value.trim();

    if (!name) {

        showMessage("Name is required.");

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${selectedUid}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    uid: selectedUid,
                    name: name
                })
            }
        );

        const result = await response.json();

        if (result.success) {

            showMessage("User updated successfully.");

            clearForm();

            await loadUsers();

        } else {

            showMessage(result.message);

        }

    } catch (error) {

        showMessage("Unable to connect to the backend.");

    }
}


async function deleteUser(uid) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this user?"
        );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${uid}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (result.success) {

            showMessage("User deleted successfully.");

            await loadUsers();

        } else {

            showMessage(result.message);

        }

    } catch (error) {

        showMessage("Unable to connect to the backend.");

    }
}


async function searchUser() {

    const uid =
        document.getElementById("searchUid")
            .value
            .trim();

    const resultBox =
        document.getElementById("searchResult");

    if (!uid) {

        resultBox.textContent =
            "Please enter a UID.";

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${uid}`
        );

        const result = await response.json();

        if (result.success) {

            resultBox.innerHTML = `
                <div class="search-success">
                    <strong>User Found</strong><br>
                    UID: ${result.data.uid}<br>
                    Name: ${result.data.name}
                </div>
            `;

        } else {

            resultBox.innerHTML = `
                <div class="search-error">
                    ${result.message}
                </div>
            `;

        }

    } catch (error) {

        resultBox.innerHTML = `
            <div class="search-error">
                Unable to connect to the backend.
            </div>
        `;

    }
}


function clearForm() {

    document.getElementById("uid").value = "";

    document.getElementById("name").value = "";

    document.getElementById("uid").disabled = false;

    document.getElementById("searchUid").value = "";

    document.getElementById("searchResult").innerHTML = "";

    selectedUid = null;

    showMessage("");
}


function showMessage(message) {

    document.getElementById("message").textContent =
        message;
}


loadUsers();
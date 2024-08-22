document.addEventListener("DOMContentLoaded", function () {
  fetch("/users")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#users-table tbody");
      data.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

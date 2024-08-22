// DOM elements
const tableBody = document.querySelector("#data-table tbody");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/users"); // Fetch the data from the server
    const data = await response.json(); // Await the JSON parsing

    data.forEach((row) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.email}</td>
        `;
      tableBody.appendChild(tableRow);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

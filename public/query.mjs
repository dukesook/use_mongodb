const form = document.getElementById('queryForm');
const resultsContainer = document.getElementById('resultsContainer');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get Form Data
  const formData = new FormData(form);

  // Remove empty values
  for (const [key, value] of formData.entries()) {
    if (value === '') {
      formData.delete(key);
    }
  }
  const data = Object.fromEntries(formData.entries());

  
  // Send GET request
  const queryString = new URLSearchParams(data).toString();
  const httpResponse = await fetch(`/run-query?${queryString}`);

  // Display Results
  const results = await httpResponse.json();
  displayResults(results);

})

function displayResults(results) {
  resultsContainer.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headers = Object.keys(results[0]);

  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  
  table.appendChild(headerRow);

  results.forEach(result => {
    const row = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = result[header];
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  resultsContainer.appendChild(table);
}
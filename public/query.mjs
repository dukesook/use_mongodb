const form = document.getElementById('queryForm');
const resultsContainer = document.getElementById('resultsContainer');
const clearEntriesButton = document.getElementById('clearEntriesButton');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get Form Data
  const formData = new FormData(form);

  // Remove Empty Entries
  const data = Object.fromEntries(formData.entries());
  for ( const key in data ) {
    if ( data[key] === '' ) {
      delete data[key];
    }
  }

  // Create Fetch Request URL  
  const queryString = new URLSearchParams(data).toString();
  let fetchRequest = `/run-query?${queryString}`;
  if (Object.keys(data).length === 0) {
    fetchRequest = '/run-query'; // If no data, just run the default query.
  }

  // Fetch
  const httpResponse = await fetch(fetchRequest);

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

clearEntriesButton.onclick = function() {
  // form.reset(); // resets to defaults
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.value = ''; // Set value to empty string
  });
  resultsContainer.innerHTML = ''; // Clear previous results
}
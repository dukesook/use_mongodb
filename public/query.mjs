console.log('query.mjs');

const form = document.getElementById('queryForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // 1. Grab form values
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // 2. Convert form data to query string
  const queryString = new URLSearchParams(data).toString();

  // 3. Send GET request with query string
  const response = await fetch(`/run-query?${queryString}`);
  console.log(response); // You’ll display this next

  // 4. Parse JSON response
  const results = await response.json();
  console.log(results); // You’ll display this next

})
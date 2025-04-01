console.log('query.mjs');

const form = document.getElementById('queryForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Grab form values
  const formData = new FormData(form);

  // Remove empty values
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
    if (value === '') {
      formData.delete(key);
    }
  }
  const data = Object.fromEntries(formData.entries());

  
  // Send GET request
  const queryString = new URLSearchParams(data).toString();
  const response = await fetch(`/run-query?${queryString}`);
  console.log(response);

  const results = await response.json();
  console.log(results);

})
function createContractStatusRecord(path, phase, transaction_id, response) {
  const data = { phase: phase,
                 transaction_id: transaction_id,
                 meta: response
               }

  fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}
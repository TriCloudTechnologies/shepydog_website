function createDbRecord(count, path, transaction_id, response, coin_type) {
  const data = { coin_count: count, coin_type: coin_type,
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
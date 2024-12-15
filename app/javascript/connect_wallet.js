document.getElementById('connect-wallet-btn').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request connection to the user's Metamask account
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the user's active wallet address
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const walletAddress = accounts[0];
      console.log("Wallet Address =>", walletAddress);
      // Send the wallet address to your Rails backend using AJAX or a framework like Rails UJS

      // Get the CSRF token from the meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      // Define the endpoint and data (for a POST request)
      const endpoint = "/add_wallet_address";
      const data = { walletAddress: walletAddress };

      // Make the request with the CSRF token included in the headers
      fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken // Include the CSRF token here
        },
        body: JSON.stringify(data) // Send the data as JSON
      }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Assuming the response is JSON
      })
      .then(data => {
          console.log("Response data:", data);
      })
      .catch(error => {
          console.error("Request failed:", error);
      });
     
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  } else {
    alert('Please install Metamask to use this feature');
  }
});
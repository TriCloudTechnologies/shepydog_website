function adjustSaleTokenCount(){
  const buy_sale_token_inputCoinCount = event.target;
  document.getElementById('totalGiftCoins').innerHTML = buy_sale_token_inputCoinCount.value;

  let buy_sale_token_valueElement = document.getElementById('ethValue');
  const buy_sale_token_numberString = buy_sale_token_valueElement.textContent || buy_sale_token_valueElement.innerText;
  const buy_sale_token_numberValue = parseFloat(purchase_numberString);
  document.getElementById('buy_sale_token_totalAmount').innerHTML = (buy_sale_token_numberValue * buy_sale_token_inputCoinCount.value).toFixed(6);
}

function adjustSaleTokenValue(value) {
  const buy_sale_token_input = document.getElementById('buy_sale_token_coinCount');
  buy_sale_token_input.value = Number(buy_sale_token_input.value) + value;
  document.getElementById('buy_sale_token_totalCoins').innerHTML = buy_sale_token_input.value;

  let buy_sale_token_valueElement = document.getElementById('ethValue');
  const buy_sale_token_numberString = buy_sale_token_valueElement.textContent || buy_sale_token_valueElement.innerText;
  const buy_sale_token_numberValue = parseFloat(buy_sale_token_numberString);
  document.getElementById('buy_sale_token_totalAmount').innerHTML = (buy_sale_token_numberValue * buy_sale_token_input.value).toFixed(6);
}

async function buySaleToken(transaction_path) {
  const buy_sale_token_coinsCount = document.getElementById('buy_sale_token_coinCount').value;
  const buy_sale_token_totalAmount = document.getElementById('buy_sale_token_totalAmount').innerHTML;

  const buy_sale_token_contractAddress = '0xF4321A1211Ba512A1C41810E7d76be42Dd394797';
  const buy_sale_token_provider = new ethers.providers.Web3Provider(window.ethereum);
  const buy_sale_token_signer = buy_sale_token_provider.getSigner(); 
  const buy_sale_token_contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenQuantity",
          "type": "uint256"
        }
      ],
      "name": "buySalesTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const buy_sale_token_contract = new ethers.Contract(buy_sale_token_contractAddress, buy_sale_token_contractABI, buy_sale_token_signer);

  const response = await buy_sale_token_contract.buySalesTokens(parseInt(buy_sale_token_coinsCount), { value: ethers.utils.parseEther(buy_sale_token_totalAmount) });

  $("#buySaleTokenModal").modal('hide');
  $(".modal-backdrop").addClass('d-none')
  alert('Continue on Metamask.');
  createDbRecord(parseInt(buy_sale_token_coinsCount), transaction_path, response.hash, response)
}

function createDbRecord(count, path, transaction_id, response) {
  const data = { coin_count: count, coin_type: 1,
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
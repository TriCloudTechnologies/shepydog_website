function adjustListingCoinCount(){
  const buy_listing_token_inputCoinCount = event.target;
  document.getElementById('totalGiftCoins').innerHTML = buy_listing_token_inputCoinCount.value;

  let buy_listing_token_valueElement = document.getElementById('listingEthValue');
  const buy_listing_token_numberString = buy_listing_token_valueElement.textContent || buy_listing_token_valueElement.innerText;
  const buy_listing_token_numberValue = parseFloat(purchase_numberString);
  document.getElementById('buy_listing_token_totalAmount').innerHTML = (buy_listing_token_numberValue * buy_listing_token_inputCoinCount.value).toFixed(6);
}

function adjustListingTokenValue(value) {
  const buy_listing_token_input = document.getElementById('buy_listing_token_coinCount');
  buy_listing_token_input.value = Number(buy_listing_token_input.value) + value;
  document.getElementById('buy_listing_token_totalCoins').innerHTML = buy_listing_token_input.value;

  let buy_listing_token_valueElement = document.getElementById('listingEthValue');
  const buy_listing_token_numberString = buy_listing_token_valueElement.textContent || buy_listing_token_valueElement.innerText;
  const buy_listing_token_numberValue = parseFloat(buy_listing_token_numberString);
  document.getElementById('buy_listing_token_totalAmount').innerHTML = (buy_listing_token_numberValue * buy_listing_token_input.value).toFixed(6);
}

async function buyListingToken(transaction_path) {
  const buy_listing_token_coinsCount = document.getElementById('buy_listing_token_coinCount').value;
  const buy_listing_token_totalAmount = document.getElementById('buy_listing_token_totalAmount').innerHTML;

  const buy_listing_token_contractAddress = '0xc7218797355CC44588C44D5Acfe2FAe39AeA6aB2';
  const buy_listing_token_provider = new ethers.providers.Web3Provider(window.ethereum);
  const buy_listing_token_signer = buy_listing_token_provider.getSigner(); 
  const buy_listing_token_contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenQuantity",
          "type": "uint256"
        }
      ],
      "name": "buyListingTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const buy_listing_token_contract = new ethers.Contract(buy_listing_token_contractAddress, buy_listing_token_contractABI, buy_listing_token_signer);

  const response = await buy_listing_token_contract.buyListingTokens(parseInt(buy_listing_token_coinsCount), { value: ethers.utils.parseEther(buy_listing_token_totalAmount) });

  $("#buyListingTokenModal").modal('hide');
  $(".modal-backdrop").addClass('d-none')
  alert('Continue on Metamask.');
  createDbRecord(parseInt(buy_listing_token_coinsCount), transaction_path, response.hash, response, 4)
}

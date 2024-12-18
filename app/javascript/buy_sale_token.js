function adjustSaleTokenCount(){
  const buy_sale_token_inputCoinCount = event.target;
  document.getElementById('totalGiftCoins').innerHTML = buy_sale_token_inputCoinCount.value;

  let buy_sale_token_valueElement = document.getElementById('SaleEthValue');
  const buy_sale_token_numberString = buy_sale_token_valueElement.textContent || buy_sale_token_valueElement.innerText;
  const buy_sale_token_numberValue = parseFloat(purchase_numberString);
  document.getElementById('buy_sale_token_totalAmount').innerHTML = (buy_sale_token_numberValue * buy_sale_token_inputCoinCount.value).toFixed(6);
}

function adjustSaleTokenValue(value) {
  const buy_sale_token_input = document.getElementById('buy_sale_token_coinCount');
  buy_sale_token_input.value = Number(buy_sale_token_input.value) + value;
  document.getElementById('buy_sale_token_totalCoins').innerHTML = buy_sale_token_input.value;

  let buy_sale_token_valueElement = document.getElementById('SaleEthValue');
  const buy_sale_token_numberString = buy_sale_token_valueElement.textContent || buy_sale_token_valueElement.innerText;
  const buy_sale_token_numberValue = parseFloat(buy_sale_token_numberString);
  document.getElementById('buy_sale_token_totalAmount').innerHTML = (buy_sale_token_numberValue * buy_sale_token_input.value).toFixed(6);
}

async function buySaleToken(transaction_path) {
  const buy_sale_token_coinsCount = document.getElementById('buy_sale_token_coinCount').value;
  const buy_sale_token_totalAmount = document.getElementById('buy_sale_token_totalAmount').innerHTML;

  const buy_sale_token_contractAddress = '0xc7218797355CC44588C44D5Acfe2FAe39AeA6aB2';
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
  createDbRecord(parseInt(buy_sale_token_coinsCount), transaction_path, response.hash, response, 1)
}

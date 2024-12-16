function adjustPurchaseCoinCount(){
  const purchase_inputCoinCount = event.target;
  document.getElementById('totalGiftCoins').innerHTML = purchase_inputCoinCount.value;

  let purchase_valueElement = document.getElementById('ethValue');
  const purchase_numberString = purchase_valueElement.textContent || purchase_valueElement.innerText;
  const purchase_numberValue = parseFloat(purchase_numberString);
  document.getElementById('purchase_totalAmount').innerHTML = (purchase_numberValue * purchase_inputCoinCount.value).toFixed(6);
}

function adjustValue(value) {
  const purchase_input = document.getElementById('purchase_coinCount');
  purchase_input.value = Number(purchase_input.value) + value;
  document.getElementById('purchase_totalCoins').innerHTML = purchase_input.value;

  let purchase_valueElement = document.getElementById('ethValue');
  const purchase_numberString = purchase_valueElement.textContent || purchase_valueElement.innerText;
  const purchase_numberValue = parseFloat(purchase_numberString);
  document.getElementById('purchase_totalAmount').innerHTML = (purchase_numberValue * purchase_input.value).toFixed(6);
}

async function proceedPayment(transaction_path) {
  const purchase_coinsCount = document.getElementById('purchase_coinCount').value;
  const purchase_totalAmount = document.getElementById('purchase_totalAmount').innerHTML;

  const purchase_contractAddress = '0xF4321A1211Ba512A1C41810E7d76be42Dd394797';
  const purchase_provider = new ethers.providers.Web3Provider(window.ethereum);
  const purchase_signer = purchase_provider.getSigner(); 
  const purchase_contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenQuantity",
          "type": "uint256"
        }
      ],
      "name": "buyPreSalesTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const purchase_contract = new ethers.Contract(purchase_contractAddress, purchase_contractABI, purchase_signer);

  const response = await purchase_contract.buyPreSalesTokens(parseInt(purchase_coinsCount), { value: ethers.utils.parseEther(purchase_totalAmount) });

  $("#purchaseModal").modal('hide');
  $(".modal-backdrop").addClass('d-none')
  alert('Continue on Metamask.');
  createDbRecord(parseInt(purchase_coinsCount), transaction_path, response.hash, response, 0)
}

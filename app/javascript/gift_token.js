function adjustGiftCount(){
  const gift_inputCoinCount = event.target;
  document.getElementById('totalGiftCoins').innerHTML = gift_inputCoinCount.value;

  let gift_valueElement = document.getElementById('giftEthValue');
  const gift_numberString = gift_valueElement.textContent || gift_valueElement.innerText;
  const gift_numberValue = parseFloat(gift_numberString);
  document.getElementById('giftTotalAmount').innerHTML = (gift_numberValue * gift_inputCoinCount.value).toFixed(6);
}

function adjustGiftCountValue(value) {
  const gift_inputCoinCount = document.getElementById('giftCoinCount');
  gift_inputCoinCount.value = Number(gift_inputCoinCount.value) + value;
  document.getElementById('totalGiftCoins').innerHTML = gift_inputCoinCount.value;

  let gift_valueElement = document.getElementById('giftEthValue');
  const gift_numberString = gift_valueElement.textContent || gift_valueElement.innerText;
  const gift_numberValue = parseFloat(gift_numberString);
  document.getElementById('giftTotalAmount').innerHTML = (gift_numberValue * gift_inputCoinCount.value).toFixed(6);
}

async function proceedGiftTransaction() {
  const gift_coinsCount = document.getElementById('giftCoinCount').value;

  const gift_contractAddress = '0xF4321A1211Ba512A1C41810E7d76be42Dd394797';
  const gift_provider = new ethers.providers.Web3Provider(window.ethereum);
  const gift_signer = gift_provider.getSigner(); 
  const gift_contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenQuantity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_recieverAddress",
          "type": "address"
        }
      ],
      "name": "giftTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const gift_contract = new ethers.Contract(gift_contractAddress, gift_contractABI, gift_signer);
  const gift_walletAddress = document.getElementById('gift_walletAddress').value;

  gift_contract.giftTokens(parseInt(gift_coinsCount), gift_walletAddress);

  $("#giftModal").modal('hide');
  $(".modal-backdrop").addClass('d-none')
  alert('Continue on Metamask.');
}

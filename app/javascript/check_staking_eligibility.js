async function checkStakingEligibility(walletAddress) {
  const coinsCount = document.getElementById('staking__coinCount').value;

  const contractAddress = '0xc7218797355CC44588C44D5Acfe2FAe39AeA6aB2';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); 
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    const balance = await contract.balanceOf(walletAddress)
    if (Number(balance._hex) > 1){
      $("#stakeBtn").removeClass("home-page__stake-button--disabled");
      $("#stakeBtn").removeAttr("disabled");
    }
  } catch (error) {
    console.error('Error calculating balance:', error);
  }
}

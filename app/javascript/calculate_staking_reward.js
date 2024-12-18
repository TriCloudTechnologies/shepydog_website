async function calculateStakingReward(walletAddress) {
  const coinsCount = document.getElementById('staking__coinCount').value;

  const contractAddress = '0xc7218797355CC44588C44D5Acfe2FAe39AeA6aB2';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); 
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_staker",
          "type": "address"
        }
      ],
      "name": "calculateReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const reward = await contract.calculateReward(walletAddress);

    $("#user_Rewards").text(Number(reward._hex) / (10 ** 18));
  } catch (error) {
    console.error('Error calculating reward:', error);
  }
}

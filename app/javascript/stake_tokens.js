async function stakeTokens(coinsCount, transactions_path) {
  const contractAddress = '0xF4321A1211Ba512A1C41810E7d76be42Dd394797';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); 
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "stakeTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const stake = await contract.stakeTokens(coinsCount)
    createDbRecord(coinsCount, transactions_path, stake.hash, stake, 2)
  } catch (error) {
    console.error('Error while staking :', error);
  }
}
async function claimRewards(transactions_path) {
  const contractAddress = '0xF4321A1211Ba512A1C41810E7d76be42Dd394797';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); 
  const contractABI = [
    {
      "inputs": [],
      "name": "withdrawStakedTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const response = await contract.withdrawStakedTokens()
    createDbRecord(coinsCount, transactions_path, response.hash, response, 3)
  } catch (error) {
    console.error('Error calculating reward:', error);
  }
}

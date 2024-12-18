async function claimRewards(transactions_path) {
  const contractAddress = '0xc7218797355CC44588C44D5Acfe2FAe39AeA6aB2';
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
    createDbRecord(0, transactions_path, response.hash, response, 3)
  } catch (error) {
    console.error('Error calculating reward:', error);
  }
}

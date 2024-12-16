async function activateContract() {
  const startDateValue = document.getElementById('contractStartDate').value;
  const endDateValue = document.getElementById('contractStartDate').value;

  const startDate = new Date(startDateValue);
  const endDate = new Date(endDateValue);

  const unixTimeStartDate = Math.floor(startDate.getTime() / 1000);
  const unixTimeEndDate = Math.floor(endDate.getTime() / 1000);

  const contractAddress = '0xF4321A1211Ba512A1C41810E7d76be42Dd394797';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); 
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endTime",
          "type": "uint256"
        }
      ],
      "name": "activateContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    const activateContract = await contract.activateContract(unixTimeStartDate, unixTimeEndDate);
    console.log("activate Contract------>", activateContract)

  } catch (error) {
    console.error('Error activating contract:', error);
  }
}

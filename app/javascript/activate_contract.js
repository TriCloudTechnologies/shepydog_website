async function activateContract(path) {
  const startDateValue = document.getElementById('contractStartDate').value;
  const endDateValue = document.getElementById('contractEndDate').value;

  const startDate = new Date(startDateValue);
  const endDate = new Date(endDateValue);

  const now = new Date(); // Get current time

  if(startDate.getTime() < now.getTime()) {
   alert("The time you have selected must be in future than current time.")
   return;
  }

  const unixTimeStartDate = Math.floor(startDate.getTime() / 1000);
  const unixTimeEndDate = Math.floor(endDate.getTime() / 1000);

  const contractAddress = '0xc7218797355CC44588C44D5Acfe2FAe39AeA6aB2';
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
    createContractStatusRecord(path, 0, activateContract.hash, activateContract);
  } catch (error) {
    console.error('Error activating contract:', error);
  }
}

async function changeContractPhase(path) {
  const contractPhase = document.getElementById('contractStatus').value;

  const contractAddress = '0xc7218797355CC44588C44D5Acfe2FAe39AeA6aB2';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); 
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "enum ShepydogsToken.Phase",
          "name": "_phase",
          "type": "uint8"
        }
      ],
      "name": "setPhase",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    const constract_phase_response = await contract.setPhase(parseInt(contractPhase));
    createContractStatusRecord(path, parseInt(contractPhase), constract_phase_response.hash, constract_phase_response);
  } catch (error) {
    console.error('Error changing contract phase:', error);
  }
}

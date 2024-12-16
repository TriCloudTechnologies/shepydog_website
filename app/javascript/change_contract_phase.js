async function changeContractPhase(path) {
  const contractPhase = document.getElementById('contractStatus').value;

  const contractAddress = '0xF4321A1211Ba512A1C41810E7d76be42Dd394797';
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
    createDbRecord(path, parseInt(contractPhase), constract_phase_response.hash, constract_phase_response);
  } catch (error) {
    console.error('Error changing contract phase:', error);
  }
}

function createDbRecord(path, phase, transaction_id, response) {
  const data = { phase: phase,
                 transaction_id: transaction_id,
                 meta: response
               }

  fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}
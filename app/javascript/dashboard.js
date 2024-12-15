function BuySaleToken() {
  const preSaleTokens = document.getElementById('preSaleTokens').innerHTML;

  if (parseInt(preSaleTokens) > 0) {
    alert("Sales Token can be bought once Pre Sale Tokens are finished.")
  } else {
    const modalElement = document.getElementById('purchaseModal');
    const modal = new bootstrap.Modal(modalElement); modal.show(); 
  }
}

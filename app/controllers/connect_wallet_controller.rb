class ConnectWalletController < ApplicationController
  before_action :authenticate_user!

  def add_wallet_address
    current_user.update(wallet_address: params["walletAddress"])
  end
end


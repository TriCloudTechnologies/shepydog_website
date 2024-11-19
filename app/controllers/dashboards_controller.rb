class DashboardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_eth_client
  before_action :set_eth_contract

  def index
    @token_details = @client.call(@contract, "getTokenDetails")
  end

  private

  def set_eth_client
    ethereum_provider = 'https://sepolia.infura.io/v3/40aa39b0aea8495c8fe7fb2e394415c9'
    @client = Eth::Client.create(ethereum_provider)
  end

  def set_eth_contract
    contract_address = '0xADB2288bc444a6E76D723C27Fc8a100b1446b96a'
    contract_abi = JSON.parse(File.read('lib/token-abi.json'))
    @contract = Eth::Contract.from_abi(name: 'Token', address: contract_address, abi: contract_abi)
  end
end


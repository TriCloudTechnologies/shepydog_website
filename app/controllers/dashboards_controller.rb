class DashboardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_eth_client
  before_action :set_eth_contract

  def index
    @token_details = @client.call(@contract, "getTokenDetails")
  end

  private

  def set_eth_client
    ethereum_provider = ENV['ETHEREUM_PROVIDER']
    @client = Eth::Client.create(ethereum_provider)
  end

  def set_eth_contract
    contract_address = ENV['CONTRACT_ADDRESS']
    contract_abi = JSON.parse(File.read('lib/token-abi.json'))
    @contract = Eth::Contract.from_abi(name: 'Token', address: contract_address, abi: contract_abi)
  end
end


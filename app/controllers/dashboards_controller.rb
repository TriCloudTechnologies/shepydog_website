class DashboardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_eth_client
  before_action :set_eth_contract
  before_action :set_contract_meta
  before_action :redirect_admin

  def index;end

  def admin;end

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

  def set_contract_meta
    @token_details = @client.call(@contract, "getTokenDetails")
    @contract_phase = @client.call(@contract, "currentPhase")
    @contract_activated = check_contract_activated
  end

  def redirect_admin
    redirect_to admin_dashboard_path if current_user.is_a?(Admin)
  end

  def check_contract_activated
    start_time = @client.call(@contract, "contractStartTime")
    end_time = @client.call(@contract, "contractEndTime")
    
    start_time = Time.at(start_time)
    end_time = Time.at(end_time)

    Time.now >= start_time && Time.now <= end_time
  end
end


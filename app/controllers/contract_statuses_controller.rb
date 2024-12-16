class ContractStatusesController < ApplicationController
  before_action :authenticate_user!

  def create
    contract_status = ContractStatus.new(contract_status_params)
    contract_status.save

    respond_to do |format|
      format.json  { render json: { status: :ok } }
    end
  end

  private

  def contract_status_params
    params.require(:contract_status).permit(:phase, :transaction_id, meta: {})
  end
end


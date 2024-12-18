class ContractStatusesController < ApplicationController
  before_action :authenticate_user!

  def create
    if current_user.admin?
      contract_status = ContractStatus.new(contract_status_params)
      contract_status.save

      respond_to do |format|
        format.json  { render json: { status: :ok } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: :forbidden, message: 'You do not have permission to create this record.' } }
      end
    end
  end

  private

  def contract_status_params
    params.require(:contract_status).permit(:phase, :transaction_id, meta: {})
  end
end


class TransactionsController < ApplicationController
  before_action :authenticate_user!

  def create
    transaction = current_user.transactions.new(transaction_params)
    transaction.save

    respond_to do |format|
      format.json  { render json: { status: :ok } }
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:coin_count, :coin_type, :transaction_id, meta: {})
  end
end


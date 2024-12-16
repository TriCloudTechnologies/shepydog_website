class AddFieldsToContractStatus < ActiveRecord::Migration[7.2]
  def change
    add_column :contract_statuses, :meta, :jsonb, default: {}
    add_column :contract_statuses, :transaction_id, :string
  end
end

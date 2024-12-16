class CreateContractStatus < ActiveRecord::Migration[7.2]
  def change
    create_table :contract_statuses, id: :uuid do |t|
      t.integer :phase

      t.timestamps
    end
  end
end

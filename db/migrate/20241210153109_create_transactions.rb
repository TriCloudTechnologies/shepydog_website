class CreateTransactions < ActiveRecord::Migration[7.2]
  def change
    create_table :transactions, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.decimal :coin_count, default: 0.0
      t.integer :coin_type
      t.integer :state
      t.string :transaction_id
      t.jsonb :meta, default: {}

      t.timestamps
    end
  end
end

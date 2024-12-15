class AddCoinFieldsToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :presale_tokens, :decimal, default: 0.0
    add_column :users, :postsale_tokens, :decimal, default: 0.0
    add_column :users, :staking_tokens, :decimal, default: 0.0
    add_column :users, :unstaked_tokens, :decimal, default: 0.0
    add_column :users, :listing_tokens, :decimal, default: 0.0
    add_column :users, :total_tokens, :decimal, default: 0.0
  end
end

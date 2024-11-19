class AddWalletAddressToUser < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :wallet_address, :string
  end
end

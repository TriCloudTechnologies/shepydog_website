class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :lockable, :trackable

  has_many :transactions

  def staking_coin_count
    last_unstake_created_at = tokens.unstake.order(created_at: :desc).first.created_at

    tokens.staking.where("created_at > ?", last_unstake_created_at).pluck(:count).map(&:to_i).sum
  end
end

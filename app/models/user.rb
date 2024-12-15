class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :lockable, :trackable

  has_many :transactions

  after_commit :update_total_coins_count

  def staking_coin_count
    last_unstake_created_at = tokens.unstake.order(created_at: :desc).first.created_at

    tokens.staking.where("created_at > ?", last_unstake_created_at).pluck(:count).map(&:to_i).sum
  end

  private

  def update_total_coins_count
    total_coin_count = presale_tokens + postsale_tokens + staking_tokens + unstaked_tokens

    update_column(:total_tokens, total_coin_count)
  end
end

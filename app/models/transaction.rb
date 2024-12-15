class Transaction < ApplicationRecord

  belongs_to :user

  enum coin_type: { presale: 0, postsale: 1, staking: 2, unstaked: 3, listing: 4 }

  after_create :update_user_token_counts

  private

  def update_user_token_counts
    token_column = "#{coin_type}_tokens"

    case coin_type
    when "presale"
      user.increment!(token_column, coin_count)
      user.increment!("total_tokens", coin_count)
    when "postsale"
      user.increment!(token_column, coin_count)
      user.increment!("total_tokens", coin_count)
    when "listing"
      user.increment!(token_column, coin_count)
      user.increment!("total_tokens", coin_count)
    when "staking"
      user.increment!(token_column, coin_count)
      user.decrement!("total_tokens", coin_count)
    when "unstaked"
      user.increment!(token_column, coin_count)
      user.update_column(:staking_tokens, 0.0);
      user.increment!("total_tokens", coin_count)
    end
  end
end

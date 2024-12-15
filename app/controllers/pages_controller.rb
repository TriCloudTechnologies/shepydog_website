class PagesController < ApplicationController	
  before_action :authenticate_user!, only: [:staking]

  def home;end

  def staking;end

  def privacy_policy;end

  def terms_of_use;end

  def exchange;end

  def bridge;end
end

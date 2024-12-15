Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  root "pages#home"
  get '/staking', to: 'pages#staking'
  get '/privacy_policy', to: 'pages#privacy_policy'
  get '/terms_of_use', to: 'pages#terms_of_use'
  get '/exchange', to: 'pages#exchange'
  get '/bridge', to: 'pages#bridge'

  post '/add_wallet_address', to: 'connect_wallet#add_wallet_address'

  resources :dashboards, only: :index
  resources :transactions, only: :create
end

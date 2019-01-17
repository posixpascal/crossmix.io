Rails.application.routes.draw do
  get 'home/index'
  get "/search", to: "search#new"
  get 'trending/index'
  devise_for :users

  resources :mixes
  root to: "home#index"

  get "/:id", to: "mixes#show"
end

Authproviders::Application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # match 'auth/:provider/callback', to: 'session#create'
  resources :users, :only => [:index, :destroy]
  root :to => 'users#index'
end

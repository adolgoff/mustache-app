Authproviders::Application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :bookmarks #, :only => [:index, :create, :destroy]
  resources :users, :only => [:index, :destroy]
  root :to => 'users#index'
end

class SessionsController < ApplicationController
  
  def create
    user = User.session_user(auth_hash)
    session[:user_id] = user.id
    redirect_to root_url
  end
  
  protected
  
  def auth_hash
    request.env['omniauth.auth']
  end
  
end


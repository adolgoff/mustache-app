class Users::OmniauthCallbacksController < ApplicationController
 
  def facebook
    @user = User.find_for_facebook_oauth request.env["omniauth.auth"]
    if @user.persisted?
      sign_in(@user)
      render :status => 200, :json => { :user => { :email => @user.email, :name => @user.username } }
    else
      render :status => 401, :json => { :errors => alert }
    end
  end
  
  def vkontakte
    @user = User.find_for_vkontakte_oauth request.env["omniauth.auth"]
    if @user.persisted?
      sign_in(@user)
      render :status => 200, :json => { :user => { :email => @user.email, :name => @user.username } }
    else
      render :status => 401, :json => { :errors => alert }
    end
  end
    
end

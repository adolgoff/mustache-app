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
    @hash = request.env['omniauth.auth']
    render :status => 200, :json => @hash.to_json
    # @user = User.find_for_vkontakte_oauth request.env["omniauth.auth"]
    # if @user.persisted?
      # sign_in @user, :event => :authentication
      # render :status => 200, :json => { :user => { :email => @user.email, :name => @user.username } }
    # else
      # render :status => 401, :json => { :errors => alert }
    # end
  end
  
#   
  # def vkontakte
    # @user = User.find_for_vkontakte_oauth request.env["omniauth.auth"]
    # if @user.persisted?
      # # flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Vkontakte"
      # sign_in_and_redirect @user, :event => :authentication
    # else
      # flash[:notice] = "authentication error"
      # redirect_to root_path
    # end
  # end
#   
  # def vkontakte
    # @user = User.find_for_vkontakte_oauth request.env["omniauth.auth"]
    # if @user.persisted?
      # sign_in(@user)
      # render :status => 200, :json => { :user => { :email => @user.email, :name => @user.username } }
    # else
      # render :status => 401, :json => { :errors => alert }
    # end
  # end
    
end

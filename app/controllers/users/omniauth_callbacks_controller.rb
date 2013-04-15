class Users::OmniauthCallbacksController < ApplicationController
 
  def facebook
    # @user = User.find_for_facebook_oauth(request.env["omniauth.auth"])
    @user = User.find_for_facebook_oauth request.env["omniauth.auth"]
    if @user.persisted?
      sign_in(@user)
      render :status => 200, :json => { :user => { :email => @user.email, :name => @user.username } }
    else
      render :status => 401, :json => { :errors => alert }
    end
  end
  
  # def facebook
    # @user = User.find_for_facebook_oauth request.env["omniauth.auth"]
    # if @user.persisted?
      # flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Facebook"
      # sign_in_and_redirect @user, :event => :authentication
    # else
      # flash[:notice] = "authentication error"
      # redirect_to root_path
    # end
  # end
  
  def passthru
    render :file => "#{Rails.root}/public/404.html", :status => 404, :layout => false
    # Or alternatively,
    # raise ActionController::RoutingError.new('Not Found')
  end

  def vkontakte
  	@user = User.find_for_vkontakte_oauth request.env["omniauth.auth"]
    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Vkontakte"
      sign_in_and_redirect @user, :event => :authentication
    else
      flash[:notice] = "authentication error"
      redirect_to root_path
    end
  end
  
end

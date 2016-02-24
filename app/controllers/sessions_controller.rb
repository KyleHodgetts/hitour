class SessionsController < ApplicationController
  def new
    redirect_to root_path if session[:user_id]
  end

  # Log a user in
  def create
    # Find the user in the database by the email given
    @user = User.find_by_email(params[:email])

    # If the user is not nil and the given password matches
    if @user && @user.authenticate(params[:password])
      # Create a user session and redirect to main page
      session[:user_id] = @user.id
      if (!@user.activated)
        @user.update_attribute(:activated, true)
        redirect_to update_profile_path(@user.id)
      else
      redirect_to root_path
      end
    else
      redirect_to login_path
    end
  end

  # Destroy user session
  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end

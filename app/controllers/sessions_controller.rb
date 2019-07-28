class SessionsController < ApplicationController

    skip_before_action :authenticate!, only: [:new, :create]

    def new
        @current_user ||= User.find_by(token: params[:token])
        render json: @current_user
    end
    
    def create
        @user = User.find_by(email: params[:email].downcase)
        if @user && @user.authenticate(params[:password])
            render json: @user
        else
            if @user
                render json: { errors: 'Password is Invalid' }
            else
                render json: { errors: 'Email is Invalid' }
            end

        end
    end
    
    def destroy
    end
end

class UsersController < ApplicationController

    skip_before_action :authenticate!, only: [:create]

    def create
        user = params.require(:user).permit(:email, :name, :password, :password_confirmation )
        @user = User.new(user)
        if @user.save
            render json: @user
        else
            render json: { errors: @user.errors.full_messages }
        end
    end
end

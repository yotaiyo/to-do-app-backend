class TodosController < ApplicationController

    def index
        @todo = Todo.where(user_id: params[:user_id])
        render json: @todo
    end

    def create
        todo = params.require(:todo).permit(:title, :completed, :deadline, :user_id)
        @todo = Todo.create(todo)
        render json: @todo
    end

    def update
        @todo = Todo.find(params[:id])
        @todo.update_attributes(completed: params[:completed], deadline: params[:deadline])
        render json: @todo
    end

    def destroy
        @todo = Todo.find(params[:id])
        if @todo.destroy
            head :no_content, status: :ok
        else
            render json: @todo.errors, status: :unprocessable_entity 
        end
    end
end

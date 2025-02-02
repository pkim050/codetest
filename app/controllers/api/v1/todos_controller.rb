# frozen_string_literal: true

module Api
  module V1
    class TodosController < ApplicationController
      before_action :set_todo, only: %i[show update destroy]

      def index
        @todos = Todo.all.sort
        render json: @todos
      end

      def show
        render json: @todo
      end

      def create
        @todo = Todo.new(todo_params)
        if @todo.save
          render json: @todo
        else
          render json: @todo.errors, status: :unprocessable_entity
        end
      end

      def update
        if @todo.update(todo_params)
          render json: @todo
        else
          render json: @todo.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @todo.destroy
      end

      private

      def set_todo
        @todo = Todo.find(params[:id])
      end

      def todo_params
        params.require(:todo).permit(:title, :done)
      end
    end
  end
end

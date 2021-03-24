class ObjectiveController < ApplicationController

    def index
        @objectives = Objective.all 
        render json: @objectives
    end

    def create
        @objective = Objective.new(title: params[:title],weight: params[:weight])
        if @objective.save
            respond_to do |format|
                format.json { head :ok, objective: @objective }
            end
        else 
            render json: {}, status: 400
        end
    end

    def update
        

    end


end

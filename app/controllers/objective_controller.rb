class ObjectiveController < ApplicationController

    def index
        @objectives = Objective.all 
        render json: @objectives
    end

    def create
        @objective = Objective.new(title: params[:title],weight: params[:weight])
        if @objective.save
            respond_to do |format|
                format.json { head :ok, body: @objective }
            end
        else 
            render json: {}, status: 400
        end
    end

    def update
        @objective = Objective.find_by(id: params[:id])
        
        if @objective.update(title: params[:title], weight: params[:weight])
            render json: @objective
        else 
            render json: {}, status: 400
        end
    end

    def delete 
        @objective = Objective.find_by(id: params[:id])

        if @objective.destroy!
            render json: {}, status: 200
        else
            render json: {}, status: 400
        end

    end


end

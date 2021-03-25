class KeyResultController < ApplicationController

    def index
        @key_results = KeyResult.all
        render json: @key_results
    end

    def create
        @key_result = KeyResult.new(title: params[:title],weight: params[:weight], objective_id: params[:objective_id])
        if @key_result.save!
            respond_to do |format|
                format.json { head :ok }
            end
        else 
            render json: {}, status: 400
        end
    end

    def update
        @key_result = KeyResult.find_by(id: params[:id])
        @key_result.title = params[:title] if params[:title]
        @key_result.weight = params[:weight] if params[:weight]
        @key_result.complete = params[:complete] if params[:complete]
        
        if @key_result.save!
            render json: @key_result
        else 
            render json: {}, status: 400
        end
    end

    def delete 
        @key_result = KeyResult.find_by(id: params[:id])

        if @key_result.destroy!
            render json: {}, status: 200
        else
            render json: {}, status: 400
        end

    end

    def get_from_objective
        @key_results = Objective.find_by(id: params[:id]).key_results
        render json: @key_results
    end

end

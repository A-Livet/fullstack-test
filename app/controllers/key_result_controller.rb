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

end

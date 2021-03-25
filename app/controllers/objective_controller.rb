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

    def get_completion 
        krs = KeyResult.where(objective_id: params[:id])

        @completion = 0

        krs.each do |kr|
            @completion += kr.weight if kr.complete && kr.weight
        end

        render json: {completion: @completion}

    end


    def check_weight
        @objectives = Objective.all

        @weight_missing = false
        @weight_wrong = false
        @sum =0

        @objectives.each do |objective|
            if !objective.weight.nil?
                @sum += objective.weight
            else
                @weight_missing = true
            end
            kr_weight_missing,kr_weight_wrong = check_weight_krs(objective.id)
            @weight_missing = true if kr_weight_missing
            @weight_wrong = true if kr_weight_wrong 

        end
        if @sum > 100
            @weight_wrong = true
        end

        render json: {
            weight_missing: @weight_missing,
            weight_wrong: @weight_wrong
        }
    end

    private 

    def check_weight_krs(id)
        krs = KeyResult.where(objective_id: id)

        weight_missing = false
        weight_wrong = false
        sum =0

        krs.each do |kr|
            if !kr.weight.nil?
                sum += kr.weight
            else 
                weight_missing = true
            end
        end
        if sum > 100
            weight_wrong = true
        end
        return weight_missing,weight_wrong

    end


end

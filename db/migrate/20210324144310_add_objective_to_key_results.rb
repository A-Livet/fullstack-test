class AddObjectiveToKeyResults < ActiveRecord::Migration[6.1]
  def change
    add_reference :key_results, :objective, index: true, foreign_key: true
  end
end

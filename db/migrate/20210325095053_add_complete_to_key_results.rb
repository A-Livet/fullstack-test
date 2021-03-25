class AddCompleteToKeyResults < ActiveRecord::Migration[6.1]
  def change
    add_column :key_results, :complete, :boolean, default: false
  end
end

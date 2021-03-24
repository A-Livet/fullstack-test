class CreateKeyResults < ActiveRecord::Migration[6.1]
  def change
    create_table :key_results do |t|
      t.string :title
      t.integer :weight
      
      t.timestamps
    end
  end
end

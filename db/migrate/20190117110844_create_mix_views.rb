class CreateMixViews < ActiveRecord::Migration[5.2]
  def change
    create_table :mix_views do |t|
      t.integer :mix_id
      t.string :key

      t.timestamps
    end
  end
end

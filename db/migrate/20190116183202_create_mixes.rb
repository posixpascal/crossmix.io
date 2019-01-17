class CreateMixes < ActiveRecord::Migration[5.2]
  def change
    create_table :mixes do |t|
      t.string :name
      t.string :title
      t.text :description
      t.boolean :private
      t.integer :user_id

      t.timestamps
    end
  end
end

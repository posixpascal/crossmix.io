class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.integer :mix_id
      t.integer :status
      t.string :provider
      t.string :url



      t.timestamps
    end
  end
end

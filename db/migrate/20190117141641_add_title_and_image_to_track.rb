class AddTitleAndImageToTrack < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :title, :string
    add_column :tracks, :image_url, :string
  end
end

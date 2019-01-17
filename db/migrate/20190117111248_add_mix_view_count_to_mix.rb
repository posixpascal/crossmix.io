class AddMixViewCountToMix < ActiveRecord::Migration[5.2]
  def change
    add_column :mixes, :mix_views_count, :integer
  end
end

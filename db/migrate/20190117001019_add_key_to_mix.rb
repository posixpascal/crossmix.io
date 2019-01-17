class AddKeyToMix < ActiveRecord::Migration[5.2]
  def change
    add_column :mixes, :key, :string
  end
end

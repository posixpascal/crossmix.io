class AddPrivateKeyToMix < ActiveRecord::Migration[5.2]
  def change
    add_column :mixes, :private_key, :string
  end
end

class Mix < ApplicationRecord
  belongs_to :user, optional: true
  has_many :tracks

  after_initialize :set_name, :if => :new_record?
  after_initialize :set_key, :if => :new_record?


  def set_name
    self.name = SecureRandom.hex(8)
    while Mix.where(name: self.name).count > 0 do
      self.name = SecureRandom.hex(8)
    end
  end

  def set_key
    self.key = SecureRandom.hex(18)
    self.private_key = SecureRandom.hex(32)
    while Mix.where(private_key: self.private_key).count > 0 do
      self.private_key = SecureRandom.hex(32)
    end
  end
end

class Track < ApplicationRecord
  belongs_to :mix

  enum provider: {
      youtube: 1,
  }
end

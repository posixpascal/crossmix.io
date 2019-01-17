class Track < ApplicationRecord
  belongs_to :mix


  scope :videos, -> do
    where(media: "video")
  end

  scope :audios, -> do
    where(media: "audio")
  end
end

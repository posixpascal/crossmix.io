class MixSerializer < ActiveModel::Serializer
  attributes :id
  attributes :name
  attributes :video_tracks
  attributes :audio_tracks

  def audio_tracks
    object.tracks.audios
  end
  def video_tracks
    object.tracks.videos
  end
end


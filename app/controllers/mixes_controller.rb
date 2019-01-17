class MixesController < ApplicationController
  before_action :set_mix, only: [:update, :edit]

  def show

    key = params[:id]

    if key.size == 16
      @mix = Mix.where(name: key, private: false).first
    else
      @mix = Mix.where(private_key: key).first
    end

    unless @mix
      redirect_to "/404.html"
    end

    view_key = Digest::SHA1.hexdigest(request.ip)

    unless @mix.mix_views.current_day.where(key: view_key).count > 0
      @mix.mix_views.create({
                                key: view_key
                            })
    end
  end

  def new
    @mix = Mix.new()
    @mix.save

    session[:key] = @mix.key
    redirect_to edit_mix_path(id: @mix.name) + "#" + session[:key]
  end

  def edit
  end

  def update
    return render json: false if @mix.nil?
    if params[:key] === @mix.key
      @mix.update(mix_params)

      # update mix tracks
      @mix.tracks.destroy_all
      tracks = params[:mix][:tracks]
      tracks.each do |track|
        track = track[1]
        mixtrack = @mix.tracks.new({
                               provider: track["provider"]["name"],
                               url: track["url"],
                               media: track["type"]
                           })

        if track["provider"]["name"] == "youtube"
          begin
            video = Yt::Video.new id: track["provider"]["videoId"]
            mixtrack.title = video.title
            mixtrack.image_url = video.thumbnail_url
            mixtrack.save
          rescue
          end
        end
        mixtrack.save
      end
      @mix.save
    end
    render json: true
  end

  private

  def mix_params
    params.require(:mix).permit(:title, :description, :private)
  end

  def set_mix
    mix = Mix.find_by_name(params[:id])
    if mix.key == session[:key]
      @mix = mix
    end
  end
end

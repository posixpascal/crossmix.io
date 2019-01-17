class MixesController < ApplicationController
  before_action :set_mix, only: [:update, :edit]

  def show
    key = params[:key]

    if key.size == 16
      @mix = Mix.where(name: key, private: false).first
    else
      @mix = Mix.where(private_key: key).first
    end

    unless @mix
      redirect_to "/404.html"
    end
  end

  def new
    @mix = Mix.new()
    @mix.save

    redirect_to edit_mix_path(id: @mix.name, key: @mix.key)
  end

  def edit
  end

  def update
    @mix.update(mix_params)
    render json: @mix
  end

  private
  def mix_params
    params.require(:mix).permit(:title, :description, :private)
  end

  def set_mix
    mix = Mix.find_by_name(params[:id])
    if mix.key == params[:key]
      @mix = mix
    end
  end
end

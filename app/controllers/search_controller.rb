class SearchController < ApplicationController
  before_action :set_page

  def new
    @search = params[:q]
    if @search
      @result = Mix.where('title LIKE ?', "%#{params[:q]}%").page(@page)
    end
  end

  def show
  end

  def set_page
    @page = params[:page] || 1
  end
end

class HomeController < ApplicationController
  def index
    redirect_to "/mixes/new"
  end
end

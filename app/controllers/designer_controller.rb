
class DesignerController < ApplicationController
  def index
    restrict_regular_user
  end
end

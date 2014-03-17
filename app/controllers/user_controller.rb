class UserController < ApplicationController
    layout :get_layout
    before_filter :restrict_guest
    def home
    end
end

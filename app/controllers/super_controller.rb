class SuperController < ApplicationController
	layout 'super'
    before_filter :allow_super_only
	def index
	end

	def client_manager
	end
end
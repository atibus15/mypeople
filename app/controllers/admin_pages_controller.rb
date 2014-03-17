class AdminPagesController < ApplicationController
  layout :get_layout

  before_filter :restrict_regular_user

  def home
  end

  def employees
  end

  def setup
  end

  def salary
  end

  def time_management
  end

  def payroll_processor
  end

  def sl_manager
  end
end

class TimeManagementsController < ApplicationController
  layout 'admin'

  before_filter :restrict_regular_user
  
  def attendance_processor
  end

  def policy_assignment
  end

  def schedule_assignment
  end

  def work_plan_manager
  end
end

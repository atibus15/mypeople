class RegularUserPagesController < ApplicationController
  before_filter :restrict_guest
  layout :get_layout

  def profile
    begin
      @my_profile = Employee.find(session[:employee_id])
      @my_profile[:company] = @my_profile.Company.description
      @my_profile[:department] = @my_profile.Department.description
      @my_profile[:bizgroup] = @my_profile.Busgroup.description
      @my_profile[:holding_company] = @my_profile.Holdcompany.description
      @my_profile[:position] = @my_profile.Position.description
      @my_profile[:position_level] = @my_profile.Positionlevel.description
      @my_profile[:department_group] = @my_profile.Deptgroup.description

      @request_result = {success: true, data: @my_profile}
    rescue ActiveRecord::StatementInvalid
      @request_result[:errormsg] = 'Invalid SQL Statement.'
    rescue Exception => e
      @request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  def dtr_history
  end

  def payslip
  end

  def account_sl
  end

  def official_travel
  end

  def overtime
  end

  def leave
  end

  def dtr_log
  end

  def process_attendance
    
  end
end

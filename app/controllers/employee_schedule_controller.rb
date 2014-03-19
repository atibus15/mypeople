class EmployeeScheduleController < ApplicationController

  before_filter :restrict_regular_user

  def assigned_employees
    begin
      @schedule_id = params[:schedule_id]
      conditions = []
      conditions[0] = ["employees.location_id = #{params[:location_id]}"] unless params[:location_id].blank?
      conditions[1] = ["employees.isactivestatus = #{params[:status]}"] unless params[:status].blank?
      conditions[2] = ["empskeds.worksked_id = #{@schedule_id}"] unless @schedule_id.blank?
      conditions[3] = ["empskeds.mypclient_id = '#{@@client_id}'"]
      clean_conditions = conditions.compact.flatten

      @assigned = Empsked.select('empskeds.*, empskeds.id as empsked_id, employees.*')
                            .where(clean_conditions.join(' AND '))
                            .joins('INNER JOIN employees on employees.empidno = empskeds.empidno and employees.mypclient_id = empskeds.mypclient_id')
      clean_records = @@stripper.activeRecordData(@assigned)
      meta_data = @@meta_data.create(@assigned);
      @@request_result = {success:true, data: clean_records, metaData:meta_data}
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def update_assignment
    begin 
      emp_schedules = JSON.parse params[:emp_schedule]
      Empsked.transaction do
        emp_schedules.each {|emp_sched|
          @assigned = Empsked.where({:mypclient_id=>emp_sched['mypclient_id'],:company_id=>emp_sched['company_id'], :empidno=>emp_sched['empidno']})
          
          if emp_sched['action'] == 'destroy'
            @assigned.destroy_all
          elsif @assigned.empty?
            emp_sched.delete('action')
            @assign = Empsked.new(emp_sched)
            @assign.save 
          else
            @assigned[0].update_attributes({:worksked_id => emp_sched['worksked_id']})
          end
        }
      end

      Empworkplan.transaction do
        Empworkplan.fill_up(emp_sched['mypclient_id'], emp_sched['empidno'], emp_sched['startdate'], emp_sched['enddate'], 1, 1)
      end

      @@request_result = {success: true, notice: 'Operation ended successfully.'}
    rescue ActiveRecord::ActiveRecordError
      ActiveRecord::Rollback
      @@request_result[:errormsg] = 'Something went wrong while inserting or updating employee schedule.'
    rescue Exception => e 
      ActiveRecord::Rollback
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

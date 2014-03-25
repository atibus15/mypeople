class EmppoliciesController < ApplicationController

  before_filter :restrict_regular_user

  def assigned_employees
    begin
      @policy_id = params[:policy_id]
      @company_id = params[:company_id]
      @name = params[:name]
      conditions = []
      conditions[0] = ["employees.location_id = #{params[:location_id]}"] unless params[:location_id].blank?
      conditions[1] = ["employees.isactivestatus = #{params[:status]}"] unless params[:status].blank?
      conditions[2] = ["emppolicies.workskedpolicy_id = #{@policy_id}"] unless @policy_id.blank?
      conditions[3] = ["emppolicies.company_id = #{@company_id}"] unless @company_id.blank?
      conditions[4] = ["emppolicies.mypclient_id = '#{@@client_id}'"]
      conditions[5] = ["employees.empfullnamelfm like UPPER('%#{@name}%')"] unless @name.blank?
      clean_conditions = conditions.compact.flatten

      @assigned = Emppolicy.select('emppolicies.*, emppolicies.id as emppolicy_id, employees.*, locations.description as location')
                  .where(clean_conditions.join(' AND '))
                  .joins('INNER JOIN employees on employees.empidno = emppolicies.empidno and employees.mypclient_id = emppolicies.mypclient_id')
                  .joins('INNER JOIN locations on locations.id = employees.location_id')
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
      emp_policies = JSON.parse params[:emp_policy]
      Emppolicy.transaction do
        emp_policies.each {|emp_policy|
          @assigned = Emppolicy.where({:mypclient_id=>emp_policy['mypclient_id'],:company_id=>emp_policy['company_id'], :empidno=>emp_policy['empidno']})
          
          if @assigned.empty?
            emp_policy.delete('action')
            @assign = Emppolicy.new(emp_policy)
            @assign.save
          else
            @assigned[0].update_attributes({:workskedpolicy_id => emp_policy['workskedpolicy_id']})
          end
        }
      end
      @@request_result = {success: true, notice: 'Operation ended successfully.'}
    rescue Exception => e 
      ActiveRecord::Rollback
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

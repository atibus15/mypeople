class EmppoliciesController < ApplicationController

  before_filter :restrict_regular_user
  # GET /emppolicies
  # GET /emppolicies.json
  def index
    @emppolicies = Emppolicy.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @emppolicies }
    end
  end

  # GET /emppolicies/1
  # GET /emppolicies/1.json
  def show
    @emppolicy = Emppolicy.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @emppolicy }
    end
  end

  # GET /emppolicies/new
  # GET /emppolicies/new.json
  def new
    @emppolicy = Emppolicy.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @emppolicy }
    end
  end

  # GET /emppolicies/1/edit
  def edit
    @emppolicy = Emppolicy.find(params[:id])
  end

  # POST /emppolicies
  # POST /emppolicies.json
  def create
    
  end

  # PUT /emppolicies/1
  # PUT /emppolicies/1.json
  def update
    @emppolicy = Emppolicy.find(params[:id])

    respond_to do |format|
      if @emppolicy.update_attributes(params[:emppolicy])
        format.html { redirect_to @emppolicy, notice: 'Emppolicy was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @emppolicy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /emppolicies/1
  # DELETE /emppolicies/1.json
  def destroy
    @emppolicy = Emppolicy.find(params[:id])
    @emppolicy.destroy

    respond_to do |format|
      format.html { redirect_to emppolicies_url }
      format.json { head :no_content }
    end
  end


  def assigned_employees
    begin
      @policy_id = params[:policy_id]
      conditions = []
      conditions[0] = ["employees.location_id = #{params[:location_id]}"] unless params[:location_id].blank?
      conditions[1] = ["employees.isactivestatus = #{params[:status]}"] unless params[:status].blank?
      conditions[2] = ["emppolicies.workskedpolicy_id = #{@policy_id}"] unless @policy_id.blank?
      conditions[3] = ["emppolicies.mypclient_id = '#{@@client_id}'"]
      clean_conditions = conditions.compact.flatten

      @assigned = Emppolicy.select('emppolicies.*, emppolicies.id as emppolicy_id, employees.*')
                            .where(clean_conditions.join(' AND '))
                            .joins('INNER JOIN employees on employees.empidno = emppolicies.empidno and employees.mypclient_id = emppolicies.mypclient_id')
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

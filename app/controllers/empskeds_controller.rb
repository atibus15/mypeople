class EmpskedsController < ApplicationController

  before_filter :construct

  def construct
    @@request_result = {}
    @@request_result[:success] = false
    @@data_util = DataUtil.new
    @@stripper = Stripper.new
    @@meta_data = MetaData.new
    @@client_id = session[:client_id].strip
    @@username = session[:username].strip
  end

  # GET /empskeds
  # GET /empskeds.json
  def index
    @empskeds = Empsked.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @empskeds }
    end
  end

  # GET /empskeds/1
  # GET /empskeds/1.json
  def show
    @empsked = Empsked.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @empsked }
    end
  end

  # GET /empskeds/new
  # GET /empskeds/new.json
  def new
    @empsked = Empsked.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @empsked }
    end
  end

  # GET /empskeds/1/edit
  def edit
    @empsked = Empsked.find(params[:id])
  end

  # POST /empskeds
  # POST /empskeds.json
  def create
    @empsked = Empsked.new(params[:empsked])

    respond_to do |format|
      if @empsked.save
        format.html { redirect_to @empsked, notice: 'Empsked was successfully created.' }
        format.json { render json: @empsked, status: :created, location: @empsked }
      else
        format.html { render action: "new" }
        format.json { render json: @empsked.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /empskeds/1
  # PUT /empskeds/1.json
  def update
    @empsked = Empsked.find(params[:id])

    respond_to do |format|
      if @empsked.update_attributes(params[:empsked])
        format.html { redirect_to @empsked, notice: 'Empsked was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @empsked.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /empskeds/1
  # DELETE /empskeds/1.json
  def destroy
    @empsked = Empsked.find(params[:id])
    @empsked.destroy

    respond_to do |format|
      format.html { redirect_to empskeds_url }
      format.json { head :no_content }
    end
  end

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
      @@request_result = {success: true, notice: 'Operation ended successfully.'}
    rescue Exception => e 
      ActiveRecord::Rollback
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

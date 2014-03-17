require 'date'
require 'meta_data'
require 'stripper'
require 'data_util'
class DepartmentsController < ApplicationController

  # GET /departments
  # GET /departments.json
  def index
    @departments = Department.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @departments }
    end
  end

  # GET /departments/1
  # GET /departments/1.json
  def show
    @department = Department.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @department }
    end
  end

  def setupList()

    begin
      @departments =  Department.select('departments.id as department_id, departments.company_id, companies.description as company, departments.departmentcode, 
                        departments.description, departments.isactive as status, departments.createddate, departments.createdby, 
                        departments.lastupdatedate, departments.lastupdateby')
                      .joins('INNER JOIN companies ON companies.id = departments.company_id')
                      .where(:mypclient_id => @@client_id)

      @@request_result[:metaData] = @@meta_data.create(@departments)
      @@request_result[:data] = @@stripper.activeRecordData(@departments)

      @@request_result[:success] = true
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end


  def adminSelection
    company_id = params[:company_id]
    
    begin

      @departments  = Department.select('id as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id, :company_id => company_id})

      @clean_departments = @@stripper.activeRecordData(@departments)

      @@request_result[:success] = true
      @@request_result[:data] = @clean_departments
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # GET /departments/new
  # GET /departments/new.json
  def new
    @department = Department.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @department }
    end
  end

  # GET /departments/1/edit
  def edit
    @department = Department.find(params[:id])
  end

  # POST /departments
  # POST /departments.json
  def create
    begin
      new_department = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:department]), ['description'])
      new_department[:mypclient_id] = session[:client_id]
      new_department[:isactive] =  1
      new_department[:createdby] = session[:username]

      @department = Department.new(new_department)

      if @department.save
        @@request_result[:success] = true
        @@request_result[:notice] = 'Department was successfully created.'
      else
        @@request_result[:errormsg] = @department.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /departments/1
  # PUT /departments/1.json
  def update
    begin
      updated_department = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:department]), ['description'])
      updated_department[:mypclient_id] = session[:client_id].strip
      updated_department[:lastupdateby] = session[:username].strip
      @department = Department.find(params[:id])

      if @department.update_attributes(updated_department)
        @@request_result[:success] = true
        @@request_result[:notice] = 'Department was successfully updated.'
      else
        @@request_result[:errormsg] = @department.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /departments/1
  # DELETE /departments/1.json
  def destroy
    begin
      @department = Department.find(params[:id])
      if @department.destroy
        @@request_result[:notice] = 'Operation was ended successfully.';
        @@request_result[:success] = true
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

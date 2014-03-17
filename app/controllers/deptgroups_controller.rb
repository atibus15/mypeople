require 'meta_data'
require 'data_util'
class DeptgroupsController < ApplicationController

  before_filter :construct

  
  @@client_id

  def construct
    @@request_result = {}
    @@request_result[:success] = false
    @@client_id = session[:client_id].strip
    @@meta_data = MetaData.new
    @@data_util = DataUtil.new
  end

  # GET /deptgroups
  # GET /deptgroups.json
  def index
    @deptgroups = Deptgroup.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @deptgroups }
    end
  end

  # GET /deptgroups/1
  # GET /deptgroups/1.json
  def show
    @deptgroup = Deptgroup.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @deptgroup }
    end
  end

  def setupList
    begin
      @deptgroups =  Deptgroup.select('deptgroups.id, deptgroups.deptgroupcode, deptgroups.company_id, 
                        companies.description as company, deptgroups.department_id, 
                        departments.description as department, 
                        deptgroups.description, deptgroups.isactive as status, deptgroups.createddate, deptgroups.createdby, 
                        deptgroups.lastupdatedate, deptgroups.lastupdateby')
                      .joins('INNER JOIN companies ON companies.id = deptgroups.company_id ')
                      .joins('INNER JOIN departments ON departments.id = deptgroups.department_id')
                      .where(:mypclient_id => @@client_id).order(:department)
      i = 0
      @deptgroups.each do |dept|
          dept.attributes.each{|key, value|
            @deptgroups[i][key] = value.to_s.strip 
          }
        i+=1
      end
      
      @@request_result[:metaData] = @@meta_data.create(@deptgroups)
      @@request_result[:success] = true
      @@request_result[:data] = @deptgroups
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def adminSelection

    company_id = params[:company_id]
    department_id = params[:department_id]
    begin

      @groups  = Deptgroup.select('id as code, description as desc')
                          .where({:isactive=>1, :mypclient_id => @@client_id, :department_id => department_id, :company_id => company_id})
      @clean_groups = []
      i = 0
      @groups.each do |group|

        @clean_groups[i] = {}
        
        @clean_groups[i][:code] = group[:code]
        @clean_groups[i][:desc] = group[:desc].strip

        i+=1
      end

      @@request_result[:success] = true
      @@request_result[:data] = @clean_groups
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # GET /deptgroups/new
  # GET /deptgroups/new.json
  def new
    @deptgroup = Deptgroup.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @deptgroup }
    end
  end

  # GET /deptgroups/1/edit
  def edit
    @deptgroup = Deptgroup.find(params[:id])
  end

  # POST /deptgroups
  # POST /deptgroups.json
  def create
    begin
      new_group = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:dept_group]), ['description'])
      new_group[:mypclient_id] = session[:client_id]
      new_group[:isactive] =  1
      new_group[:createdby] = session[:username]

      @deptgroup = Deptgroup.new(new_group)

      if @deptgroup.save
        @@request_result[:success] = true
        @@request_result[:notice] = 'Department Sub Group was successfully created.'
      else
        @@request_result[:errormsg] = @deptgroup.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /deptgroups/1
  # PUT /deptgroups/1.json
  def update
    begin
      @deptgroup = Deptgroup.find(params[:id])

      updated_group = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:dept_group]), ['description'])
      updated_group[:lastupdateby] = session[:username]

      if @deptgroup.update_attributes(updated_group)
        @@request_result[:success] = true
        @@request_result[:notice] = 'Department Sub Group was successfully updated.'
      else
        @@request_result[:errormsg] = @deptgroup.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /deptgroups/1
  # DELETE /deptgroups/1.json
  def destroy
    begin
      @deptgroup = Deptgroup.find(params[:id])
      
      if @deptgroup && @deptgroup.destroy
        @@request_result[:success] = true
        @@request_result[:notice] = 'Operation ended successfully.'
      else
        @@request_result[:errormsg] = 'Record not found.';
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

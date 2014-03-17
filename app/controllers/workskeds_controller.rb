require 'stripper'
require 'meta_data'
class WorkskedsController < ApplicationController
  # GET /workskeds
  # GET /workskeds.json
  
  before_filter :construct

  def construct
    @@request_result = {}
    @@request_result[:success] = false
    @@stripper =  Stripper.new
    @@meta_data = MetaData.new
    @@client_id = session[:client_id].strip
  end

  def index
    @workskeds = Worksked.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @workskeds }
    end
  end

  def fetch_breaks
    begin
      @worksked = Worksked.find(params[:id])
      if @worksked
        breaks = []
        breaks[0] = ["break_start"=>@worksked.break1fr , "break_end" => @worksked.break1to, "hours" => @worksked.break1hrs] unless @worksked.break1fr.blank?
        breaks[1] = ["break_start"=>@worksked.break2fr , "break_end" => @worksked.break2to, "hours" => @worksked.break2hrs] unless @worksked.break2fr.blank?
        breaks[2] = ["break_start"=>@worksked.break3fr , "break_end" => @worksked.break3to, "hours" => @worksked.break3hrs] unless @worksked.break3fr.blank?
        breaks[3] = ["break_start"=>@worksked.break4fr , "break_end" => @worksked.break4to, "hours" => @worksked.break4hrs] unless @worksked.break4fr.blank?
        breaks[4] = ["break_start"=>@worksked.break5fr , "break_end" => @worksked.break5to, "hours" => @worksked.break5hrs] unless @worksked.break5fr.blank?
      
        @@request_result[:success] = true
        @@request_result[:data] = breaks.compact.flatten
      else
        @@request_result[:success] = true
        @@request_result[:data] = []
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result 
  end

  def setupList
    begin
      @workskeds = Worksked.joins(:Workskedcategory, :Company)
                  .select('workskeds.*, workskedcategories.description as category, companies.description as company')
                  .where(:mypclient_id => @@client_id)

      @clean_workskeds = @@stripper.activeRecordData(@workskeds)

      @@request_result[:success] = true
      @@request_result[:metaData] = @@meta_data.create(@workskeds) 
      @@request_result[:data] = @clean_workskeds

    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # GET /workskeds/1
  # GET /workskeds/1.json
  def show
    @worksked = Worksked.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @worksked }
    end
  end

  # GET /workskeds/new
  # GET /workskeds/new.json
  def new
    @worksked = Worksked.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @worksked }
    end
  end

  # GET /workskeds/1/edit
  def edit
    @worksked = Worksked.find(params[:id])
  end

  # POST /workskeds
  # POST /workskeds.json
  def create
    begin
      new_sched = params['sched']
      new_sched[:mypclient_id] = session[:client_id].strip
      new_sched[:createdby] = session[:username].strip

      @worksked = Worksked.new(new_sched)

      if @worksked.save 
        @@request_result[:success] = true
        @@request_result[:notice] = 'Work Schedule was successfully created.'
      else
        @@request_result[:errormsg] = @worksked.errors.full_message[0];
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def sanitize(sked)
    clean_sked = {}
    sked.each{|key, value|

      clean_sked[key] = value.to_s.strip
    }
    return clean_sked
  end
  # PUT /workskeds/1
  # PUT /workskeds/1.json
  def update
    begin
      @new_sched = self.sanitize(params[:sched])
      @@request_result[:data] = @new_sched

      @worksked = Worksked.find(params[:id])

      if @worksked.update_attributes(params[:sched])
        @@request_result[:success] = true
        @@request_result[:notice] = 'Work Schedule was successfully updated.'
      else
        @@request_result[:errormsg] = @worksked.errors.full_message[0];
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /workskeds/1
  # DELETE /workskeds/1.json
  def destroy
    begin 
      @worksked = Worksked.find(params[:id])
      if @worksked.destroy
        @@request_result = {success: true, notice: 'Operation ended successfully.'}
      else
        @@request_result[:errormsg] = 'Something went wrong while trying to delete record'
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

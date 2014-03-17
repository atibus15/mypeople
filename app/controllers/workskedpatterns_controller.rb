require 'meta_data'
require 'stripper'

class WorkskedpatternsController < ApplicationController
  
  before_filter :construct

  def construct
    @@request_result = {}
    @@request_result[:success] = false
    @@stripper =  Stripper.new
    @@meta_data = MetaData.new

    @@client_id = session[:client_id].strip
  end

  # GET /workskedpatterns
  # GET /workskedpatterns.json
  def index
    @workskedpatterns = Workskedpattern.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @workskedpatterns }
    end
  end

  # GET /workskedpatterns/1
  # GET /workskedpatterns/1.json
  def show
    @workskedpattern = Workskedpattern.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @workskedpattern }
    end
  end

  #GET /workskedpatterns/:id/breaks
  def fetch_breaks
    begin
      @pattern = Workskedpattern.find(params[:id])
      if @pattern
        breaks = []
        breaks[0] = [break_start: @pattern.break1fr , break_end: @pattern.break1to, hours: @pattern.break1hrs] unless @pattern.break1fr.blank?
        breaks[1] = [break_start: @pattern.break2fr , break_end: @pattern.break2to, hours: @pattern.break2hrs] unless @pattern.break2fr.blank?
        breaks[2] = [break_start: @pattern.break3fr , break_end: @pattern.break3to, hours: @pattern.break3hrs] unless @pattern.break3fr.blank?
        breaks[3] = [break_start: @pattern.break4fr , break_end: @pattern.break4to, hours: @pattern.break4hrs] unless @pattern.break4fr.blank?
        breaks[4] = [break_start: @pattern.break5fr , break_end: @pattern.break5to, hours: @pattern.break5hrs] unless @pattern.break5fr.blank?
      
        @@request_result[:success] = true
        # @@request_result[:metaData] = {fields:[{name: :break_start}, {name: :break_end}, {name: :hours}],root: :data}
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

  # GET /workskedpatterns/new
  # GET /workskedpatterns/new.json
  def new
    @workskedpattern = Workskedpattern.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @workskedpattern }
    end
  end

  # GET /workskedpatterns/1/edit
  def edit
    @workskedpattern = Workskedpattern.find(params[:id])
  end

  def setupList
    begin
      @workskeds = Workskedpattern.joins(:Workskedcategory, :Company)
                  .select('workskedpatterns.*, workskedcategories.description as category, companies.description as company')
                  .where(:mypclient_id => @@client_id)

      @clean_workskeds = @@stripper.activeRecordData(@workskeds)
      meta = @@meta_data.create(@workskeds);

      @@request_result = {success: true, data: @clean_workskeds, metaData: meta}

    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # POST /workskedpatterns
  # POST /workskedpatterns.json
  def create
    begin
      clean_worksked = @@stripper.hashData(params[:pattern])
      clean_worksked[:createdby] = session[:username]
      clean_worksked[:mypclient_id] = session[:client_id].strip

      @workskedpattern = Workskedpattern.new(clean_worksked)

      if @workskedpattern.save
        @@request_result[:success] = true
        @@request_result[:notice] = "Work Pattern successfully created."
      else
        @@request_result[:errormsg] = @workskedpattern.errors.full_messages[0]
      end
    rescue Exception => e
       @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /workskedpatterns/1
  # PUT /workskedpatterns/1.json
  def update
    begin
      clean_worksked = @@stripper.hashData(params[:pattern])

      clean_worksked[:lastupdateby] = session[:username]
      clean_worksked[:mypclient_id] = session[:client_id].strip
      @workskedpattern = Workskedpattern.find(params[:id])
      if @workskedpattern.update_attributes(clean_worksked)
        @@request_result[:success] = true
        @@request_result[:notice] = "Work Pattern successfully updated."
      else
        @@request_result[:errormsg] = @workskedpattern.errors.full_messages[0]
      end
    rescue Exception => e
       @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /workskedpatterns/1
  # DELETE /workskedpatterns/1.json
  def destroy
    begin 
      @pattern = Workskedpattern.find(params[:id])
      if @pattern.destroy
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

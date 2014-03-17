class HolidaylocalsController < ApplicationController
  before_filter :construct
  
  def construct
    @@request_result = {}
    @@request_result[:success] = false
    @@stripper = Stripper.new
    @@client_id = session[:client_id].strip
    @@meta_data = MetaData.new
    @@data_util = DataUtil.new
  end
  # GET /holidaylocals
  # GET /holidaylocals.json
  def index
    @holidaylocals = Holidaylocal.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @holidaylocals }
    end
  end

  # GET /holidaylocals/1
  # GET /holidaylocals/1.json
  def show
    @holidaylocal = Holidaylocal.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @holidaylocal }
    end
  end

  # GET /holidaylocals/new
  # GET /holidaylocals/new.json
  def new
    @holidaylocal = Holidaylocal.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @holidaylocal }
    end
  end

  # GET /holidaylocals/1/edit
  def edit
    @holidaylocal = Holidaylocal.find(params[:id])
  end

  # POST /holidaylocals
  # POST /holidaylocals.json
  def create
    @holidaylocal = Holidaylocal.new(params[:holidaylocal])

    respond_to do |format|
      if @holidaylocal.save
        format.html { redirect_to @holidaylocal, notice: 'Holidaylocal was successfully created.' }
        format.json { render json: @holidaylocal, status: :created, location: @holidaylocal }
      else
        format.html { render action: "new" }
        format.json { render json: @holidaylocal.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /holidaylocals/1
  # PUT /holidaylocals/1.json
  def update
    @holidaylocal = Holidaylocal.find(params[:id])

    respond_to do |format|
      if @holidaylocal.update_attributes(params[:holidaylocal])
        format.html { redirect_to @holidaylocal, notice: 'Holidaylocal was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @holidaylocal.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /holidaylocals/1
  # DELETE /holidaylocals/1.json
  def destroy
    begin
      ids_arr = params[:id].to_s.split(',')
      ids_arr.each {|id|
        Holidaylocal.where({:mypclient_id=>@@client_id, :location_id=> id}).destroy
      }
      @@request_result = {success: true, notice: 'Operation ended successfully.'}
    rescue Exception => e 
      @@request_result[:errormsg] = e.message 
    end
    render json: @@request_result
  end

  def affected_locations
    begin
      affected_locations = Holidaylocal.select('holidaylocals.id as hl_id, locations.id as location_id, locations.description as desc, locations.locationcode as code, locations.company_id,
                           companies.description as company')
                  .joins(:Location, :Company)
                  .where({:mypclient_id => @@client_id, :holiday_id=>params[:id]})
      data = @@stripper.activeRecordData(affected_locations) unless affected_locations.empty?
      meta_data = @@meta_data.create(affected_locations) unless affected_locations.empty?
      @@request_result = {success: true, data: data, metaData: meta_data}
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def multi_delete
    begin
      @holiday_locals = Holidaylocal.where('id in ('+JSON.parse(params[:holidaylocal_ids]).join(',')+')')
      if @holiday_locals.delete_all
        @@request_result = {success: true, notice: 'Operation ended successfully.'}
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message 
    end
    render json: @@request_result
  end
end

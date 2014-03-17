class LocationsController < ApplicationController
  before_filter :construct

  def construct
    @@request_result = {}
    @@request_result[:success] = false
    @@client_id = session[:client_id].strip
    @@stripper = Stripper.new
    @@meta_data = MetaData.new
  end

  # GET /locations
  # GET /locations.json
  def index
    @locations = Location.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @locations }
    end
  end

  # GET /locations/1
  # GET /locations/1.json
  def show
    @location = Location.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @location }
    end
  end

  # GET /locations/new
  # GET /locations/new.json
  def new
    @location = Location.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @location }
    end
  end

  # GET /locations/1/edit
  def edit
    @location = Location.find(params[:id])
  end

  # POST /locations
  # POST /locations.json
  def create
    begin
      new_location = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:location]), ['description'])
      new_location[:mypclient_id] = @@client_id
      new_location[:createdby] = session[:username]

      @location = Location.new(new_location)
      if @location.save
        @@request_result = {success: true, notice: 'Location was successfully created.'}
      else
        @@request_result[:errormsg] = @location.errors.full_messages[0]
      end

    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /locations/1
  # PUT /locations/1.json
  def update
    begin
      updated_location = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:location]), ['description'])
      updated_location[:lastupdateby] = session[:username]

      @location = Location.find(params[:id])

      if @location.update_attributes(updated_location)
        @@request_result = {success: true, notice: 'Location was successfully updated.'}
      else
        @@request_result[:errormsg] = @location.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /locations/1
  # DELETE /locations/1.json
   def destroy
    begin
      @location = Location.find(params[:id])
      if @location.destroy
        @@request_result = {success:true, notice: 'Operation ended successfully.'}
      else
        @@request_result[:errormsg] = @location.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

class HolidaytypesController < ApplicationController
  
  def initialize
    @@meta_data = MetaData.new
    @@stripper = Stripper.new
    @@request_result = {}
  end

  # GET /holidaytypes
  # GET /holidaytypes.json
  def index
    begin
      @holidaytypes = Holidaytype.where({:isactive=>1})
      @clean_types = @@stripper.activeRecordData(@holidaytypes)
      @@request_result[:success] = true
      @@request_result[:data] = @clean_types
      @@request_result[:metaData] = @@meta_data.create(@holidaytypes)
    rescue Exception => e
      @@request_result[:errmsg] = e.message
    end
    render json: @@request_result
  end

  # GET /holidaytypes/1
  # GET /holidaytypes/1.json
  def show
    @holidaytype = Holidaytype.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @holidaytype }
    end
  end

  # GET /holidaytypes/new
  # GET /holidaytypes/new.json
  def new
    @holidaytype = Holidaytype.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @holidaytype }
    end
  end

  # GET /holidaytypes/1/edit
  def edit
    @holidaytype = Holidaytype.find(params[:id])
  end

  # POST /holidaytypes
  # POST /holidaytypes.json
  def create
    @holidaytype = Holidaytype.new(params[:holidaytype])

    respond_to do |format|
      if @holidaytype.save
        format.html { redirect_to @holidaytype, notice: 'Holidaytype was successfully created.' }
        format.json { render json: @holidaytype, status: :created, location: @holidaytype }
      else
        format.html { render action: "new" }
        format.json { render json: @holidaytype.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /holidaytypes/1
  # PUT /holidaytypes/1.json
  def update
    @holidaytype = Holidaytype.find(params[:id])

    respond_to do |format|
      if @holidaytype.update_attributes(params[:holidaytype])
        format.html { redirect_to @holidaytype, notice: 'Holidaytype was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @holidaytype.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /holidaytypes/1
  # DELETE /holidaytypes/1.json
  def destroy
    @holidaytype = Holidaytype.find(params[:id])
    @holidaytype.destroy

    respond_to do |format|
      format.html { redirect_to holidaytypes_url }
      format.json { head :no_content }
    end
  end
end

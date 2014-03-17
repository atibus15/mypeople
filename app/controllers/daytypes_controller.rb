class DaytypesController < ApplicationController
  # GET /daytypes
  # GET /daytypes.json
  def index
    @daytypes = Daytype.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @daytypes }
    end
  end

  # GET /daytypes/1
  # GET /daytypes/1.json
  def show
    @daytype = Daytype.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @daytype }
    end
  end

  # GET /daytypes/new
  # GET /daytypes/new.json
  def new
    @daytype = Daytype.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @daytype }
    end
  end

  # GET /daytypes/1/edit
  def edit
    @daytype = Daytype.find(params[:id])
  end

  # POST /daytypes
  # POST /daytypes.json
  def create
    @daytype = Daytype.new(params[:daytype])

    respond_to do |format|
      if @daytype.save
        format.html { redirect_to @daytype, notice: 'Daytype was successfully created.' }
        format.json { render json: @daytype, status: :created, location: @daytype }
      else
        format.html { render action: "new" }
        format.json { render json: @daytype.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /daytypes/1
  # PUT /daytypes/1.json
  def update
    @daytype = Daytype.find(params[:id])

    respond_to do |format|
      if @daytype.update_attributes(params[:daytype])
        format.html { redirect_to @daytype, notice: 'Daytype was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @daytype.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /daytypes/1
  # DELETE /daytypes/1.json
  def destroy
    @daytype = Daytype.find(params[:id])
    @daytype.destroy

    respond_to do |format|
      format.html { redirect_to daytypes_url }
      format.json { head :no_content }
    end
  end
end

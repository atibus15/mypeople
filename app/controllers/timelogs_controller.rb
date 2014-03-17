class TimelogsController < ApplicationController
  # GET /timelogs
  # GET /timelogs.json
  def index
    @timelogs = Timelog.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @timelogs }
    end
  end

  # GET /timelogs/1
  # GET /timelogs/1.json
  def show
    @timelog = Timelog.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @timelog }
    end
  end

  # GET /timelogs/new
  # GET /timelogs/new.json
  def new
    @timelog = Timelog.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @timelog }
    end
  end

  # GET /timelogs/1/edit
  def edit
    @timelog = Timelog.find(params[:id])
  end

  # POST /timelogs
  # POST /timelogs.json
  def create
    @timelog = Timelog.new(params[:timelog])

    respond_to do |format|
      if @timelog.save
        format.html { redirect_to @timelog, notice: 'Timelog was successfully created.' }
        format.json { render json: @timelog, status: :created, location: @timelog }
      else
        format.html { render action: "new" }
        format.json { render json: @timelog.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /timelogs/1
  # PUT /timelogs/1.json
  def update
    @timelog = Timelog.find(params[:id])

    respond_to do |format|
      if @timelog.update_attributes(params[:timelog])
        format.html { redirect_to @timelog, notice: 'Timelog was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @timelog.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /timelogs/1
  # DELETE /timelogs/1.json
  def destroy
    @timelog = Timelog.find(params[:id])
    @timelog.destroy

    respond_to do |format|
      format.html { redirect_to timelogs_url }
      format.json { head :no_content }
    end
  end
end

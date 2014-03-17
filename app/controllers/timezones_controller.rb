class TimezonesController < ApplicationController
  # GET /timezones
  # GET /timezones.json
  def index
    @timezones = Timezone.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @timezones }
    end
  end

  # GET /timezones/1
  # GET /timezones/1.json
  def show
    @timezone = Timezone.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @timezone }
    end
  end

  # GET /timezones/new
  # GET /timezones/new.json
  def new
    @timezone = Timezone.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @timezone }
    end
  end

  # GET /timezones/1/edit
  def edit
    @timezone = Timezone.find(params[:id])
  end

  # POST /timezones
  # POST /timezones.json
  def create
    @timezone = Timezone.new(params[:timezone])

    respond_to do |format|
      if @timezone.save
        format.html { redirect_to @timezone, notice: 'Timezone was successfully created.' }
        format.json { render json: @timezone, status: :created, location: @timezone }
      else
        format.html { render action: "new" }
        format.json { render json: @timezone.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /timezones/1
  # PUT /timezones/1.json
  def update
    @timezone = Timezone.find(params[:id])

    respond_to do |format|
      if @timezone.update_attributes(params[:timezone])
        format.html { redirect_to @timezone, notice: 'Timezone was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @timezone.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /timezones/1
  # DELETE /timezones/1.json
  def destroy
    @timezone = Timezone.find(params[:id])
    @timezone.destroy

    respond_to do |format|
      format.html { redirect_to timezones_url }
      format.json { head :no_content }
    end
  end
end

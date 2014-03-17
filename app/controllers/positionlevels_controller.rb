class PositionlevelsController < ApplicationController
  # GET /positionlevels
  # GET /positionlevels.json
  def index
    @positionlevels = Positionlevel.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @positionlevels }
    end
  end

  def adminSelection

    begin

      @position_levels  = Positionlevel.select('id as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id})
      @clean_post_lvls = []
      i = 0
      @position_levels.each do |level|

        @clean_post_lvls[i] = {}

        @clean_post_lvls[i][:code] = level[:code]
        @clean_post_lvls[i][:desc] = level[:desc].strip

        i+=1
      end

      @@request_result[:success] = true
      @@request_result[:data] = @clean_post_lvls
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # GET /positionlevels/1
  # GET /positionlevels/1.json
  def show
    @positionlevel = Positionlevel.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @positionlevel }
    end
  end

  # GET /positionlevels/new
  # GET /positionlevels/new.json
  def new
    @positionlevel = Positionlevel.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @positionlevel }
    end
  end

  # GET /positionlevels/1/edit
  def edit
    @positionlevel = Positionlevel.find(params[:id])
  end

  # POST /positionlevels
  # POST /positionlevels.json
  def create    
    begin
      new_level = params[:positionlevel]
      new_level[:createdby] = @@username
      new_level[:mypclient_id] = @@client_id

      @position_level = Positionlevel.new(new_level)
      if @position_level.save
        @@request_result = {success: true, notice: 'Position level was successfully created.'}
      else
        @@request_result[:errormsg] = @position_level.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /positionlevels/1
  # PUT /positionlevels/1.json
  def update
    begin
      updated_level = params[:positionlevel]
      updated_level[:lastupdateby] = @@username

      @position_level = Positionlevel.find(params[:id])

      if @position_level.update_attributes(updated_level)
        @@request_result = {success: true, notice: 'Position level was successfully updated.'}
      else
        @@request_result[:errormsg] = @position_level.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /positionlevels/1
  # DELETE /positionlevels/1.json
  def destroy
    begin
      @positionlevel = Positionlevel.find(params[:id])
      if @positionlevel.destroy
        @@request_result = {success:true, notice:'Operation ended successfully.'}
      else
        @@request_result[:errormsg] = @positionlevel.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

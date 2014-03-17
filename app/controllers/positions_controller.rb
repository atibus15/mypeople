
class PositionsController < ApplicationController
  # GET /positions
  # GET /positions.json
  def index
    @positions = Position.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @positions }
    end
  end


def setupList
    begin
      @positions = Position.select('positions.id as position_id, positions.company_id, positions.positioncode as code, positions.positionlevel_id, positions.description, positions.isactive as status, 
                        positions.createddate, positions.createdby, positions.lastupdatedate, positions.lastupdateby,
                        companies.description as company
                      ')
                      .joins('INNER JOIN companies ON companies.id = positions.company_id')
                      .where(:mypclient_id => @@client_id)
      i = 0
      @positions.each do |position|
          position.attributes.each{|key, value|
            @positions[i][key] = value.to_s.strip 
          }
        i+=1
      end
      @@request_result[:metaData] = @@meta_data.create(@positions)
      @@request_result[:success] = true
      @@request_result[:data] = @positions
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def adminSelection

    begin

      @positions  = Position.select('id as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id})
      @clean_positions = []
      i = 0
      @positions.each do |position|

        @clean_positions[i] = {}

        @clean_positions[i][:code] = position[:code]
        @clean_positions[i][:desc] = position[:desc].strip

        i+=1
      end

      @@request_result[:success] = true
      @@request_result[:data] = @clean_positions
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # GET /positions/1
  # GET /positions/1.json
  def show
    @position = Position.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @position }
    end
  end

  # GET /positions/new
  # GET /positions/new.json
  def new
    @position = Position.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @position }
    end
  end

  # GET /positions/1/edit
  def edit
    @position = Position.find(params[:id])
  end

  # POST /positions
  # POST /positions.json
  def create
    begin
      @new_position = @@data_util.hash_data_to_upper_case(params[:position], ['description'])
      @new_position[:createdby] = session[:username]
      @new_position[:mypclient_id] = session[:client_id]

      @position = Position.new(@new_position)
      if @position.save
        @@request_result[:success] = true
        @@request_result[:notice] ="Position was successfully created."
      else
        @@request_result[:errormsg] = @position.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /positions/1
  # PUT /positions/1.json
  def update
    begin
      @position = Position.find(params[:id]);
      @updated_position = @@data_util.hash_data_to_upper_case(params[:position], ['description'])
      @updated_position[:lastupdateby] = session[:username]

      if @position.update_attributes(@updated_position)
        @@request_result[:success] = true
        @@request_result[:notice] ="Position was successfully updated."
      else
        @@request_result[:errormsg] = @position.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /positions/1
  # DELETE /positions/1.json
  def destroy
    begin
      @position = Position.find(params[:id])
      if @position.destroy
        @@request_result[:success] = true
        @@request_result[:notice] = 'Operation ended successfully.'
      else
        @request_result[:errormsg] = @position.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

class LeavetypesController < ApplicationController

  before_filter :construct

  def construct
      @@request_result = {}
      @@request_result[:success] = false
      @@meta_data = MetaData.new
      @@stripper = Stripper.new
      @@client_id = session[:client_id].strip
      @@username = session[:username].strip
  end
  # GET /leavetypes
  # GET /leavetypes.json
  def index
    @leavetypes = Leavetype.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @leavetypes }
    end
  end

  # GET /leavetypes/1
  # GET /leavetypes/1.json
  def show
    @leavetype = Leavetype.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @leavetype }
    end
  end

  # GET /leavetypes/new
  # GET /leavetypes/new.json
  def new
    @leavetype = Leavetype.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @leavetype }
    end
  end

  # GET /leavetypes/1/edit
  def edit
    @leavetype = Leavetype.find(params[:id])
  end

  # POST /leavetypes
  # POST /leavetypes.json
  def create
    begin
      
      @new_type = params[:leave_type]
      @new_type[:mypclient_id] = @@client_id
      @new_type[:createdby] = @@username

      @leave_type = Leavetype.new(@new_type)
      if @leave_type.save
        @@request_result = {success: true, notice: 'Leave Type was successfully created.'}
      else
        @@request_result[:errormsg] = @leave_type.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /leavetypes/1
  # PUT /leavetypes/1.json
  def update
    begin
      @leave_type = Leavetype.find(params[:id])
      @updated_type = params[:leave_type]
      @updated_type[:lastupdateby] = @@username
      if @leave_type.update_attributes(@updated_type)
        @@request_result = {success: true, notice: 'Leave Type was successfully updated.'}
      else
        @@request_result[:errormsg] = @leave_type.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /leavetypes/1
  # DELETE /leavetypes/1.json
  def destroy
    begin
      @leave = Leavetype.find(params[:id])
      if @leave.destroy
        @@request_result = {success:true, notice: 'Operation ended successfully.'}
      else
        @@request_result[:errormsg] = @leave.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

end #end class
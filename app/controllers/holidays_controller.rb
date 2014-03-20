class HolidaysController < ApplicationController
  before_filter :restrict_regular_user

  # GET /holidays
  # GET /holidays.json
  def index
    @holidays = Holiday.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @holidays }
    end
  end

  # GET /holidays/1
  # GET /holidays/1.json
  def show
    @holiday = Holiday.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @holiday }
    end
  end

  # GET /holidays/new
  # GET /holidays/new.json
  def new
    @holiday = Holiday.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @holiday }
    end
  end

  # GET /holidays/1/edit
  def edit
    @holiday = Holiday.find(params[:id])
  end

  # POST /holidays
  # POST /holidays.json
  def create
    begin
        @new_holiday = @@data_util.strip_hash_data(params[:holiday])
        @new_holiday[:mypclient_id] = session[:client_id].strip
        @new_holiday[:createdby]    = session[:username].strip
        @new_holiday[:holidaydate] = Date.strptime(@new_holiday[:holidaydate], "%m/%d/%Y")
        @locals = JSON.parse params[:locals] unless params[:locals].empty? 

        Holiday.transaction do
          @holiday = Holiday.new(@new_holiday)
          if @holiday.save
              self.add_holiday_local(@locals, @holiday.id)
              @@request_result[:success] = true
              @@request_result[:notice] = "Holiday was successfully created."
          else
              @@request_result[:errormsg] = @holiday.errors.full_messages[0]
              ActiveRecord::Rollback
          end
        end
    rescue Exception => e
        ActiveRecord::Rollback
        @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end 


  # PUT /holidays/1
  # PUT /holidays/1.json
  def update
    begin
        @updated_holiday = @@data_util.strip_hash_data(params[:holiday])
        @updated_holiday[:lastupdateby]    = session[:username].strip
        @updated_holiday[:holidaydate] = Date.strptime(@updated_holiday[:holidaydate], "%m/%d/%Y")
        @locals = JSON.parse params[:locals] unless params[:locals].nil? 

        @holiday = Holiday.find(params[:id])
        if @holiday.update_attributes(@updated_holiday)
            unless @locals.empty?
              self.add_holiday_local(@locals,@holiday.id)
            end
            @@request_result[:success] = true
            @@request_result[:notice] = "Holiday was successfully updated."
        else
            @@request_result[:errormsg] = @holiday.errors.full_messages[0]
        end
    rescue Exception => e
        @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /holidays/1
  # DELETE /holidays/1.json
  def destroy
    begin
      @holiday = Holiday.find(params[:id])
      if @holiday.destroy
        @@request_result = {success:true, notice: 'Operation ended successfully.'}
      else
        @@request_result[:errormsg] = @holiday.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def add_holiday_local(locals, holiday_id)
    locals.each{|local|
      @new_local = local
      @new_local[:holiday_id] = holiday_id
      @new_local[:mypclient_id] = @@client_id
      @new_local[:createdby] = @@username
      @holiday_local = Holidaylocal.new(@new_local)
      if !@holiday_local.save
        raise @holiday_local.errors.full_messages[0]
      end
    }
  end
end

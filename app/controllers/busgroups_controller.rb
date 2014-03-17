
class BusgroupsController < ApplicationController


  before_filter :restrict_regular_user


  # GET /busgroups
  # GET /busgroups.json
  def index
    @busgroups = Busgroup.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @busgroups }
    end
  end

  
  def setupList
    begin
      @busgroups =  Busgroup.select('id as group_id, busgroupcode as code, description, isactive as status, createddate, createdby, lastupdatedate, lastupdateby')
                    .where(:mypclient_id => @@client_id)
      i = 0
      @busgroups.each do |dept|
          dept.attributes.each{|key, value|
            @busgroups[i][key] = value.to_s.strip 
          }
        i+=1
      end
      @@request_result[:metaData] = @@meta_data.create(@busgroups)
      @@request_result[:success] = true
      @@request_result[:data] = @busgroups
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def adminSelection
    begin

      @groups  = Busgroup.select('id as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id})
      @clean_groups = []
      i = 0
      @groups.each do |group|

        @clean_groups[i] = {}
        
        @clean_groups[i][:code] = group[:code]
        @clean_groups[i][:desc] = group[:desc].strip

        i+=1
      end

      @@request_result[:success] = true
      @@request_result[:data] = @clean_groups
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # GET /busgroups/1
  # GET /busgroups/1.json
  def show
    @busgroup = Busgroup.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @busgroup }
    end
  end

  # GET /busgroups/new
  # GET /busgroups/new.json
  def new
    @busgroup = Busgroup.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @busgroup }
    end
  end

  # GET /busgroups/1/edit
  def edit
    @busgroup = Busgroup.find(params[:id])
  end

  # POST /busgroups
  # POST /busgroups.json
  def create
    begin
      @busgroup = Busgroup.new
      @busgroup.mypclient_id = session[:client_id]
      @busgroup.busgroupcode = params[:group_code].strip.upcase
      @busgroup.description = params[:description].strip
      @busgroup.isactive = 1
      @busgroup.createdby = session[:username]

      if @busgroup.save 
        @@request_result[:success] = true
        @@request_result[:notice] = 'Business Group successfully created.'
      else
        @@request_result[:errormsg] = @busgroup.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /busgroups/1
  # PUT /busgroups/1.json
  def update

    begin
      @busgroup = Busgroup.find(params[:id])
      @busgroup.mypclient_id = session[:client_id]
      @busgroup.busgroupcode = params[:group_code].upcase.strip
      @busgroup.description = params[:description].strip
      @busgroup.lastupdateby = session[:username]

      if @busgroup.save 
        @@request_result[:success] = true
        @@request_result[:notice] = 'Business Group successfully updated.'
      else
        @@request_result[:errormsg] = @busgroup.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /busgroups/1
  # DELETE /busgroups/1.json
  def destroy
    begin
      @busgroup = Busgroup.find(params[:id])
      if @busgroup.destroy
        @@request_result[:notice] = 'Operation ended successfully.'
        @@request_result[:success] = true
      else
        @@request_result[:errormsg] = @busgroup.errors.full_messages[0]
      end
    rescue Exception=>e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

require 'meta_data'
class HoldcompaniesController < ApplicationController

  before_filter :construct

  
  @@client_id

  def construct
    @@request_result = {}
    @@request_result[:success] = false
    @@client_id = session[:client_id].strip
    @@meta_data = MetaData.new
  end

  # GET /holdcompanies
  # GET /holdcompanies.json
  def index
    @holdcompanies = Holdcompany.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @holdcompanies }
    end
  end

  def setupList
    begin
      @holding_coms = Holdcompany.select('id as holding_id, holdcompanycode as code, description, isactive as status, createddate, createdby, lastupdatedate, lastupdateby')
                      .where(:mypclient_id => @@client_id)
      i = 0
      @holding_coms.each do |hcom|
          hcom.attributes.each{|key, value|
            @holding_coms[i][key] = value.to_s.strip 
          }
        i+=1
      end
      @@request_result[:metaData] = @@meta_data.create(@holding_coms)
      @@request_result[:success] = true
      @@request_result[:data] = @holding_coms
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def adminSelection
    begin

      @holdings  = Holdcompany.select('id as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id})
      @clean_holdings = []
      i = 0
      @holdings.each do |holding_com|

        @clean_holdings[i] = {}
        
        @clean_holdings[i][:code] = holding_com[:code]
        @clean_holdings[i][:desc] = holding_com[:desc].strip

        i+=1
      end

      @@request_result[:success] = true
      @@request_result[:data] = @clean_holdings
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end



  # GET /holdcompanies/1
  # GET /holdcompanies/1.json
  def show
    @holdcompany = Holdcompany.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @holdcompany }
    end
  end

  # GET /holdcompanies/new
  # GET /holdcompanies/new.json
  def new
    @holdcompany = Holdcompany.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @holdcompany }
    end
  end

  # GET /holdcompanies/1/edit
  def edit
    @holdcompany = Holdcompany.find(params[:id])
  end

  # POST /holdcompanies
  # POST /holdcompanies.json
  def create
    begin
      @holdcompany = Holdcompany.new
      @holdcompany.mypclient_id = session[:client_id]
      @holdcompany.holdcompanycode = params[:code].strip.upcase
      @holdcompany.description = params[:description].strip
      @holdcompany.isactive = 1
      @holdcompany.createdby = session[:username]
      @holdcompany.createddate = Date.current

      if @holdcompany.save
        @@request_result[:success] = true
        @@request_result[:notice] = 'Holding company was successfully created.'
      else
        @@request_result[:errormsg] = @holdcompany.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /holdcompanies/1
  # PUT /holdcompanies/1.json
  def update
    begin
      @holdcompany = Holdcompany.find(params[:id])
      @holdcompany.mypclient_id = session[:client_id]
      @holdcompany.holdcompanycode = params[:code]
      @holdcompany.description = params[:description]
      @holdcompany.lastupdateby = session[:username]
      
      if @holdcompany.save
        @@request_result[:success] = true
        @@request_result[:notice] = 'Holding company was successfully updated.'
      else
        @@request_result[:errormsg] = @holdcompany.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /holdcompanies/1
  # DELETE /holdcompanies/1.json
  def destroy
    begin
      @holdcompany = Holdcompany.find(params[:id])
      if @holdcompany.destroy
        @@request_result[:notice] = 'Operation ended successfully.'
        @@request_result[:success] = true
      else
        @@request_result[:errormsg] = @holdcompany.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

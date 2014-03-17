
class CompaniesController < ApplicationController


  # GET /companies
  # GET /companies.json
  def index
    @companies = Company.all
    respond_to do |format|
      format.html  # index.html.erb
      format.json { render json: @companies }
    end
  end

  # GET /companies/1
  # GET /companies/1.json
  def show
    @company = Company.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @company }
    end
  end

  def setupList()
    begin
      @companies = Company.joins('LEFT JOIN Countries on countries.id = companies.country_id')
                    .joins('LEFT JOIN Holdcompanies on holdcompanies.id = companies.holdcompany_id')
                    .select('companies.*, countries.description as country, holdcompanies.description as holding_company')
                    .where(:mypclient_id => @@client_id)

      @@request_result[:metaData] = @@meta_data.create(@companies) unless @companies.empty?
      
      @@request_result[:data] = @@stripper.activeRecordData(@companies)
      @@request_result[:success] = true
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def admin_selection

    begin
      @companies  = Company.select('id as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id})
      @clean_companies = @@stripper.activeRecordData(@companies)

      @@request_result[:success] = true
      @@request_result[:data] = @clean_companies
      @@request_result[:metaData] = @@meta_data.create(@companies) unless @companies.empty?

    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # GET /companies/new
  # GET /companies/new.json
  def new
    @company = Company.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @company }
    end
  end

  # GET /companies/1/edit
  def edit
    @company = Company.find(params[:id])
  end

  # POST /companies
  # POST /companies.json
  def create
    begin
      
      detail = @@data_util.hash_data_to_upper_case( params[:company], ['description'])

      detail[:mypclient_id] = session[:client_id]
      detail[:createdby] = session[:username]
      detail[:isactive] = 1

      @company = Company.new(detail)
      if @company.save
        @@request_result[:success] = true
        @@request_result[:notice] = 'New company successfully created.'
      else
        @@request_result[:errormsg] = @company.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /companies/1
  # PUT /companies/1.json
  def update
    begin
      @company = Company.find(params[:id])
      detail = @@data_util.hash_data_to_upper_case(params[:company], ['description'])
      detail[:lastupdateby] = session[:username]

      @@request_result[:data] = detail  
      @@request_result[:type] = params[:company].class  
      if @company.update_attributes(detail)
        @@request_result[:success] = true
        @@request_result[:notice] = 'Company successfully updated.'
      else
        @@request_result[:errormsg] = @company.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /companies/1
  # DELETE /companies/1.json
  def destroy
    begin
      @company = Company.find(params[:id])
      if @company.destroy
        @@request_result[:success] = true
        @@request_result[:notice] = 'Operation ended successfully.'
      else
        @@request_result[:errormsg] = @company.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
      @@request_result[:errorcode] = e.code
    end
    render json: @@request_result
  end

  def day_types
    begin
      @company = Company.find(params[:id])
      day_types = @company.Daytypes;
      cl_day_types = @@stripper.activeRecordData(day_types)
      meta = @@meta_data.create(day_types)

      @@request_result = {success: true, data: cl_day_types, metaData: meta}
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end
end

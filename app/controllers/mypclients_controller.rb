class MypclientsController < ApplicationController
  # GET /mypclients
  # GET /mypclients.json
  def index
    begin
      clients = Mypclient.all
      cl_clients = @@stripper.activeRecordData(clients)
      meta = @@meta_data.create(clients)
      @@request_result = {success:true, data: cl_clients, metaData: meta}
      
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @@request_result }
    end
  end

  # GET /mypclients/1
  # GET /mypclients/1.json
  def show
    @mypclient = Mypclient.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @mypclient }
    end
  end

  # GET /mypclients/new
  # GET /mypclients/new.json
  def new
    @mypclient = Mypclient.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @mypclient }
    end
  end

  # GET /mypclients/1/edit
  def edit
    @mypclient = Mypclient.find(params[:id])
  end

  # POST /mypclients
  # POST /mypclients.json
  def create
    begin
      new_client = params[:client]
      seq_no = Mypclient.maximum('seqno') + 1
      new_client[:security_token] = Digest::MD5.hexdigest(new_client[:security_token])
      new_client[:seqno] = seq_no
      new_client[:createdby] = session[:username]
      @client = Mypclient.new(new_client)
      if @client.save
        @@request_result = {success: true, notice: 'Client was successfully created.'}
      else
        @@request_result[:errormsg] = @client.errors.full_messages[0]
      end

    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    @@request_result[:su] = Digest::MD5.hexdigest('supereye')
    @@request_result[:pw] = Digest::MD5.hexdigest('$Up3^343@2014')
    respond_to do |format|
        format.html
        format.json { render json: @@request_result }
    end
  end

  # PUT /mypclients/1
  # PUT /mypclients/1.json
  def update
    begin
      updated_client = params[:client]
      seq_no = Mypclient.maximum('seqno') + 1
      updated_client[:lastupdateby] = session[:username]
      updated_client[:security_token] = Digest::MD5.hexdigest(updated_client[:security_token])
      @client = Mypclient.find(params[:id])
      if @client.update_attributes(updated_client)
        @@request_result = {success: true, notice: 'Client was successfully updated.'}
      else
        @@request_result[:errormsg] = @client.errors.full_messages[0]
      end

    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end

    respond_to do |format|
        format.html
        format.json { render json: @@request_result }
    end
  end

  # DELETE /mypclients/1
  # DELETE /mypclients/1.json
  def destroy
    begin
       @mypclient = Mypclient.find(params[:id])
      if @mypclient.destroy
        @@request_result = {success: true, notice: 'Operation ended successfully.'}
      else
        @@request_result[:errormsg] = @mypclient.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
   
    respond_to do |format|
      format.html 
      format.json {render json: @@request_result}
    end
  end
end

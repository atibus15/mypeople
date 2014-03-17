class AttendanceFilesController < ApplicationController
  # GET /attfiles
  # GET /attfiles.json
  def index
    begin
      @cutoff_id = params[:cutoff_id]
      @company_id = params[:company_id]
      @att_files = Attfile.where({:mypclient_id => @@client_id, :cutoff_id => @cutoff_id, :company_id=> @company_id})
      @cl_att_files = @@stripper.activeRecordData(@att_files)
      @meta = @@meta_data.create(@att_files)
      @@request_result = {success: true, data: @cl_att_files, metaData:@meta}
    rescue ActiveRecord::StatementInvalid
      @@request_result[:errormsg] = 'Invalid SQL Statement.'
      respond_to_request 
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  # POST /attfiles
  # POST /attfiles.json
  def create
    begin
      @file_data = @@stripper.hashData(params[:payrollfile])
      @file_data[:efilesapprovalcutoff] = Date.strptime(@file_data[:efilesapprovalcutoff], '%m/%d/%Y')
      @file_data[:createdby] = @@username
      @file_data[:mypclient_id] = @@client_id

      @att_file = Attfile.new(@file_data)
      if @att_file.save
        @@request_result = {success: true, notice: 'Payroll File was successfully created.', file: @att_file}
      else
        @@request_result[:errormsg] = @att_file.errors.full_messages[0]
      end
    rescue ActiveRecord::StatementInvalid
      @@request_result[:errormsg] = 'Invalid SQL Statment.'
      respond_to_request
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  # PUT /attfiles/1
  # PUT /attfiles/1.json
  def update
    begin
      @file_data = @@stripper.hashData(params[:payrollfile])
      @file_data[:efilesapprovalcutoff] = Date.strptime(@file_data[:efilesapprovalcutoff], '%m/%d/%Y')
      @file_data[:lastupdateby] = @@username

      @att_file = Attfile.find(params[:id])
      if @att_file.update_attributes(@file_data)
        @@request_result = {success: true, notice: 'Payroll File was successfully updated.', file: @att_file}
      else
        @@request_result[:errormsg] = @att_file.errors.full_messages[0]
      end
    rescue ActiveRecord::RecordNotFound
      @@request_result[:errormsg] = 'Record not Found'
      respond_to_request
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  # DELETE /attfiles/1
  # DELETE /attfiles/1.json
  def destroy
    begin
      @att_file = Attfile.find(params[:id])
      @@request_result = {success: true, notice: 'Operation ended successfully.'} if @att_file.destroy
    rescue ActiveRecord::RecordNotFound
      @@request_result[:errormsg] = 'Record Not Found'
      respond_to_request
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end
end

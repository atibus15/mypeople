class CutOffsController < ApplicationController

  before_filter :restrict_regular_user
  # GET /cutoffs
  # GET /cutoffs.json
  def index
    begin
      company_id = params[:company_id]
      @cut_offs = Cutoff.where({:mypclient_id => @@client_id, :company_id => company_id})
      cl_cut_offs = @@stripper.activeRecordData(@cut_offs)
      meta = @@meta_data.create(@cut_offs)

      @@request_result = {success: true, data: cl_cut_offs, metaData: meta}
    rescue ActiveRecord::StatementInvalid
      @@request_result[:errormsg] = 'Invalid SQL Statement.'
      respond_to_request
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  # POST /cutoffs
  # POST /cutoffs.json

  def create
    begin
      @cutoff_data = params[:cutoff]
      @cutoff_data[:createdby] = @@username
      @cutoff_data[:dateto] = Date.strptime(@cutoff_data[:dateto],'%m/%d/%Y')
      @cutoff_data[:datefr] = Date.strptime(@cutoff_data[:datefr],'%m/%d/%Y')
      @cutoff_data[:mypclient_id] = @@client_id

      @new_cut_off = Cutoff.new(@cutoff_data)

      if @new_cut_off.save
        @@request_result = {success: true, notice: 'New Cut-Off was successfully created.', cutoff: @new_cut_off}
      else
        @@request_result[:errormsg] = @new_cut_off.errors.full_messages[0]
        @@request_result[:cutoff] = @cutoff
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  # PUT /cutoffs/1
  # PUT /cutoffs/1.json
  def update
    begin
      @cutoff_data = params[:cutoff]
      @cutoff_data[:lastupdateby] = @@username
      @cutoff_data[:dateto] = Date.strptime(@cutoff_data[:dateto],'%m/%d/%Y')
      @cutoff_data[:datefr] = Date.strptime(@cutoff_data[:datefr],'%m/%d/%Y')

      @cut_off = Cutoff.find(params[:id])
      if @cut_off.update_attributes(@cutoff_data)
        @@request_result = {success: true, notice: 'Attendance Cut-Off successfully updated.', cutoff: @cut_off}
      end
    rescue ActiveRecord::RecordNotFound
      @@request_result[:errormsg] = 'Your tying to update not-existing record.'
      respond_to_request
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  # DELETE /cutoffs/1
  # DELETE /cutoffs/1.json
  def destroy
    begin
      @cut_off = Cutoff.find(params[:id])
      @@request_result = {success: true, notice: 'Operation ended successfully.'} if @cut_off.destroy
    rescue ActiveRecord::RecordNotFound
      @@request_result[:errormsg] = 'Record not found.'
      respond_to_request
    rescue 
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end
end

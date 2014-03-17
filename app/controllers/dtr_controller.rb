class DtrController < ApplicationController
  def logs
    begin
      badge_no = params[:badge_no]
      date_start = params[:date_start].nil? || params[:date_start].blank? ? Time.now : Date.strptime(params[:date_start], "%m/%d/%Y")
      date_end = params[:date_end].nil? || params[:date_end].blank? ? Time.now : Date.strptime(params[:date_end], "%m/%d/%Y")
      @logs = Timelog.employee_logs_by_badgeno_and_client_id(badge_no, @@client_id, date_start, date_end)

      @cl_logs = @@stripper.activeRecordData(@logs)
      @meta = @@meta_data.create(@logs)
      @total_logs = @logs.count
      @@request_result = {success: true, data: @cl_logs, metaData: @meta, totalProperty:@total_logs}
    rescue ActiveRecord::StatementInvalid
      @@request_result[:errormsg] = 'ERROR: Invalid SQL Statement'
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    respond_to_request
  end

  def history_condition
    @@client_id = session[:client_id].nil? ? params[:client_id] : @@client_id
    @@id_no =  params[:id_no].strip
    @condition = []
    unless params[:start_date].blank? || params[:end_date].blank?
      @start_date = Date.strptime(params[:start_date], "%Y-%m-%d").to_s
      @end_date = Date.strptime(params[:end_date], "%Y-%m-%d").to_s
      @condition[0] = ["dtrdatein between '#{@start_date}' AND '#{@end_date}'"]
    end
    @condition[1] = ["mypclient_id = '#{@@client_id}'"]
    @condition[2] = ["empidno = '#{@@id_no}'"]
    @cl_condition = @condition.compact.flatten
    @cl_condition.join(' AND ')
  end

  def history
    begin
      @dtr_logs = Empdtr.where(history_condition).limit(3).offset(0)

      @cl_dtr_logs = @@stripper.activeRecordData(@dtr_logs)
      @meta = @@meta_data.create(@dtr_logs)

      @@request_result = {success: true, data: @cl_dtr_logs, metaData: @meta}
    rescue ActiveRecord::StatementInvalid
      @@request_result[:errorrmsg] = 'ERROR : Invalid SQL Statement.'
    rescue Exception =>e
      @@request_result[:errorrmsg] = e.message
    end
    respond_to_request
  end
end

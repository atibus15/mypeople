require 'meta_data'
require 'stripper'
require 'data_util'
class EmployeesController < ApplicationController


    layout 'admin'

    before_filter :restrict_guest

    def newEmployeeNumber
        begin
            @last_employee    = Employee.where({:mypclient_id => @@client_id}).last

            @new_employee_no  = @last_employee ? @last_employee[:empno].to_i + 1 : 1 
            @@request_result[:success] = true
            @@request_result[:new_emp_no] = @new_employee_no
        rescue Exception => e
            @@request_result[:errormsg] = e.message
        end
        render json: @@request_result
    end

    def search_condition
        last_name ||= params[:last_name]
        company_id ||= params[:company_id]
        id_number ||=params[:id_number] 
        location_id ||= params[:location_id]
        location_code ||= params[:location_code]
        status ||= params[:status]
        conditions = []

        conditions[0] = ["UPPER(employees.empnamelast) LIKE '%#{last_name.upcase}%'"] unless last_name.blank?
        conditions[1] = ["employees.company_id = #{company_id}"] unless company_id.blank?
        conditions[2] = ["employees.empidno = '#{id_number}'"] unless id_number.blank?
        conditions[3] = ["employees.mypclient_id = '#{@@client_id}'"] unless @@client_id.blank?
        conditions[4] = ["employees.location_id = '#{location_id}'"] unless location_id.blank?
        conditions[5] = ["locations.locationcode = '#{location_code}"] unless location_code.blank?
        conditions[6] =["employees.isactivestatus = #{status}"] unless status.blank?
        sanitized_conditions = conditions.compact.flatten
        sanitized_conditions.join(' AND ')
    end

    def selector_filters
      company_id ||= params[:company_id]
      conditions = JSON.parse(params[:conditions]) unless params[:conditions].blank?
      condition_arr = []

      if !conditions.nil?
        conditions.each{|condition|
          table_column = get_table_column(condition['filterkey'])
          condition_arr << ["#{table_column} #{condition['operator']} '#{condition['value'].to_s.upcase}'"]
        }
      end
      
      sanitized_conditions = condition_arr.compact.flatten
      
      initial_con = sanitized_conditions.join(' OR ')

      with_client_condition = ["employees.mypclient_id = '#{@@client_id}'"]
      with_client_condition << ["employees.company_id = #{company_id}"] unless company_id.blank?
      with_client_condition << [initial_con] unless initial_con.blank?
      with_client_condition.compact.flatten.join(' AND ')
    end

    def get_table_column(key)
      return 'UPPER(locations.locationcode)' if key.strip == 'Location Code'
      return 'UPPER(employees.empbadgeno)' if key.strip == 'Badge No'
      return 'UPPER(employees.empidno)' if key.strip == 'ID Number'
      return 'UPPER(employees.empnamelast)' if key.strip == 'Lastname'
    end

    def list
        begin
            company_id = params[:company_id]
            conditions = params[:selector].nil? ? search_condition : selector_filters

            @employees =  Employee.select("employees.*, companies.description as company_desc, busgroups.description as busgroup_desc,
                    positions.description as position_desc, positionlevels.description as positionlevel_desc, 
                    holdcompanies.description as holdcompany_desc, departments.description as department_desc, locations.locationcode")
                .joins(:Company, :Busgroup, :Position, :Positionlevel, :Holdcompany, :Department, :Location)
                .where(conditions)
                .order('companies.description, employees.empfullnamelfm')

            @employees.each {|employee|
              is_user_account_exists = employee.Useracct.nil? ? false : true
              employee[:suggested_username] = suggest_username(employee) unless is_user_account_exists
            }

            @clean_employees = @@stripper.activeRecordData(@employees)

            @@request_result = {success: true, data: @clean_employees, metaData: @@meta_data.create(@employees), total_employee: @employees.count}
        rescue Exception => e
            @@request_result[:errormsg] = e.message
        end
        respond_to do |format|
            format.html # index.html.erb
            format.json { render json: @@request_result }
        end
    end

    def suggest_username employee 
      f_name = employee.empnamefirst
      m_name = employee.empnamemiddle
      l_name = employee.empnamelast
      Useracct.suggest_username(f_name, m_name, l_name)
    end

    # GET /employees
    # GET /employees.json
    def index
        respond_to do |format|
            format.html # index.html.erb
        end
    end

  # POST /employees
  # POST /employees.json
  def create
    begin
      
      @new_employee = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:employee]), [])
      @new_employee[:mypclient_id] = @@client_id
      @new_employee[:datehired] = Date.strptime(@new_employee[:datehired], "%m/%d/%Y")
      @new_employee[:emailaddress] = @new_employee[:emailaddress].downcase
      @new_employee[:isactivestatus] = 1
      @employee = Employee.new(@new_employee)
      if @employee.save
        @employee[:suggested_username] = suggest_username @employee

        @@request_result = {success: true, notice: 'New employee successfully created', new_employee: @employee}
      else
        @@request_result[:errormsg] =  @employee.errors.full_messages[0]
      end

    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end

    render json: @@request_result
  end


  # PUT /employees/1
  # PUT /employees/1.json
  def update
    begin
      @employee = Employee.find(params[:id])

      @updated_employee = @@data_util.hash_data_to_upper_case(@@data_util.strip_hash_data(params[:employee]),[])
      @updated_employee[:datehired] = Date.strptime(@updated_employee[:datehired], "%m/%d/%Y")

      if @employee.update_attributes(@updated_employee)
        @@request_result[:success] = true
        @@request_result[:notice] = 'Employee successfully updated.'
      else
        @@request_result[:errormsg] =  @employee.errors.full_messages[0]
      end

    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end

    render json: @@request_result
  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    begin
      @employee = Employee.find(params[:id])
      if @employee.destroy
        @@request_result[:success] = true
        @@request_result[:notice] = 'Operation ended successfully.'
      else
        @@request_result[:errormsg] = @employee.errors.full_messages[0]
      end
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  def work_schedule
    @employee = Employee.find(params[:id])

    @departments = Lkdepartment.where({:mypclient_id => session[:client_id], :companycode => @employee.companycode})
    @department_groups = Lkdeptgroup.where({:mypclient_id => session[:client_id], :companycode => @employee.companycode, :departmentcode => @employee.departmentcode})    
  end

  def time_logs
    begin
      log_date_start ||= params[:log_date_start]
      log_date_end ||= params[:log_date_end]
      badge_no ||= params[:badge_no].strip
      
      client_id = @@client_id

      @time_logs = Timelog.where("mypclient_id = '#{client_id}' AND empbadgeno = '#{badge_no}' AND logdate between '#{log_date_start}' AND '#{log_date_end}'")
      @clean_logs = @@stripper.activeRecordData(@time_logs)
      @meta_data = @@meta_data.create(@time_logs)
      @@request_result = {success: true, data: @clean_logs, metaData: @meta_data}
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

end

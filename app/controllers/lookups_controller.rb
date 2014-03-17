class LookupsController < ApplicationController
    layout :none => true
    before_filter :construct
    @@request_result = {}
    def construct
        @@request_result[:success] = false
    end

    def show
        self.companydept if params[:id] == 'companydept'
        self.deptsubgroup if params[:id] == 'deptsubgroup'
    end

    def companydept
        @department = {}
        @department[:success] = true
        @department[:data] = getCleanDepartments
        
        respond_to do |format|
          format.html
          format.json{ render json: @department}
        end
    end

    def getCleanDepartments
        company_id = params[:company_id]
        department = {}
        clean_department = {}
        counter = 0
        dirty_department = Department.where({:mypclient_id => session[:client_id], :company_id => company_id})

        dirty_department.each do |dept|
            clean_department[counter] = {}
            clean_department[counter][:id] = dept[:id]
            clean_department[counter][:description] = dept[:description].strip
            counter += 1
        end

        return clean_department
    end

    def deptsubgroup
        company_id    = params[:company_id]
        dept_id       = params[:dept_id]

        counter = 0
        @department_sub_group = {}
        clean_department_sub_group = {}

        dirty_department = Deptgroup.where({:mypclient_id => session[:client_id], :company_id => company_id, :department_id => dept_id})

        dirty_department.each do |dept|
            clean_department_sub_group[counter] = {}
            clean_department_sub_group[counter][:id] = dept[:id]
            clean_department_sub_group[counter][:description] = dept[:description].strip
            counter += 1
        end

        @department_sub_group[:success] = true
        @department_sub_group[:data] = clean_department_sub_group
        
        respond_to do |format|
          format.html
          format.json{ render json: @department_sub_group}
        end
    end
end

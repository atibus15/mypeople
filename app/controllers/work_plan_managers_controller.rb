
class WorkPlanManagersController < EmployeesController
	def employees
		begin
			@employee_controller = EmployeesController.new
			@employees = Employee.select('employees.*, empskeds.worksked_id, workskeds.*, workskeds.description as sked_description, workskeds.workskedcode, '+
						'emppolicies.workskedpolicy_id, workskedpolicies.description as policy_description, workskedpolicies.policycode'
					)
					.joins('LEFT JOIN empskeds on empskeds.empidno = employees.empidno '+
						 'and empskeds.company_id = employees.company_id and empskeds.mypclient_id = employees.mypclient_id')
					.joins('LEFT JOIN workskeds on workskeds.id = empskeds.worksked_id')
					.joins('LEFT JOIN emppolicies on emppolicies.empidno = employees.empidno '+
						 'and emppolicies.company_id = employees.company_id and emppolicies.mypclient_id = employees.mypclient_id')
					.joins('LEFT JOIN workskedpolicies on workskedpolicies.id = emppolicies.workskedpolicy_id')
					.where(search_condition)
			@clean_employees = @@stripper.activeRecordData(@employees)
			@meta = @@meta_data.create(@employees)
			@@request_result = {success: true, data: @clean_employees, metaData:@meta}
		rescue Exception => e 
			@@request_result[:errormsg] = e.message
		end

		render json: @@request_result
	end

	def employee_work_plan
		begin
			company_id = params[:company_id]
			id_number = params[:id_number]
			start_date = params[:start_date]
			end_date = params[:end_date]
			@work_plans = Empworkplan.where({:mypclient_id=>@@client_id, :company_id=>company_id, :empidno => id_number, :skeddatein => start_date..end_date});
			@work_plans.each {|plan|
				plan[:dayin] = plan.day_in_name
				plan[:dayout] = plan.day_out_name
				plan[:policy_code] = plan.Workskedpolicy.policycode
			}

			cl_work_plans = @@stripper.activeRecordData(@work_plans)
			meta = @@meta_data.create(@work_plans)

			@@request_result = {success: true, data: cl_work_plans, metaData:meta}
		rescue Exception => e
			@@request_result[:errormsg] = e.message
		end
		render json: @@request_result
	end

	def update_work_plan
		begin
			work_plans = JSON.parse params[:workplans]

			work_plans.each {|work_plan|
				@@request_result[:plan] = work_plan
				work_plan[:mypclient_id] = @@client_id

				if work_plan['id'].blank?
					work_plan[:createdby] = session[:username]
					new_work_plan = Empworkplan.new(work_plan)
					new_work_plan.save
				else
					emp_work_plan = Empworkplan.find(work_plan['id'])
					emp_work_plan.update_attributes(work_plan)
				end
			}
			@@request_result = {success: true, notice: 'Operation ended successfully.'}
		rescue Exception => e
			@@request_result[:errormsg] = e.message
			
		end
		render json: @@request_result
	end
end
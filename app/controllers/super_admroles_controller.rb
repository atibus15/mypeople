class SuperAdmrolesController < ApplicationController
	before_filter :allow_super_only
 	def index
 		begin
 			client_id = params[:client_id]

 			conditions = []
 			conditions[0] = ["mypclient_id = '#{client_id}'"]
 			conditions[1] = ["isadmin = #{params[:is_admin]}"] unless params[:is_admin].nil?
 			sanitized_conditions = conditions.compact.flatten
 			condition_str 	= sanitized_conditions.join(' AND ');
 			
 			roles = Admuserrole.where(condition_str)
 			cl_roles = @@stripper.activeRecordData(roles)
 			meta = @@meta_data.create(roles)
 			@@request_result = {success: true, data: cl_roles, metaData: meta}
 		rescue Exception => e
 			@@request_result[:errormsg] = e.message
 		end
 		respond_to do |format|
 			format.html
 			format.json{render json: @@request_result}
 		end
 	end

	def create
		begin
			@role = params[:role]
			@role[:createdby] = session[:username]
			seq_no = Admuserrole.where({:mypclient_id => @role[:mypclient_id]}).maximum('seqno') 
			@role[:seqno] = seq_no.nil? ? 1 : seq_no + 1 
			@user_role = Admuserrole.new(@role)
			if @user_role.save
				@@request_result = {success: true, notice: 'New Role was successfully created.'}
			else
				@@request_result[:errormsg] = @user_role.errors.full_messages[0]
			end
		rescue Exception => e
			@@request_result[:errormsg] = e.message
		end
		respond_to do |format|
			format.html
			format.json{render json: @@request_result}
		end
	end

	def update
		begin
			id = params[:id]
			@role = params[:role]
			@role[:lastupdateby] = session[:username]

			@user_role = Admuserrole.find(id)
			if @user_role.update_attributes(@role)
				@@request_result = {success: true, notice: 'Role was successfully updated.'}
			else
				@@request_result[:errormsg] = @user_role.errors.full_messages[0]
			end
		rescue Exception => e
			@@request_result[:errormsg] = e.message
		end
		respond_to do |format|
			format.html
			format.json{render json: @@request_result}
		end
	end

	def destroy
		begin
			@role = Admuserrole.find(params[:id])
			if @role.destroy
				@@request_result = {success: true, notice:'Operation ended successfully.'}
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
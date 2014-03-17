class SuperUserAccountsController < ApplicationController
	before_filter :allow_super_only
	
	def index
		client_id = params[:client_id]
		begin
			users = Useracct.where({:mypclient_id => client_id})

			users.each {|user| user[:roles] = user.Userroles}
			
			cl_users = @@stripper.activeRecordData(users)
			meta = @@meta_data.create(users)
			@@request_result = {success: true, data: cl_users, metaData:meta}
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
			@account = params[:account]
			@account[:createdby] = session[:username]
			@account[:userpasswd] = Digest::MD5.hexdigest(@account[:userpasswd])
			@roles = params[:userroles]
			Useracct.transaction do
			@user_account = Useracct.new(@account)
				if @user_account.save

					Userrole.transaction do
						@roles.each { |role_id|
							user_role = {admuserrole_id: role_id, isactive: 1, createdby: session[:username], useracct_id:@user_account.id}
							@role = Userrole.new(user_role)
							raise ActiveRecord::Rollback if !@role.save 
						}
					end
					
					@@request_result = {success:true, notice: 'User Account was successfully created.'}
				else
					@@request_result[:errormsg] = @user_account.errors.full_messages[0]
					raise ActiveRecord::Rollback
				end
			end
		rescue Exception => e
			ActiveRecord::Rollback
			@@request_result[:errormsg] = e.message
		end
		respond_to do |format|
			format.html
			format.json{render json: @@request_result}
		end
	end

	def update
		begin
			@account = params[:account]
			@account[:lastupdateby] = session[:username]
			@account[:userpasswd] = Digest::MD5.hexdigest(@account[:userpasswd])
			@roles = params[:userroles]
			delete_condition = "admuserrole_id not in ('"+@roles.join("' , '")+"')"

			@user_account = Useracct.find(params[:id])

			Useracct.transaction do
				if @user_account.update_attributes(@account)

					
					Userrole.transaction do
						@deleted_roles = @user_account.Userroles.where(delete_condition)
						@@request_result[:deleted] = @deleted_roles
						@deleted_roles.destroy_all unless @deleted_roles.empty?

						@@request_result[:roles] = @roles
						@roles.each { |role_id|

							@dati_na_ba = @user_account.Userroles.find_by_admuserrole_id(role_id)

							if @dati_na_ba.nil?

								user_role = {admuserrole_id: role_id, isactive: 1, createdby: session[:username], useracct_id:@user_account.id}
								@new_role = Userrole.new(user_role)
								raise ActiveRecord::Rollback if !@new_role.save 

							end
						}
					end

					@@request_result = {success:true, notice: 'User Account was successfully updated.'}
				else
					@@request_result[:errormsg] = @user_account.errors.full_messages[0]
				end
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
			@user = Useracct.find(params[:id])
			if @user.destroy
				@@request_result = {success:true, notice: 'Operation ended successfully.'}
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
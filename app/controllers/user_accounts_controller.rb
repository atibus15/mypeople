class UserAccountsController < ApplicationController
  # GET /useraccts
  # GET /useraccts.json
  def index
    @useraccts = Useracct.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @useraccts }
    end
  end

  # GET /useraccts/1
  # GET /useraccts/1.json
  def show
    @useracct = Useracct.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @useracct }
    end
  end

  def edit
    @useracct = Useracct.find(params[:id])
  end

  def create
    begin
      @account = params[:account]
      @account[:createdby] = session[:username]
      @account[:userpasswd] = Digest::MD5.hexdigest(@account[:userpasswd])
      
      regular_role = Admuserrole.where({:mypclient_id => @@client_id, :isadmin => 0})[0]

      @@request_result[:account] = @account
      Useracct.transaction do
      @user_account = Useracct.new(@account)
        if @user_account.save
          user_role = {admuserrole_id:regular_role , isactive: 1, createdby: session[:username], useracct_id:@user_account.id}
          Userrole.transaction do
              
              @role = Userrole.new(user_role)
              raise ActiveRecord::Rollback if !@role.save 
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

  # PUT /useraccts/1
  # PUT /useraccts/1.json
  def update
    @useracct = Useracct.find(params[:id])

    respond_to do |format|
      if @useracct.update_attributes(params[:useracct])
        format.html { redirect_to @useracct, notice: 'Useracct was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @useracct.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /useraccts/1
  # DELETE /useraccts/1.json
  def destroy
    @useracct = Useracct.find(params[:id])
    @useracct.destroy

    respond_to do |format|
      format.html { redirect_to useraccts_url }
      format.json { head :no_content }
    end
  end
end

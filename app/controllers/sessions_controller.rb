class SessionsController < ApplicationController
    layout 'session_login'
    before_filter :reset_user

    def reset_user
        @@user = nil;
    end
    
    def loginpage
       redirect_to home_path if session[:loggedin]
    end

    def adminlogin
        if session[:with_admin_role].nil?
            redirect_to home_path 
        elsif session[:logged_admin]
            redirect_to home_path
        else
            render "loginpage"
        end
    end

    def create
        # Useracct.transaction do
        @@user = Useracct.auth(params[:username],params[:password])

        if @@user == 'locked'
            flash.now.alert = "Sorry your account is terporary locked due to 5 consecutive failed login. Please contact system administrator."
            render "loginpage"
            return nil
        end

        if @@user then

            client  = @@user.Mypclient

            user_roles_dtl = Array.new()

            user_roles   = @@user.Userroles
            
            user_roles.each do |role|
                user_roles_dtl << role.Admuserrole
            end

            with_admin_role = isAdminUser(user_roles_dtl)

            with_reg_role   = isRegUser(user_roles_dtl)
            
            @@session_id = request.session_options[:id]

            if with_admin_role || with_reg_role then
                @user_detail = @@user.Employee

                destroy_old_session
                
                if (session[:loggedin].nil? && with_reg_role) then
                    session[:logged_reg_user] = 1
                    session[:logged_admin] = nil
                elsif (session[:loggedin] && with_admin_role) || (with_admin_role  && !with_reg_role) then
                    session[:logged_reg_user] = nil
                    session[:logged_admin] = 1
                else
                    flash.now.alert = "Sorry your account might deactivate. Please contact system administrator."
                    render "loginpage"
                end

                session[:loggedin]      = true
                session[:useracctid]    = @@user.id
                session[:id_number]     = @user_detail.empidno.strip unless @user_detail.nil?
                session[:employee_id]   = @@user.employee_id
                session[:username]      = @@user.username
                session[:client_id]     = @@user.mypclient_id.strip
                session[:client_desc]   = client.description
                session[:with_admin_role] = with_admin_role
                session[:with_reg_role] = with_reg_role
                session[:user_roles_json] = user_roles_dtl.to_json
                
                update_session_user_id

                redirect_to home_path
            end
        else
            flash.now.alert = "Invalid username or password."
            render "loginpage"
        end
    # end
    end

    def super_login
        render 'super_login'
    end

    def create_super
        username = params[:username]
        password = params[:password]

        if Super.auth(username, password)
            session[:loggedin] = true
            session[:username] = 'Super User'
            session[:superuser] = true
            redirect_to super_path
        else
            flash.now.alert = 'Invalid username or password.'
            render 'super_login'
        end
    end


    def logout
        reset_session
        redirect_to login_path
    end
    

    def isRegUser(roles_arr)
        i = 0
        roles_arr.each do |role|
            i += 1 if role['isadmin'].to_i == 0
        end

        return i > 0 # return true or false
    end

    def isAdminUser(roles_arr)
        i = 0
        roles_arr.each do |role|
            i += 1 if role['isadmin'].to_i == 1
        end
        return i > 0 # return true or false
    end


    def get_old_session
        Session.where("user_id = #{@@user.id} and session_id <> '#{@@session_id}'").first
    end

    def update_session_user_id
        current_session = Session.find_by_session_id(request.session_options[:id])
        current_session.update_attribute('user_id', session[:useracctid])
    end

    def destroy_old_session
        get_old_session.destroy unless get_old_session.nil?
    end
end

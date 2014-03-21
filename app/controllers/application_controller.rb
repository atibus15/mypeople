class ApplicationController < ActionController::Base
    protect_from_forgery

    before_filter :init
    before_filter :validate_session

    def validate_session
        if session[:id] && !is_session_id_exists
            redirect_to logout_path
        end
    end

    def is_session_id_exists
        @my_session = Session.find_by_session_id(session[:id])
        return @my_session.nil? ? false : true;
    end

    def init
        @@stripper = Stripper.new
        @@meta_data = MetaData.new
        @@data_util = DataUtil.new
        @@client_id = session[:client_id].nil? ? params[:client_id] : session[:client_id].strip
        @@username =  session[:username].nil? ? params[:username] : params[:username]

        @@request_result = {}
        @@request_result[:success] = false
    end

    def is_logged_in
        return !session[:loggedin].blank?
    end

    def is_admin
        session[:logged_admin] || false
    end

    def is_super?
        session[:superuser] || false
    end

    def restrict_regular_user
        unless is_admin
        respond_to do |format|
            format.html { redirect_to home_path }
            format.json { render json: {success:false, errormsg: 'You have no privilege to access this page. REG'}}
          end
        end
    end

    def restrict_guest
        unless is_logged_in
            respond_to do |format|
                format.html { redirect_to login_path }
                format.json { render json: {success:false, errormsg: 'You have no privilege to access this page. GUEST'}}
            end
        end
    end

    def restrict_admin_and_regular
        if self.is_admin || self.is_logged_in
            respond_to do |format|
                format.html { redirect_to login_path }
                format.json { render json: {success:false, errormsg: 'Please login to continue transactions. SUPE'}}
            end
        end
    end

    def allow_super_only
        if !is_super?
            respond_to do |format|
                format.html{redirect_to login_path}
                format.json {render json: {success:false, errormsg:'Error 404: Page not found!'}}
            end
        end
    end

    def get_layout
        return is_admin ? 'admin' : 'application'  
    end

    def respond_to_request

        respond_to do |format|
            response.headers["Content-Type"] = "text/html"
            format.html
            format.json {render json: @@request_result}
        end
    end
end

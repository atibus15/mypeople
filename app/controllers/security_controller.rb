class SecurityController < ApplicationController

    layout :get_layout
    before_filter :restrict_guest
    def change_password

    end

    def update_password
        begin
            @@new_password = params[:new_password]
            @@confirmation = params[:confirm_password]
            @@current_password = params[:current_password]

            @@user = Useracct.find(session[:useracctid])
            if @@user && validate_password
                @@user.userpasswd = Digest::MD5.hexdigest(@@new_password)
                @@user.lastupdateby = session[:username]
                @@user.save

                @@request_result = {success: true, notice:'Password successfully updated.'}
            else
                raise 'Invalid user account.'
            end
        rescue Exception => e
            @@request_result[:errormsg] = e.message
        end
        respond_to do |format|
            format.html
            format.json {render json: @@request_result}
        end
    end

    private
    def validate_password 
        if @@new_password != @@confirmation
            raise 'Password and Confirmation Password doesn\'t match.'
        elsif @@user.userpasswd != Digest::MD5.hexdigest(@@current_password) 
            raise 'Invalid Password.'
        else
            return true;
        end
                
    end

end


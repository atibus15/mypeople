# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Mypeople::Application.initialize!

# windows = :smtp 
# unix  = :sendmail
# ActionMailer::Base.delivery_method = :smtp
# ActionMailer::Base.server_settings = {
#     :address => "smtp.scinnova.com.ph",
#     :port => 25,
#     :domain => "scinnova.com.ph",
#     :authentication => :login,
#     :user_name => "atibus",
#     :password => "qwerty1"
# }
# ActionMailer::Base.default_content_type = "text/html"
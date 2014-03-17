class Userrole < ActiveRecord::Base
    # establish_connection "regular_development"
    attr_accessible :admuserrole_id, :id, :isactive, :useracct_id, :createdby, :lastupdateby
    belongs_to :Admuserrole, :foreign_key => :admuserrole_id
    belongs_to :Useracct, :foreign_key => :useracct_id
end

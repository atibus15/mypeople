class Admuserrole < ActiveRecord::Base
    # establish_connection "regular_development"
    attr_accessible :description, :id, :isactive, :isadmin, :mypclient_id, :rolecode, :seqno, :createdby, :lastupdateby
    has_many :Userroles, :conditions => "isactive = 1"
end

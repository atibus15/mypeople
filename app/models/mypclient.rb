class Mypclient < ActiveRecord::Base
    # establish_connection "regular_development"
    attr_accessible :description, :id, :isactive, :seqno, :security_token, :createdby, :lastupdateby
    self.primary_key = :id
    has_many :Useraccts
    has_many :Employees
    has_many :Holidays
end

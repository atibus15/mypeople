class Leavetype < ActiveRecord::Base
  attr_accessible :company_id, :converttoatt, :createdby, :createddate, :description, :id, :isactive, :lastupdateby, 
  				:lastupdatedate, :leavetypecode, :mypclient_id
  self.primary_key = :id
  belongs_to :Company, :foreign_key => :company_id
  validates_uniqueness_of :leavetypecode, scope:[:mypclient_id, :company_id], message: 'already exists.'
end

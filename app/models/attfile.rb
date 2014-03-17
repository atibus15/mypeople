class Attfile < ActiveRecord::Base
  attr_accessible :attfilecode, :company_id, :createdby, :createddate, :cutoff_id, :description, :efilesapprovalcutoff, 
  					:id, :isposted, :lastupdateby, :lastupdatedate, :mypclient_id

  self.primary_key = :id

  validates :attfilecode, :company_id, :description, :efilesapprovalcutoff, presence: {message: 'is required.'}
  validates_uniqueness_of :attfilecode, scope:[:mypclient_id, :company_id], message: 'already exists.'
end

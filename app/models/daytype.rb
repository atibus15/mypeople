class Daytype < ActiveRecord::Base
  attr_accessible :company_id, :createby, :createddate, :daytypecode, :description, :id, :isactive, :isholday, :isrestday, :lastupdateby, :lastupdatedate, :mypclient_id, :seqno
  belongs_to :Company, :foreign_key => :company_id
  self.primary_key = :id

  def self.by_company_id(client_id, company_id)
  	where({:mypclient_id => client_id, :company_id=>company_id})
  end
end

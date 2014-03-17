class Daytype < ActiveRecord::Base
  attr_accessible :company_id, :createby, :createddate, :daytypecode, :description, :id, :isactive, :isholday, :isrestday, :lastupdateby, :lastupdatedate, :mypclient_id, :seqno
  belongs_to :Company, :foreign_key => :company_id
  self.primary_key = :id
end

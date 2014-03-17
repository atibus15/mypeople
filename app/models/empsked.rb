class Empsked < ActiveRecord::Base
  attr_accessible :company_id, :createdby, :createddate, :empidno, :id, :lastupdateby, :lastupdatedate, :mypclient_id, :worksked_id, :startdate, :enddate
  self.primary_key = :id
end

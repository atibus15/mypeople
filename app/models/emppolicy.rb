class Emppolicy < ActiveRecord::Base
  attr_accessible :company_id, :createdby, :createddate, :empidno, :id, :lastupdateby, :lastupdatedate, :mypclient_id, :workskedpolicy_id, :startdate, :enddate
  self.primary_key = :id
end

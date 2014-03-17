class Holidaylocal < ActiveRecord::Base
  attr_accessible :company_id, :createdby, :createddate, :holiday_id, :id, :lastupdateby, :lastupdatedate, :location_id, :mypclient_id
  self.primary_key = :id
  belongs_to :Location, :foreign_key => :location_id
  belongs_to :Company, :foreign_key => :company_id
end

class Workskedcategory < ActiveRecord::Base
  attr_accessible :createdby, :createddate, :description, :id, :isactive, :lastupdateby, :lastupdatedate
  self.primary_key = :id
  has_many :Workskeds
end

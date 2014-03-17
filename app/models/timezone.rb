class Timezone < ActiveRecord::Base
  attr_accessible :code, :createdby, :createddate, :description, :id, :lastupdateby, :lastupdatedate

  self.primary_key = :id

  has_many :Countries
end

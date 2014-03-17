class Country < ActiveRecord::Base
  attr_accessible :countrycode, :createdby, :createddate, :description, :id, :isactive, :lastupdateby, :lastupdatedate, :timezone_id
  self.primary_key = :id

  belongs_to :Timezone, :foreign_key => :timezone_id
  has_many :Companies
  has_many :Holidays

end

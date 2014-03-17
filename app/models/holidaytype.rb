class Holidaytype < ActiveRecord::Base
  attr_accessible :country_id, :description, :holidaytypecode, :id, :isactive, :seqno

  self.primary_key = :id

  has_many :Holidays
end

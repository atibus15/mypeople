class Emptitle < ActiveRecord::Base
  strip_attributes
  attr_accessible :description, :id, :isactive, :seqno
  self.primary_key = :id
  has_many :Employees
end

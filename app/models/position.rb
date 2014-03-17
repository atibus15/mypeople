class Position < ActiveRecord::Base
  attr_accessible :company_id, :description, :id, :isactive, :mypclient_id, :positioncode, :positionlevel_id, :lastupdateby, :createdby
  self.primary_key = :id
  has_many :Employees
  belongs_to :Positionlevel, :foreign_key => :positionlevel_id
  validates_presence_of :mypclient_id, :company_id, :positioncode, :description, :message => "is required"
  validates_uniqueness_of :positioncode, scope:[:mypclient_id, :company_id], message: 'is already exists.'
end

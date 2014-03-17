class Location < ActiveRecord::Base
  attr_accessible :company_id, :createdby, :description, :id, :isactive, :lastupdateby, :locationcode, :mypclient_id
  self.primary_key = :id
  has_many :Employees
  belongs_to :Company, :foreign_key => :company_id
  belongs_to :Mypclient, :foreign_key => :mypclient_id
  has_many :Holidaylocals
  validates_uniqueness_of :locationcode, scope:[:mypclient_id, :company_id], message: 'is already exists.'
end

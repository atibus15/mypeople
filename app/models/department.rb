class Department < ActiveRecord::Base
  attr_accessible :company_id, :departmentcode, :description, :id, :isactive, :mypclient_id, :createdby, :lastupdateby
  self.primary_key = :id

  validates_presence_of :company_id, :departmentcode, :description,  :mypclient_id,  :message => 'is required.'
  validates_uniqueness_of :departmentcode, scope:[:mypclient_id, :company_id], message: 'already exists.'

  has_many :Employees
  belongs_to :Company, :foreign_key => :company_id
end

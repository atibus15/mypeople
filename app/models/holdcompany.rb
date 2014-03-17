class Holdcompany < ActiveRecord::Base
  attr_accessible :description, :holdcompanycode, :id, :isactive, :mypclient_id
  self.primary_key = :id
  has_many :Employees
  has_many :Companies
  belongs_to :Mypclient

  validates_presence_of :mypclient_id, :holdcompanycode, :description, :message => 'is required'
  validates_uniqueness_of :holdcompanycode, scope:[:mypclient_id], message: 'is already exists.'
end

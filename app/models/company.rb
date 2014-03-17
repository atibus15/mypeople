class Company < ActiveRecord::Base
  attr_accessible :id, :description, :isactive , :companycode, :mypclient_id, :country_id, :holidaypaybasis, :createdby, :lastupdateby,
                  :busgroup_id, :holdcompany_id, :companyaddress, :vatregno, :vatregno, :sssgsisno
  strip_attributes
  has_many :Employees
  has_many :Workskeds
  has_many :Departments
  has_many :Locations
  has_many :Daytypes
  belongs_to :Mypclient, :foreign_key => :mypclient_id
  belongs_to :Country, :foreign_key => :country_id
  belongs_to :Busgroup, :foreign_key => :busgroup_id
  belongs_to :Holdcompany, :foreign_key => :holdcompany_id

  self.primary_key = :id
  has_many :Employees
  # has_many :Holidaylocals
  
  validates_presence_of :mypclient_id
  validates_presence_of :companycode, :message => "is required."
  validates_presence_of :description, :message => "is required."
  validates_presence_of :country_id, :message => "is required."
  validates_presence_of :holidaypaybasis, :message => "is required."
  validates_presence_of :holdcompany_id, :message => "is required."
  validates_presence_of :busgroup_id, :message => "is required."
  validates_uniqueness_of :companycode, scope:[:mypclient_id], message: 'is already exists.'
  
end

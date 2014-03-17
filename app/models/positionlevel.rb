class Positionlevel < ActiveRecord::Base

    attr_accessible :description, :id, :isactive, :mypclient_id, :positionlevelcode, :createdby, :lastupdateby
    strip_attributes :collapse_spaces =>true, :only=>:positionlevelcode
    self.primary_key  = :id
    has_many :Employees
    belongs_to :Mypclient, :foreign_key => :mypclient_id
    has_many :Positions

    validates_uniqueness_of :positionlevelcode, scope:[:mypclient_id], message: 'is already exists.'
end
class Busgroup < ActiveRecord::Base
  attr_accessible :busgroupcode, :description, :id, :isactive, :mypclient_id
  self.primary_key = :id

  validates_presence_of :busgroupcode, :description, :isactive, :mypclient_id, :message => 'is required'
  validates_uniqueness_of :busgroupcode, scope:[:mypclient_id], message: 'is already exists.'
end

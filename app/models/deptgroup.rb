class Deptgroup < ActiveRecord::Base
    
    attr_accessible :company_id, :department_id, :deptgroupcode, :description, :id, :isactive, :mypclient_id, :createdby, :lastupdateby
    self.primary_key = :id
    has_many :Employees

    validates_uniqueness_of :deptgroupcode, scope:[:mypclient_id, :company_id, :department_id], message: 'already exists.'
end

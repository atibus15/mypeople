class Employee < ActiveRecord::Base
    attr_accessible :busgroup_id, :company_id, :createdby, :createddate, :datehired, :department_id, :deptgroup_id, :emailaddress, :empbadgeno, :empnamesuffix,
                :empfullnamefml, :empfullnamelfm, :empnamealias, :empnamefirst, :empnamelast, :empnamemiddle, :empno, :empidno,:emptitle_id, 
                :holdcompany_id, :id, :isactivestatus, :lastupdateby, :lastupdatedate, :location_id, :mypclient_id, :position_id, :positionlevel_id
    strip_attributes :allow_empty => true, :collapse_spaces => true

    self.primary_key = :id

    belongs_to  :Busgroup,:foreign_key => :busgroup_id

    belongs_to  :Company,:foreign_key => :company_id

    belongs_to  :Department, :foreign_key => :department_id

    belongs_to  :Position, :foreign_key => :position_id
    
    belongs_to  :Holdcompany, :foreign_key => :holdcompany_id

    belongs_to  :Emptitle, :foreign_key => :emptitle_id

    belongs_to  :Client, :class_name => :Mypclient,:foreign_key => :mypclient_id

    belongs_to  :Positionlevel,:foreign_key => :positionlevel_id
                 
    belongs_to  :Deptgroup, :foreign_key => :deptgroup_id

    belongs_to :Location, :foreign_key=> :location_id

    has_one :Useracct
    
    validates :mypclient_id,:empno,:empidno,:empbadgeno,:emptitle_id,:empnamefirst ,:empnamelast ,:empnamemiddle ,:empnamealias,
            :datehired,:position_id,:positionlevel_id,:company_id,:department_id,:deptgroup_id,:busgroup_id,:holdcompany_id,
            :location_id,:isactivestatus, presence:{message: 'is required.'}

    validates_uniqueness_of :empbadgeno, scope:[:mypclient_id], message:'already exists.'
    validates_uniqueness_of :empno, scope:[:mypclient_id], message:'already exists.'
    validates_uniqueness_of :empidno, scope:[:mypclient_id], message:'already exists.'
    validates_uniqueness_of :datehired, scope: [:empnamefirst, :empnamemiddle, :empnamelast, :mypclient_id, :company_id], message:'already exists.'

    ## Unable to delete. Transactions exist for this employee. #red.
    before_create :remove_attr

    private
    def remove_attr
        @attributes.delete('empfullnamelfm')
        @attributes.delete('empfullnamefml')
    end
end
class Holiday < ActiveRecord::Base
  attr_accessible :country_id, :coverage, :createdby, :createddate, :description, :holidaydate, :holidaytype_id, :id, :lastupdateby, :lastupdatedate, :mypclient_id

  self.primary_key = :id
  belongs_to :Holidaytype, :foreign_key => :holidaytype_id
  belongs_to :Mypclient, :foreign_key => :mypclient_id
  belongs_to :Country, :foreign_key => :country_id
  validates :country_id, :holidaytype_id, :description, :holidaydate, :coverage , presence: {message: 'is requires'}
  validates_uniqueness_of :description, scope:[:mypclient_id, :country_id], message: 'is already exists.'

  def holidaydate
  	self[:holidaydate].strftime("%B %d %Y")
  end

end

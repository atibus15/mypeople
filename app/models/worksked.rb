class Worksked < ActiveRecord::Base

  attr_accessible :break1fr, :break1hrs, :break1to, :break2fr, :break2hrs, :break2to, :break3fr, :break3hrs, :break3to, :break4fr, :break4hrs, 
  :break4to, :break5fr, :break5hrs, :break5to, :company_id, :description, :flexiearliestin, :flexilatestin, :friday, 
  :hrswkam, :hrswkpm, :id, :monday, :mypclient_id, 
  :requiredannualhrs, :requireddayhrs, :requiredmonhrs, :requiredtimein, :requiredtimeout, :requiredwkhrs, 
  :saturday, :sunday, :thursday, :tuesday, :wednesday, 
  :workdayspermo, :workdaysperwk, :workdaysperyr, :workmosperyr, :workskedcategory_id, :workskedcode, :createdby

  self.primary_key = :id

  validates_presence_of :mypclient_id
  validates_presence_of :company_id
  validates_presence_of :workskedcode
  validates_presence_of :description
  validates_presence_of :workskedcategory_id
  validates_presence_of :monday
  validates_presence_of :tuesday
  validates_presence_of :wednesday
  validates_presence_of :thursday
  validates_presence_of :friday
  validates_presence_of :saturday
  validates_presence_of :sunday
  validates_uniqueness_of :workskedcode, scope:[:company_id, :mypclient_id], message: 'is already exists.'
  # self.skip_time_zone_conversion_for_attributes = [:requiredtimein, :requiredtimeout]

  belongs_to :Workskedcategory, :foreign_key => :workskedcategory_id
  belongs_to :Company, :foreign_key => :company_id

  def requiredtimein
    convert_to_time self[:requiredtimein]
  end

  def requiredtimeout
    convert_to_time self[:requiredtimeout]
  end

  def flexiearliestin
    convert_to_time self[:flexiearliestin]
  end
  
  def flexilatestin
    convert_to_time self[:flexilatestin]
  end
  


  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip unless dt.blank?
  end

end

class Workskedpattern < ActiveRecord::Base
  attr_accessible :break1fr, :break1hrs, :break1to, :break2fr, :break2hrs, :break2to, :break3fr, :break3hrs, :break3to, 
  :break4fr, :break4hrs, :break4to, :break5fr, :break5hrs, :break5to, :company_id, :createdby, :createddate, :description, 
  :flexiearliestin, :flexilatestin, :hrswkam, :hrswkpm, :id, :lastupdateby, :lastupdatedate, :mypclient_id, :patterncode, 
  :requiredhrs, :timein, :timeout, :workskedcategory_id

  self.primary_key = :id
  belongs_to :Workskedcategory, :foreign_key => :workskedcategory_id
  belongs_to :Company, :foreign_key => :company_id
  validates_uniqueness_of :patterncode, scope:[:mypclient_id, :company_id], message: 'is already exists.'

  def timein
    self.convert_to_time self[:timein] unless self[:timein].blank?
  end

  def timeout
    self.convert_to_time self[:timeout] unless self[:timeout].blank?
  end

  def break1to
    self.convert_to_time self[:break1to] unless self[:break1to].blank?
  end

  def break1fr
    self.convert_to_time self[:break1fr] unless self[:break1fr].blank?
  end

  def break2to
    self.convert_to_time self[:break2to] unless self[:break2to].blank?
  end

  def break2fr
    self.convert_to_time self[:break2fr] unless self[:break2fr].blank?
  end
  
  def break3to
    self.convert_to_time self[:break3to] unless self[:break3to].blank?
  end

  def break3fr
    self.convert_to_time self[:break3fr] unless self[:break3fr].blank?
  end

  def break4to
    self.convert_to_time self[:break4to] unless self[:break4to].blank?
  end

  def break4fr
    self.convert_to_time self[:break4fr] unless self[:break4fr].blank?
  end

  def break5to
    self.convert_to_time self[:break5to] unless self[:break5to].blank?
  end

  def break5fr
    self.convert_to_time self[:break5fr] unless self[:break5fr].blank?
  end

  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip
  end

end

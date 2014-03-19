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
    self.convert_to_time self[:timein] 
  end

  def timeout
    self.convert_to_time self[:timeout]
  end

  def break1to
    self.convert_to_time self[:break1to]
  end

  def break1fr
    self.convert_to_time self[:break1fr]
  end

  def break2to
    self.convert_to_time self[:break2to]
  end

  def break2fr
    self.convert_to_time self[:break2fr]
  end
  
  def break3to
    self.convert_to_time self[:break3to]
  end

  def break3fr
    self.convert_to_time self[:break3fr]
  end

  def break4to
    self.convert_to_time self[:break4to]
  end

  def break4fr
    self.convert_to_time self[:break4fr]
  end

  def break5to
    self.convert_to_time self[:break5to]
  end

  def break5fr
    self.convert_to_time self[:break5fr]
  end

  def flexiearliestin
    self.convert_to_time self[:flexiearliestin] 
  end

  def flexilatestin
    self.convert_to_time self[:flexilatestin]
  end
  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip unless dt.blank?
  end
end

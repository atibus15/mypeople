class Empworkplan < ActiveRecord::Base
  attr_accessible :company_id, :createdby, :createddate, :dayintype, :dayouttype, :empidno, :id, :lastupdateby, :lastupdatedate, 
  :mypclient_id, :skeddatein, :skeddateout, :skedtimein, :skedtimeout, :w_sked_pattern_id, :workskedcategory_id, :workskedpolicy_id
  self.primary_key = :id

  belongs_to :Workskedpolicy, :foreign_key => :workskedpolicy_id
  
  def skeddatein
    convert_to_date self[:skeddatein]
  end

  def skeddateout
    convert_to_date self[:skeddateout]
  end

  def skedtimein
    convert_to_time self[:skedtimein]
  end

  def skedtimeout
    convert_to_time self[:skedtimeout]
  end

  def day_in_name
    self[:skeddatein].strftime('%A')
  end

  def day_out_name
    self[:skeddateout].strftime('%A')
  end

  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip unless dt.blank?
  end

  def convert_to_date(date)
    date.strftime("%m/%d/%Y").to_s.strip unless date.blank?
  end
end

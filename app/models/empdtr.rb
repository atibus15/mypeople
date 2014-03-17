class Empdtr < ActiveRecord::Base
  attr_accessible :createdby, :createddate, :dtrdatein, :dtrdateout, :dtrtimein, :dtrtimeout, :empidno, :id, :lastupdateby, :lastupdatedate, :mypclient_id


  def dtrtimein
    convert_to_time(self[:dtrtimein])
  end

  def dtrtimeout
    convert_to_time(self[:dtrtimeout])
  end
  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip unless dt.blank?
  end
end

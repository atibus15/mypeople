class Empworkplan < ActiveRecord::Base
  attr_accessible :company_id, :createdby, :createddate, :dayintype, :dayouttype, :empidno, :id, :lastupdateby, :lastupdatedate, 
  :mypclient_id, :skeddatein, :skeddateout, :skedtimein, :skedtimeout, :w_sked_pattern_id, :workskedcategory_id, :workskedpolicy_id
  self.primary_key = :id

  belongs_to :Workskedpolicy, :foreign_key => :workskedpolicy_id
  
  def self.fill_up(client_id, id_number, start_date, end_date=nil, clear_data=1, trans_type=1)
    @sql = "EXECUTE PROCEDURE P_TM_FILL_EMPWORKPLANS('#{client_id}', '#{id_number}','#{start_date}', '#{end_date}', #{clear_data}, '#{trans_type}', '#{nil}')"
    connection.execute(@sql)
  end

  def skeddatein
    convert_to_date self[:skeddatein], "%a, %d %B %Y"
  end

  def skeddateout
    convert_to_date self[:skeddateout], "%a, %d %B %Y"
  end

  def skedtimein
    convert_to_time self[:skedtimein]
  end

  def skedtimeout
    convert_to_time self[:skedtimeout]
  end

  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip unless dt.blank?
  end

  def convert_to_date(date, format = "%m/%d/%Y")
    date.strftime(format).to_s.strip unless date.blank?
  end
end

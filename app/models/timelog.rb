class Timelog < ActiveRecord::Base
  attr_accessible :createddate, :deviceid, :empbadgeno, :id, :lastupdatedate, :lastupdatedby, :logdate, :logsource, :logtime, :mypclient_id, :processedby, :processedstamp
  self.primary_key = :id

  def self.employee_logs_by_badgeno_and_client_id(badge_no, client_id, date_start=nil, date_end=nil)
    conditions = []
    conditions[0] = ["empbadgeno = '#{badge_no}'"]
    conditions[1] = ["mypclient_id = '#{client_id}'"]
    conditions[2] = ["logdate between '#{date_start}' AND '#{date_end}'"] unless date_start.nil?
    cl_conditions = conditions.compact.flatten.join(' AND ')
    where(cl_conditions)
  end

  def logtime
    convert_to_time self[:logtime]
  end

  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip unless dt.blank?
  end
end

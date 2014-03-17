class Cutoff < ActiveRecord::Base
  attr_accessible :company_id, :createdby, :createddate, :cutoffcode, :datefr, :dateto, :description, 
  				  :id, :lastupdateby, :lastupdatedate, :mypclient_id

  self.primary_key = :id
  validates :mypclient_id, :company_id, :cutoffcode, :description, :datefr, :dateto, presence: {message:'is required.'}
  validates_uniqueness_of :cutoffcode, scope:[:mypclient_id, :company_id], message: 'already exists.'

  def datefr
  	convert_to_date self[:datefr]
  end

  def dateto
  	convert_to_date self[:dateto]
  end

  def convert_to_date(date)
    date.strftime("%m/%d/%Y") unless date.blank?
  end
end

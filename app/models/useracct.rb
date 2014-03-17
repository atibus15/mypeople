class Useracct < ActiveRecord::Base

  attr_accessible :employee_id, :id, :isactive, :islocked, :mypclient_id, :username, :userpasswd, :createdby, :lastupdateby

  self.primary_key = :id

  belongs_to :Mypclient, :foreign_key => :mypclient_id
  
  belongs_to :Employee, :foreign_key => :employee_id
  
  validates_uniqueness_of :username, message: 'already exists.'

  has_many :Userroles
  
  validates_presence_of :username
  
  validates_presence_of :userpasswd

  def self.auth(username, password)
    user = find_by_username(username)

    md5_password = Digest::MD5.hexdigest(password)
    if(user)
        is_locked = user.islocked
        return 'locked' if is_locked == 1
    end


    if user && user.userpasswd.strip == md5_password
        # resetFailures()
        return user
    elsif user && user.userpasswd != md5_password
        updateFailedCount(user)
        return nil
    else
        return nil
    end
  end

  def self.updateFailedCount(user)
    new_failed_count = user.failedlogincount += 1
    user.update_attribute(:failedlogincount, new_failed_count)

    if new_failed_count == 5
      locked(user)
    end
  end

  def self.locked(user)
    user.update_attribute(:islocked, 1)
  end

  def self.resetFailures(user)
    self.update_attributes({:failedlogincount => 0, :islocked => 0})
  end

  def self.suggest_username(f_name, m_name, l_name)

    @first_suggestion = f_name[0]+m_name[0]+l_name
    @exists = true;
    $i = 1
    $suffix = ''
    while @exists do

      @suggestion = @first_suggestion.downcase+$suffix
      @exists = username_exists(@suggestion)
      $i +=1
      $suffix = "_0#{$i.to_s}"
    end 
    @suggestion.downcase
  end

  def self.username_exists(username)
    find_by_username(username) ? true : false
  end
end


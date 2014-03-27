class Empphoto < ActiveRecord::Base
  attr_accessible :createdby, :createddate, :employee_id, :lastupdateby, :lasupdatedate, :filename

  def upload(photo)
  	upload_dir = create_directory
  	file_dir = File.join(upload_dir, self[:filename])
  	File.open(file_dir, "wb"){|file| file.write(photo.tempfile.read)}
  end


  def create_directory
  	directory = "#{Rails.root}/public/uploaded_files/profile_photos/#{self[:employee_id]}"
  	FileUtils.mkdir_p(directory) unless File.exists?(directory)
  	return directory
  end
end

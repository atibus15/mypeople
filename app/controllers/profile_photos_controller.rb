class ProfilePhotosController < ApplicationController
	before_filter :restrict_guest
	layout :none => true
	def show
		@photo = Empphoto.find(params[:id])
		@photo_data = @photo.photodata
		# response.headers["Content-Type"] = "image/jpg"
		# response.headers["Content-Disposition"] = 'Inline'
		render :text => Base64.decode64(@photo_data)
	end

	def create

		upload_photo = params[:photo]

		if upload_photo.content_type.match('image').nil?
			@@request_result[:errormsg] = 'Invalid file type.'
			respond_to_request
			return 
		end
		base64_photo = Base64.encode64(upload_photo.tempfile.read)
		employee_id = params[:employee_id]

		@photo = Empphoto.find(employee_id)

		if @photo.blank?
			@photo = Empphoto.new({employee_id: employee_id, photodata: base64_photo})
			@photo.save
		else
			@photo.update_attribute('photodata', base64_photo)
		end
		@@request_result = {success: true, notice:'Profile Photo successfully updated.', version: Time.now.to_i, type: params[:photo].content_type}

		respond_to_request
	end

end

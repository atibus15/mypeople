class ProfilePhotosController < ApplicationController
	before_filter :restrict_guest

	layout :none => true
	def show
		@photo 		= Empphoto.find(params[:id])
		@file_name 	= @photo.filename
		@file_path 	= "#{Rails.root}/public/uploaded_files/profile_photos/#{params[:id]}/#{@file_name}"
		@photo_data = File.read(@file_path)
		# response.headers["Content-Type"] = "image/jpg"
		# response.headers["Content-Disposition"] = 'Inline'
		render :text => @photo_data
	end

	def create
		begin
			file = params[:photo]
			employee_id = params[:employee_id]

			if file.content_type.match('image').nil?
				@@request_result[:errormsg] = 'Invalid file type.'
				respond_to_request
				return 
			end

			file_extension = File.extname(file.original_filename)
			file_name = "#{Time.now.nsec}#{file_extension}"

			@photo = Empphoto.find(employee_id)
			@photo.upload(file) if @photo.update_attributes({filename: file_name, lastupdateby: session[:username]})

		rescue ActiveRecord::RecordNotFound
			@photo = Empphoto.new({employee_id: employee_id, filename: file_name, createdby: session[:username]})
			@photo.upload(file) if @photo.save
		rescue ActiveRecord::StatementInvalid
			@@request_result[:photo] = @photo
			# @@request_result[:errormsg] = e.message
			return respond_to_request
		rescue Exception => e
			@@request_result[:photo] = @photo
			@@request_result[:errormsg] = e.message
			return respond_to_request
		end
		@@request_result = {success: true, notice:'Profile Photo successfully updated.', version: Time.now.to_i, type: params[:photo].content_type}
		respond_to_request
	end
end

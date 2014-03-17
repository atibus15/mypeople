class CountriesController < ApplicationController
  # GET /countries
  # GET /countries.json

  def index
    begin
      @countries = Country.joins(:Timezone)
                  .select('countries.*, timezones.id as timezone_id, timezones.code as timezones_code, timezones.description as timezone')
                  .order('description')
      @clean_countries = @@stripper.activeRecordData @countries


      @@request_result = {success: true, data: @clean_countries, metaData: @@meta_data.create( @countries)}

    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

end


class ClientController < ApplicationController


    def default_selections
        begin
            @positions = Position.select('positions.id, positions.positioncode as code, positions.description as desc, positions.company_id, positions.positionlevel_id, positionlevels.description as position_level')
                                .joins(:Positionlevel)
                                .where({:isactive=>1, :mypclient_id => @@client_id})
            @clean_positions  = @@stripper.activeRecordData(@positions)
            @@request_result[:positions] = {}
            @@request_result[:positions][:data] = @clean_positions
            @@request_result[:positions][:metaData] = @@meta_data.create(@positions)

            @companies = Company.select('id, companycode as code, description as desc, busgroup_id, holdcompany_id')
                        .where({:isactive=>1, :mypclient_id => @@client_id})
            @clean_companies = @@stripper.activeRecordData(@companies)
            @@request_result[:companies] = {}
            @@request_result[:companies][:data] = @clean_companies
            @@request_result[:companies][:metaData] = @@meta_data.create(@companies)

            @departments = Department.select('id, departmentcode as code, description as desc, company_id')
                              .where({:isactive=>1, :mypclient_id => @@client_id})
            @clean_departments = @@stripper.activeRecordData(@departments)
            @@request_result[:departments] = {}
            @@request_result[:departments][:data] = @clean_departments
            @@request_result[:departments][:metaData] = @@meta_data.create(@departments)

            @dept_groups = Deptgroup.select('id, deptgroupcode as code, description as desc, department_id, company_id')
                              .where({:isactive=>1, :mypclient_id => @@client_id})
            @clean_dept_groups = @@stripper.activeRecordData(@dept_groups)
            @@request_result[:dept_groups] = {}
            @@request_result[:dept_groups][:data] = @clean_dept_groups
            @@request_result[:dept_groups][:metaData] = @@meta_data.create(@dept_groups)

            @busgroups = Busgroup.select('id, busgroupcode as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id})
            @clean_busgroups = @@stripper.activeRecordData(@busgroups)
            @@request_result[:busgroups] = {}
            @@request_result[:busgroups][:data] = @clean_busgroups
            @@request_result[:busgroups][:metaData] = @@meta_data.create(@busgroups)

            @holdings = Holdcompany.select('id, holdcompanycode as code, description as desc').where({:isactive=>1, :mypclient_id => @@client_id})
            @clean_holdings = @@stripper.activeRecordData(@holdings)
            @@request_result[:holdings] = {data: @clean_holdings, metaData:@@meta_data.create(@holdings)}


            @emp_titles =  Emptitle.select('id as code, description as desc').order('seqno')
            @clean_titles = @@stripper.activeRecordData(@emp_titles)
            @@request_result[:titles] = {}
            @@request_result[:titles][:data] = @clean_titles
            @@request_result[:titles][:metaData] = @@meta_data.create(@emp_titles)

            @locations = Location.select('locations.id, locations.locationcode as code, locations.description as desc, locations.company_id, companies.description as company')
                        .joins(:Company)
                        .where({:isactive=>1, :mypclient_id=>@@client_id})
            @clean_locations = @@stripper.activeRecordData(@locations)
            @location_meta = @@meta_data.create(@locations) unless @locations.blank?
            @@request_result[:locations] = {data: @clean_locations, metaData:  @location_meta}

            @@request_result[:position_levels] = get_position_levels


            @@request_result[:success] = true

        rescue Exception => e
            @@request_result[:errormsg] = e.message
        end
        render json: @@request_result
    end

    def client_countries
        Company.joins(:Country).select('distinct country_id, countries.description').where({:isactive=>1, :mypclient_id => @@client_id})
    end

    def countries
        begin
            @countries = self.client_countries

            @clean_countries = @@stripper.activeRecordData(@countries)

            @@request_result[:metaData] = @@meta_data.create(@countries)

            @@request_result[:success] = true
            @@request_result[:data] = @clean_countries
        rescue Exception => e
            @@request_result[:errormsg] = e.message
        end
        render json: @@request_result
    end

    def country_holiday_types
        begin
            countries = self.client_countries
            countries.each{|country|
                holiday_type = Holidaytype.where({:isactive=>1, :country_id => country.country_id})
                clean_holiday_hash = {}
                if !holiday_type.empty?
                    clean_holiday_hash[:data] = @@stripper.activeRecordData(holiday_type)
                    clean_holiday_hash[:metaData] = @@meta_data.create(holiday_type)
                else
                    clean_holiday_hash[:data] = []

                end
                
                @@request_result[country.country_id.strip] = clean_holiday_hash
            }

            my_country = {data: @@stripper.activeRecordData(countries), metaData: @@meta_data.create(countries)}
            @@request_result[:countries] = my_country
            @@request_result[:success] = true
        rescue Exception => e
            @@request_result = e.message
        end
        render json:@@request_result
    end

    def holidays
        begin
            holidays = Holiday.joins(:Holidaytype, :Country)
                    .select('holidays.*, holidaytypes.description as holiday_type, countries.description as country').where({:mypclient_id => @@client_id}).order(:country_id)
            clean_holidays = @@stripper.activeRecordData(holidays)
            meta_data = @@meta_data.create(holidays) unless holidays.empty?

            @@request_result[:data] = clean_holidays
            @@request_result[:metaData] = meta_data
            @@request_result[:success] = true
        rescue
            @@request_result[:errormsg] = e.message
        end
        render json: @@request_result
    end

    def locations
        begin
            locations = Location.joins(:Company).select('locations.*, companies.description as company').where({:mypclient_id=>@@client_id})
            clean_locations = @@stripper.activeRecordData(locations)
            meta_data = @@meta_data.create(locations) unless locations.empty?
            @@request_result =  {success:true, data: clean_locations, metaData: meta_data} 
        rescue Exception => e 
            @@request_result[:errormsg] = e.message
        end
        render json: @@request_result
    end

    def leave_types
        begin
            types = Leavetype.joins(:Company).select('leavetypes.*, companies.description as company').where({:mypclient_id=>@@client_id})
            clean_types = @@stripper.activeRecordData(types)
            meta_data = @@meta_data.create(types) unless types.empty?
            @@request_result = {success: true, data: clean_types, metaData: meta_data}
        rescue Exception => e 
            @@request_result[:errormsg] = e.message
        end
        render json: @@request_result
    end


    def get_position_levels
        begin 
            levels = Positionlevel.where({:mypclient_id => @@client_id})
            clean_levels = @@stripper.activeRecordData(levels)
            meta_data = @@meta_data.create(levels)
            return {data: clean_levels, metaData:meta_data}
        rescue Exception => e
            raise e.message
        end
    end

    def get_client_roles
        begin
            roles = Admuserrole.where({:mypclient_id=>@@client_id});
            cl_roles = @@stripper.activeRecordData(roles)
            meta = @@meta_data.create(roles)
            return {data: cl_roles, metaData: meta}
        rescue
            raise e.message
        end
    end

end

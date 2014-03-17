class MetaData < ApplicationController
    def create (data)
        return {fields:[], root:'data'} if data.empty?

        meta_data = {}
        first_list = data[0];
        attributes = first_list.attributes.keys.sort
        meta_data[:root] = 'data'
        meta_data[:fields] = []
        attributes.each do |attrib|
            meta_data[:fields] << {name: attrib}
        end
        meta_data
    end
end

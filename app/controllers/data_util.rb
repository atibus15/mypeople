class DataUtil

    def hash_data_to_upper_case(data, exclude)

        data.each{|key, val|
            data[key] = val.to_s.upcase unless exclude.include?(key)
        }
        return data
    end

    def strip_hash_data(data)
        data.each{|key, val|
            data[key] = val.class == 'String' ? val.strip : val
        }

        return data
    end
end
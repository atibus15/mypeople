class Stripper 
    def activeRecordData(record)
        return [] if record.empty?
        i = 0
        record.each do |data|
            data.attributes.each{|key, value|
                record[i][key] = (value.is_a?(String)) ? value.strip : value 
            }
            i+=1
        end
        return record
    end

    def hashData(array_data)
        array_data.each{|key, value|
            (value.is_a?(String)) ? value.strip : value 
        }
    end
end
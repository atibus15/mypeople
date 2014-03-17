class Super

	PASSWORD_CONST = '59da9b8fbbef83601a39d6fc84afec49'
	USERNAME_CONST = '6fd0a7decfe1c3f68dbe687212097e8c'

	def self.auth(username, password)
		if (md5(username) == USERNAME_CONST && md5(password) == PASSWORD_CONST)
			return true
		else
			return false
		end
	end

	def self.md5 str
		Digest::MD5.hexdigest(str)
	end
end
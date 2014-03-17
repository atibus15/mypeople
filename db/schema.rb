# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140311020643) do

  create_table "admuserroles", :force => true do |t|
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0,                :null => false
    t.string   "rolecode",       :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isadmin",        :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.integer  "seqno",          :limit => 2,   :precision => 0, :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "admuserroles", ["id"], :name => "pk_admuserroles", :unique => true
  add_index "admuserroles", ["mypclient_id", "rolecode"], :name => "u_admuserroles_clientrole", :unique => true
  add_index "admuserroles", ["mypclient_id", "seqno"], :name => "u_admuserroles_seqno", :unique => true
  add_index "admuserroles", ["mypclient_id"], :name => "fk_admuserroles_mypclients"

  create_table "attfiles", :primary_key => "cutoff_id", :force => true do |t|
    t.integer  "id",                   :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "mypclient_id",         :limit => 20,                   :scale => 0,                :null => false
    t.integer  "company_id",           :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "attfilecode",          :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",          :limit => 600,                  :scale => 0,                :null => false
    t.date     "efilesapprovalcutoff", :limit => 4,                    :scale => 0,                :null => false
    t.integer  "isposted",             :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.datetime "createddate",          :limit => 8,                    :scale => 0
    t.string   "createdby",            :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",       :limit => 8,                    :scale => 0
    t.string   "lastupdateby",         :limit => 100,                  :scale => 0
  end

  add_index "attfiles", ["cutoff_id", "mypclient_id", "company_id"], :name => "fk_attfiles_cutoffs"
  add_index "attfiles", ["id", "mypclient_id", "company_id", "cutoff_id"], :name => "pk_attfiles", :unique => true
  add_index "attfiles", ["mypclient_id", "company_id", "cutoff_id", "attfilecode"], :name => "u_attfiles", :unique => true

  create_table "busgroups", :primary_key => "mypclient_id", :force => true do |t|
    t.integer  "id",             :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "busgroupcode",   :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "busgroups", ["id", "mypclient_id"], :name => "pk_busgroups", :unique => true
  add_index "busgroups", ["mypclient_id", "busgroupcode"], :name => "u_busgroups", :unique => true
  add_index "busgroups", ["mypclient_id"], :name => "fk_busgroups_mypclients"

  create_table "companies", :primary_key => "mypclient_id", :force => true do |t|
    t.integer  "id",              :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "companycode",     :limit => 80,                   :scale => 0,                :null => false
    t.string   "country_id",      :limit => 12,                   :scale => 0,                :null => false
    t.string   "description",     :limit => 600,                  :scale => 0,                :null => false
    t.string   "companyaddress",  :limit => 600,                  :scale => 0,                :null => false
    t.integer  "holdcompany_id",  :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "busgroup_id",     :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "holidaypaybasis", :limit => 2,   :precision => 0, :scale => 0,                :null => false
    t.string   "sssgsisno",       :limit => 100,                  :scale => 0
    t.string   "vatregno",        :limit => 100,                  :scale => 0
    t.integer  "isactive",        :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",     :limit => 8,                    :scale => 0
    t.string   "createdby",       :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",  :limit => 8,                    :scale => 0
    t.string   "lastupdateby",    :limit => 100,                  :scale => 0
  end

  add_index "companies", ["busgroup_id", "mypclient_id"], :name => "fk_companies_busgroups"
  add_index "companies", ["country_id"], :name => "fk_companies_countries"
  add_index "companies", ["holdcompany_id", "mypclient_id"], :name => "fk_companies_holdcompanies"
  add_index "companies", ["id", "mypclient_id"], :name => "pk_companies", :unique => true
  add_index "companies", ["mypclient_id", "companycode"], :name => "u_companies", :unique => true
  add_index "companies", ["mypclient_id", "id", "holdcompany_id", "busgroup_id"], :name => "u_companies_holdbusgroup", :unique => true
  add_index "companies", ["mypclient_id"], :name => "fk_companies_mypclients"

  create_table "countries", :force => true do |t|
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "countrycode",    :limit => 2,   :precision => 0, :scale => 0,                :null => false
    t.integer  "timezone_id",    :limit => 8,   :precision => 0, :scale => 0
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "countries", ["countrycode"], :name => "u_countries_code", :unique => true
  add_index "countries", ["description"], :name => "u_countries_desc", :unique => true
  add_index "countries", ["id"], :name => "pk_countries", :unique => true
  add_index "countries", ["timezone_id"], :name => "fk_countries_timezones"

  create_table "countrydaytypes", :force => true do |t|
    t.string   "country_id",     :limit => 12,                   :scale => 0,                :null => false
    t.string   "daytypecode",    :limit => 12,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isrestday",      :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.integer  "isholiday",      :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.integer  "seqno",          :limit => 2,   :precision => 0, :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "countrydaytypes", ["country_id", "daytypecode"], :name => "u_countrydaytypes", :unique => true
  add_index "countrydaytypes", ["country_id"], :name => "fk_countrydaytype_countries"
  add_index "countrydaytypes", ["id"], :name => "pk_countrydaytypes", :unique => true

  create_table "cutoffs", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",             :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0, :null => false
    t.string   "cutoffcode",     :limit => 80,                   :scale => 0, :null => false
    t.string   "description",    :limit => 600,                  :scale => 0, :null => false
    t.date     "datefr",         :limit => 4,                    :scale => 0, :null => false
    t.date     "dateto",         :limit => 4,                    :scale => 0, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "cutoffs", ["company_id", "mypclient_id"], :name => "fk_cutoffs_companies"
  add_index "cutoffs", ["id", "mypclient_id", "company_id"], :name => "pk_cutoffs", :unique => true
  add_index "cutoffs", ["mypclient_id", "company_id", "cutoffcode"], :name => "u_cutoffs", :unique => true
  add_index "cutoffs", ["mypclient_id", "company_id", "datefr", "dateto"], :name => "u_cutoffs_date", :unique => true

  create_table "daytypes", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",             :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0,                :null => false
    t.string   "daytypecode",    :limit => 12,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isrestday",      :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.integer  "isholiday",      :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.integer  "seqno",          :limit => 2,   :precision => 0, :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "daytypes", ["company_id", "mypclient_id"], :name => "fk_daytypes_companies"
  add_index "daytypes", ["id", "mypclient_id", "company_id"], :name => "pk_daytypes", :unique => true
  add_index "daytypes", ["mypclient_id", "company_id", "daytypecode"], :name => "u_daytypes", :unique => true

  create_table "departments", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",             :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0,                :null => false
    t.string   "departmentcode", :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "departments", ["company_id", "mypclient_id"], :name => "fk_departments_companies"
  add_index "departments", ["id", "mypclient_id", "company_id"], :name => "pk_departments", :unique => true
  add_index "departments", ["mypclient_id", "company_id", "departmentcode"], :name => "u_departments", :unique => true

  create_table "deptgroups", :primary_key => "department_id", :force => true do |t|
    t.integer  "id",             :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0,                :null => false
    t.integer  "company_id",     :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "deptgroupcode",  :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "deptgroups", ["department_id", "mypclient_id", "company_id"], :name => "fk_deptgroups_departments"
  add_index "deptgroups", ["id", "mypclient_id", "company_id", "department_id"], :name => "pk_deptgroups", :unique => true
  add_index "deptgroups", ["mypclient_id", "company_id", "department_id", "deptgroupcode"], :name => "u_deptgroups", :unique => true

  create_table "employees", :force => true do |t|
    t.string   "mypclient_id",     :limit => 20,                   :scale => 0,                :null => false
    t.integer  "empno",            :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "empidno",          :limit => 80,                   :scale => 0,                :null => false
    t.string   "empbadgeno",       :limit => 100,                  :scale => 0
    t.string   "emptitle_id",      :limit => 40,                   :scale => 0
    t.string   "empnamelast",      :limit => 100,                  :scale => 0,                :null => false
    t.string   "empnamefirst",     :limit => 100,                  :scale => 0,                :null => false
    t.string   "empnamemiddle",    :limit => 100,                  :scale => 0
    t.string   "empnamesuffix",    :limit => 20,                   :scale => 0
    t.string   "empnamealias",     :limit => 100,                  :scale => 0
    t.string   "empfullnamefml",   :limit => 300,                  :scale => 0
    t.string   "empfullnamelfm",   :limit => 300,                  :scale => 0
    t.string   "emailaddress",     :limit => 600,                  :scale => 0
    t.date     "datehired",        :limit => 4,                    :scale => 0,                :null => false
    t.integer  "company_id",       :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "holdcompany_id",   :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "busgroup_id",      :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "location_id",      :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "department_id",    :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "deptgroup_id",     :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "position_id",      :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "positionlevel_id", :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.integer  "isactivestatus",   :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",      :limit => 8,                    :scale => 0
    t.string   "createdby",        :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",   :limit => 8,                    :scale => 0
    t.string   "lastupdateby",     :limit => 100,                  :scale => 0
  end

  add_index "employees", ["department_id", "mypclient_id", "company_id"], :name => "fk_employees_departments"
  add_index "employees", ["deptgroup_id", "mypclient_id", "company_id", "department_id"], :name => "fk_employees_deptgroups"
  add_index "employees", ["emptitle_id"], :name => "fk_employees_emptitles"
  add_index "employees", ["id"], :name => "pk_employees", :unique => true
  add_index "employees", ["location_id", "mypclient_id", "company_id"], :name => "fk_employees_locations"
  add_index "employees", ["mypclient_id", "company_id", "empnamelast", "empnamefirst", "empnamemiddle", "datehired"], :name => "u_employees_name_hiredate", :unique => true
  add_index "employees", ["mypclient_id", "company_id", "holdcompany_id", "busgroup_id"], :name => "fk_employees_companies"
  add_index "employees", ["mypclient_id", "company_id", "position_id", "positionlevel_id"], :name => "fk_employees_positions"
  add_index "employees", ["mypclient_id", "empbadgeno"], :name => "u_employees_badgeno", :unique => true
  add_index "employees", ["mypclient_id", "empidno"], :name => "u_employees_idno", :unique => true
  add_index "employees", ["mypclient_id", "empno"], :name => "u_employees_empno", :unique => true

  create_table "emppolicies", :force => true do |t|
    t.string   "mypclient_id",      :limit => 20,                   :scale => 0, :null => false
    t.integer  "company_id",        :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.string   "empidno",           :limit => 80,                   :scale => 0, :null => false
    t.integer  "workskedpolicy_id", :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.date     "startdate",         :limit => 4,                    :scale => 0
    t.date     "enddate",           :limit => 4,                    :scale => 0
    t.datetime "createddate",       :limit => 8,                    :scale => 0
    t.string   "createdby",         :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",    :limit => 8,                    :scale => 0
    t.string   "lastupdateby",      :limit => 100,                  :scale => 0
  end

  add_index "emppolicies", ["id"], :name => "pk_emppolicies", :unique => true
  add_index "emppolicies", ["mypclient_id", "empidno"], :name => "fk_emppolicies_employees"
  add_index "emppolicies", ["mypclient_id", "empidno"], :name => "u_emppolicies_empidno", :unique => true
  add_index "emppolicies", ["workskedpolicy_id", "mypclient_id", "company_id"], :name => "fk_emppolicies_wspolicies"

  create_table "empskeds", :force => true do |t|
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0, :null => false
    t.integer  "company_id",     :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.string   "empidno",        :limit => 80,                   :scale => 0, :null => false
    t.integer  "worksked_id",    :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.date     "startdate",      :limit => 4,                    :scale => 0
    t.date     "enddate",        :limit => 4,                    :scale => 0
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "empskeds", ["id"], :name => "pk_empskeds", :unique => true
  add_index "empskeds", ["mypclient_id", "empidno"], :name => "fk_empskeds_employees"
  add_index "empskeds", ["mypclient_id", "empidno"], :name => "u_empskeds_empidno", :unique => true
  add_index "empskeds", ["worksked_id", "mypclient_id", "company_id"], :name => "fk_empskeds_wskeds"

  create_table "emptitles", :force => true do |t|
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "seqno",          :limit => 2,   :precision => 0, :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "emptitles", ["id"], :name => "pk_emptitles", :unique => true
  add_index "emptitles", ["seqno"], :name => "u_emptitles_seqno", :unique => true

  create_table "empworkplans", :force => true do |t|
    t.string   "mypclient_id",        :limit => 20,                   :scale => 0, :null => false
    t.integer  "company_id",          :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.string   "empidno",             :limit => 80,                   :scale => 0, :null => false
    t.integer  "w_sked_pattern_id",   :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.date     "skeddatein",          :limit => 4,                    :scale => 0, :null => false
    t.string   "dayintype",           :limit => 12,                   :scale => 0, :null => false
    t.time     "skedtimein",          :limit => 4,                    :scale => 0
    t.date     "skeddateout",         :limit => 4,                    :scale => 0
    t.string   "dayouttype",          :limit => 12,                   :scale => 0
    t.time     "skedtimeout",         :limit => 4,                    :scale => 0
    t.string   "workskedcategory_id", :limit => 40,                   :scale => 0, :null => false
    t.integer  "workskedpolicy_id",   :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.datetime "createddate",         :limit => 8,                    :scale => 0
    t.string   "createdby",           :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",      :limit => 8,                    :scale => 0
    t.string   "lastupdateby",        :limit => 100,                  :scale => 0
  end

  add_index "empworkplans", ["id"], :name => "pk_empworkplans", :unique => true
  add_index "empworkplans", ["mypclient_id", "empidno", "skeddatein"], :name => "u_empworkplans_empskeddate", :unique => true
  add_index "empworkplans", ["mypclient_id", "empidno"], :name => "fk_empworkplans_employees"
  add_index "empworkplans", ["workskedpolicy_id", "mypclient_id", "company_id"], :name => "fk_empworkplan_wspolicies"

  create_table "holdcompanies", :primary_key => "mypclient_id", :force => true do |t|
    t.integer  "id",              :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "holdcompanycode", :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",     :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",        :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",     :limit => 8,                    :scale => 0
    t.string   "createdby",       :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",  :limit => 8,                    :scale => 0
    t.string   "lastupdateby",    :limit => 100,                  :scale => 0
  end

  add_index "holdcompanies", ["id", "mypclient_id"], :name => "pk_holdcompanies", :unique => true
  add_index "holdcompanies", ["mypclient_id", "holdcompanycode"], :name => "u_holdcompanies", :unique => true
  add_index "holdcompanies", ["mypclient_id"], :name => "fk_holdcompanies_mypclients"

  create_table "holidaylocals", :force => true do |t|
    t.integer  "holiday_id",     :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0, :null => false
    t.integer  "company_id",     :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.integer  "location_id",    :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "holidaylocals", ["holiday_id"], :name => "fk_holidaylocals_holidays"
  add_index "holidaylocals", ["id"], :name => "pk_holidaylocals", :unique => true
  add_index "holidaylocals", ["location_id", "mypclient_id", "company_id"], :name => "fk_holidaylocals_locations"

  create_table "holidays", :force => true do |t|
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0, :null => false
    t.string   "country_id",     :limit => 12,                   :scale => 0, :null => false
    t.string   "description",    :limit => 600,                  :scale => 0, :null => false
    t.date     "holidaydate",    :limit => 4,                    :scale => 0, :null => false
    t.integer  "holidaytype_id", :limit => 8,   :precision => 0, :scale => 0, :null => false
    t.string   "coverage",       :limit => 4,                    :scale => 0, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "holidays", ["country_id"], :name => "fk_holidays_countries"
  add_index "holidays", ["holidaytype_id", "country_id"], :name => "fk_holidays_holidaytypes"
  add_index "holidays", ["id"], :name => "pk_holidays", :unique => true
  add_index "holidays", ["mypclient_id"], :name => "fk_holidays_mypclients"

  create_table "holidaytypes", :primary_key => "country_id", :force => true do |t|
    t.integer  "id",              :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "holidaytypecode", :limit => 12,                   :scale => 0,                :null => false
    t.string   "description",     :limit => 600,                  :scale => 0,                :null => false
    t.integer  "seqno",           :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.integer  "isactive",        :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",     :limit => 8,                    :scale => 0
    t.string   "createdby",       :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",  :limit => 8,                    :scale => 0
    t.string   "lastupdateby",    :limit => 100,                  :scale => 0
  end

  add_index "holidaytypes", ["country_id", "holidaytypecode"], :name => "u_holidaytypes", :unique => true
  add_index "holidaytypes", ["country_id", "seqno"], :name => "u_holidaytypes_seqno", :unique => true
  add_index "holidaytypes", ["country_id"], :name => "fk_holidaytypes_countries"
  add_index "holidaytypes", ["id", "country_id"], :name => "pk_holidaytypes", :unique => true

  create_table "leavetypes", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",             :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0,                :null => false
    t.string   "leavetypecode",  :limit => 40,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "converttoatt",   :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "leavetypes", ["company_id", "mypclient_id"], :name => "fk_leavetypes_companies"
  add_index "leavetypes", ["id", "mypclient_id", "company_id"], :name => "pk_leavetypes", :unique => true
  add_index "leavetypes", ["mypclient_id", "company_id", "leavetypecode"], :name => "u_leavetypes", :unique => true

  create_table "locations", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",             :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0,                :null => false
    t.string   "locationcode",   :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "locations", ["company_id", "mypclient_id"], :name => "fk_locations_companies"
  add_index "locations", ["id", "mypclient_id", "company_id"], :name => "pk_locations", :unique => true
  add_index "locations", ["mypclient_id", "company_id", "locationcode"], :name => "u_locations", :unique => true

  create_table "mypclients", :force => true do |t|
    t.string   "description",    :limit => 600,                  :scale => 0,                :null => false
    t.string   "security_token", :limit => 600,                  :scale => 0,                :null => false
    t.integer  "seqno",          :limit => 2,   :precision => 0, :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "mypclients", ["description"], :name => "u_mypclients_desc", :unique => true
  add_index "mypclients", ["id"], :name => "pk_mypclients", :unique => true
  add_index "mypclients", ["seqno"], :name => "u_mypclients_seqno", :unique => true

  create_table "positionlevels", :primary_key => "mypclient_id", :force => true do |t|
    t.integer  "id",                :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "positionlevelcode", :limit => 80,                   :scale => 0,                :null => false
    t.string   "description",       :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",          :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",       :limit => 8,                    :scale => 0
    t.string   "createdby",         :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",    :limit => 8,                    :scale => 0
    t.string   "lastupdateby",      :limit => 100,                  :scale => 0
  end

  add_index "positionlevels", ["id", "mypclient_id"], :name => "pk_positionlevels", :unique => true
  add_index "positionlevels", ["mypclient_id", "positionlevelcode"], :name => "u_positionlevels", :unique => true
  add_index "positionlevels", ["mypclient_id"], :name => "fk_positionlevels_mypclients"

  create_table "positions", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",               :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "mypclient_id",     :limit => 20,                   :scale => 0,                :null => false
    t.string   "positioncode",     :limit => 80,                   :scale => 0,                :null => false
    t.integer  "positionlevel_id", :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "description",      :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",         :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",      :limit => 8,                    :scale => 0
    t.string   "createdby",        :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",   :limit => 8,                    :scale => 0
    t.string   "lastupdateby",     :limit => 100,                  :scale => 0
  end

  add_index "positions", ["company_id", "mypclient_id"], :name => "fk_positions_companies"
  add_index "positions", ["id", "mypclient_id", "company_id"], :name => "pk_positions", :unique => true
  add_index "positions", ["mypclient_id", "company_id", "id", "positionlevel_id"], :name => "u_positions_levels", :unique => true
  add_index "positions", ["mypclient_id", "company_id", "positioncode"], :name => "u_positions", :unique => true
  add_index "positions", ["positionlevel_id", "mypclient_id"], :name => "fk_positions_positionlevels"

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :limit => 1020,     :scale => 0
    t.text     "data",       :limit => 10485760, :scale => 0
    t.datetime "created_at", :limit => 8,        :scale => 0, :null => false
    t.datetime "updated_at", :limit => 8,        :scale => 0, :null => false
  end

  add_index "sessions", ["session_id"], :name => "sessions_session_id"
  add_index "sessions", ["updated_at"], :name => "sessions_updated_at"

  create_table "timelogs", :force => true do |t|
    t.string   "mypclient_id",   :limit => 20,                   :scale => 0,                :null => false
    t.string   "empbadgeno",     :limit => 100,                  :scale => 0,                :null => false
    t.date     "logdate",        :limit => 4,                    :scale => 0,                :null => false
    t.time     "logtime",        :limit => 4,                    :scale => 0,                :null => false
    t.string   "deviceid",       :limit => 80,                   :scale => 0
    t.string   "logsource",      :limit => 20,                   :scale => 0
    t.integer  "processed",      :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.datetime "processedstamp", :limit => 8,                    :scale => 0
    t.string   "processedby",    :limit => 100,                  :scale => 0
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "timelogs", ["id"], :name => "pk_timelogs", :unique => true
  add_index "timelogs", ["mypclient_id", "empbadgeno"], :name => "fk_timelogs_employees"

  create_table "timezones", :force => true do |t|
    t.string   "code",           :limit => 40,  :scale => 0, :null => false
    t.string   "description",    :limit => 600, :scale => 0
    t.datetime "createddate",    :limit => 8,   :scale => 0
    t.string   "createdby",      :limit => 100, :scale => 0
    t.datetime "lastupdatedate", :limit => 8,   :scale => 0
    t.string   "lastupdateby",   :limit => 100, :scale => 0
  end

  add_index "timezones", ["code", "description"], :name => "u_timezones", :unique => true
  add_index "timezones", ["id"], :name => "pk_timezones", :unique => true

  create_table "user_sessions", :force => true do |t|
    t.string   "session_id", :limit => 1020,     :scale => 0, :null => false
    t.text     "data",       :limit => 10485760, :scale => 0
    t.datetime "created_at", :limit => 8,        :scale => 0, :null => false
    t.datetime "updated_at", :limit => 8,        :scale => 0, :null => false
  end

  add_index "user_sessions", ["session_id"], :name => "user_sessions_session_id"
  add_index "user_sessions", ["updated_at"], :name => "user_sessions_updated_at"

  create_table "useraccts", :force => true do |t|
    t.integer  "employee_id",      :limit => 8,   :precision => 0, :scale => 0
    t.string   "mypclient_id",     :limit => 20,                   :scale => 0,                :null => false
    t.string   "username",         :limit => 100,                  :scale => 0,                :null => false
    t.string   "userpasswd",       :limit => 600,                  :scale => 0,                :null => false
    t.integer  "isactive",         :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.integer  "islocked",         :limit => 2,   :precision => 0, :scale => 0, :default => 0, :null => false
    t.datetime "lastoklogin",      :limit => 8,                    :scale => 0
    t.integer  "failedlogincount", :limit => 2,   :precision => 0, :scale => 0, :default => 0
    t.datetime "createddate",      :limit => 8,                    :scale => 0
    t.string   "createdby",        :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",   :limit => 8,                    :scale => 0
    t.string   "lastupdateby",     :limit => 100,                  :scale => 0
  end

  add_index "useraccts", ["employee_id"], :name => "fk_useraccts_employees"
  add_index "useraccts", ["id"], :name => "pk_useraccts", :unique => true
  add_index "useraccts", ["mypclient_id"], :name => "fk_useraccts_mypclients"
  add_index "useraccts", ["username"], :name => "u_useraccts_username", :unique => true

  create_table "userroles", :force => true do |t|
    t.integer  "useracct_id",    :limit => 8,   :precision => 0, :scale => 0,                :null => false
    t.string   "admuserrole_id", :limit => 40,                   :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "userroles", ["admuserrole_id"], :name => "fk_userroles_admuserroles"
  add_index "userroles", ["id"], :name => "pk_userroles", :unique => true
  add_index "userroles", ["useracct_id", "admuserrole_id"], :name => "u_userroles_userrole", :unique => true
  add_index "userroles", ["useracct_id"], :name => "fk_userroles_useraccts"

  create_table "workskedcategories", :force => true do |t|
    t.string   "description",    :limit => 100,                  :scale => 0,                :null => false
    t.integer  "isactive",       :limit => 2,   :precision => 0, :scale => 0, :default => 1, :null => false
    t.datetime "createddate",    :limit => 8,                    :scale => 0
    t.string   "createdby",      :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate", :limit => 8,                    :scale => 0
    t.string   "lastupdateby",   :limit => 100,                  :scale => 0
  end

  add_index "workskedcategories", ["description"], :name => "u_workskedcategories_desc", :unique => true
  add_index "workskedcategories", ["id"], :name => "pk_workskedcategories", :unique => true

  create_table "workskedpatterns", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",                  :limit => 8,   :precision => 0, :scale => 0,                   :null => false
    t.string   "mypclient_id",        :limit => 20,                   :scale => 0,                   :null => false
    t.string   "patterncode",         :limit => 40,                   :scale => 0,                   :null => false
    t.string   "description",         :limit => 600,                  :scale => 0,                   :null => false
    t.string   "workskedcategory_id", :limit => 40,                   :scale => 0,                   :null => false
    t.time     "timein",              :limit => 4,                    :scale => 0
    t.time     "timeout",             :limit => 4,                    :scale => 0
    t.decimal  "requiredhrs",                        :precision => 5, :scale => -2, :default => 0.0
    t.time     "break1fr",            :limit => 4,                    :scale => 0
    t.time     "break1to",            :limit => 4,                    :scale => 0
    t.decimal  "break1hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break2fr",            :limit => 4,                    :scale => 0
    t.time     "break2to",            :limit => 4,                    :scale => 0
    t.decimal  "break2hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break3fr",            :limit => 4,                    :scale => 0
    t.time     "break3to",            :limit => 4,                    :scale => 0
    t.decimal  "break3hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break4fr",            :limit => 4,                    :scale => 0
    t.time     "break4to",            :limit => 4,                    :scale => 0
    t.decimal  "break4hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break5fr",            :limit => 4,                    :scale => 0
    t.time     "break5to",            :limit => 4,                    :scale => 0
    t.decimal  "break5hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "hrswkam",                            :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "hrswkpm",                            :precision => 5, :scale => -2, :default => 0.0
    t.time     "flexiearliestin",     :limit => 4,                    :scale => 0
    t.time     "flexilatestin",       :limit => 4,                    :scale => 0
    t.datetime "createddate",         :limit => 8,                    :scale => 0
    t.string   "createdby",           :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",      :limit => 8,                    :scale => 0
    t.string   "lastupdateby",        :limit => 100,                  :scale => 0
  end

  add_index "workskedpatterns", ["company_id", "mypclient_id"], :name => "fk_wskedpatterns_companies"
  add_index "workskedpatterns", ["id", "mypclient_id", "company_id"], :name => "pk_workskedpatterns", :unique => true
  add_index "workskedpatterns", ["mypclient_id", "company_id", "patterncode"], :name => "u_workskedpatterns", :unique => true
  add_index "workskedpatterns", ["workskedcategory_id"], :name => "fk_wskedpatterns_categories"

  create_table "workskedpolicies", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",                              :limit => 8,   :precision => 0,  :scale => 0,                   :null => false
    t.string   "mypclient_id",                    :limit => 20,                    :scale => 0,                   :null => false
    t.string   "policycode",                      :limit => 80,                    :scale => 0,                   :null => false
    t.string   "description",                     :limit => 600,                   :scale => 0,                   :null => false
    t.integer  "isactive",                        :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "wr_withmealallow",                :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wr_withmealallow_firstamt",                      :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wr_withmealallow_firstmins",                     :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wr_withmealallow_succamt",                       :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wr_withmealallow_succmins",                      :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wr_withmealallow_beyondamt",                     :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wr_withmealallow_beyondmins",                    :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wr_strictlatepolicy",             :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.decimal  "wr_strictlatepolicy_hdmins",                     :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wr_strictlatepolicy_abmins",                     :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wr_strictutpolicy",               :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wr_strictutpolicy_hdmins",                       :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wr_strictutpolicy_abmins",                       :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wr_strictlateut_applytondiff",    :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wr_withgraceprd_timein",          :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wr_withgraceprd_timein_mins",                    :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wr_graceprd_deductfromlate",      :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wr_withgraceprd_timeout",         :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wr_withgraceprd_timeout_mins",                   :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wr_graceprd_deductfromut",        :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wr_loa_ignorelogs",               :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wr_loa_prioritizeapp",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wr_loa_minchargemins",                           :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wr_oth_sethrswkcomplete",         :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wr_oth_offsetlatetoexthrs",       :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wo_bi_allowot",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_bi_minotmins",                                :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_bi_completestandardhrs",       :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wo_bi_offsetuttoebot",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wo_bi_withmealallow",             :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_bi_withmealallow_firstamt",                   :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withmealallow_firstmins",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withmealallow_succamt",                    :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withmealallow_succmins",                   :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withmealallow_beyondamt",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withmealallow_beyondmins",                 :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_ao_allowot",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_ao_minotmins",                                :precision => 10, :scale => -2, :default => 0.0
    t.time     "wo_ao_earliesttime",              :limit => 4,                     :scale => 0
    t.integer  "wo_ao_completestandardhrs",       :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wo_ao_offsetlatetoot",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wo_ao_withmealallow",             :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_ao_withmealallow_firstamt",                   :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withmealallow_firstmins",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withmealallow_succamt",                    :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withmealallow_succmins",                   :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withmealallow_beyondamt",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withmealallow_beyondmins",                 :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_mb_1stbrk_allowot",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_mb_1stbrk_minotmins",                         :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_mb_2ndbrk_allowot",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_mb_2ndbrk_minotmins",                         :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_mb_3rdbrk_allowot",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_mb_3rdbrk_minotmins",                         :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_mb_4thbrk_allowot",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_mb_4thbrk_minotmins",                         :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_mb_5thbrk_allowot",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_mb_5thbrk_minotmins",                         :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wb_with1stbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wb_strict1stbrk",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "wb_strict1stbrk_starttime",       :limit => 4,                     :scale => 0
    t.time     "wb_strict1stbrk_endtime",         :limit => 4,                     :scale => 0
    t.integer  "wb_with2ndbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wb_strict2ndbrk",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "wb_strict2ndbrk_starttime",       :limit => 4,                     :scale => 0
    t.time     "wb_strict2ndbrk_endtime",         :limit => 4,                     :scale => 0
    t.integer  "wb_with3rdbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wb_strict3rdbrk",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "wb_strict3rdbrk_starttime",       :limit => 4,                     :scale => 0
    t.time     "wb_strict3rdbrk_endtime",         :limit => 4,                     :scale => 0
    t.integer  "wb_with4thbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wb_strict4thbrk",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "wb_strict4thbrk_starttime",       :limit => 4,                     :scale => 0
    t.time     "wb_strict4thbrk_endtime",         :limit => 4,                     :scale => 0
    t.integer  "wb_with5thbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wb_strict5thbrk",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "wn_duringregworkhr",              :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.time     "wb_strict5thbrk_starttime",       :limit => 4,                     :scale => 0
    t.time     "wb_strict5thbrk_endtime",         :limit => 4,                     :scale => 0
    t.time     "wn_duringregworkhr_starttime",    :limit => 4,                     :scale => 0
    t.time     "wn_duringregworkhr_endtime",      :limit => 4,                     :scale => 0
    t.integer  "wn_onvalidotbti",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "wn_onvalidotbti_starttime",       :limit => 4,                     :scale => 0
    t.time     "wn_onvalidotbti_endtime",         :limit => 4,                     :scale => 0
    t.integer  "wn_onvalidotato",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.time     "wn_onvalidotato_starttime",       :limit => 4,                     :scale => 0
    t.time     "wn_onvalidotato_endtime",         :limit => 4,                     :scale => 0
    t.integer  "ws_duringregworkhr",              :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.time     "ws_duringregworkhr_starttime",    :limit => 4,                     :scale => 0
    t.time     "ws_duringregworkhr_endtime",      :limit => 4,                     :scale => 0
    t.integer  "ws_onvalidotbti",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "ws_onvalidotbti_starttime",       :limit => 4,                     :scale => 0
    t.time     "ws_onvalidotbti_endtime",         :limit => 4,                     :scale => 0
    t.integer  "ws_onvalidotato",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.time     "ws_onvalidotato_starttime",       :limit => 4,                     :scale => 0
    t.time     "ws_onvalidotato_endtime",         :limit => 4,                     :scale => 0
    t.integer  "wo_bi_withtransallow",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_bi_withtransallow_firstamt",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withtransallow_firstmins",                 :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withtransallow_succamt",                   :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withtransallow_succmins",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withtransallow_beyondamt",                 :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_bi_withtransallow_beyondmins",                :precision => 10, :scale => -2, :default => 0.0
    t.integer  "wo_ao_withtransallow",            :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "wo_ao_withtransallow_firstamt",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withtransallow_firstmins",                 :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withtransallow_succamt",                   :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withtransallow_succmins",                  :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withtransallow_beyondamt",                 :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "wo_ao_withtransallow_beyondmins",                :precision => 10, :scale => -2, :default => 0.0
    t.integer  "no_allowot",                      :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "no_minotmins",                                   :precision => 10, :scale => -2, :default => 0.0
    t.integer  "no_withmealallow",                :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "no_withmealallow_firstamt",                      :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withmealallow_firstmins",                     :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withmealallow_succamt",                       :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withmealallow_succmins",                      :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withmealallow_beyondamt",                     :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withmealallow_beyondmins",                    :precision => 10, :scale => -2, :default => 0.0
    t.integer  "no_withtransallow",               :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "no_withtransallow_firstamt",                     :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withtransallow_firstmins",                    :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withtransallow_succamt",                      :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withtransallow_succmins",                     :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withtransallow_beyondamt",                    :precision => 10, :scale => -2, :default => 0.0
    t.decimal  "no_withtransallow_beyondmins",                   :precision => 10, :scale => -2, :default => 0.0
    t.integer  "nb_with1stbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "nb_1stbrk_fixed",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "nb_1stbrk_fixmins",                              :precision => 10, :scale => -2, :default => 0.0
    t.integer  "nb_1stbrk_range",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "nb_1stbrk_starttime",             :limit => 4,                     :scale => 0
    t.time     "nb_1stbrk_endtime",               :limit => 4,                     :scale => 0
    t.integer  "nb_with2ndbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "nb_2ndbrk_fixed",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "nb_2ndbrk_fixmins",                              :precision => 10, :scale => -2, :default => 0.0
    t.integer  "nb_2ndbrk_range",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "nb_2ndbrk_starttime",             :limit => 4,                     :scale => 0
    t.time     "nb_2ndbrk_endtime",               :limit => 4,                     :scale => 0
    t.integer  "nb_with3rdbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "nb_3rdbrk_fixed",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "nb_3rdbrk_fixmins",                              :precision => 10, :scale => -2, :default => 0.0
    t.integer  "nb_3rdbrk_range",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "nb_3rdbrk_starttime",             :limit => 4,                     :scale => 0
    t.time     "nb_3rdbrk_endtime",               :limit => 4,                     :scale => 0
    t.integer  "nb_with4thbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "nb_4thbrk_fixed",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "nb_4thbrk_fixmins",                              :precision => 10, :scale => -2, :default => 0.0
    t.integer  "nb_4thbrk_range",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "nb_4thbrk_starttime",             :limit => 4,                     :scale => 0
    t.time     "nb_4thbrk_endtime",               :limit => 4,                     :scale => 0
    t.integer  "nb_with5thbrk",                   :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "nb_5thbrk_fixed",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.decimal  "nb_5thbrk_fixmins",                              :precision => 10, :scale => -2, :default => 0.0
    t.integer  "nb_5thbrk_range",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.time     "nb_5thbrk_starttime",             :limit => 4,                     :scale => 0
    t.time     "nb_5thbrk_endtime",               :limit => 4,                     :scale => 0
    t.integer  "nn_computendiff",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.time     "nn_ndiff_starttime",              :limit => 4,                     :scale => 0
    t.time     "nn_ndiff_endtime",                :limit => 4,                     :scale => 0
    t.integer  "ns_computesdiff",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.time     "ns_sdiff_starttime",              :limit => 4,                     :scale => 0
    t.time     "ns_sdiff_endtime",                :limit => 4,                     :scale => 0
    t.integer  "com_payhollg",                    :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattbefhollg",          :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattafthollg",          :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "com_payholsp",                    :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattbefholsp",          :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattaftholsp",          :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "com_payholtype1",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattbefholtype1",       :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattaftholtype1",       :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.integer  "com_payholtype2",                 :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattbefholtype2",       :limit => 2,   :precision => 0,  :scale => 0,  :default => 1,   :null => false
    t.integer  "com_requireattaftholtype2",       :limit => 2,   :precision => 0,  :scale => 0,  :default => 0,   :null => false
    t.string   "com_mealallowcode",               :limit => 80,                    :scale => 0
    t.string   "com_transallowcode",              :limit => 80,                    :scale => 0
    t.datetime "createddate",                     :limit => 8,                     :scale => 0
    t.string   "createdby",                       :limit => 100,                   :scale => 0
    t.datetime "lastupdatedate",                  :limit => 8,                     :scale => 0
    t.string   "lastupdateby",                    :limit => 100,                   :scale => 0
  end

  add_index "workskedpolicies", ["company_id", "mypclient_id"], :name => "fk_wskedpolicies_companies"
  add_index "workskedpolicies", ["id", "mypclient_id", "company_id"], :name => "pk_workskedpolicies", :unique => true
  add_index "workskedpolicies", ["mypclient_id", "company_id", "policycode"], :name => "u_workskedpolicies", :unique => true

  create_table "workskeds", :primary_key => "company_id", :force => true do |t|
    t.integer  "id",                  :limit => 8,   :precision => 0, :scale => 0,                                                                  :null => false
    t.string   "mypclient_id",        :limit => 20,                   :scale => 0,                                                                  :null => false
    t.string   "workskedcode",        :limit => 80,                   :scale => 0,                                                                  :null => false
    t.string   "description",         :limit => 600,                  :scale => 0,                                                                  :null => false
    t.string   "workskedcategory_id", :limit => 40,                   :scale => 0,                                                                  :null => false
    t.time     "requiredtimein",      :limit => 4,                    :scale => 0
    t.time     "requiredtimeout",     :limit => 4,                    :scale => 0
    t.decimal  "requireddayhrs",                     :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "requiredwkhrs",                      :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "requiredmonhrs",                     :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "requiredannualhrs",                  :precision => 5, :scale => -2, :default => 0.0
    t.time     "break1fr",            :limit => 4,                    :scale => 0
    t.time     "break1to",            :limit => 4,                    :scale => 0
    t.decimal  "break1hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break2fr",            :limit => 4,                    :scale => 0
    t.time     "break2to",            :limit => 4,                    :scale => 0
    t.decimal  "break2hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break3fr",            :limit => 4,                    :scale => 0
    t.time     "break3to",            :limit => 4,                    :scale => 0
    t.decimal  "break3hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break4fr",            :limit => 4,                    :scale => 0
    t.time     "break4to",            :limit => 4,                    :scale => 0
    t.decimal  "break4hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.time     "break5fr",            :limit => 4,                    :scale => 0
    t.time     "break5to",            :limit => 4,                    :scale => 0
    t.decimal  "break5hrs",                          :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "hrswkam",                            :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "hrswkpm",                            :precision => 5, :scale => -2, :default => 0.0
    t.string   "monday",              :limit => 12,                   :scale => 0,  :default => "RWD                                             ", :null => false
    t.string   "tuesday",             :limit => 12,                   :scale => 0,  :default => "RWD                                             ", :null => false
    t.string   "wednesday",           :limit => 12,                   :scale => 0,  :default => "RWD                                             ", :null => false
    t.string   "thursday",            :limit => 12,                   :scale => 0,  :default => "RWD                                             ", :null => false
    t.string   "friday",              :limit => 12,                   :scale => 0,  :default => "RWD                                             ", :null => false
    t.string   "saturday",            :limit => 12,                   :scale => 0,  :default => "RWD                                             ", :null => false
    t.string   "sunday",              :limit => 12,                   :scale => 0,  :default => "RRD                                             ", :null => false
    t.time     "flexiearliestin",     :limit => 4,                    :scale => 0
    t.time     "flexilatestin",       :limit => 4,                    :scale => 0
    t.decimal  "workdaysperwk",                      :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "workdayspermo",                      :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "workdaysperyr",                      :precision => 5, :scale => -2, :default => 0.0
    t.decimal  "workmosperyr",                       :precision => 5, :scale => -2, :default => 0.0
    t.datetime "createddate",         :limit => 8,                    :scale => 0
    t.string   "createdby",           :limit => 100,                  :scale => 0
    t.datetime "lastupdatedate",      :limit => 8,                    :scale => 0
    t.string   "lastupdateby",        :limit => 100,                  :scale => 0
  end

  add_index "workskeds", ["company_id", "mypclient_id"], :name => "fk_workskeds_companies"
  add_index "workskeds", ["id", "mypclient_id", "company_id"], :name => "pk_workskeds", :unique => true
  add_index "workskeds", ["mypclient_id", "company_id", "workskedcode"], :name => "u_workskeds", :unique => true
  add_index "workskeds", ["workskedcategory_id"], :name => "fk_workskeds_categories"

end

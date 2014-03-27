Mypeople::Application.routes.draw do

  get "dtr/logs"

  get "dtr/history"

  get "dtr_history/index"

  get "designer/index"
  get "admin_pages/employees"
  get "admin_pages/setup"
  get "admin_pages/salary"
  get "callendar/index"
  get "meta_data/create"
  get "admin_setups/index"
  get "setups/index"
  get "account_sl/index"
  get "pay_slip/index"
  get "attendance/index"
  get "travel_order/index"
  get "dtr_log/index"
  get "leave/index"
  get "overtime/index"
  get "employments/list"
  get "workplan/file"
  get "holidays/index"
  get "user/profileData"
  get "positionlevels/adminSelection"
  get "positions/adminSelection"
  get "companies/admin_selection"
  get "countries/admin_selection"
  get "companies/setupList"
  get "departments/setupList"
  get "deptgroups/setupList"
  get "busgroups/setupList"
  get "holdcompanies/setupList"
  get "workskeds/setupList"
  get "workskedpatterns/setupList"
  get "workskedpolicies/client_list"
  get "positions/setupList"
  get "employees/newEmployeeNumber"
  get "employees/initial_selections"
  get "employees/time_logs"
  get "employees/without_policy"
  get "employees/without_schedule"
  post "holidaylocals/multi_delete"
  post "emppolicies/update_assignment"
  # post "/update_assignment"

  resources :emptitles, :companies, :workskeds, :workskedpatterns, :payrolls, :departments, :positions, :deptgroups, :busgroups, 
            :holdcompanies, :positionlevels, :userroles, :mypclients, :admuserroles, :user_accounts, :sessions, :employees, :lookups, 
            :administrators, :new_employees, :holidays, :locations, :timezones, :holidaytypes, :holidaylocals, :countries,:workskedpolicies,
            :holidays,:holidaytypes ,:leavetypes, :timelogs, :emppolicies, :daytypes, :cut_offs, :attendance_files

  resources :super_admroles, :super_user_accounts
  resources :profile_photos, only: [:show, :create]

  match "employee/:username/:action(.:format)" => "regular_user_pages#:action"
  match "employee/dtr(.:format)" => "dtr_log#index"
  match "account_sl" => "account_sl#index", :as => "sl"
  match "payslip" => "pay_slip#index", :as => "payslip"
  match "attendance" => "attendance#index", :as => "attendance"
  match "employee/list" => "employees#list"
  match "login" => "sessions#loginpage", :as => "login"
  match "adminlogin" => "sessions#adminlogin", :as => "adminlogin"
  match "logout" => "sessions#logout", :as => "logout"
  match "home" => "user#home", :as => "home"
  match "bizgroup" => "busgroups#index", :as => "bizgroup"
  match "clients" => "mypclients#index"
  match "position" => "positions#index", :as => "position"
  match "positionlevel" => "positionlevels#index", :as => "positionlevel"
  match "companies" => "companies#index", :as => "companies"
  match "departments" => "departments#index", :as => "department"
  match "deptgroups" => "deptgroups#index", :as => "deptgroup"
  match "holdcompany" => "holdcompanies#index", :as => "holdcompany"
  match 'work_schedule' => "employees#work_schedule", :as => "work_schedule"
  match 'profile' => "user#profile", :as => "profile"
  match 'payroll/:id' => "payrolls#setup", :as => "payroll_setup"
  match 'workplan_file' => "workplan#file", :as => "workplan_file"

  #overtime applications
  match "overtime" => "overtime#index", :as => "overtime_list"
  match "leave" => "leave#index", :as => "leave_list"
  match "dtrlog" => "dtr_log#index", :as => "dtrlog_list"


  #for administrator
  match 'admin/:action' => 'admin_pages#:action'
  match 'admin/time_managements/:action' => 'time_managements#:action'
  match 'admin_setups' => 'admin_setups#index', :as => 'admin_setup'
  match 'admin' => 'admin_pages#home', :as => 'admin'
  match 'administrator/profile' => 'administrators#profile' , :as => 'admin_profile'
  match 'departments/:company_id/:action/' => 'departments#:action'  # user in new/edit employee lookup
  match 'deptgroups/:company_id/:department_id/:action/' => 'deptgroups#:action'  # user in new/edit employee lookup
  match 'busgroups/:id/:action/' => 'busgroups#:action'  # user in new/edit employee lookup
  match 'holdcompanies/:id/:action/' => 'holdcompanies#:action'  # user in new/edit employee lookup
  match 'workskeds/:id/breaks' => 'workskeds#fetch_breaks'
  match 'workskedpatterns/:id/breaks' => 'workskedpatterns#fetch_breaks'
  match 'policies' => 'policies#index', :as => 'policy'
  match 'client/:action' => 'client#:action'
  match 'super/:action' => 'super#:action'
  match "holidaylocals/affected_locations/:id" => "holidaylocals#affected_locations"
  match "policy/assigned_employees" => "emppolicies#assigned_employees"
  match "schedule/assigned_employees" => "employee_schedule#assigned_employees"
  match "schedule/update_assignment" => "employee_schedule#update_assignment"
  match "work_plan_manager/:action" => "work_plan_managers#:action"
  match "company/:id/day_types" => "companies#day_types" 

  match ":username/security/:action" => 'security#:action'
  root :to => 'user#home'



  # FOR SUPER USER
  match "su/login" => "sessions#super_login", :as => "super_login"
  match "su" => "sessions#super_login"
  match "su/session" => "sessions#create_super", :as => 'super_session'
  match "super" => "super#index", :as => "super"



  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end

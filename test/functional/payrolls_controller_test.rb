require 'test_helper'

class PayrollsControllerTest < ActionController::TestCase
  test "should get employee_id:integer" do
    get :employee_id 
    assert_response :success
  end

end

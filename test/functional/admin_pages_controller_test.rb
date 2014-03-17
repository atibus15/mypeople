require 'test_helper'

class AdminPagesControllerTest < ActionController::TestCase
  test "should get employees" do
    get :employees
    assert_response :success
  end

  test "should get setup" do
    get :setup
    assert_response :success
  end

  test "should get salary" do
    get :salary
    assert_response :success
  end

end

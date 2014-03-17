require 'test_helper'

class RegularUserPagesControllerTest < ActionController::TestCase
  test "should get profile" do
    get :profile
    assert_response :success
  end

  test "should get dtr_history" do
    get :dtr_history
    assert_response :success
  end

  test "should get payroll" do
    get :payroll
    assert_response :success
  end

  test "should get account_sl" do
    get :account_sl
    assert_response :success
  end

  test "should get work_schedule" do
    get :work_schedule
    assert_response :success
  end

  test "should get overtime" do
    get :overtime
    assert_response :success
  end

  test "should get leave" do
    get :leave
    assert_response :success
  end

  test "should get dtr_log" do
    get :dtr_log
    assert_response :success
  end

end

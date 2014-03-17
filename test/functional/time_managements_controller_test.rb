require 'test_helper'

class TimeManagementsControllerTest < ActionController::TestCase
  test "should get attendance_processor" do
    get :attendance_processor
    assert_response :success
  end

  test "should get policy_assignment" do
    get :policy_assignment
    assert_response :success
  end

  test "should get schedule_assignment" do
    get :schedule_assignment
    assert_response :success
  end

  test "should get work_plan_manager" do
    get :work_plan_manager
    assert_response :success
  end

end

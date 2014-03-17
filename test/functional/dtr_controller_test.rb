require 'test_helper'

class DtrControllerTest < ActionController::TestCase
  test "should get logs" do
    get :logs
    assert_response :success
  end

  test "should get history" do
    get :history
    assert_response :success
  end

end

require 'test_helper'

class ClientControllerTest < ActionController::TestCase
  test "should get default_selections" do
    get :default_selections
    assert_response :success
  end

end

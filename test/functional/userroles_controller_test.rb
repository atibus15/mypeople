require 'test_helper'

class UserrolesControllerTest < ActionController::TestCase
  setup do
    @userrole = userroles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:userroles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create userrole" do
    assert_difference('Userrole.count') do
      post :create, userrole: { admuserrole_id: @userrole.admuserrole_id, id: @userrole.id, isactive: @userrole.isactive, useracct_id: @userrole.useracct_id }
    end

    assert_redirected_to userrole_path(assigns(:userrole))
  end

  test "should show userrole" do
    get :show, id: @userrole
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @userrole
    assert_response :success
  end

  test "should update userrole" do
    put :update, id: @userrole, userrole: { admuserrole_id: @userrole.admuserrole_id, id: @userrole.id, isactive: @userrole.isactive, useracct_id: @userrole.useracct_id }
    assert_redirected_to userrole_path(assigns(:userrole))
  end

  test "should destroy userrole" do
    assert_difference('Userrole.count', -1) do
      delete :destroy, id: @userrole
    end

    assert_redirected_to userroles_path
  end
end

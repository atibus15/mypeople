require 'test_helper'

class PositionlevelsControllerTest < ActionController::TestCase
  setup do
    @positionlevel = positionlevels(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:positionlevels)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create positionlevel" do
    assert_difference('Positionlevel.count') do
      post :create, positionlevel: { description: @positionlevel.description, id: @positionlevel.id, isactive: @positionlevel.isactive, mypclient_id: @positionlevel.mypclient_id, positionlevelcode: @positionlevel.positionlevelcode }
    end

    assert_redirected_to positionlevel_path(assigns(:positionlevel))
  end

  test "should show positionlevel" do
    get :show, id: @positionlevel
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @positionlevel
    assert_response :success
  end

  test "should update positionlevel" do
    put :update, id: @positionlevel, positionlevel: { description: @positionlevel.description, id: @positionlevel.id, isactive: @positionlevel.isactive, mypclient_id: @positionlevel.mypclient_id, positionlevelcode: @positionlevel.positionlevelcode }
    assert_redirected_to positionlevel_path(assigns(:positionlevel))
  end

  test "should destroy positionlevel" do
    assert_difference('Positionlevel.count', -1) do
      delete :destroy, id: @positionlevel
    end

    assert_redirected_to positionlevels_path
  end
end

require 'test_helper'

class BusgroupsControllerTest < ActionController::TestCase
  setup do
    @busgroup = busgroups(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:busgroups)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create busgroup" do
    assert_difference('Busgroup.count') do
      post :create, busgroup: { busgroupcode: @busgroup.busgroupcode, description: @busgroup.description, id: @busgroup.id, isactive: @busgroup.isactive, mypclient_id: @busgroup.mypclient_id }
    end

    assert_redirected_to busgroup_path(assigns(:busgroup))
  end

  test "should show busgroup" do
    get :show, id: @busgroup
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @busgroup
    assert_response :success
  end

  test "should update busgroup" do
    put :update, id: @busgroup, busgroup: { busgroupcode: @busgroup.busgroupcode, description: @busgroup.description, id: @busgroup.id, isactive: @busgroup.isactive, mypclient_id: @busgroup.mypclient_id }
    assert_redirected_to busgroup_path(assigns(:busgroup))
  end

  test "should destroy busgroup" do
    assert_difference('Busgroup.count', -1) do
      delete :destroy, id: @busgroup
    end

    assert_redirected_to busgroups_path
  end
end

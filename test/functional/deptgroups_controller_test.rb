require 'test_helper'

class DeptgroupsControllerTest < ActionController::TestCase
  setup do
    @deptgroup = deptgroups(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:deptgroups)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create deptgroup" do
    assert_difference('Deptgroup.count') do
      post :create, deptgroup: { company_id: @deptgroup.company_id, department_id: @deptgroup.department_id, deptgroupcode: @deptgroup.deptgroupcode, description: @deptgroup.description, id: @deptgroup.id, isactive: @deptgroup.isactive, mypclient_id: @deptgroup.mypclient_id }
    end

    assert_redirected_to deptgroup_path(assigns(:deptgroup))
  end

  test "should show deptgroup" do
    get :show, id: @deptgroup
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @deptgroup
    assert_response :success
  end

  test "should update deptgroup" do
    put :update, id: @deptgroup, deptgroup: { company_id: @deptgroup.company_id, department_id: @deptgroup.department_id, deptgroupcode: @deptgroup.deptgroupcode, description: @deptgroup.description, id: @deptgroup.id, isactive: @deptgroup.isactive, mypclient_id: @deptgroup.mypclient_id }
    assert_redirected_to deptgroup_path(assigns(:deptgroup))
  end

  test "should destroy deptgroup" do
    assert_difference('Deptgroup.count', -1) do
      delete :destroy, id: @deptgroup
    end

    assert_redirected_to deptgroups_path
  end
end

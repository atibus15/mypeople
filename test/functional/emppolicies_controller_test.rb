require 'test_helper'

class EmppoliciesControllerTest < ActionController::TestCase
  setup do
    @emppolicy = emppolicies(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:emppolicies)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create emppolicy" do
    assert_difference('Emppolicy.count') do
      post :create, emppolicy: { company_id: @emppolicy.company_id, createdby: @emppolicy.createdby, createddate: @emppolicy.createddate, empidno: @emppolicy.empidno, id: @emppolicy.id, lastupdateby: @emppolicy.lastupdateby, lastupdatedate: @emppolicy.lastupdatedate, mypclient_id: @emppolicy.mypclient_id, workskedpolicy_id: @emppolicy.workskedpolicy_id }
    end

    assert_redirected_to emppolicy_path(assigns(:emppolicy))
  end

  test "should show emppolicy" do
    get :show, id: @emppolicy
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @emppolicy
    assert_response :success
  end

  test "should update emppolicy" do
    put :update, id: @emppolicy, emppolicy: { company_id: @emppolicy.company_id, createdby: @emppolicy.createdby, createddate: @emppolicy.createddate, empidno: @emppolicy.empidno, id: @emppolicy.id, lastupdateby: @emppolicy.lastupdateby, lastupdatedate: @emppolicy.lastupdatedate, mypclient_id: @emppolicy.mypclient_id, workskedpolicy_id: @emppolicy.workskedpolicy_id }
    assert_redirected_to emppolicy_path(assigns(:emppolicy))
  end

  test "should destroy emppolicy" do
    assert_difference('Emppolicy.count', -1) do
      delete :destroy, id: @emppolicy
    end

    assert_redirected_to emppolicies_path
  end
end

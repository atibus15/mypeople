require 'test_helper'

class UseracctsControllerTest < ActionController::TestCase
  setup do
    @useracct = useraccts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:useraccts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create useracct" do
    assert_difference('Useracct.count') do
      post :create, useracct: { id: @useracct.id, isactive: @useracct.isactive, islocked: @useracct.islocked, mypclient_id: @useracct.mypclient_id, username: @useracct.username, userpasswd: @useracct.userpasswd }
    end

    assert_redirected_to useracct_path(assigns(:useracct))
  end

  test "should show useracct" do
    get :show, id: @useracct
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @useracct
    assert_response :success
  end

  test "should update useracct" do
    put :update, id: @useracct, useracct: { id: @useracct.id, isactive: @useracct.isactive, islocked: @useracct.islocked, mypclient_id: @useracct.mypclient_id, username: @useracct.username, userpasswd: @useracct.userpasswd }
    assert_redirected_to useracct_path(assigns(:useracct))
  end

  test "should destroy useracct" do
    assert_difference('Useracct.count', -1) do
      delete :destroy, id: @useracct
    end

    assert_redirected_to useraccts_path
  end
end

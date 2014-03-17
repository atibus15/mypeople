require 'test_helper'

class MypclientsControllerTest < ActionController::TestCase
  setup do
    @mypclient = mypclients(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mypclients)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create mypclient" do
    assert_difference('Mypclient.count') do
      post :create, mypclient: { description: @mypclient.description, id: @mypclient.id, isactive: @mypclient.isactive, seqno: @mypclient.seqno }
    end

    assert_redirected_to mypclient_path(assigns(:mypclient))
  end

  test "should show mypclient" do
    get :show, id: @mypclient
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @mypclient
    assert_response :success
  end

  test "should update mypclient" do
    put :update, id: @mypclient, mypclient: { description: @mypclient.description, id: @mypclient.id, isactive: @mypclient.isactive, seqno: @mypclient.seqno }
    assert_redirected_to mypclient_path(assigns(:mypclient))
  end

  test "should destroy mypclient" do
    assert_difference('Mypclient.count', -1) do
      delete :destroy, id: @mypclient
    end

    assert_redirected_to mypclients_path
  end
end

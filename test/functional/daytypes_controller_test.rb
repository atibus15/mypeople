require 'test_helper'

class DaytypesControllerTest < ActionController::TestCase
  setup do
    @daytype = daytypes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:daytypes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create daytype" do
    assert_difference('Daytype.count') do
      post :create, daytype: { company_id: @daytype.company_id, createby: @daytype.createby, createddate: @daytype.createddate, daytypecode: @daytype.daytypecode, description: @daytype.description, id: @daytype.id, isactive: @daytype.isactive, isholday: @daytype.isholday, isrestday: @daytype.isrestday, lastupdateby: @daytype.lastupdateby, lastupdatedate: @daytype.lastupdatedate, mypclient_id: @daytype.mypclient_id, seqno: @daytype.seqno }
    end

    assert_redirected_to daytype_path(assigns(:daytype))
  end

  test "should show daytype" do
    get :show, id: @daytype
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @daytype
    assert_response :success
  end

  test "should update daytype" do
    put :update, id: @daytype, daytype: { company_id: @daytype.company_id, createby: @daytype.createby, createddate: @daytype.createddate, daytypecode: @daytype.daytypecode, description: @daytype.description, id: @daytype.id, isactive: @daytype.isactive, isholday: @daytype.isholday, isrestday: @daytype.isrestday, lastupdateby: @daytype.lastupdateby, lastupdatedate: @daytype.lastupdatedate, mypclient_id: @daytype.mypclient_id, seqno: @daytype.seqno }
    assert_redirected_to daytype_path(assigns(:daytype))
  end

  test "should destroy daytype" do
    assert_difference('Daytype.count', -1) do
      delete :destroy, id: @daytype
    end

    assert_redirected_to daytypes_path
  end
end

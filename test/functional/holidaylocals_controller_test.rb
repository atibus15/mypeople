require 'test_helper'

class HolidaylocalsControllerTest < ActionController::TestCase
  setup do
    @holidaylocal = holidaylocals(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:holidaylocals)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create holidaylocal" do
    assert_difference('Holidaylocal.count') do
      post :create, holidaylocal: { company_id: @holidaylocal.company_id, createdby: @holidaylocal.createdby, createddate: @holidaylocal.createddate, holiday_id: @holidaylocal.holiday_id, id: @holidaylocal.id, lastupdateby: @holidaylocal.lastupdateby, lastupdatedate: @holidaylocal.lastupdatedate, mypclient_id: @holidaylocal.mypclient_id }
    end

    assert_redirected_to holidaylocal_path(assigns(:holidaylocal))
  end

  test "should show holidaylocal" do
    get :show, id: @holidaylocal
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @holidaylocal
    assert_response :success
  end

  test "should update holidaylocal" do
    put :update, id: @holidaylocal, holidaylocal: { company_id: @holidaylocal.company_id, createdby: @holidaylocal.createdby, createddate: @holidaylocal.createddate, holiday_id: @holidaylocal.holiday_id, id: @holidaylocal.id, lastupdateby: @holidaylocal.lastupdateby, lastupdatedate: @holidaylocal.lastupdatedate, mypclient_id: @holidaylocal.mypclient_id }
    assert_redirected_to holidaylocal_path(assigns(:holidaylocal))
  end

  test "should destroy holidaylocal" do
    assert_difference('Holidaylocal.count', -1) do
      delete :destroy, id: @holidaylocal
    end

    assert_redirected_to holidaylocals_path
  end
end

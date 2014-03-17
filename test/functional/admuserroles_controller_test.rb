require 'test_helper'

class AdmuserrolesControllerTest < ActionController::TestCase
  setup do
    @admuserrole = admuserroles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admuserroles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admuserrole" do
    assert_difference('Admuserrole.count') do
      post :create, admuserrole: { description: @admuserrole.description, id: @admuserrole.id, isactive: @admuserrole.isactive, isadmin: @admuserrole.isadmin, mypclient_id: @admuserrole.mypclient_id, rolecode: @admuserrole.rolecode, seqno: @admuserrole.seqno }
    end

    assert_redirected_to admuserrole_path(assigns(:admuserrole))
  end

  test "should show admuserrole" do
    get :show, id: @admuserrole
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admuserrole
    assert_response :success
  end

  test "should update admuserrole" do
    put :update, id: @admuserrole, admuserrole: { description: @admuserrole.description, id: @admuserrole.id, isactive: @admuserrole.isactive, isadmin: @admuserrole.isadmin, mypclient_id: @admuserrole.mypclient_id, rolecode: @admuserrole.rolecode, seqno: @admuserrole.seqno }
    assert_redirected_to admuserrole_path(assigns(:admuserrole))
  end

  test "should destroy admuserrole" do
    assert_difference('Admuserrole.count', -1) do
      delete :destroy, id: @admuserrole
    end

    assert_redirected_to admuserroles_path
  end
end

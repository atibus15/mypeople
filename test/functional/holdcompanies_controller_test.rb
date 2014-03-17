require 'test_helper'

class HoldcompaniesControllerTest < ActionController::TestCase
  setup do
    @holdcompany = holdcompanies(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:holdcompanies)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create holdcompany" do
    assert_difference('Holdcompany.count') do
      post :create, holdcompany: { description: @holdcompany.description, holdcompanycode: @holdcompany.holdcompanycode, id: @holdcompany.id, isactive: @holdcompany.isactive, mypclient_id: @holdcompany.mypclient_id }
    end

    assert_redirected_to holdcompany_path(assigns(:holdcompany))
  end

  test "should show holdcompany" do
    get :show, id: @holdcompany
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @holdcompany
    assert_response :success
  end

  test "should update holdcompany" do
    put :update, id: @holdcompany, holdcompany: { description: @holdcompany.description, holdcompanycode: @holdcompany.holdcompanycode, id: @holdcompany.id, isactive: @holdcompany.isactive, mypclient_id: @holdcompany.mypclient_id }
    assert_redirected_to holdcompany_path(assigns(:holdcompany))
  end

  test "should destroy holdcompany" do
    assert_difference('Holdcompany.count', -1) do
      delete :destroy, id: @holdcompany
    end

    assert_redirected_to holdcompanies_path
  end
end

require 'test_helper'

class EmpskedsControllerTest < ActionController::TestCase
  setup do
    @empsked = empskeds(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:empskeds)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create empsked" do
    assert_difference('Empsked.count') do
      post :create, empsked: { company_id: @empsked.company_id, createdby: @empsked.createdby, createddate: @empsked.createddate, empidno: @empsked.empidno, id: @empsked.id, lastupdateby: @empsked.lastupdateby, lastupdatedate: @empsked.lastupdatedate, mypclient_id: @empsked.mypclient_id, worksked_id: @empsked.worksked_id }
    end

    assert_redirected_to empsked_path(assigns(:empsked))
  end

  test "should show empsked" do
    get :show, id: @empsked
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @empsked
    assert_response :success
  end

  test "should update empsked" do
    put :update, id: @empsked, empsked: { company_id: @empsked.company_id, createdby: @empsked.createdby, createddate: @empsked.createddate, empidno: @empsked.empidno, id: @empsked.id, lastupdateby: @empsked.lastupdateby, lastupdatedate: @empsked.lastupdatedate, mypclient_id: @empsked.mypclient_id, worksked_id: @empsked.worksked_id }
    assert_redirected_to empsked_path(assigns(:empsked))
  end

  test "should destroy empsked" do
    assert_difference('Empsked.count', -1) do
      delete :destroy, id: @empsked
    end

    assert_redirected_to empskeds_path
  end
end

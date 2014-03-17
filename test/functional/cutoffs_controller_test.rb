require 'test_helper'

class CutoffsControllerTest < ActionController::TestCase
  setup do
    @cutoff = cutoffs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cutoffs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cutoff" do
    assert_difference('Cutoff.count') do
      post :create, cutoff: { company_id: @cutoff.company_id, createdby: @cutoff.createdby, createddate: @cutoff.createddate, cutoffcode: @cutoff.cutoffcode, datefr: @cutoff.datefr, dateto: @cutoff.dateto, description: @cutoff.description, id: @cutoff.id, lastupdateby: @cutoff.lastupdateby, lastupdatedate: @cutoff.lastupdatedate, mypclient_id: @cutoff.mypclient_id }
    end

    assert_redirected_to cutoff_path(assigns(:cutoff))
  end

  test "should show cutoff" do
    get :show, id: @cutoff
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cutoff
    assert_response :success
  end

  test "should update cutoff" do
    put :update, id: @cutoff, cutoff: { company_id: @cutoff.company_id, createdby: @cutoff.createdby, createddate: @cutoff.createddate, cutoffcode: @cutoff.cutoffcode, datefr: @cutoff.datefr, dateto: @cutoff.dateto, description: @cutoff.description, id: @cutoff.id, lastupdateby: @cutoff.lastupdateby, lastupdatedate: @cutoff.lastupdatedate, mypclient_id: @cutoff.mypclient_id }
    assert_redirected_to cutoff_path(assigns(:cutoff))
  end

  test "should destroy cutoff" do
    assert_difference('Cutoff.count', -1) do
      delete :destroy, id: @cutoff
    end

    assert_redirected_to cutoffs_path
  end
end

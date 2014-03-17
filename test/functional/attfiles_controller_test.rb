require 'test_helper'

class AttfilesControllerTest < ActionController::TestCase
  setup do
    @attfile = attfiles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:attfiles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create attfile" do
    assert_difference('Attfile.count') do
      post :create, attfile: { attfilecode: @attfile.attfilecode, company_id: @attfile.company_id, createdby: @attfile.createdby, createddate: @attfile.createddate, cutoff_id: @attfile.cutoff_id, description: @attfile.description, efilesapprovalcutoff: @attfile.efilesapprovalcutoff, id: @attfile.id, isposted: @attfile.isposted, lastupdateby: @attfile.lastupdateby, lastupdatedate: @attfile.lastupdatedate, mypclient_id: @attfile.mypclient_id }
    end

    assert_redirected_to attfile_path(assigns(:attfile))
  end

  test "should show attfile" do
    get :show, id: @attfile
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @attfile
    assert_response :success
  end

  test "should update attfile" do
    put :update, id: @attfile, attfile: { attfilecode: @attfile.attfilecode, company_id: @attfile.company_id, createdby: @attfile.createdby, createddate: @attfile.createddate, cutoff_id: @attfile.cutoff_id, description: @attfile.description, efilesapprovalcutoff: @attfile.efilesapprovalcutoff, id: @attfile.id, isposted: @attfile.isposted, lastupdateby: @attfile.lastupdateby, lastupdatedate: @attfile.lastupdatedate, mypclient_id: @attfile.mypclient_id }
    assert_redirected_to attfile_path(assigns(:attfile))
  end

  test "should destroy attfile" do
    assert_difference('Attfile.count', -1) do
      delete :destroy, id: @attfile
    end

    assert_redirected_to attfiles_path
  end
end

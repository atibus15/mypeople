require 'test_helper'

class WorkskedpatternsControllerTest < ActionController::TestCase
  setup do
    @workskedpattern = workskedpatterns(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:workskedpatterns)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create workskedpattern" do
    assert_difference('Workskedpattern.count') do
      post :create, workskedpattern: { break1fr: @workskedpattern.break1fr, break1hrs: @workskedpattern.break1hrs, break1to: @workskedpattern.break1to, break2fr: @workskedpattern.break2fr, break2hrs: @workskedpattern.break2hrs, break2to: @workskedpattern.break2to, break3fr: @workskedpattern.break3fr, break3hrs: @workskedpattern.break3hrs, break3to: @workskedpattern.break3to, break4fr: @workskedpattern.break4fr, break4hrs: @workskedpattern.break4hrs, break4to: @workskedpattern.break4to, break5fr: @workskedpattern.break5fr, break5hrs: @workskedpattern.break5hrs, break5to: @workskedpattern.break5to, company_id: @workskedpattern.company_id, createdby: @workskedpattern.createdby, createddate: @workskedpattern.createddate, description: @workskedpattern.description, flexiearliestin: @workskedpattern.flexiearliestin, flexilatestin: @workskedpattern.flexilatestin, hrswkam: @workskedpattern.hrswkam, hrswkpm: @workskedpattern.hrswkpm, id: @workskedpattern.id, lastupdateby: @workskedpattern.lastupdateby, lastupdatedate: @workskedpattern.lastupdatedate, mypclient_id: @workskedpattern.mypclient_id, patterncode: @workskedpattern.patterncode, requiredhrs: @workskedpattern.requiredhrs, timein: @workskedpattern.timein, timeout: @workskedpattern.timeout, workskedcategory_id: @workskedpattern.workskedcategory_id }
    end

    assert_redirected_to workskedpattern_path(assigns(:workskedpattern))
  end

  test "should show workskedpattern" do
    get :show, id: @workskedpattern
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @workskedpattern
    assert_response :success
  end

  test "should update workskedpattern" do
    put :update, id: @workskedpattern, workskedpattern: { break1fr: @workskedpattern.break1fr, break1hrs: @workskedpattern.break1hrs, break1to: @workskedpattern.break1to, break2fr: @workskedpattern.break2fr, break2hrs: @workskedpattern.break2hrs, break2to: @workskedpattern.break2to, break3fr: @workskedpattern.break3fr, break3hrs: @workskedpattern.break3hrs, break3to: @workskedpattern.break3to, break4fr: @workskedpattern.break4fr, break4hrs: @workskedpattern.break4hrs, break4to: @workskedpattern.break4to, break5fr: @workskedpattern.break5fr, break5hrs: @workskedpattern.break5hrs, break5to: @workskedpattern.break5to, company_id: @workskedpattern.company_id, createdby: @workskedpattern.createdby, createddate: @workskedpattern.createddate, description: @workskedpattern.description, flexiearliestin: @workskedpattern.flexiearliestin, flexilatestin: @workskedpattern.flexilatestin, hrswkam: @workskedpattern.hrswkam, hrswkpm: @workskedpattern.hrswkpm, id: @workskedpattern.id, lastupdateby: @workskedpattern.lastupdateby, lastupdatedate: @workskedpattern.lastupdatedate, mypclient_id: @workskedpattern.mypclient_id, patterncode: @workskedpattern.patterncode, requiredhrs: @workskedpattern.requiredhrs, timein: @workskedpattern.timein, timeout: @workskedpattern.timeout, workskedcategory_id: @workskedpattern.workskedcategory_id }
    assert_redirected_to workskedpattern_path(assigns(:workskedpattern))
  end

  test "should destroy workskedpattern" do
    assert_difference('Workskedpattern.count', -1) do
      delete :destroy, id: @workskedpattern
    end

    assert_redirected_to workskedpatterns_path
  end
end

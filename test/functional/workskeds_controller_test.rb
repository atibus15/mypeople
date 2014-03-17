require 'test_helper'

class WorkskedsControllerTest < ActionController::TestCase
  setup do
    @worksked = workskeds(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:workskeds)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create worksked" do
    assert_difference('Worksked.count') do
      post :create, worksked: { break1fr: @worksked.break1fr, break1hrs: @worksked.break1hrs, break1to: @worksked.break1to, break2fr: @worksked.break2fr, break2hrs: @worksked.break2hrs, break2to: @worksked.break2to, break3fr: @worksked.break3fr, break3hrs: @worksked.break3hrs, break3to: @worksked.break3to, break4fr: @worksked.break4fr, break4hrs: @worksked.break4hrs, break4to: @worksked.break4to, break5fr: @worksked.break5fr, break5hrs: @worksked.break5hrs, break5to: @worksked.break5to, company_id: @worksked.company_id, createdby: @worksked.createdby, createddate: @worksked.createddate, description: @worksked.description, flexiearliestin: @worksked.flexiearliestin, flexilatestin: @worksked.flexilatestin, friday: @worksked.friday, hrswkam: @worksked.hrswkam, hrswkpm: @worksked.hrswkpm, id: @worksked.id, lastupdateby: @worksked.lastupdateby, lastupdatedate: @worksked.lastupdatedate, monday: @worksked.monday, mypclient_id: @worksked.mypclient_id, requiredannualhrs: @worksked.requiredannualhrs, requireddayhrs: @worksked.requireddayhrs, requiredmonhrs: @worksked.requiredmonhrs, requiredtimein: @worksked.requiredtimein, requiredtimeout: @worksked.requiredtimeout, requiredwkhrs: @worksked.requiredwkhrs, saturday: @worksked.saturday, sunday: @worksked.sunday, thursday: @worksked.thursday, tuesday: @worksked.tuesday, wednesday: @worksked.wednesday, workdayspermo: @worksked.workdayspermo, workdaysperwk: @worksked.workdaysperwk, workdaysperyr: @worksked.workdaysperyr, workmosperyr: @worksked.workmosperyr, workskedcategory_id: @worksked.workskedcategory_id, workskedcode: @worksked.workskedcode }
    end

    assert_redirected_to worksked_path(assigns(:worksked))
  end

  test "should show worksked" do
    get :show, id: @worksked
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @worksked
    assert_response :success
  end

  test "should update worksked" do
    put :update, id: @worksked, worksked: { break1fr: @worksked.break1fr, break1hrs: @worksked.break1hrs, break1to: @worksked.break1to, break2fr: @worksked.break2fr, break2hrs: @worksked.break2hrs, break2to: @worksked.break2to, break3fr: @worksked.break3fr, break3hrs: @worksked.break3hrs, break3to: @worksked.break3to, break4fr: @worksked.break4fr, break4hrs: @worksked.break4hrs, break4to: @worksked.break4to, break5fr: @worksked.break5fr, break5hrs: @worksked.break5hrs, break5to: @worksked.break5to, company_id: @worksked.company_id, createdby: @worksked.createdby, createddate: @worksked.createddate, description: @worksked.description, flexiearliestin: @worksked.flexiearliestin, flexilatestin: @worksked.flexilatestin, friday: @worksked.friday, hrswkam: @worksked.hrswkam, hrswkpm: @worksked.hrswkpm, id: @worksked.id, lastupdateby: @worksked.lastupdateby, lastupdatedate: @worksked.lastupdatedate, monday: @worksked.monday, mypclient_id: @worksked.mypclient_id, requiredannualhrs: @worksked.requiredannualhrs, requireddayhrs: @worksked.requireddayhrs, requiredmonhrs: @worksked.requiredmonhrs, requiredtimein: @worksked.requiredtimein, requiredtimeout: @worksked.requiredtimeout, requiredwkhrs: @worksked.requiredwkhrs, saturday: @worksked.saturday, sunday: @worksked.sunday, thursday: @worksked.thursday, tuesday: @worksked.tuesday, wednesday: @worksked.wednesday, workdayspermo: @worksked.workdayspermo, workdaysperwk: @worksked.workdaysperwk, workdaysperyr: @worksked.workdaysperyr, workmosperyr: @worksked.workmosperyr, workskedcategory_id: @worksked.workskedcategory_id, workskedcode: @worksked.workskedcode }
    assert_redirected_to worksked_path(assigns(:worksked))
  end

  test "should destroy worksked" do
    assert_difference('Worksked.count', -1) do
      delete :destroy, id: @worksked
    end

    assert_redirected_to workskeds_path
  end
end

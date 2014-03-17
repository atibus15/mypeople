require 'test_helper'

class TimezonesControllerTest < ActionController::TestCase
  setup do
    @timezone = timezones(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:timezones)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create timezone" do
    assert_difference('Timezone.count') do
      post :create, timezone: { code: @timezone.code, createdby: @timezone.createdby, createddate: @timezone.createddate, description: @timezone.description, id: @timezone.id, lastupdateby: @timezone.lastupdateby, lastupdatedate: @timezone.lastupdatedate }
    end

    assert_redirected_to timezone_path(assigns(:timezone))
  end

  test "should show timezone" do
    get :show, id: @timezone
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @timezone
    assert_response :success
  end

  test "should update timezone" do
    put :update, id: @timezone, timezone: { code: @timezone.code, createdby: @timezone.createdby, createddate: @timezone.createddate, description: @timezone.description, id: @timezone.id, lastupdateby: @timezone.lastupdateby, lastupdatedate: @timezone.lastupdatedate }
    assert_redirected_to timezone_path(assigns(:timezone))
  end

  test "should destroy timezone" do
    assert_difference('Timezone.count', -1) do
      delete :destroy, id: @timezone
    end

    assert_redirected_to timezones_path
  end
end

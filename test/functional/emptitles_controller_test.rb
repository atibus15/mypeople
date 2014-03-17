require 'test_helper'

class EmptitlesControllerTest < ActionController::TestCase
  setup do
    @emptitle = emptitles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:emptitles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create emptitle" do
    assert_difference('Emptitle.count') do
      post :create, emptitle: {  }
    end

    assert_redirected_to emptitle_path(assigns(:emptitle))
  end

  test "should show emptitle" do
    get :show, id: @emptitle
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @emptitle
    assert_response :success
  end

  test "should update emptitle" do
    put :update, id: @emptitle, emptitle: {  }
    assert_redirected_to emptitle_path(assigns(:emptitle))
  end

  test "should destroy emptitle" do
    assert_difference('Emptitle.count', -1) do
      delete :destroy, id: @emptitle
    end

    assert_redirected_to emptitles_path
  end
end

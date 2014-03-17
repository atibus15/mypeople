require 'test_helper'

class EmployeesControllerTest < ActionController::TestCase
  setup do
    @employee = employees(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:employees)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create employee" do
    assert_difference('Employee.count') do
      post :create, employee: { busgroupcode: @employee.busgroupcode, clientcode: @employee.clientcode, companycode: @employee.companycode, datehired: @employee.datehired, departmentcode: @employee.departmentcode, deptgroupcode: @employee.deptgroupcode, empbadgeno: @employee.empbadgeno, empidno: @employee.empidno, empnamealias: @employee.empnamealias, empnamefirst: @employee.empnamefirst, empnamelast: @employee.empnamelast, empnamemiddle: @employee.empnamemiddle, empnametitlecode: @employee.empnametitlecode, empno: @employee.empno, holdcompanycode: @employee.holdcompanycode, isactivestatus: @employee.isactivestatus, positioncode: @employee.positioncode }
    end

    assert_redirected_to employee_path(assigns(:employee))
  end

  test "should show employee" do
    get :show, id: @employee
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @employee
    assert_response :success
  end

  test "should update employee" do
    put :update, id: @employee, employee: { busgroupcode: @employee.busgroupcode, clientcode: @employee.clientcode, companycode: @employee.companycode, datehired: @employee.datehired, departmentcode: @employee.departmentcode, deptgroupcode: @employee.deptgroupcode, empbadgeno: @employee.empbadgeno, empidno: @employee.empidno, empnamealias: @employee.empnamealias, empnamefirst: @employee.empnamefirst, empnamelast: @employee.empnamelast, empnamemiddle: @employee.empnamemiddle, empnametitlecode: @employee.empnametitlecode, empno: @employee.empno, holdcompanycode: @employee.holdcompanycode, isactivestatus: @employee.isactivestatus, positioncode: @employee.positioncode }
    assert_redirected_to employee_path(assigns(:employee))
  end

  test "should destroy employee" do
    assert_difference('Employee.count', -1) do
      delete :destroy, id: @employee
    end

    assert_redirected_to employees_path
  end
end

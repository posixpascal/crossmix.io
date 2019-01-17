require 'test_helper'

class SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get search_new_url
    assert_response :success
  end

  test "should get show" do
    get search_show_url
    assert_response :success
  end

end

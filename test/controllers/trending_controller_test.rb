require 'test_helper'

class TrendingControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get trending_index_url
    assert_response :success
  end

end

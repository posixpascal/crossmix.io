module BasedOnRange
  extend ActiveSupport::Concern

  included do
    scope :current_month, ->(table = table_name) {
      where("#{table}.created_at >= ? and #{table}.created_at <= ?", Date.current.beginning_of_month, Date.current.end_of_month)
    }

    scope :current_day, ->(table = table_name) {
      where("#{table}.created_at >= ? and #{table}.created_at <= ?", Date.current.beginning_of_day, Date.current.end_of_day)
    }

    scope :previous_month, ->(table = table_name) {
      where("#{table}.created_at >= ? and #{table}.created_at <= ?", (Date.current - 1.month).beginning_of_month, (Date.current - 1.month).end_of_month)
    }

    scope :range, ->(start_date, end_date, table = table_name){
      where("#{table}.created_at >= ? and #{table}.created_at <= ?", start_date, end_date)
    }
  end
end

class MixView < ApplicationRecord
  include BasedOnRange
  belongs_to :mix, counter_cache: true
end

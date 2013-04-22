class Bookmark < ActiveRecord::Base
  belongs_to :user
  attr_accessible :descr, :header, :icon, :tags, :user, :timestamps
end

class Bookmark < ActiveRecord::Base
  belongs_to :user
  attr_accessible :descr, :link, :header, :icon, :tags, :user, :timestamps
  validates_presence_of :user
end

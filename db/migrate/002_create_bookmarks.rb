class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.string :header
      t.string :link
      t.text :descr
      t.string :icon
      t.references :user
      t.text :tags

      t.timestamps
    end
    add_index :bookmarks, :user_id
  end
end

class CreateMySessions < ActiveRecord::Migration
  def change
    create_table :my_sessions do |t|

      t.timestamps
    end
  end
end

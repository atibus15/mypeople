class CreateEmpphotos < ActiveRecord::Migration
  def change
    create_table :empphotos do |t|
      t.integer :id
      t.integer :employee_id
      t.string :photodata
      t.timestamp :createddate
      t.string :createdby
      t.timestamp :lasupdatedate
      t.string :lastupdateby

      t.timestamps
    end
  end
end

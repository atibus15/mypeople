class CreateEmpdtrs < ActiveRecord::Migration
  def change
    create_table :empdtrs do |t|
      t.integer :id
      t.string :mypclient_id
      t.string :empidno
      t.date :dtrdatein
      t.time :dtrtimein
      t.time :dtrtimeout
      t.date :dtrdateout
      t.timestamp :createddate
      t.string :createdby
      t.timestamp :lastupdatedate
      t.string :lastupdateby

      t.timestamps
    end
  end
end

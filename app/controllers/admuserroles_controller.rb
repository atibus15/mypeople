class AdmuserrolesController < ApplicationController
  # GET /admuserroles
  # GET /admuserroles.json
  def index
    @admuserroles = Admuserrole.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @admuserroles }
    end
  end

  # GET /admuserroles/1
  # GET /admuserroles/1.json
  def show
    @admuserrole = Admuserrole.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @admuserrole }
    end
  end

  # GET /admuserroles/new
  # GET /admuserroles/new.json
  def new
    @admuserrole = Admuserrole.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @admuserrole }
    end
  end

  # GET /admuserroles/1/edit
  def edit
    @admuserrole = Admuserrole.find(params[:id])
  end

  # POST /admuserroles
  # POST /admuserroles.json
  def create
    @admuserrole = Admuserrole.new(params[:admuserrole])

    respond_to do |format|
      if @admuserrole.save
        format.html { redirect_to @admuserrole, notice: 'Admuserrole was successfully created.' }
        format.json { render json: @admuserrole, status: :created, location: @admuserrole }
      else
        format.html { render action: "new" }
        format.json { render json: @admuserrole.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /admuserroles/1
  # PUT /admuserroles/1.json
  def update
    @admuserrole = Admuserrole.find(params[:id])

    respond_to do |format|
      if @admuserrole.update_attributes(params[:admuserrole])
        format.html { redirect_to @admuserrole, notice: 'Admuserrole was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @admuserrole.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admuserroles/1
  # DELETE /admuserroles/1.json
  def destroy
    @admuserrole = Admuserrole.find(params[:id])
    @admuserrole.destroy

    respond_to do |format|
      format.html { redirect_to admuserroles_url }
      format.json { head :no_content }
    end
  end
end

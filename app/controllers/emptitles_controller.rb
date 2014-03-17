class EmptitlesController < ApplicationController
  # GET /emptitles
  # GET /emptitles.json
  before_filter :init_request

  

  public
  def init_request
    @@request_result = {}
    @@request_result[:success] = false
  end

  def index
    begin
      @clean_titles = []

      @emptitles = Emptitle.select('id as code, description as desc').order('seqno')
      
      title_i = 0
      @emptitles.each do |title|
        @clean_titles[title_i] = {}
        @clean_titles[title_i][:code] = title[:code].strip
        @clean_titles[title_i][:desc] = title[:desc].strip
        title_i += 1
      end

      @@request_result[:success] = true
      @@request_result[:data] = @clean_titles
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end

    respond_to do |format|
      # format.html # index.html.erb
      format.json { render json: @@request_result }
    end
  end

  # GET /emptitles/1
  # GET /emptitles/1.json
  def show
    @emptitle = Emptitle.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @emptitle }
    end
  end

  # GET /emptitles/new
  # GET /emptitles/new.json
  def new
    @emptitle = Emptitle.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @emptitle }
    end
  end

  # GET /emptitles/1/edit
  def edit
    @emptitle = Emptitle.find(params[:id])
  end

  # POST /emptitles
  # POST /emptitles.json
  def create
    @emptitle = Emptitle.new(params[:emptitle])

    respond_to do |format|
      if @emptitle.save
        format.html { redirect_to @emptitle, notice: 'Emptitle was successfully created.' }
        format.json { render json: @emptitle, status: :created, location: @emptitle }
      else
        format.html { render action: "new" }
        format.json { render json: @emptitle.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /emptitles/1
  # PUT /emptitles/1.json
  def update
    @emptitle = Emptitle.find(params[:id])

    respond_to do |format|
      if @emptitle.update_attributes(params[:emptitle])
        format.html { redirect_to @emptitle, notice: 'Emptitle was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @emptitle.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /emptitles/1
  # DELETE /emptitles/1.json
  def destroy
    @emptitle = Emptitle.find(params[:id])
    @emptitle.destroy

    respond_to do |format|
      format.html { redirect_to emptitles_url }
      format.json { head :no_content }
    end
  end
end

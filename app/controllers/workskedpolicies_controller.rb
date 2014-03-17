
class WorkskedpoliciesController < ApplicationController


  # GET /workskedpolicies
  # GET /workskedpolicies.json
  def index
    @workskedpolicies = Workskedpolicy.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @workskedpolicies }
    end
  end

  # GET /workskedpolicies/1
  # GET /workskedpolicies/1.json
  def show
    @workskedpolicy = Workskedpolicy.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @workskedpolicy }
    end
  end

  # GET /workskedpolicies/new
  # GET /workskedpolicies/new.json
  def new
    @workskedpolicy = Workskedpolicy.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @workskedpolicy }
    end
  end

  # GET /workskedpolicies/1/edit
  def edit
    @workskedpolicy = Workskedpolicy.find(params[:id])
  end

  # GET /workskedpolicies/client_list
  def client_list
    begin
      @policies = Workskedpolicy.joins(:Company, :Mypclient)
                  .select('workskedpolicies.*, companies.description as company, mypclients.description as client')
                  .where(:mypclient_id => @@client_id)

      meta_data = MetaData.new
      @@request_result[:data] = @@stripper.activeRecordData(@policies)
      @@request_result[:metaData] = meta_data.create(@policies)
      @@request_result[:success] = true
      
    rescue Exception => e
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # POST /workskedpolicies
  # POST /workskedpolicies.json
  def create
    begin
      @new_policy = @@stripper.hashData(params[:policy])
      @new_policy[:mypclient_id] = @@client_id
      @new_policy[:isactive] = 1
      @new_policy[:createdby] = session[:username]

      @@request_result[:data] = @new_policy

      @policy = Workskedpolicy.new(@new_policy)
      if @policy.save
        @@request_result[:success] = true
        @@request_result[:notice] = 'Policy was successfully created.'
      else
        @@request_result[:errormsg] = @policy.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # PUT /workskedpolicies/1
  # PUT /workskedpolicies/1.json
  def update
    begin
      @updated_policy = @@stripper.hashData(params[:policy])
      @updated_policy[:lastupdateby] = session[:username]
      @updated_policy[:mypclient_id] = @@client_id
      @updated_policy[:isactive] = 1

      @not_updatable = ['id','mypclient_id','isactive', 'createdby','createddate']
      @bool_attributes = [
        'isactive', 'wr_withmealallow', 'wr_strictlatepolicy', 'wr_strictutpolicy', 'wr_strictlateut_applytondiff', 'wr_withgraceprd_timein',
        'wr_graceprd_deductfromlate', 'wr_withgraceprd_timeout', 'wr_graceprd_deductfromut', 'wr_loa_ignorelogs', 'wr_loa_prioritizeapp',
        'wr_oth_sethrswkcomplete', 'wr_oth_offsetlatetoexthrs', 'wo_bi_allowot', 'wo_bi_completestandardhrs', 'wo_bi_offsetuttoebot', 'wo_bi_withmealallow',
        'wo_ao_allowot', 'wo_ao_completestandardhrs', 'wo_ao_offsetlatetoot', 'wo_ao_withmealallow', 'wo_mb_1stbrk_allowot', 'wo_mb_2ndbrk_allowot', 
        'wo_mb_3rdbrk_allowot', 'wo_mb_4thbrk_allowot', 'wo_mb_5thbrk_allowot', 'wb_with1stbrk', 'wb_strict1stbrk', 'wb_with2ndbrk', 'wb_strict2ndbrk',
        'wb_with3rdbrk', 'wb_strict3rdbrk', 'wb_with4thbrk', 'wb_strict4thbrk', 'wb_with5thbrk', 'wb_strict5thbrk', 'wn_duringregworkhr',
        'wn_onvalidotbti', 'wn_onvalidotato', 'ws_duringregworkhr', 'ws_onvalidotbti', 'ws_onvalidotato', 'wo_bi_withtransallow', 'wo_ao_withtransallow',
        'no_allowot', 'no_withmealallow', 'no_withtransallow', 'nb_with1stbrk', 'nb_1stbrk_fixed',
        'nb_1stbrk_range', 'nb_with2ndbrk', 'nb_2ndbrk_fixed', 'nb_2ndbrk_range', 'nb_with3rdbrk', 'nb_3rdbrk_fixed', 'nb_3rdbrk_range',
        'nb_with4thbrk', 'nb_4thbrk_fixed', 'nb_4thbrk_range', 'nb_with5thbrk', 'nb_5thbrk_fixed', 'nb_5thbrk_range',
        'nn_computendiff', 'ns_computesdiff', 'com_payhollg', 'com_requireattbefhollg', 'com_requireattafthollg', 'com_payholsp',
        'com_requireattbefholsp', 'com_requireattaftholsp', 'com_payholtype1', 'com_requireattbefholtype1', 'com_requireattaftholtype1',
        'com_payholtype2', 'com_requireattbefholtype2', 'com_requireattaftholtype2']

      @policy = Workskedpolicy.find(params[:id])
      @policy.attributes.each  do |attrb, value|
        if (!@not_updatable.include?(attrb))
          reset_val = @bool_attributes.include?(attrb) ? 0 : nil
          @updated_policy[attrb] = reset_val unless @updated_policy.has_key?(attrb)
        end
      end
      @@request_result[:data] = @updated_policy
      if @policy.update_attributes(@updated_policy)
        @@request_result[:success] = true
        @@request_result[:notice] = 'Policy was successfully updated.'
      else
        @@request_result[:errormsg] = @policy.errors.full_messages[0]
      end
    rescue Exception => e 
      @@request_result[:errormsg] = e.message
    end
    render json: @@request_result
  end

  # DELETE /workskedpolicies/1
  # DELETE /workskedpolicies/1.json
  def destroy
    @workskedpolicy = Workskedpolicy.find(params[:id])
    @workskedpolicy.destroy

    respond_to do |format|
      format.html { redirect_to workskedpolicies_url }
      format.json { head :no_content }
    end
  end
end

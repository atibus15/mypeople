class Workskedpolicy < ActiveRecord::Base
  attr_accessible :com_mealallowcode, :com_payhollg, :com_payholsp, :com_payholtype1, :com_payholtype2, :com_requireattafthollg, 
  :com_requireattaftholsp, :com_requireattaftholtype1, :com_requireattaftholtype2, :com_requireattbefhollg, :com_requireattbefholsp, 
  :com_requireattbefholtype1, :com_requireattbefholtype2, :com_transallowcode, 
  :company_id, :createdby, :createddate, :description, :id, :isactive, :lastupdateby, :lastupdatedate, :mypclient_id, 
  :nb_1stbrk_endtime, :nb_1stbrk_fixed, :nb_1stbrk_fixmins, :nb_1stbrk_range, :nb_1stbrk_starttime, 
  :nb_2ndbrk_endtime, :nb_2ndbrk_fixed, :nb_2ndbrk_fixmins, :nb_2ndbrk_range, :nb_2ndbrk_starttime, 
  :nb_3rdbrk_endtime, :nb_3rdbrk_fixed, :nb_3rdbrk_fixmins, :nb_3rdbrk_range, :nb_3rdbrk_starttime, 
  :nb_4thbrk_endtime, :nb_4thbrk_fixed, :nb_4thbrk_fixmins, :nb_4thbrk_range, :nb_4thbrk_starttime, 
  :nb_5thbrk_endtime, :nb_5thbrk_fixed, :nb_5thbrk_fixmins, :nb_5thbrk_range, :nb_5thbrk_starttime, 
  :nb_with1stbrk, :nb_with2ndbrk, :nb_with3rdbrk, :nb_with4thbrk, :nb_with5thbrk, :nn_computendiff, 
  :nn_ndiff_endtime, :nn_ndiff_starttime, :no_allowot, :no_minotmins, 
  :no_withmealallow, 
  :no_withmealallow_beyondamt, :no_withmealallow_beyondmins, 
  :no_withmealallow_firstamt, :no_withmealallow_firstmins, 
  :no_withmealallow_succamt, :no_withmealallow_succmins, 
  :no_withtransallow, 
  :no_withtransallow_beyondamt, :no_withtransallow_beyondmins, 
  :no_withtransallow_firstamt, :no_withtransallow_firstmins, 
  :no_withtransallow_succamt, :no_withtransallow_succmins, 
  :ns_computesdiff, :ns_sdiff_endtime, :ns_sdiff_starttime, 
  :policycode, 
  :wb_strict1stbrk, :wb_strict1stbrk_endtime, :wb_strict1stbrk_starttime, 
  :wb_strict2ndbrk, :wb_strict2ndbrk_endtime, :wb_strict2ndbrk_starttime, 
  :wb_strict3rdbrk, :wb_strict3rdbrk_endtime, :wb_strict3rdbrk_starttime, 
  :wb_strict4thbrk, :wb_strict4thbrk_endtime, :wb_strict4thbrk_starttime, 
  :wb_strict5thbrk, :wb_strict5thbrk_endtime, :wb_strict5thbrk_starttime, 
  :wb_with1stbrk, :wb_with2ndbrk, :wb_with3rdbrk, :wb_with4thbrk, :wb_with5thbrk, 
  :wn_duringregworkhr, :wn_duringregworkhr_endtime, :wn_duringregworkhr_starttime, 
  :wn_onvalidotato, :wn_onvalidotato_endtime, :wn_onvalidotato_starttime, 
  :wn_onvalidotbti, :wn_onvalidotbti_endtime, :wn_onvalidotbti_starttime, 
  :wo_ao_allowot, :wo_ao_completestandardhrs, :wo_ao_earliesttime, :wo_ao_minotmins, :wo_ao_offsetlatetoot, 
  :wo_ao_withmealallow, 
  :wo_ao_withmealallow_beyondamt, :wo_ao_withmealallow_beyondmins, 
  :wo_ao_withmealallow_firstamt, :wo_ao_withmealallow_firstmins, 
  :wo_ao_withmealallow_succamt, :wo_ao_withmealallow_succmins, 
  :wo_ao_withtransallow, 
  :wo_ao_withtransallow_beyondamt, :wo_ao_withtransallow_beyondmins, 
  :wo_ao_withtransallow_firstamt, :wo_ao_withtransallow_firstmins, 
  :wo_ao_withtransallow_succamt, :wo_ao_withtransallow_succmins, 
  :wo_bi_allowot, :wo_bi_completestandardhrs, :wo_bi_minotmins, 
  :wo_bi_offsetuttoebot, 
  :wo_bi_withmealallow, 
  :wo_bi_withmealallow_beyondamt, :wo_bi_withmealallow_beyondmins, 
  :wo_bi_withmealallow_firstamt, :wo_bi_withmealallow_firstmins, 
  :wo_bi_withmealallow_succamt, :wo_bi_withmealallow_succmins, 
  :wo_bi_withtransallow, 
  :wo_bi_withtransallow_beyondamt, :wo_bi_withtransallow_beyondmins, 
  :wo_bi_withtransallow_firstamt, :wo_bi_withtransallow_firstmins, 
  :wo_bi_withtransallow_succamt, :wo_bi_withtransallow_succmins, 
  :wo_mb_1stbrk_allowot, :wo_mb_1stbrk_minotmins, 
  :wo_mb_2ndbrk_allowot, :wo_mb_2ndbrk_minotmins, 
  :wo_mb_3rdbrk_allowot, :wo_mb_3rdbrk_minotmins, 
  :wo_mb_4thbrk_allowot, :wo_mb_4thbrk_minotmins, 
  :wo_mb_5thbrk_allowot, :wo_mb_5thbrk_minotmins, 

  :wr_graceprd_deductfromlate, 
  :wr_graceprd_deductfromut, 
  :wr_loa_ignorelogs, 
  :wr_loa_minchargemins, 
  :wr_loa_prioritizeapp, 
  :wr_oth_offsetlatetoexthrs, 
  :wr_oth_sethrswkcomplete, 
  :wr_strictlatepolicy, 
  :wr_strictlatepolicy_abmins, 
  :wr_strictlatepolicy_hdmins, 
  :wr_strictlateut_applytondiff, 
  :wr_strictutpolicy, 
  :wr_strictutpolicy_abmins, 
  :wr_strictutpolicy_hdmins, 
  :wr_withgraceprd_timein, 
  :wr_withgraceprd_timein_mins, :wr_withgraceprd_timeout, :wr_withgraceprd_timeout_mins, 
  :wr_withmealallow, 
  :wr_withmealallow_beyondamt, :wr_withmealallow_beyondmins, 
  :wr_withmealallow_firstamt, :wr_withmealallow_firstmins, 
  :wr_withmealallow_succamt, :wr_withmealallow_succmins, 
  :ws_duringregworkhr, :ws_duringregworkhr_endtime, :ws_duringregworkhr_starttime, 
  :ws_onvalidotato, :ws_onvalidotato_endtime, :ws_onvalidotato_starttime, 
  :ws_onvalidotbti, :ws_onvalidotbti_endtime, :ws_onvalidotbti_starttime


  self.primary_key = :id
  belongs_to :Mypclient, :foreign_key => :mypclient_id
  belongs_to :Company, :foreign_key => :company_id
  has_many :Empworkplans
  
  validates :mypclient_id, :company_id, :policycode,:description,:isactive,:wr_withmealallow,:wr_strictlatepolicy,:wr_strictutpolicy,:wr_strictlateut_applytondiff,
  :wr_withgraceprd_timein,:wr_graceprd_deductfromlate,:wr_withgraceprd_timeout,:wr_graceprd_deductfromut,:wr_loa_ignorelogs,:wr_loa_prioritizeapp,:wr_oth_sethrswkcomplete,
  :wr_oth_offsetlatetoexthrs,:wo_bi_allowot,:wo_bi_completestandardhrs,:wo_bi_offsetuttoebot,:wo_bi_withmealallow,:wo_ao_allowot,:wo_ao_completestandardhrs,
  :wo_ao_offsetlatetoot,:wo_ao_withmealallow,:wo_mb_1stbrk_allowot,:wo_mb_2ndbrk_allowot,:wo_mb_3rdbrk_allowot,:wo_mb_4thbrk_allowot,:wo_mb_5thbrk_allowot,
  :wb_with1stbrk,:wb_strict1stbrk,:wb_with2ndbrk,:wb_strict2ndbrk,:wb_with3rdbrk,:wb_strict3rdbrk,:wb_with4thbrk,:wb_strict4thbrk,:wb_with5thbrk,:wb_strict5thbrk,
  :wn_duringregworkhr,:wn_onvalidotbti,:wn_onvalidotato,:ws_duringregworkhr,:ws_onvalidotbti,:ws_onvalidotato,:wo_bi_withtransallow,:wo_ao_withtransallow,:no_allowot,
  :no_withmealallow, :no_withtransallow, :nb_with1stbrk, :nb_1stbrk_fixed, :nb_1stbrk_range, :nb_with2ndbrk, :nb_2ndbrk_fixed, :nb_2ndbrk_range, :nb_with3rdbrk, 
  :nb_3rdbrk_fixed, :nb_3rdbrk_range, :nb_with4thbrk, :nb_4thbrk_fixed, :nb_4thbrk_range, :nb_with5thbrk, :nb_5thbrk_fixed, :nb_5thbrk_range, :nn_computendiff, 
  :ns_computesdiff, :com_payhollg, :com_requireattbefhollg, :com_requireattafthollg, :com_payholsp, :com_requireattbefholsp, :com_requireattaftholsp, :com_payholtype1, 
  :com_requireattbefholtype1, :com_requireattaftholtype1, :com_payholtype2, :com_requireattbefholtype2, :com_requireattaftholtype2, 
  presence: {message: 'is required.'}

  validates :com_mealallowcode, :com_transallowcode, presence: {message: 'is required.'}, :if => :with_meal_allowance?

  validates_uniqueness_of :policycode, scope:[:mypclient_id, :company_id], message: 'is already exists.'

  def with_meal_allowance?
    no_withmealallow == "1" || wo_ao_withmealallow == "1" || wo_bi_withmealallow == "1" || wr_withmealallow == "1"
  end

  def wo_ao_earliesttime 
    self.convert_to_time self[:wo_ao_earliesttime] 
  end

  def wb_strict1stbrk_starttime
    self.convert_to_time self[:wb_strict1stbrk_starttime] 
  end

  def wb_strict1stbrk_endtime
    self.convert_to_time self[:wb_strict1stbrk_endtime] 
  end

  def wb_strict2ndbrk_starttime
    self.convert_to_time self[:wb_strict2ndbrk_starttime] 
  end

  def wb_strict2ndbrk_endtime
    self.convert_to_time self[:wb_strict2ndbrk_endtime]
  end

  def wb_strict3rdbrk_starttime
    self.convert_to_time self[:wb_strict3rdbrk_starttime] 
  end

  def wb_strict3rdbrk_endtime
    self.convert_to_time self[:wb_strict3rdbrk_endtime] 
  end

  def wb_strict4thbrk_starttime
    self.convert_to_time self[:wb_strict4thbrk_starttime] 
  end

  def wb_strict4thbrk_endtime
    self.convert_to_time self[:wb_strict4thbrk_endtime] 
  end

  def wb_strict5thbrk_starttime
    self.convert_to_time self[:wb_strict5thbrk_starttime] 
  end

  def wb_strict5thbrk_endtime
    self.convert_to_time self[:wb_strict5thbrk_endtime] 
  end

  def wn_duringregworkhr_starttime
    self.convert_to_time self[:wn_duringregworkhr_starttime] 
  end

  def wn_duringregworkhr_endtime
    self.convert_to_time self[:wn_duringregworkhr_endtime] 
  end

  def wn_onvalidotbti_starttime
    self.convert_to_time self[:wn_onvalidotbti_starttime] 
  end

  def wn_onvalidotbti_endtime
    self.convert_to_time self[:wn_onvalidotbti_endtime] 
  end

  def wn_onvalidotato_starttime
    self.convert_to_time self[:wn_onvalidotato_starttime] 
  end

  def wn_onvalidotato_endtime
    self.convert_to_time self[:wn_onvalidotato_endtime]
  end

  def ws_duringregworkhr_starttime
    self.convert_to_time self[:ws_duringregworkhr_starttime]
  end

  def ws_duringregworkhr_endtime
    self.convert_to_time self[:ws_duringregworkhr_endtime] 
  end

  def ws_onvalidotbti_starttime
    self.convert_to_time self[:ws_onvalidotbti_starttime]
  end

  def ws_onvalidotbti_endtime
    self.convert_to_time self[:ws_onvalidotbti_endtime]
  end

  def ws_onvalidotato_starttime
    self.convert_to_time self[:ws_onvalidotato_starttime]
  end

  def ws_onvalidotato_endtime
    self.convert_to_time self[:ws_onvalidotato_endtime]
  end

  def nb_1stbrk_starttime
    self.convert_to_time self[:nb_1stbrk_starttime]
  end

  def nb_1stbrk_endtime
    self.convert_to_time self[:nb_1stbrk_endtime]
  end

  def nb_2ndbrk_starttime
    self.convert_to_time self[:nb_2ndbrk_starttime]
  end

  def nb_2ndbrk_endtime
    self.convert_to_time self[:nb_2ndbrk_endtime]
  end

  def nb_3rdbrk_starttime
    self.convert_to_time self[:nb_3rdbrk_starttime]
  end

  def nb_3rdbrk_endtime
    self.convert_to_time self[:nb_3rdbrk_endtime]
  end

  def nb_4thbrk_starttime
    self.convert_to_time self[:nb_4thbrk_starttime]
  end

  def nb_4thbrk_endtime
    self.convert_to_time self[:nb_4thbrk_endtime]
  end

  def nb_5thbrk_starttime
    self.convert_to_time self[:nb_5thbrk_starttime]
  end

  def nb_5thbrk_endtime
    self.convert_to_time self[:nb_5thbrk_endtime]
  end

  def nn_ndiff_starttime
    self.convert_to_time self[:nn_ndiff_starttime]
  end

  def nn_ndiff_endtime
    self.convert_to_time self[:nn_ndiff_endtime]
  end

  def ns_sdiff_starttime
    self.convert_to_time self[:ns_sdiff_starttime]
  end

  def ns_sdiff_endtime
    self.convert_to_time self[:ns_sdiff_endtime]
  end

  def convert_to_time(dt)
    dt.strftime('%l:%M %p').to_s.strip unless dt.blank?
  end
  
end
<template>
  <div class="healthConsultation">
    <v-header></v-header>
    <p v-if='index==1'>
      <b>体检服务</b><br> &nbsp;&nbsp;&nbsp;&nbsp;用户成为快康公司会员后，公司将为会员联系对接体检中心，提供体检服务 并享受会员体检价格，同等体检项目降幅在 10%-50%之间，具体降幅根据当时情 况和市场动态情况而定。</p>
    <p v-if='index==2'>
      <b>电子档案</b><br> &nbsp;&nbsp;&nbsp;&nbsp;用户成为快康公司会员后，快康公司将为会员建立电子健康档案。</p>
    <p v-if='index==3'>
      <b>国内专家</b><br> &nbsp;&nbsp;&nbsp;&nbsp;如会员在服务有效期内经初步诊断罹患会员合同规定的重大疾病，可申请国 内专家二次会诊服务。会员可拨打快康公司客服电话，快康公司通知会员收集会 诊所需的资料，并根据会员的病情，推荐会诊专家供会员选择，最多提供 3 位。</p>
    <p v-if='index==4'>
      <b>基因测序</b><br> &nbsp;&nbsp;&nbsp;&nbsp;内容:无</p>
    <p v-if='index==5'>
      <b>国际医疗通道</b><br> &nbsp;&nbsp;&nbsp;&nbsp;(1). 如会员在服务有效期内经初步诊断罹患会员合同规定的重大疾病中的一 种或多种，会员可以拨打快康公司的客服电话，寻求国际医疗服务，快康公司的 客服人员将核对会员的信息，如在服务期内并且符合会员资格要求，快康公司将 收集会员的病历资料。</br>
      </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2). 如会员资格未通过审核，公司将告知会员暂时不享用此项服务。</br>
      </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3). 在收到完整资料后，通过和会员沟通确认后，安排会员海外就医。</br>
      </br> &nbsp;&nbsp;&nbsp;&nbsp;(4). 海外就医应不可享用国内医疗报销服务，全程服务均为自费。快康公司将 会提醒会员认识并理解该情况，并愿意承担及有能力承担由快康公司提供的海外 就医服务。</p>
    <p v-if='index==6'>
      <b>进口肿瘤医药指导</b><br> &nbsp;&nbsp;&nbsp;&nbsp;(1). 如会员在服务有效期内经初步诊断罹患会员合同规定的重大疾病中的恶 性肿瘤疾病，会员可拨打快康公司客服电话寻求肿瘤药品使用指导，快康公司的 客服人员将核对会员的信息，如通过审核，将由快康公司的签约医生或合作平台 提供专业的肿瘤药品使用指导。 </br>
      </br> &nbsp;&nbsp;&nbsp;&nbsp;(2). 会员如果通过公司审核初步罹患恶性肿瘤，公司将为会员提供进口抗肿瘤 药品，提供肿瘤药品价格均比医院提供价格略低，降幅在 10%—50%之间，具体 降幅根据当时治疗情况和市场动态情况而定。</p>
    <!-- <div class="sever" v-on:click="popupVisible4 = true">
            <i class="iconfont">&#xe63e;</i>申请服务</div>
        <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
            <div class="popbottom">
                <div class="input-list">
                    <label>姓名</label>
                    <input value="" placeholder="留下您的姓名" />
                </div>
                <div class="input-list">
                    <label>电话</label>
                    <input value="" placeholder="留下您的电话" />
                </div>
                <button class="button" style="background-color: #94ca52;color: white;font-size: 1.2rem;">申请服务</button>
            </div>
        </mt-popup> -->
  </div>
</template>
<script>
import vHeader from './../../common/Header.vue'
import { Cell, CellSwipe, Popup } from 'mint-ui'
export default {
  data() {
    return {
      popupVisible4: false,
      index: '0'
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    vHeader,
    CellSwipe,
    Cell,
    Popup
  },
  methods: {},
  mounted: function() {
    //加载完成后执行
    this.index = this.$route.query.index
  }
}
</script>
<style scoped="scoped">
.head-portrait {
  position: relative;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 3rem 1rem;
  background: #fff;
  font-size: 16px;
}
.portrait {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  float: right;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.healthConsultation {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 4rem;
  height: 100%;
  overflow-y: scroll;
  background: #fff;
}
.healthConsultation p {
  font-size: 1.2rem;
  line-height: 20px;
  /* text-indent: 2rem; */
  text-align: justify;
  box-sizing: border-box;
}
.healthConsultation .sever {
  position: fixed;
  right: 0.5rem;
  bottom: 1rem;
  padding: 0;
  text-align: center;
  background: #94ca52;
  width: 80px;
  height: 80px;
  color: #fff;
  border-radius: 50%;
  font-size: 1.2rem;
  box-shadow: 0 5px 10px #fff;
}
.healthConsultation .sever .iconfont {
  font-size: 2.5rem;
  display: block;
  margin-top: 10px;
}
.healthConsultation .popbottom,
.healthConsultation .mint-popup {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  text-align: center;
  box-sizing: border-box;
}
.healthConsultation .popbottom {
  padding: 2rem;
}
.healthConsultation .input-list {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}
.healthConsultation .input-list input {
  padding: 10px;
  margin-left: 1rem;
  border-radius: 5px;
  border: 1px solid #eee;
  font-size: 1.2rem;
}
</style>
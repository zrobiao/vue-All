<template>
	<div class="Servicedescription">
		<v-header></v-header>
		<h3>收费标准及服务内容</h3>
		<p class="digest">快康好陪护公司的护理人员分为五个星级，提供非卧床、卧床、特殊三个等级的陪护服务。陪护费用主要以病人的病情、生活自理能力作为收费标准，实行优质优价，提供差异化服务，满足不同患者的服务需求。
		</p>
		<table class="table">
			<tr>
				<td>非卧床</td>
				<td>卧床</td>
				<td>特殊</td>
			</tr>
			<tr>
				<td>200元</td>
				<td>200元</td>
				<td>基础价200、具体议价</td>
			</tr>
		</table>
		<p class="digest">陪护费主要以病人的病情，年龄，生活自理能力作为收费标准，实行优质优价。</p>
		<!-- <h3>服务详情说明</h3> -->
		<h3 class="textarea">
			</br>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<b>非卧床</b>（非卧床，病情较轻，生活部分不能自理）</br>
			&nbsp;&nbsp;&nbsp;&nbsp;1、协助病人洗脸、刷牙、梳头、擦身、泡脚、更换衣物、协助大小便、留取标本送检。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;2、做好病人餐具消毒工作，协助病人喝水、进餐（必要时喂饭)、协助饭后漱口、饭前便后洗手。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;3、根据医嘱协助病人吃药，及时准确，安排合理时间。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;4、整理床单、床头柜，做好病房清洁工作。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;5、医嘱及病情允许情况下，陪病人散步、聊天。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;6、每周一剃须、剪手脚指甲、遵医嘱洗头。</br>

			</br> &nbsp;&nbsp;&nbsp;&nbsp;
			<b>卧床</b>（卧床，生活不能自理，病情趋向稳定的重病患者)</br>
			&nbsp;&nbsp;&nbsp;&nbsp;1、协助病人洗脸、刷牙、梳头、擦身、泡脚、更换衣物、协助大小便、留取标本送检。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;2、做好病人餐具消毒工作，协助病人喝水、进餐（必要时喂饭)、协助饭后漱口、饭前便后洗手。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;3、根据医嘱协助病人吃药，及时准确，安排合理时间。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;4、整理床单、床头柜，做好病房清洁工作。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;5、保证患者安全，定时帮助翻身按摩受压皮肤，保证皮肤完整，无压疮发生。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;6、指导并协助患者进行相关的功能训练，避免常见并发症的发生，避免(压疮、便秘、瘢痕挛缩、深静脉血栓等)。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;7、了解病人睡眠情况，夜间动作轻柔，保持病室安静，调节光亮为病人创造良好的睡眠环境，根据情况增减盖被。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;8、每周一剃须、剪手脚指甲、遵医嘱洗头。</br>

			</br>&nbsp;&nbsp;&nbsp;&nbsp;
			<b>特殊</b>（卧床，生活严重不能自理，病情危重，随时可能发生病情变化的患者）</br>
			&nbsp;&nbsp;&nbsp;&nbsp;1、24小时连续贴身监护照顾病人，为病人洗脸、刷牙、梳头、擦身、泡脚、更换衣物、清除大小便、留取标本送检。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;2、做好病人餐具消毒工作，给病人喝水、进餐（必要时喂饭)、协助饭后漱口、饭前便后洗手。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;3、根据医嘱协助病人吃药，及时准确，安排合理时间。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;4、整理床单、床头柜，做好病房清洁工作。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;5、保证患者安全，定时帮助翻身按摩受压皮肤，保证皮肤完整，无压疮发生。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;6、指导并帮助患者进行相关的功能训练，避免常见并发症的发生，避免（压疮、便秘、瘢痕挛缩、深静脉血栓等）。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;7、根据医嘱准确测量病人的体温、呼吸、血压等生命体征、意识状态，及时发现问题并告知医务人员。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;8、了解病人睡眠情况，夜间动作轻柔，保持病室安静，调节光亮为病人创造良好的睡眠环境，根据情况增减盖被。</br>
			&nbsp;&nbsp;&nbsp;&nbsp;9、每周一剃须、剪手脚指甲、遵医嘱洗头。</br>
		</h3>
	</div>
</template>
<script>
import vHeader from './../common/Header.vue'
import { Cell } from 'mint-ui'
export default {
  data() {
    return {}
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    vHeader,
    Cell
  }
}
</script>
<style>
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
.Servicedescription {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  box-sizing: border-box;
}
.Servicedescription h3 {
  font-size: 1.3rem;
  text-align: center;
  padding: 1rem 0;
}
.Servicedescription .digest {
  text-indent: 2rem;
  line-height: 1.7rem;
}
.Servicedescription .table {
  width: 98%;
  border: 1px solid #eee;
  margin: 1rem auto;
}
.Servicedescription .table tr {
  border-bottom: 1px solid #eee;
}
.Servicedescription .table td {
  border-right: 1px solid #eee;
  text-align: center;
  padding: 1rem 0;
}
.Servicedescription .textarea {
  width: 98%;
  margin: 0 auto;
  height: 7rem;
  text-align: left;
}
</style>
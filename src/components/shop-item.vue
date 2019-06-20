<template>
	<div class="item">
	<div>
	<div class="item-img"><img :alt="item.name_title" :src="item.sku_info[itemindex].ali_image" style="opacity: 1;">
	</div>
	<h6>{{item.name}}</h6>
	<h3>{{item.name_title}}</h3>
	<div class="params-colors">
		<ul class="colors-list">
			<li v-for="(item,index) in item.sku_info">
				<a href="javascript:;" :title="item.spec_json.show_name" @click="tab(index)">
					<img :src="'http://img01.smartisanos.cn/'+item.spec_json.image+'20X20.jpg'">
				</a>
			</li>
		</ul>
	</div>
	<div class="item-btns clearfix">
		<span class="item-gray-btn"><router-link :to="{name:'Item',query:{itemId:item.sku_info[itemindex].sku_id}}">查看详情</router-link></span><span class="item-blue-btn" @click="addCarpanelData(item.sku_info[itemindex])">加入购物车 </span>
	</div>
	<div class="item-price clearfix">
		<i>¥</i><span>199.00</span>
	</div>
	<div class="discount-icon">false</div>
	<div class="item-cover">
		<router-link :to="{name:'Item',query:{itemId:item.sku_info[itemindex].sku_id}}"></router-link>
	</div>
	</div>
	</div>
</template>
<script>
	
	export default{
		data(){
			return{
				itemindex:0
			}
		},
		props:{
			item:Object
		},
		methods:{
			tab(index){
				this.itemindex=index
			},
			addCarpanelData(data){
			let itemdata={info:data,count:1}
			this.$store.commit('addCarpanelData',itemdata)
		}
		
		}
	}
</script>

<style>
</style>
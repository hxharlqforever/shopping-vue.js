<template>
	<li class="nav-cart" @mouseenter="show" @mouseleave="hiden">
		<a href="javascript:;" class="ball-rect">购物车</a>
		<!--根据class改变颜色-->
		<span class="cart-empty-num " :class="{'cart-num':count>0}"><i>{{count}}</i></span>
		<div class="nav-cart-wrapper" v-if="carshow">
			<div class="nav-cart-list">
				<div class="empty" v-if="count<=0">
					<h3>购物车为空</h3>
					<p>您还没有选购任何商品，现在前往商城选购吧!</p>
				</div>
				<div class="full" v-else>
					<div class="nav-cart-items">
						<ul>
							<li class="clear" v-for="(item,index) in carPanelData">
								<div class="cart-item js-cart-item cart-item-sell">
									<div class="cart-item-inner">
										<div class="item-thumb">
											<img :src="item.ali_image"/>
										</div>
										<div class="item-desc">
											<div class="cart-cell">
												<h4> <a href="#/item/100027401">{{item.title}}</a></h4>
												<p class="attrs"><span>{{item.spec_json.show_name}}</span></p>
												<h6><span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.count}}</span></h6>
											</div>
										</div>
										<div class="del-btn" @click="delet(item.sku_id)">删除</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="nav-cart-total">
						<p>共 <strong class="ng-binding">{{count}}</strong> 件商品</p>
						<h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{price}}</span></h5>
						<h6>
							<router-link to="cart" class="nav-cart-btn">去购物车</router-link>					
						</h6>
					</div>
				</div>
			</div>
		</div>
		<transition name='ball'
			v-on:before-enter='beforEnter'
			v-on:enter='Enter'
			v-on:after-enter='afterEnter'
			v-bind:css='true'>
			<div class="addcart-mask" v-show="ball.show">
				<img class="mask-item"/>
			</div>
		</transition>
	</li>
</template>
<script>
	export default{
		computed:{
			carPanelData(){
				return this.$store.state.carPanelData
			},
			count(){
				return this.$store.getters.totlecount
			},
			price(){
				return this.$store.getters.totleprice
			},
			carshow(){
				return this.$store.state.carshow
			},
			ball(){
				return this.$store.state.ball
			}
			
		},
		methods:{
			delet(id){
				return this.$store.commit('delet',id)
			},
			show(){
				return this.$store.commit('showcar')
			},
			hiden(){
				return this.$store.commit('hidencar')
			},
			//初始状态
			beforEnter(el){
				let rect=this.ball.el.getBoundingClientRect()
				let rectE=document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
				let ball=document.getElementsByClassName('mask-item')[0]
				let x=rectE.left+15-(rect.left+rect.width/2)
				let y=rect.top+rect.height/2-(rectE.top+10)
				el.style.transform='translate3d(0,'+y+'px,0)'
				ball.style.transform='translate3d(-'+x+'px,0,0)'
				ball.src=this.ball.img
			},
			//运动状态
			Enter(el){
				let a=el.offsetHeight
				el.style.transform='translate3d(0,0,0)'
				document.getElementsByClassName('mask-item')[0].style.transform='translate3d(0,0,0)'
				
			},
			//结束状态
			afterEnter(el){
				this.ball.show=false
			
				
			}
		}
	}
</script>

<style>
.ball-enter-active{
	transition:1s;
}
.ball-enter-active .mask-item{
	transition:1s;
	width: 20px;
	height: 20px;
	position:absolute;
	z-index:1000;
}
.ball-enter-to{
	 opacity: 1;
	
}


</style>
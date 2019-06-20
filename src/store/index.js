import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store=new Vuex.Store({
	state:{
		carPanelData:[],
		maxoff:false,
		carshow:false,
		ball:{
			show:false,
			el:null,
			img:''
		},
	   receiveInfo: [{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': false,
      'checked': true
    },{
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': true,
      'checked': false
    }],
    orderdata:[]
	},
	getters:{
		totlecount(state){
			let count=0
			state.carPanelData.forEach(goods=>{
				count+=goods.count
			})
			return count
		},
		totleprice(state){
			let price=0
			state.carPanelData.forEach(goods=>{
				price+=goods.count*goods.price
			})
			return price
		},
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if(!goods.checked){
           allChecked = false
          return
        }
      })
      return allChecked
    },
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        count += goods.count;
      })
      return count
    },
    checkedprice (state) {
      let total = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked)
        total += goods.price * goods.count
      })
      return total
    },
	checkgoods(state){
		let checkgoods=[]
		state.carPanelData.forEach((goods) => {
        if(goods.checked)
        checkgoods.push(goods)
      })
      return checkgoods
		
	}},
	mutations:{
		addCarpanelData(state,data){
			let boff=true
			state.carPanelData.forEach(goods=>{
				if(goods.sku_id===data.info.sku_id){
					goods.count+=data.count
				if(goods.count>goods.limit_num){
					goods.count-=data.count
					state.maxoff=true
					boff=false
					return
				}
				    boff=false
					state.carshow=true
					state.ball.show=true
					state.ball.img=data.info.ali_image
					state.ball.el=event.path[0]
					
				}
			})
			if(boff){
				state.carshow=true
				let goodsData=data.info
				Vue.set(goodsData,'count',data.count)
				Vue.set(goodsData,'checked',true)
				state.carPanelData.push(goodsData)
				state.ball.show=true
				state.ball.img=data.info.ali_image
				state.ball.el=event.path[0]
				
			}
			
		},
		closeprompt(state){
			state.maxoff=false
		},
		delet(state,id){
			state.carPanelData.forEach((goods,index)=>{
				if(goods.sku_id==id){
					state.carPanelData.splice(index,1)
					return
				}
			})
		},
		showcar(state){
			state.carshow = true
		},
		hidencar(state){
			setTimeout(()=>{
			state.carshow=false	
			},5000)
			
		},
    plusCarPanelData (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          if(goods.count === goods.limit_num) return
          goods.count ++
          return
        }
      })
    },
  	subCarPanelData (state,id) {
  	  state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          if(goods.count === 1) return
          goods.count --
          return
        }
      })
  	},checkGoods (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id){
          goods.checked = !goods.checked
        }
      })
   },
    allCheckedgoods(state,allChecked){
    	state.carPanelData.forEach((goods) => {
       goods.checked=!allChecked
     })	
    },
    delCheckGoods (state) {
      let i = state.carPanelData.length
      while(i--){
        if(state.carPanelData[i].checked){
          state.carPanelData.splice(i,1)
        }
      }
    },
     submitReceive (state,data) {
      if (data.default) { // 是否勾选设置为默认地址按钮
        state.receiveInfo.forEach((receive) => {
          receive.default = false
        })
        state.receiveInfo.push(data)
      }
    },
     submitOrder (state,data) {
     state.orderdata.unshift(data)
      let i = state.carPanelData.length
      while(i--){
        if(state.carPanelData[i].checked){
          state.carPanelData.splice(i,1)
        }
      }
    },
    payNow (state,id) {
      state.orderdata.forEach((order,index) => {
        if(order.orderId === id){
          order.isPay = true
          return
        }
      })
    }
	}
})

export default store

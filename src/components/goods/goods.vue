<template>
   <div class="goods">
       <div class="menu-wrap" ref="menuWrap" >
       	   <ul>
       		<li v-if="goods.length" v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
       			<span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
       		</li>
       	</ul>
       </div>
       <div class="foods-wrap" ref="foodsWrap">
       	  <ul>
       		<li v-for="item in goods" class="food-list food-list-hook" v-if="goods.length">
       			<h1 class="title">{{item.name}}</h1>
       			  <ul>
       				<li  v-for=" food in item.foods" class="food-item border-1px" @click="foodDetail(food,$event)">
       					<div class="icon">
       						<img :src="food.icon" width="57" height="57">
       					</div>
       					<div class="content">
       						<h2 class="name">{{food.name}}</h2>
       						<p class="description">{{food.description}}</p>
       						<div class="exta">
       							<span class="exta-item">月售{{food.sellCount}}份</span>
       							<span>好评率{{food.rating}}%</span>
       						</div>
       						<div class="price">
       							<span class="now-price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
       						</div>
                  <div class="cartcontrol-wrap">
                    <cartcontrol :food="food" v-on:add="add"></cartcontrol>
                  </div>
       					</div>
       				</li>
       			</ul>
       		</li>
       	</ul>
       </div>
       <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
       <food :food="selectedFood" ref="food" v-on:add="add"></food>
   </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart.vue';
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import food from 'components/food/food.vue';
import axios from 'axios';
const errOk = 0;
// axios({
// 	method: 'GET',
// 	url: './del.php',
//   withCredentials: false,
// }).then(function(response){
// 	// response=response.JSON();
//     console.log(response.data);
// }).catch(function(err){
//    console.log(err);
// })
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			goods: [],
			listHeight: [],
			scrollY: 0,
      selectedFood:{}
		};
	},
	computed: {
        currentIndex() {
        	for (let i = 0; i < this.listHeight.length; i++) {
        		let height1 = this.listHeight[i];
        		let height2 = this.listHeight[i + 1];
        		if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
        			return i;
        		}
        	}
        	return 0;
        },
        selectFoods() {
          let selectFoods = [];
          this.goods.forEach((good) => {
               good.foods.forEach((food) => {
                  if (food.count) {
                    selectFoods.push(food);
                  }
               });
          });
          return selectFoods;
        }
	},
    created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		// this.$http.get('../../build/php/del.php').then((response) => {
		// 	response = response.body;
		// 	if (response.errno === errOk) {
    //          this.goods = response.data;
    //          this.$nextTick(() => {
    //          this._initScroll();
    //          this._calculateHeight();
    //          });
    //     }
		//     });
	axios.get('/v2/movie/in_theaters', { 'city': '广州' })
    .then((result) => {
        console.log(result);
    });
    },
    methods: {
      foodDetail(food,event){
        if (!event._constructed) {
          return;
        }
        this.selectedFood=food;
        this.$refs.food.show();
      },
    	selectMenu(index,event) {
    		if (!event._constructed) {
    			return;
    		}
           let foodList=this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
           let el=foodList[index];
           this.foodsScroll.scrollToElement(el,300);
     	},

	       _initScroll() {
	    this.menuScroll = new BScroll(this.$refs.menuWrap, {
	    	click: true
	    });
	    this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          click: true,
	    	 probeType: 3
	    });
	     this.foodsScroll.on('scroll', (pos) => {
	        this.scrollY = Math.abs(Math.round(pos.y));
	     })
	    },
	    _calculateHeight() {
	    	let foodList=this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
	        let height=0;
	        this.listHeight.push(height);
	       for (let i = 0; i < foodList.length; i++) {
		    	let item=foodList[i];
		    	height +=item.clientHeight;
		    	this.listHeight.push(height);
	       }
        },
        add(target) {
          this.$nextTick(() => {
             this.$refs.shopcart.drop(target);
          })
           
        }
   },
   components: {
   	shopcart,
    cartcontrol,
    food
   }
};
</script>
<style type="text/css">
 .goods{
 	display: flex;
 	position: absolute;
 	top: 174px;
 	bottom: 46px;
 	width: 100%;
 	overflow: hidden;
   border-top: 1px solid rgba(7,17,27,0.1);
 }
 .goods .menu-wrap{
 	flex: 0 0 80px;
 	width: 80px;
 	background: #f3f5f7;
 
 }
 
 .goods .menu-wrap .menu-item{
 	display: table;
 	height: 54px;
 	width: 56px;
 	line-height: 14px;
 	padding: 0 14px;
  
 	 
 }
 .goods .menu-wrap .menu-item.current{
  	position: relative;
  	z-index: 10;
  	margin-top: -1px;
  	background: #fff;
  	font-weight: 700;
  }
  .goods .menu-wrap .menu-item.current .border-1px:after{
  border: none;
  }
 .border-1px::after{
 	content: "";
    position: absolute;
   left: 0;
   bottom: 0;
   width: 100%;
   border-bottom: 1px solid rgba(7,17,27,0.1);
 	display:block;

 }
 @media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
  .menu-item::after{
  -webkit-transform:scaleY(0.7);
  transform:scaleY(0.7);
  }
}
@media (-webkit-min-device-pixel-ratio:2.0),(min-device-pixel-ratio:2.0){
 .menu-item::after{
  -webkit-transform:scaleY(0.5);
  transform:scaleY(0.5);
  }
}
 .goods .menu-wrap .menu-item .icon{
 	 display: inline-block;
 	margin-right: 2px;
 	width: 12px;
 	height: 12px;
 	background-size: 12px 12px;
 	background-repeat:  no-repeat;
 	vertical-align: bottom;
 }
 .goods .menu-wrap .menu-item .icon.decrease{
   background-image: url('../../../resource/img/decrease_3@2x.png');
 }
 .goods .menu-wrap .menu-item .icon.discount{
   background-image: url('../../../resource/img/discount_3@2x.png');
 }
.goods .menu-wrap .menu-item .icon.guarantee{
   background-image: url('../../../resource/img/guarantee_3@2x.png');
 }
 .goods .menu-wrap .menu-item .icon.invoice{
   background-image: url('../../../resource/img/invoice_3@2x.png');
 }
.goods .menu-wrap .menu-item .icon.special{
   background-image: url('../../../resource/img/special_3@2x.png');
 }
 .goods .menu-wrap .menu-item .text{
 	display: table-cell;
 	width: 56px;
 	vertical-align: middle;
    font-size: 12px;
 	font-weight: 200;
 	text-align: center;
 	 position: relative;
 }

  .goods .foods-wrap{
  	flex: 1;
  }
.goods .foods-wrap  .title{
	height: 26px;
	line-height: 26px;
	font-size: 12px;
	color: rgb(147,153,159);
	padding-left: 14px;
	background: #f3f5f7;
	border-left: 2px solid #d9dde1;
}
.goods .foods-wrap  .food-item{
	display: flex;
	margin: 18px;
	padding-bottom: 18px;
	position: relative;

}
.goods .foods-wrap  .food-item:last-child{
	margin-bottom: 0;
}
.goods .foods-wrap  .food-item:last-child:after{
    border: none;
}
.goods .foods-wrap  .food-item .icon{
	flex: 0 0 57px;
	width: 57px;
	margin-right: 10px;
}
.goods .foods-wrap  .food-item .content{
	flex: 1;
}
.goods .foods-wrap  .food-item .content .name{
	margin: 2px 0 8px 0;
	font-size: 17px;
	line-height: 17px;
	color: rgb(7,17,27);
}
.content .description,.content .exta{

	margin-bottom: 8px;
	font-size: 10px;
	line-height: 12px;
	color: rgb(147,153,159);
}
.content .exta .exta-item{
	margin-right: 12px;
}
.content .price .now-price{
	font-size: 12px;
	font-weight: 700;
	line-height: 12px;
	color: rgb(240,20,20);
	margin-right: 8px;
}
.content .price .old-price{
	font-size: 10px;
	font-weight: 700;
	line-height: 12px;
	color: rgb(147,153,159);
}
.cartcontrol-wrap{
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>
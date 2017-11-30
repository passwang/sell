<template>
	<div class="cartcontrol">
	 <transition name="move">
		<div class="cart-dec" @click.stop.prevent="decCart" v-show="food.count>0">
		    <i class="inner iconfont icon-offline"></i>
		 </div>
       </transition>
		<div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click.stop.prevent="addCart"><i class="iconfont icon-addition_fill"></i></div>
	</div>
</template>
<script type="text/javascript">
import Vue from 'vue';
	export default{
      props: {
      	food: {
      		type: Object
      	}
      },
      created() {
      
      },
      methods: {
      	addCart(event) {
      		if (!event._constructed) {
    			return;
    		}
      		if (!this.food.count) {
      			Vue.set(this.food,'count', 1);
      		}else{
      			this.food.count++;
      		}
      		this.$emit('add',event.target);
      	},
      	decCart(event) {
      		if (!event._constructed) {
    			return;
    		}
      		if (this.food.count>0) {
      			this.food.count--;
      		}
      	}
      }
	};
</script>
<style type="text/css">
@import url('//at.alicdn.com/t/font_443596_qjpw4wohgi1wcdi.css');
@import url('//at.alicdn.com/t/font_439742_n2eaenec42f0f6r.css');
	.cartcontrol{
		font-size: 0;
	}
	
	.cartcontrol .cart-count{
		display: inline-block;
         width: 20px;
         font-size: 12px;
         line-height: 24px;
         color: rgb(147,153,159);
         text-align: center;
	}
	 .cartcontrol .cart-dec{
		display: inline-block;
		padding: 6px;
		opacity: 1;
		font-size: 24px;
		color: rgb(0,160,220);
		line-height: 24px;
		transform: translate3d(0,0,0);
	}
	 .cartcontrol .inner{
	 	display: inline-block;
		transform: rotate(0deg);
		transition: all 0.4s linear;
	 }
	.cart-dec.move-enter-active, .cart-dec.move-leave-active{
      transition: all 0.4s linear;
	 }
	 .cart-dec.move-enter, .cart-dec.move-leave-to{
	 	opacity: 0;
	 	transform: translate3d(24px,0,0);
	 }
	 .cart-dec.move-enter .inner, .cart-dec.move-leave-to .inner{
	 	transform: rotate(180deg);
	 }
	 .cartcontrol .cart-add{
		display: inline-block;
		font-size: 24px;
		color: rgb(0,160,220);
		line-height: 24px;
		padding: 6px;
	}
</style>
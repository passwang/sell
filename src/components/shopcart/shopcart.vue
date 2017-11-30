<template>
 <div class="shopcart">
   <div class="cart-content" @click="toggleShow">
     <div class="cart-left">
       <div class="logo-wrap">
         <div class="logo" :class="{'highlight':totalCount>0}">
           <i class="iconfont icon-caigou" :class="{'highlight':totalCount>0}"></i>
         </div>
         <div class="cart-count" v-show="totalCount>0">{{totalCount}}</div>
       </div>
       <div class="price" v-show="totalCount>0":class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
       <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
     </div>
     <div class="cart-right" :class="payClass">
       <div class="qisong">{{payDesc}}</div>
     </div>
   </div>
   <div class="ball-container">
      <div  v-for="ball in balls">
       <transition name="drop" @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
   </div>
  </div>
  <transition name="fold">
   <div class="cart-list" v-show="listShow">
     <div class="list-header">
       <h1 class="title">购物车</h1>
       <span class="empty" @click="empty">清空</span>
     </div>
     <div class="list-content" ref="listContent">
       <ul>
         <li class="food-list" v-for="food in selectFoods">
           <span class="name">{{food.name}}</span>
           <div class="price">
             <span>￥{{ food.price*food.count }}</span>
           </div>
           <div class="cart-wrap">
             <cartcontrol :food="food"></cartcontrol>
           </div>
         </li>
       </ul>
     </div>
   </div>
   </transition>
  <transition name="mask">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
  </transition>
 </div>
 </div>
</template>

<script type="text/javascript">
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import BScroll from 'better-scroll';
  export default{
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
         balls: [
         {
          show: false
         },
         {
          show: false
         },
         {
          show: false
         },
         {
          show: false
         },
         {
          show: false
         }
         ],
         dropBalls: [],
         fold: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
         total +=food.price * food.count;
      });
      return total;
    }, 
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
         count +=food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      }else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      }else{
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
         return 'not-enough';
      }else{
        return 'enough';
      }
    },
    listShow() {
      if (!this.totalCount) {
          this.fold = true;
          return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
             this.scroll = new BScroll(this.$refs.listContent, {
          click:true
        });
          }else{
            this.scroll.refresh();
          }
         
        })
        
      }
      return show;
    }
  },
  methods: {
    empty() {
      this.selectFoods.forEach((food) =>{
        food.count=0;
      })
    },
     hideList() {
      this.fold=true;
    },
    drop(el) {
       for (let i = 0; i < this.balls.length; i++) {
         let ball = this.balls[i];
         if (!ball.show) {
           ball.show = true;
           ball.el = el;
           this.dropBalls.push(ball);
           return ;
         }
       }
    },
    beforeDrop(el) {
      let count=this.balls.length;
      while(count--){
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display='';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform=`translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform=`translate3d(${x}px,0,0)`;
        }
      }
    },
    droping(el,done){
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
         el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform='translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
           inner.style.transform='translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
      })
    },
    afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display='none';
        }
    },
    toggleShow() {
      if (!this.totalCount) {
          return;
      }
      this.fold = !this.fold;
    }
   
  },
  components: {
    cartcontrol
  }
  };
</script>
<style type="text/css">
@import url('//at.alicdn.com/t/font_439742_4re5we532y0kke29.css');
  .shopcart{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    z-index: 50;
    background: #ccc;
  }
   .shopcart .cart-content{
     display: flex;
    background: #141d27;
    font-size: 0;

   }
  .shopcart .cart-right{
   flex: 0 0 105px;
   width: 105px;
   font-size: 12px;
   background: rgba(255,255,255,0.2);
   
   line-height: 24px;
   text-align: center;
  }
  .shopcart .cart-right .qisong{
    margin: 12px 8px 0px 8px;
    vertical-align: top;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    
  }
  .shopcart .cart-right.not-enough{
   background: rgba(255,255,255,0.2);
  }
  .shopcart .cart-right.enough{
   background: #00b43c;

  }
  .shopcart .cart-right.enough .qisong{
   color: #fff;
  }
   .shopcart .cart-left{
    flex: 1;
   
   }
   .shopcart .cart-left .logo-wrap{
    display: inline-block;
    position: relative;
    top: -10px;
      margin: 0 12px;
      padding: 6px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      box-sizing: border-box;
      vertical-align: top;
      background: #141d27;
   }
   .shopcart .cart-left .logo-wrap .cart-count{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240,20,20);
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
    border-radius: 10px;
   }
   .shopcart .cart-left .logo-wrap .logo{
    width: 44px;
    height: 44px;
    background:rgba(255,255,255,0.2);
    border-radius: 50%;
    text-align: center;
   }
  .shopcart .cart-left .logo-wrap .logo.highlight{
    background: rgb(0,160,220);
   }
   .icon-caigou{
    font-size: 24px;
    line-height: 44px;
    color: rgba(255,255,255,0.4);

   }
   .icon-caigou.highlight{
     color: rgb(255,255,255);
   }
   .shopcart .cart-left .desc{
   display: inline-block;
    vertical-align: top;
 margin: 12px;
 margin-bottom: 0;
 box-sizing: border-box;
 font-size: 16px;
 color: rgba(255,255,255,0.2);
 line-height: 24px;
   }
   .shopcart .cart-left .price{
 display: inline-block;
 line-height: 24px;
 vertical-align: top;
 margin-top: 12px;
 box-sizing: border-box;
 padding-right: 12px;
 border-right: 1px solid rgba(255,255,255,0.1);
 font-size: 16px;
 color: rgba(255,255,255,0.4);
 font-weight: 700;
 line-height: 24px;
   }
    .shopcart .cart-left .price.highlight{
      color: #fff;
    }
    .ball-container .ball{
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
     .ball-container .ball .inner{
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: rgb(0,160,220);
      transition: all 0.4s linear;
     }
     .cart-list{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: -1;
      transform: translate3d(0,-100%,0);
     }
     .cart-list.fold-enter-active, .cart-list.fold-leave-active{
      transition: all 0.5s;
     }
      .cart-list.fold-enter, .cart-list.fold-leave-to{
        transform: translate3d(0, 0, 0);
     }
     .cart-list .list-header{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,0.1);
     }
      .cart-list .list-header .title{
        float: left;
        font-size: 14px;
        color: rgb(7,17,27);
        font-weight: 200;
      }
      .cart-list .list-header .empty{
        float: right;
      font-size: 12px;
      color: rgb(0,160,220);
      }
      .cart-list .list-content{
        padding: 0 18px;
        max-height: 217px;
        background: #fff;
        overflow: hidden;
      }
       .cart-list .list-content .food-list{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7,17,27,0.1);
       }
        .cart-list .list-content .food-list .name{
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
         .cart-list .list-content .food-list .price{
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
         }
          .cart-list .list-content .food-list .cart-wrap{
            position: absolute;
            bottom: 6px;
            right:0;
          }
        .list-mask {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          backdrop-filter: blur(10px);
          opacity: 1;
          background: rgba(7, 17, 27, 0.6);
        }
        .list-mask.mask-enter-active,  .list-mask.mask-leave-active {
             transition: all 0.5s;
           }
         .list-mask.mask-enter, .list-mask.mask-leave-active{
             opacity: 0;
            background: rgba(7, 17, 27, 0);
         }
            
    
</style>
<template>
   <transition name="move">
	    <div class="food" v-show="showFlag" ref="food" >
		   <div class="food-content">
		   	   <div class="img-header">
		   	   	 <img :src="food.image" class="img">
		   	   	 <div class="back" @click="hide">
		   	   	 	<i class=" iconfont icon-fanhui"></i>
		   	   	 </div>
		   	   </div>
		   	    <div class="content">
		          <h1 class="title">{{food.name}}</h1>
		          <div class="detail-wrap">
		            <span class="sell-count">月售{{food.sellCount}}份</span>
		            <span class="rating">好评率{{food.rating}}%</span>
		          </div>
		          <div class="price">
		            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
                  <div class="cartcontrol-wrapper">
		            <cartcontrol :food="food" v-on:add="addFood"></cartcontrol>
		          </div>
		          <transition name="fade">
		            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count ===0">
		              加入购物车
		            </div>
		          </transition>
		         </div>
		         <split v-show="food.info"></split>
		         <div class="info" v-show="food.info">
		         	<h1 class="title">商品介绍</h1>
		         	<p class="text">{{food.info}}</p>
		         </div>
		        <split v-show="food.ratings"></split>
		        <div class="rating">
		        	<h1 class="title">商品评价</h1>
		        	<ratingSelect @select="ratingSelect" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
              <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                  <li v-for="food in food.ratings" class="rating-con" v-show="needShow(food.rateType,food.text)">
                    <span class="user-wrap">
                      <span class="name">{{food.username}}</span>
                      <img  class="avatar" :src="food.avatar" width="12" height="12">
                    </span>
                    <div class="time">{{food.rateTime | formatDate}}</div>
                    <p class="text"><span class="avatar"><i class="iconfont" :class="{'icon-haoping':food.rateType===0,'icon-chaping':food.rateType===1}"></i></span>{{food.text}}</p>
                  </li>
                </ul>
                 <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
              </div>
		        </div>
		    </div>
	    </div>
    </transition>
</template>
<script type="text/javascript">
import {formatDate} from 'common/js/date.js';
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import split from 'components/split/split.vue';
import ratingSelect from 'components/ratingSelect/ratingSelect.vue';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
	export default {
        props: {
        	food: {
        		type:Object
        	}
        },
        data() {
        	return {
        		showFlag:false,
            selectType: ALL,
            onlyContent: true,
            desc: {
               all: '全部',
               positive: '推荐',
               negative: '吐槽'
            }
        	};
        },
        methods: {
        	show() {
        		this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = true;
        		this.$nextTick(() => {
        			if (!this.scroll) {
        				this.scroll = new BScroll(this.$refs.food, {
                        click: true
        		});
        			}else{
        				this.scroll.refresh();
        			}
        		});	
        	},
        	hide() {
        		this.showFlag = false;
        	},
        	addFirst(event) {
        		if (!event._constructed) {
        			return;
        		}
        		 this.$emit('add', event.target);
        		if (!this.food.count) {
        			Vue.set(this.food,'count',1);
        		} else{
        			this.food.count++;
        		}
        	},
        	addFood(target) {
                this.$emit('add',target);
        	},
          ratingSelect(type) {
             this.selectType = type;
             this.$nextTick(() => {
             this.scroll.refresh();
             });
          },
          toggleContent() {
            this.onlyContent = !this.onlyContent;
             this.$nextTick(() => {
             this.scroll.refresh();
             });
          },
          needShow(type,text) {
            if (this.onlyContent && !text) {
                 return false;
            }
              if (this.selectType===ALL) {
                 return true;
              }else{
                return type === this.selectType;
              } 
          }
       },
       filters: {
           formatDate(time) {
              let date = new Date(time);
              return formatDate(date, 'yyyy-MM-dd hh:mm');
           }
       },
         components: {
			    cartcontrol,
			    split,
			     ratingSelect
            }
	};
</script>
<style type="text/css">
@import url('//at.alicdn.com/t/font_439742_s3c6cje1b50wl8fr.css');
@import url('//at.alicdn.com/t/font_443596_y1u1o2wuhnoh6w29.css');
@import url('//at.alicdn.com/t/font_443596_63be1aqqfasxxbt9.css');
	.food{
		position: fixed;
		left:0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
		transform: translate3d(0,0,0);
	}
	.food.move-enter-active, .food.move-leave-active{
      transition: all 0.3s linear;
	}
	.food.move-enter, .food.move-leave-to{
		transform: translate3d(100%,0,0);
	}
	.food .img-header{
		position: relative;
		left: 0;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.food .img-header .img{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.food .img-header .back{
		position: absolute;
		top:10px;
		left: 0;
		padding: 10px;
		font-size: 20px;
		color: #fff;
	}
	.food  .content{
	  	position: relative;
      padding: 18px;
	  }
      
    .food .info .title{
      	line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
    .food .detail-wrap{
      	 margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0; 
         margin-top: 8px;
      }
       
     .food  .sell-count, .food .rating{
         font-size: 10px;
          color: rgb(147, 153, 159);
        }
      .food  .sell-count{
          margin-right: 12px;
        }
    .food  .price{
      	font-weight: 700;
        line-height: 24px;
      }
        
     .food   .now{
        	margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
          
     .food   .old{
        	text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
          
    .food  .cartcontrol-wrapper {
      	 position: absolute;
        right: 12px;
        bottom: 12px;
      }
       
     .food .buy{
      	position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box; 
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: rgb(0, 160, 220);
        opacity: 1 ;
      }
        
    .fade-enter-active,.fade-leave-active
         {
          	 transition: all 0.2s;
          }
     .fade-enter, .fade-leave-active{
        	opacity: 0;
          z-index: -1;
        }
  .food .info{
  	padding: 18px;
  } 
  .food .info .text{
      padding: 6px 8px;
      font-weight: 200;
      font-size: 12px;
      color: rgb(77,85,93);
      line-height: 24px;
  }  
  .food .rating {
  	padding-top: 18px;
  }      
  .food .rating .title{
      line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
  }
  .food .rating-wrapper{
     padding: 0 18px;
  }
  .food .rating-wrapper .rating-con{
          padding: 16px 0;
          border-bottom:1px solid rgba(7, 17, 27, 0.1);
           position: relative;
 }
 .food .rating-wrapper .rating-con  .user-wrap{
            position: absolute;
            top: 16px;
            right: 0px;
            line-height: 12px;
            font-size: 0; 
    }
.food .rating-wrapper .rating-con .name{
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
.food .rating-wrapper .avatar{
            border-radius: 50%;

            }
.food .rating-wrapper  .time{
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
  .food .rating-wrapper .text{
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
            
  .food .rating-wrapper  .icon-haoping,  .food .rating-wrapper .icon-chaping{
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }      
  .food .rating-wrapper .icon-haoping{
              color: rgb(0, 160, 220);
            }
.food .rating-wrapper  .icon-chaping{
              color: rgb(147, 153, 159);
            }
.food .rating-wrapper  .no-rating{
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
</style>
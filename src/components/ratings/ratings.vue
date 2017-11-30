<template>
   <div class="ratings" ref="ratings">
   	<div class="ratings-content" >
   		<div class="content-top">
   			<div class="ping-fen">
   				<h1 class="score">{{seller.score}}</h1>
   				<h2 class="all-score">综合评分</h2>
   				<h2 class="high-score">高于周边商家{{seller.rankRate}}%</h2>
   			</div>
   			<div class="star-fen">
   				<div class="fen-item">
   					<span class="title">服务态度</span>
   					<star :size="36" :score="seller.serviceScore"></star>
   					<span class="text">{{seller.serviceScore}}</span>
   				</div>
   				<div class="fen-item">
   					<span class="title">商品评分</span>
   					<star :size="36" :score="seller.foodScore"></star>
   					<span class="text">{{seller.foodScore}}</span>
   				</div>
   				<div class="fen-item">
   					<span class="title">送达时间</span>
   					<span class="time">{{seller.deliveryTime}}分钟</span>
   				</div>
   			</div>
   		</div>
   		<split></split>
   		<div class="content-bottom">
   			<ratingSelect @select="ratingSelect" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingSelect>
                   
   			<div class="rating-wrapper">
		        <ul>
		        <!--使用needShow方法控制显示-->
		          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
		            <div class="avatar">
		              <img width="28" height="28" :src="rating.avatar">
		            </div>
		            <div class="content">
		              <h1 class="name">{{rating.username}}</h1>
		              <div class="star-wrapper">
		              <!--引入star组件-->
		                <star :size="24" :score="rating.score"></star>
		                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
		              </div>
		              <p class="text">{{rating.text}}</p>
		              <!--recommend的处理,尤其注意class跟布局的使用-->
		              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
		                <span class="icon-thumb_up"><i class="iconfont" :class="{'icon-haoping':rating.rateType===0}"></i></span>
		                <span class="item" v-for="item in rating.recommend">{{item}}</span>
		              </div>
		              <!--过滤时间格式-->
		              <div class="time">
		                {{rating.rateTime | formatDate}}
		              </div>
		            </div>
		          </li>
		        </ul>
            </div>
   		</div>
   	</div>
   </div>
</template>
<script>
import {formatDate} from 'common/js/date.js';
import BScroll from 'better-scroll';
import split from 'components/split/split.vue';
import star from 'components/star/star.vue';
import ratingSelect from 'components/ratingSelect/ratingSelect.vue';
const errOk = 0;
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
  export default {
       props: {
       	seller: {
       		type: Object
       	}
       },
       data() {
       	  return {
       	  		ratings: [],
               selectType: ALL,
               onlyContent: true,
              desc: {
               all: '全部',
               positive: '满意',
               negative: '不满意'
               }
        	};
       	  
       
       },
       created() {
       	 this.$http.get('/api/ratings').then((response) => {
       	 	response = response.body;
       	 	if (response.errno === errOk) {
       	 		this.ratings = response.data;
       	 	  this.$nextTick(() => {
       	 	    this.scroll = new BScroll(this.$refs.ratings, {
                      click: true
                     });
       	 			});
       	 	}
       	 });
       },
        methods: {
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
       	split,
       	star,
       	ratingSelect
       }
  };
</script>
<style>
@import url('//at.alicdn.com/t/font_439742_s3c6cje1b50wl8fr.css');
@import url('//at.alicdn.com/t/font_443596_y1u1o2wuhnoh6w29.css');
@import url('//at.alicdn.com/t/font_443596_63be1aqqfasxxbt9.css');
.ratings{
	position: absolute;
	left: 0;
    top: 174px;
 	bottom: 46px;
 	width: 100%;
 	overflow: hidden;
   z-index: 100;
}
.ratings .content-top{
	padding: 18px 0;
	overflow: hidden;
	display: flex;
}
.ratings .content-top .ping-fen{
	flex: 0 0 137px;
	width: 137px;
	text-align: center;
	
}
@media only screen and (max-width: 320px) {
	.ratings .content-top .ping-fen{
		  flex: 0 0 120px ;
          width: 120px;
	}
}
.ratings .content-top .ping-fen .score{
	font-size: 24px;
	color: rgb(255,153,0);
	line-height: 28px;
	margin-bottom: 6px;
}
.ratings .content-top .ping-fen .all-score{
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 12px;
  margin-bottom: 8px;
}
.ratings .content-top .ping-fen .high-score{
 margin-bottom: 6px;
 font-size: 10px;
 color: rgb(147,153,159);
 line-height: 10px;
}
.ratings .content-top .star-fen{
   flex: 1;
   padding:0 12px;
   border-left: 1px solid rgb(147,153,159);
}
.ratings .content-top .star-fen .fen-item{
      margin-bottom: 8px;
      font-size: 0px;
}
.ratings .content-top .star-fen .fen-item:last-child{
	margin-bottom: 0;
}
.ratings .content-top .star-fen .fen-item .title{
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);
	display: inline-block;
	vertical-align: top;
	
}
.ratings .content-top .star-fen .fen-item .star{
            display: inline-block;
            margin: 0 6px;
            vertical-align: top;
}
.ratings .content-top .star-fen .fen-item .star .star-item{
	margin-right: 10px;
}
.ratings .content-top .star-fen .fen-item .text{
  font-size: 12px;
  color: rgb(255,153,0);
  line-height: 18px;
  display: inline-block;
  vertical-align: top;
}
.ratings .content-top .star-fen .fen-item .time{
	font-size: 12px;
	color: rgb(147,153,159);
	line-height: 18px;
	margin-left: 12px;

}
.ratings .rating-wrapper{
	padding: 0 18px;
}
      
 .ratings  .rating-wrapper .rating-item{
      	 display: flex ;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
       
  .ratings .rating-wrapper .avatar{
        	flex: 0 0 28px ;
          width: 28px;
          margin-right: 12px;
        }        
 .ratings .rating-wrapper .avatar  img{
   border-radius: 50%;
        }
 .ratings  .rating-wrapper .content{
        	position: relative ;
          flex: 1 ;
        }
          
 .ratings  .rating-wrapper .name{
         	 margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
           
 .ratings .rating-wrapper .star-wrapper{
          	 margin-bottom: 6px;
            font-size: 0;
          }        
.ratings  .rating-wrapper .star{
            	display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
              
 .ratings .rating-wrapper .delivery{
            	display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
              
 .ratings  .rating-wrapper .text{
          	 margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          }
           
 .ratings  .rating-wrapper .recommend{
          	line-height: 16px;
            font-size: 0;
          }
            
.ratings    .icon-thumb_up, .item{
            	  display: inline-block;
              margin: 0 8px 4px 0 ;
              font-size: 9px;
          } 
            
 .ratings  .rating-wrapper .icon-thumb_up {
              color: rgb(0, 160, 220);
            }

 .ratings   .item {
            	 padding: 0 6px ;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
             
 .ratings  .rating-wrapper .time{
          	position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }   
</style>
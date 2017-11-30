<template>
<div class="header">
   <div class="content-wrap">
   	   <div class="img-con">
   	   	<img  width="64"  height="64" :src="seller.avatar">
   	   </div>
   	<div class="info-wrap">
   	   	<div class="title-con">
   	   		<span class="brand"></span>
   	   		<span class="name">{{seller.name}}</span>
   	   	</div>
   	   	<div class="desc-con">
   	   		{{seller.description}}/{{seller.deliveryTime}}分钟送达
   	   	</div>
        <div v-if="seller.supports" class="support" >
        	<span class="icon" :class="classMap[seller.supports[0].type]"></span>
        	<span class="support-text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports"class="support-count" v-on:click="showDetail">
        	<span class="count">{{seller.supports.length}}个</span>
        	<i class="iconfont icon-jiantouyou"></i>
        </div>
    </div>
   </div>
   <div class="notice-wrap" v-on:click="showDetail">
   	   <span class="notice-title"></span><span class="notice-text">{{seller.bulletin}}</span>
   	   <i class="iconfont icon-jiantouyou"></i>
   </div>
  <div class="background">
   	<img :src="seller.avatar" width="100%" height="100%"> 
   </div>
   <transition name="fade">
   	  <div v-show="detailShow" class="detail">
   		<div class="detail-wrap clearfix">
   			<div class="detail-main">
   			   <h1 class="detail-name">{{seller.name}}</h1>
   			   <div class="star-wrap">
   			   	   <star :size="48" :score="seller.score"></star>
   			   </div>
   			   <div class="title">
   			   	    <div class="line"></div>
   			   	    <div class="text">优惠信息</div>
   			   	 	<div class="line"></div>
   			   </div>
   			   <div class="detail-support" v-if="seller.supports">
   			   	    <div class="support-item" v-for="item in seller.supports">
   			   		    <span class="support-icon" :class="classMap[item.type]"></span>
   			   		    <span class="support-text">{{item.description}}</span>
   			     	</div>
   			   </div>
   			    <div class="title">
   			   	    <div class="line"></div>
   			   	    <div class="text">商家公告</div>
   			   	 	<div class="line"></div>
   			   </div>
   			   <div class="bulletin">
   			   	  <div class="content">{{seller.bulletin}}</div>
   			   </div>
   			</div>
   		</div>
   		    <div class="detail-close" @click="hideDetail">
   			    <i class=" iconfont icon-iconfontcha"></i>
   		    </div>
   	   </div>
   	</transition>
</div>
</template>
<script type="text/javascript">
import star from 'components/star/star.vue';
export default {
	props: {
	seller: {
	type: Object
	}
	},
	data() {
	return {
	detailShow: false
	};
	},
	methods: {
    showDetail() {
    this.detailShow = true;
    },
    hideDetail() {
    this.detailShow = false;
    }
    },
	created() {
	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	components: {
	star
	}
};
</script>

<style>
@import url('//at.alicdn.com/t/font_439742_8eexxa414448ia4i.css');
@import url('//at.alicdn.com/t/font_439742_wrwng5pmpdjkyb9.css');
@import url('//at.alicdn.com/t/font_443596_iowicjzks85pcik9.css');
   .header{
   	color: #fff;
   	position: relative;
   	background: rgba(7,17,27,0.5);
   	overflow: hidden;


   }
 .header .content-wrap{
 	padding: 24px 12px 18px 24px;
 	font-size: 0;
 	  position: relative;
 	  z-index: 1;
 }
 .img-con{
       display: inline-block;
     
 }
 .img-con img{
 	 border-radius: 2px;
 }
 .info-wrap{
     display: inline-block;
     font-size: 14px;
     margin-left: 16px;
     z-index: 1;
 }
 .title-con{
 	  margin: 2px 0 8px 0;
 }
 .brand{
 	display: inline-block;
 	width: 30px;
 	height: 18px;
 	background-size: 30px 18px;
 	background-image: url('../../../resource/img/brand@2x.png');
    background-repeat: no-repeat;
 }
@media screen and (-webkit-min-device-pixel-radio: 3) {
	.brand{
		display: inline-block;
 	    width: 30px;
 	    height: 18px;
 		background-size: 30px 18px;
		background-image: url('../../../resource/img/brand@3x.png');
        background-repeat: no-repeat;
	}
 }
 @media screen and (-min-device-pixel-radio: 3) {
 .brand{
 	display: inline-block;
 	    width: 30px;
 	    height: 18px;
 		background-size: 30px 18px;
 		background-image: url('../../../resource/img/brand@3x.png');
         background-repeat: no-repeat;
	}
}
.name{
		font-size: 16px;
		color: rgb(255,255,255);
		font-weight: bold;
		line-height: 18px;
		margin-left: 6px;
		vertical-align: top;
	}
 .desc-con{
 	font-size: 12px;
 	font-weight: 200;
 	line-height: 12px;
 }
 .support{
 	margin-top: 10px;
 }
 .support .icon{
 	display: inline-block;
 	margin-left: 2px;
 	margin-right: 4px;
 	width: 12px;
 	height: 12px;
 	background-size: 12px 12px;
 
 	background-repeat:  no-repeat;
 	vertical-align: bottom;
 }
 .support .icon.decrease{
   background-image: url('../../../resource/img/decrease_1@2x.png');
 }
 .support .icon.discount{
   background-image: url('../../../resource/img/discount_1@2x.png');
 }
.support .icon.guarantee{
   background-image: url('../../../resource/img/guarantee_1@2x.png');
 }
 .support .icon.invoice{
   background-image: url('../../../resource/img/invoice_1@2x.png');
 }
.support .icon.special{
   background-image: url('../../../resource/img/special_1@2x.png');
 }
 .support  .support-text{
 	font-size: 10px;
 	font-weight: 200;
 	line-height: 12px;
 }
 
 .icon-jiantouyou{
 	line-height: 24px;
 	font-size: 10px;
 }
 
 .support-count{
 	position: absolute;
 	right: 12px;
  	bottom: 18px;
 	padding: 7px 8px;
 	height: 24px;
 	line-height: 24px;
 	background: rgba(0,0,0,0.2);
 	border-radius: 14px;
 	text-align: center;
 
 }
.support-count .count{
	font-size: 10px;
	font-weight: 200;
	margin-right: 2px;
	vertical-align: top;
}
.notice-wrap{
 	height: 28px;
 	line-height: 28px;
 	padding: 0px 12px;
 	background-color: rgba(7,17,27,0.2);
 	white-space: nowrap;
 	overflow: hidden;
 	text-overflow: ellipsis;
 	position: relative;
 

 }
 .notice-wrap .notice-title{
 	display: inline-block;
 	width: 22px;
 	height: 12px;
 	background-image: url('../../../resource/img/bulletin@2x.png');
 	background-size: 22px 12px;
 	background-repeat: no-repeat;
 	vertical-align: baseline;
 	

 }
 .notice-wrap .notice-text{
  vertical-align: top;
  font-size: 10px;
  font-weight: 200;
  margin:0px 4px;
 }
 .notice-wrap .icon-jiantouyou{
 	position: absolute;
 	right: 8px;
 	line-height: 28px;
 	font-size:10px;
 }
 .background{
 	position: absolute;
 	left: 0;
 	top: 0;
 	width: 100%;
 	height: 100%;
 	z-index: -1;
 	filter: blur(10px);
 }
 
 .detail{
  	position: fixed;
  	left: 0;
  	top: 0;
  	width: 100%;
  	height: 100%;
  	overflow: auto;
    z-index: 1000;
     background: rgba(7,17,27,0.8);
    /*backdrop-filter:blur(10px);*/
  }
  
  .fade-enter-active, .fade-leave-active {
	transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to{
  	 opacity: 0;
  	 background: rgba(7,17,27,0);
  }
  .fade-enter-to, .fade-leave{
  	 opacity: 1;
  	 background: rgba(7,17,27,0.8);
  }
  
  .clearfix{
  	display: inline-block;
  }
  .clearfix:before{
  	display: block;
  	content: ".";
  	height: 0;
  	line-height: 0;
  	clear: both;
  	visibility: hidden;
  }
  .detail-wrap{
  	min-height: 100%;
  	width: 100%;
  }
   .detail .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
   }
  .detail .detail-close{
  	position: relative;
  	width: 32px;
  	height: 32px;
  	margin: -64px auto 0 auto;
  	clear: both;
  	font-size: 32px;
  	line-height: 32px;
  	text-align: center;
  	color: rgba(255,255,255,0.5);
  
  }
 .detail .detail-main .detail-name{
 	font-size: 16px;
 	font-weight: 700;
 	line-height: 16px;
 	color: rgb(255,255,255);
 	text-align: center;
 }
.detail .detail-main .star-wrap{
	margin-top: 16px;
	text-align: center;
	padding: 2px 0;
}
.detail .detail-main .title{
	width: 80%;
	display: flex;
	margin: 30px auto 24px auto;
}
.detail .detail-main .title .line{
	position: relative;
	top: -6px;
	flex: 1;
	border-bottom: 1px solid rgba(255,255,255,0.2);
}
.detail .detail-main .title .text{
	padding: 0 12px;
	font-size: 14px;
	font-weight: 700;
	line-height: 14px;
}
.detail .detail-main .detail-support{
	width: 80%;
	margin: 28px auto;
	padding: 0 12px;
	
}
.detail .detail-main .support-item{
	margin-bottom: 12px;
}
.detail .detail-main .support-item:last-child{
	margin-bottom: 0;
}
.detail .detail-main .support-icon{
    display: inline-block;
 	margin-right: 6px;
 	width: 16px;
 	height: 16px;
 	background-size: 16px 16px;
 	background-repeat:  no-repeat;
 	vertical-align: bottom;
}
.detail .detail-main .support-item .support-text{
	font-size: 12px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 12px;
}
.detail .detail-main .support-icon.decrease{
   background-image: url('../../../resource/img/decrease_2@2x.png');
 }
 .detail .detail-main .support-icon.discount{
   background-image: url('../../../resource/img/discount_2@2x.png');
 }
.detail .detail-main .support-icon.guarantee{
   background-image: url('../../../resource/img/guarantee_2@2x.png');
 }
 .detail .detail-main .support-icon.invoice{
   background-image: url('../../../resource/img/invoice_2@2x.png');
 }
.detail .detail-main .support-icon.special{
   background-image: url('../../../resource/img/special_2@2x.png');
 }

.detail .detail-main .bulletin{
	width: 80%;
	margin: 0 auto;
}
.detail .detail-main .bulletin .content{
	padding: 0 12px;
	font-weight: 200;
	font-size: 12px;
	line-height: 24px;
}
</style>
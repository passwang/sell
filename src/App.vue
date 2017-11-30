<template>
  <div id="app">
      <v-header :seller="seller"></v-header>
      <div class="tab border-1px">
        <div class="tab-item">
        <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
     </div>
     <keep-alive>
       <router-view :seller="seller"></router-view>
     </keep-alive>
  </div>
</template>

<script type="text/javascript">
import header from 'components/header/header.vue';
const errOk = 0;
export default {
    data() {
      return {
        seller: {
        }
       };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
          if (response.errno === errOk) {
             this.seller = response.data;
        }
        });
    },
    components: {
    'v-header': header
  }
};
</script>

<style>
#app .tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position:relative;

}
#app .tab::after{
  display:block;
  position:absolute;
  left:0;
  bottom:0;
  content:'';
  width:100%;
  border-top:1px solid rgba(7,17,27,0.1);
}
#app .tab .tab-item{
  flex: 1;
  text-align: center;
}
#app .tab .tab-item a{
  display:block;
  font-size: 14px;
  color:rgb(77,85,93);
}
#app .tab .tab-item a.active{
  color:rgb(240,20,20);
}
@media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
  .border-1px::after{
  -webkit-transform:scaleY(0.7);
  transform:scaleY(0.7);
  }
}
@media (-webkit-min-device-pixel-ratio:2.0),(min-device-pixel-ratio:2.0){
  .border-1px::after{
  -webkit-transform:scaleY(0.5);
  transform:scaleY(0.5);
  }
}
</style>

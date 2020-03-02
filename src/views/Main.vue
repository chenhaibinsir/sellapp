<template>
  <div class="main">
    <div class="bg" :style="{backgroundImage:'url('+data.avatar+')' }"></div>
    <div class="main_top">
      <div class="top_content">
        <img class="img" :src="data.avatar" alt />

        <div class="name">
          <h3>{{data.name}}</h3>
          <p>{{data.description}} / {{data.deliveryTime}}分钟送达</p>
          <p class="money">满减</p>
        </div>
      </div>
      <!-- 公告 -->
      <div class="notice">{{data.bulletin}}</div>
    </div>
    <!--商品  评价 商家-->
    <div class="main_list">
      <router-link to="/goods" active-class="actives">商品</router-link>
      <router-link to="/evaluate" active-class="actives">评价</router-link>
      <router-link to="/merchant" active-class="actives">商家</router-link>
    </div>

    <router-view />

    <div style="height:50px"></div>
    <!-- 购物车板块 -->
    <transition name="slide-fade">
      <div v-show="board" class="crarLump">
        <Shopping />
      </div>
    </transition>
    <!-- 购物车 -->
    <div  class="shopcrat">
      <div @click="board=!board" class="car">
        <div>
          <Icon type="md-cart" />
        </div>
        <h2 class="price">￥{{prices}}</h2>
        <p>另需配送费{{data.deliveryPrice}}</p>
      </div>
      <div class="send">￥{{data.minPrice}}起送</div>
    </div>
  </div>
</template>

<script>
import Shopping from "./Shopping ";
import { geSeller } from "../api/api/apis";
export default {
  components: {
    Shopping: Shopping
  },
  data() {
    return {
      data: {},
      board: false , //购物车显示隐藏
      di:0,
      color:false
    };
  },
  created() {
    geSeller().then(res => {
      this.data = res.data.data;
    });
    
  },
  
 computed:{
   prices(){
      let num=0;
      let goodsd = this.$store.state.goodsdata 
         goodsd.map(v=>{
           v.foods.map(obj=>{
           num+= obj.num*obj.price
           })
         })
         if(num>=20){
           document.querySelector('.price').style.color='#F6F6F6';
           document.querySelector('.send').style.cssText="color:#F6F6F6;"
         }
     return num
    }
    
    
 }
 
  
};
</script>

<style lang="less" scoped>
.actives{
  font-weight: bold;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bg {
  width: 100%;
  height: 130px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  z-index: -2;
  filter: blur(5px);
}
.main_top {
  width: 100%;
  height: 130px;
  color: rgb(224, 224, 224);

  .top_content {
    display: flex;
    height: 100px;
    padding-top: 20px;
    .img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      margin: 0 20px;
    }
  }
  .notice {
    background: url("../imgs/bulletin@2x.png") no-repeat 10px 7px;
    background-size: 26px;
    height: 30px;
    background-color: rgba(83, 83, 83, 0.3);
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
    text-align: center;
    padding: 0 10px 0 44px;
    span {
      border-radius: 2px;
      width: 30px;
      height: 18px;
      background: #fff;
      display: inline-block;
      font-weight: bold;
      text-align: center;
      line-height: 18px;
      color: #515a6e;
      margin-right: 6px;
    }
  }
  .name {
    p {
      font-size: 13px;
    }
    h3 {
      padding-left: 36px;
      background: url("../imgs/brand@2x.png") no-repeat 0px 3px;
      background-size: 30px;
      margin-right: 10px;
    }
    .money {
      padding-left: 20px;
      background: url("../imgs/decrease_1@2x.png") no-repeat 0px 3px;
      background-size: 14px;
      margin-right: 20px;
    }
  }
}
.main_list {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  border-bottom: 1px solid #e4e4e4;
  a {
    font-size: 18px;
  }
}
// 购物车板块
.crarLump {
  width: 100%;
  height: 200px;
  background-color: #fff;
  position: fixed;
  bottom: 50px;
  
}
// 购物车
.shopcrat {
  width: 100%;
  height: 50px;
  background: #2b343b;
  position: fixed;
  bottom: 0px;
  display: flex;
  .car {
    flex: 1;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 80px;
    p {
      font-size: 12px;
      color: rgb(182, 182, 182);
      margin-left: 10px;
    }
    div {
      position: absolute;
      top: -10px;
      left: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #666;
      i {
        font-size: 30px;
        color: #c4c4c4;
        line-height: 50px;
      }
    }
  }
  .send {
    width: 80px;
    color: #8c9195;
    font-weight: bold;
    line-height: 50px;
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(400px);
  opacity: 0;
}
</style>
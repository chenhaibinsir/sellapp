<template>
  <div>
    <div class="merchant_top">
      <div class="top_bottom">
        <div>
          <h3>{{data.name}}</h3>
          <p class="xinxin">
            <Rate allow-half v-model="data.score" />
            ({{data.sellCount}})月售{{data.sellCount}}单
          </p>
        </div>
        <div class="collect">
          <Icon type="md-heart" />
          <p>已收藏</p>
        </div>
      </div>
      <!-- 配送时间 -->
      <div class="merchant_content">
        <div class="rmb">
          <p>起送价</p>
          <p>
            {{data.minPrice}}
            <span style="font-size: 10px;">元</span>
          </p>
        </div>
        <div class="rmb">
          <p>商家配送</p>
          <p>
            {{data.deliveryPrice}}
            <span style="font-size: 10px;">元</span>
          </p>
        </div>
        <div class="rmb">
          <p>平均配送时间</p>
          <p>
            {{data.deliveryTime}}
            <span style="font-size: 10px;">分钟</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 空容器 -->
    <div class="null"></div>
    <!-- 公告与活动 -->
    <div class="activity">
      <div class="activ_t">
        <p class="title">公告与活动</p>
        <p class="t_content">{{data.bulletin}}</p>
      </div>
      <!-- 满减 -->
      <div class="reduction" v-for="(obj, i) in data.supports" :key="i">
        <p>
          <img v-show="obj.type==0" src="../imgs/decrease_3@2x.png" alt />
          <img v-show="obj.type==1" src="../imgs/discount_1@2x.png" alt />
          <img v-show="obj.type==2" src="../imgs/special_3@2x.png" alt />
          {{obj.description}}
        </p>
      </div>
    </div>
    <!-- 空容器 -->
    <div class="null"></div>
    <!-- 商家实景 -->
    <div class="live-action">
      <p class="title">商家实景</p>
      <div class="imges" >
        <div v-for="(v,i) in data.pics" :key="i">
          <img :src="v" alt />
        </div>
      </div>
    </div>
    <!-- 空容器 -->
    <div class="null"></div>
    <!-- 商家信息 -->
    <div class="info">
      <p class="title">商家信息</p>
      <div v-for="item in data.infos" :key="item.id">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { geSeller } from "../api/api/apis";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    geSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" >
.merchant_top {
  padding: 0px 20px;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  .top_bottom {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0;
    .xinxin {
      .ivu-rate-star {
        font-size: 16px;
        margin-right: 4px;
      }
    }
    .collect {
      text-align: center;
      .ivu-icon {
        font-size: 28px;
        color: #f01414;
      }
    }
  }
  .merchant_content {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    .rmb {
      width: 30%;
      text-align: center;

      p:nth-child(1) {
        font-size: 12px;
        color: rgb(156, 156, 156);
      }
      p:nth-child(2) {
        font-size: 22px;
      }
    }
    .rmb:not(:nth-child(3)) {
      border-right: 1px solid #e8e8e8;
    }
  }
}
.null {
  padding: 10px;
  background: #f4f5f7;
  border-top: 1px solid #e9eaec;
  border-bottom: 1px solid #e9eaec;
}
// 公告与活动
.activity {
  padding: 0 20px;
  .activ_t {
    border-bottom: 1px solid #e9eaec;
    padding: 10px 0;
    .title {
      font-size: 18px;
      color: #0f1922;
    }
    .t_content {
      color: rgb(238, 80, 63);
      padding: 0 10px;
      line-height: 28px;
    }
  }
  // 满减
  .reduction {
    padding: 10px 0;
    border-bottom: 1px solid #e9eaec;
    img {
      width: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
}
// 商家实景
.live-action {
  padding: 10px 20px;
  .title{
    font-size: 18px;
    color: #0f1922;
  }
  .imges{
    padding: 10px 0;
      display: flex;
      justify-content: space-around;
      div{
        width: 80px;
        height: 80px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 120px;
        }
      }
   
  }
}
// 商家信息
.info{
  padding: 10px 20px;
  .title{
    font-size: 18px;
    padding: 10px 0;
    color: #0f1922;
  }
  div{
    padding: 10px;
    border-top:1px solid #EEEEEE;
    
  }
}
</style>
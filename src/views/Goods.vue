<template>
  <div class="goods">
    <!-- 左边 -->
    <div class="goods-left">
      <ul class="content">
        <div  @click="clickLeft(obj)" :class="{content_list:true,active:obj==def}" v-for="(item,obj) in data" :key="obj">
         <div>
             <span>
            <img v-show="item.type==1" src="../imgs/discount_1@2x.png" alt />
            <img v-show="item.type==2" src="../imgs/decrease_1@2x.png" alt />
            <img v-show="item.type==3" src="../imgs/invoice_1@2x.png" alt />
            <img v-show="item.type==4" src="../imgs/guarantee_1@2x.png" alt />
              {{ item.name }}  </span>
         </div>
         
        </div>
      </ul>
    </div>
    <!-- 右边 -->
    <div class="goods-rigth">
      <ul class="content">
        <div :id="index" v-for="(item,index) in data" :key="index">
          <!-- 标题 -->
          <p  class="title">{{item.name}}</p>

          <div class="goods_content" v-for="child in item.foods" :key="child.id">
            <div class="bor_bom">
              <div class="icon">
                <img :src="child.icon" alt />
              </div>
              <div class="bor_content">
                <h3>{{child.name}}</h3>
                <p>{{child.description}}</p>
                <p>月售{{child.sellCount}}份 好评率{{child.rating}}%</p>
                <h4>
                  <span style="color:#F9171E">￥{{child.price}}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { geGoods } from "../api/api/apis";
import BScroll from "better-scroll"; //引入BetterScroll滚动插件
export default {
  data() {
    return {
      data: [], //食品
      def:0 , //默认显示第一个
    };
  },
  created() {
    geGoods().then(res => {
      this.data = res.data.data;
    
    });
  },
  mounted() {
      //左侧滚动版
    new BScroll(document.querySelector(".goods-left"),{
         click: true
    });
    //右侧滚动板
    this.goodsRigth = new BScroll(document.querySelector(".goods-rigth"),{
        click: true
    });
  },
  methods:{
     clickLeft(index){
         this.def=index;
         // 左侧索引index，对应右侧DIV id
         this.goodsRigth.scrollToElement(document.getElementById(index),600)
     }
  }
  
};
</script>

<style lang="less" >
.active{
    background: #fff;
    color: #000;
}
.goods {
    border-top: 1px solid #dbdce0;
    display: flex;
    flex: 1;

  .goods-left {
    width: 110px;
    height: 500px;
    background: #f4f5f7;
    overflow: scroll;
    .content_list{
        padding: 0 10px;
      div{
            height: 60px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #dedfe1;
          img {
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
      }
    }
  }
  .goods-rigth {
    flex: 1;
    background: #f4f5f7;
    overflow: scroll;
    height: 500px;
    .title {
      font-size: 16px;
      color: #989ba0;
      border-left: 2px solid #d9dce1;
      padding: 4px 10px;
    }
    .goods_content {
      padding: 0 20px;

      background: #fff;
      .bor_bom {
        padding: 10px 0;
        display: flex;
        border-bottom: 1px solid #dedfe1;
        .icon {
          img {
            width: 80px;
            height: 80px;
            margin-right: 10px;
          }
        }
        .bor_content {
          line-height: 22px;

          p {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
// 所有请求封装接口文件(方便项目后期维护，所有请求统一管理)
import axios from 'axios'
//第一种
// var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:3000'
// 完全等效

// 第二种
let req =axios.create({
    baseURL: 'http://192.168.1.107:3000',  // 基本路径
    timeout:10000  //ms  请求10秒，如果10秒还没有请求到，则提示超时！！（8-12秒） 超时限制！
})
// axios的封装
// 请求商家信息
export function geSeller(){
    return req.get('/api/seller')
}
// 商品列表
export function geGoods(){
    return req.get('/api/goods')
}
//评价
export function geRatings(){
    return req.get('/api/ratings')
}

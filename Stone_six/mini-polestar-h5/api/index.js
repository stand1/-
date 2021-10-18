const API = require('./base')

/**
 * 获取杂志背景
 * @param  {object} args 参数,默认为空
 * @return {promise}
 */
const getMagazineBg = function () {
  return API.get('/v1.0/newuser/magazine/getImgSource');
}
/**
 * 合成杂志图片
 * @param  {wateUrl,ossUrl} args 参数,默认为空
 * @return {promise}
 */

const createMagazine = function (data) {
  return API.get('/v1.0/newarticle/common/watePicOssUrl',data);
}

/**
 * 获取热门话题
 * @param  {int} id 标签ID
 * @return {promise}
 */
const getHotTopics = function (data={}) {
  return API.get('/v1.0/newarticle/home/getHotTopics',data);
}

/**
 * 获取热门话题
 * @param  {int} id 标签ID
 * @return {promise}
 */
const getAllTag = function (data={}) {
  return API.get('/v1.0/newarticle/article/getAllTag',data);
}

/**
 * 获取部落列表
 * @param  {pageNum: 1,pageSize: 1000} 
 * @return {promise}
 */
const getTribeList=function(data){
  return API.get('/v1.0/newtribe/tribe/getList',data)
}

// 热门话题列表
const getHotTopicsList=function(data={}){
  return API.get('/v1.0/newarticle/home/getHotTopics',data)
}

// 视频分类列表
const getVideoTypeList=function(data={}){
  return API.get('/v1.0/newarticle/article/getVideoClassify',data)
}

const uploadStr=function(data={}){
  return API.post('/v1.0/newarticle/common/uploadOssByHttpclient',data)
}

const uploadImg=function(data={}){
  return API.post('/v1.0/redt_b_material/template/savePersonalTemplate',data)
}

const getTempUserInfo=function(data={}){
  return API.get('v1.0/redt_b_material/template/userInfo',data)
}



API.getMagazineBg = getMagazineBg;
API.getHotTopics = getHotTopics;
API.getTribeList = getTribeList;
API.createMagazine = createMagazine;
API.uploadStr = uploadStr;
API.getVideoTypeList = getVideoTypeList;
API.uploadImg = uploadImg;
API.getTempUserInfo = getTempUserInfo;

module.exports = API
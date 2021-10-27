import Ajax from "@/utils/ajax";
export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    // tableConfig: JSON.parse(JSON.stringify(tableConfig)),
                    // avatar: 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/1579265637000my_avatar.png'
                    avatar: ''
                }
            },

            methods: {
                openMessage(message, type = 1, duration = 3000) {
                    let messageType = 'info',
                        title = '消息'
                    switch (type) {
                        case 0: messageType = 'error'; title = '错误'; break
                        case 1: messageType = 'success'; title = '成功'; break
                        case 2: messageType = 'info'; title = '消息'; break
                    }
                    this.$message({
                        showClose: true,
                        type: messageType,
                        message: message,
                        duration: duration
                    });
                },
                openWarning(message = '确认要执行这步操作吗？') {
                    return new Promise((resolve, reject) => {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            closeOnClickModal: false
                        }).then(() => {
                            resolve('ok')
                        }).catch(() => {
                            // this.$message({
                            //     type: 'info',
                            //     message: '已取消'
                            // });
                            reject('cancel')
                        });
                    })
                },
                findArr(arr, findkey, val) {   //返回index
                    for (var i in arr) {
                        if (arr[i][findkey] == val) return i
                    }
                    return undefined
                },
                async getOSSSign() {
                    let param = {
                        origin: `${window.location.protocol}//${window.location.hostname}`
                    }
                    let result = await this.$getData.getOSSSign(param).then(res => {
                        // console.log(1111);
                        return res
                    })
                        .catch(e => {
                            console.log("获取oss签名失败", e);
                            if (e.code != 401) {
                                this.openMessage(e.msg, 0);
                            }
                            return null
                        });
                    return result
                },
                getOSSStr(url) {
                    return new Promise((resolve, reject) => {
                        let obj = {
                            type: 'get',
                            url: url || 'https://sixeco-redt.oss-cn-shenzhen.aliyuncs.com/redt-user-files/157708572084978.html',
                            timeout: 9000,
                            success: res => {
                                resolve(res)
                            },
                            error: e => {
                                reject()
                                console.log(e);
                            }
                        }
                        Ajax(obj, true);
                    })
                },
                async uploadService(type, file, insert,collectId) {
                    // var type = files[0].type;
                    var OSSOption = await this.getOSSSign();
                    if (!OSSOption) {
                        insert ? insert(null) : '';
                        return null
                    }
                    let filename = "";
                    if (type == '1') {    //1=img/video;2=str;
                        filename = new Date() / 1 + file.name;
                    } else {
                        filename = new Date() / 1 + 'a.html';
                    }
                    var formData = new FormData();
                    formData.append("key", OSSOption.dir + "/" + filename); //存储在oss的文件路径
                    formData.append("OSSAccessKeyId", OSSOption.accessid); //accessKeyId
                    formData.append("policy", OSSOption.policy); //policy
                    formData.append("Signature", OSSOption.signature);
                    formData.append("callback", OSSOption.callback);
                    formData.append("success_action_status", 200); //成功后返回的操作码
                    var fileUrl = "";
                    fileUrl = OSSOption.host + "/" + OSSOption.dir + "/" + filename;
                    if (type == '1') {    //1=img/video;2=str;
                        formData.append("file", file);
                        if(collectId){
                            formData.append("x:collectId", collectId);
                        }
                        // fileUrl = OSSOption.host + "/" + OSSOption.dir + "/" + filename;
                    } else {
                        formData.append("file", new Buffer(file));
                        // fileUrl = OSSOption.dir + '/' + filename;   //For SDK  upload & get
                    }
                    var result = await this.axios.post(OSSOption.host, formData)
                        .then(res => {
                            console.log("上传成功", res);
                            console.log("上传成功", fileUrl);
                            if (insert) {
                                if (~file.type.indexOf('image')) {
                                    // insert(fileUrl+'?x-oss-process=image/quality,q_80');
                                    insert(fileUrl);
                                } else {
                                    insert(fileUrl);
                                }
                            }
                            if(collectId){
                                return {url: fileUrl,id: res}
                            }else{
                                return fileUrl
                            }
                        })
                        .catch(e => {
                            console.log("上传失败", e);
                            insert ? insert(null) : '';
                        });
                    return result
                },
            }
        })
    }
}

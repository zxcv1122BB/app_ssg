webpackJsonp([4],{"1Ki+":function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e,a=i("mvHQ"),o=(e=a)&&e.__esModule?e:{default:e};i("l6IN");t.default={name:"login",data:function(){return{onlineUrl:""}},created:function(){this.get_ConfigureResult()},mounted:function(){localStorage.userName?$("#loginPhone").val(localStorage.userName):$("#loginPhone").val(""),$(".leftCenter").css({marginTop:-$(".leftCenter").height()/2+"px"})},methods:{routerBack:function(){4==localStorage.baseIndex&&(localStorage.baseIndex=1),this.$router.push({name:"index"})},setRmPwd:function(n){n=n.currentTarget,$(n).find(".rp_icon").is(".active")?$(n).find(".rp_icon").removeClass("active"):$(n).find(".rp_icon").addClass("active")},registerFree:function(){var n=0;-1!=navigator.userAgent.indexOf("lsApp")?n=3:-1!=navigator.userAgent.indexOf("Windows")?n=1:(navigator.userAgent.indexOf("Android")||navigator.userAgent.indexOf("iPhone"))&&(n=2);var t=this,i={type:"post",url:"/commonAPI/trialUserRegister",data:{chanel:n},success:function(n){if(200==n.code){localStorage.ifClose=0,localStorage.userName=n.body.userName,localStorage.uuid&&localStorage.removeItem("uuid");localStorage.access_token="Bearer "+n.body.token,localStorage.refreshToken="Bearer "+n.body.refreshToken,localStorage.chatAdmin=n.body.chatAdmin,t.base.clearId=1,t.base.initWebSocket(),t.$router.push({name:"index"})}else mui.toast(n.msg)},error:function(n){mui.toast("登录异常，请稍后重试"),$("#fullbg").css({display:"none"}),localStorage.clear()}};t.base.callCommonApi(i)},clickBtn:function(){var n=this,t=$("#loginPhone").val().trim(),i=$("#loginPassword").val().trim();if(""!=t.trim()&&""!=i.trim())if(t.length<5)mui.toast("账户名长度至少为5位");else if(i.length<6)mui.toast("密码长度至少为6位");else if(/[\u4e00-\u9fa5]/.test(t))mui.toast("账户名为字母和数字的组合");else{if(/[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im.test(t)||/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(t))mui.toast("名称不能包含特殊字符");else{i=hex_md5(t+i);localStorage.userName=t,this.$nextTick(function(){var e={type:"post",async:!1,url:"/api/login",data:{username:t,password:i},success:function(i){if(localStorage.access_token="Bearer "+i.token,localStorage.refreshToken="Bearer "+i.refreshToken,200==i.code){mui.toast("登录成功"),localStorage.ifClose=0,localStorage.userName=t,localStorage.userType_=i.userType,0==i.chatAdmin?localStorage.userType=1:localStorage.userType=3,localStorage.removeItem("uuid"),localStorage.removeItem("uuidTime"),localStorage.gameRebatesList=i.data;var e=localStorage.loginTo;localStorage.coinMsg=(0,o.default)({coin:i.coin,fcoin:i.FCION}),localStorage.baseIndex=4,$("#fullbg").hide(),n.base.clearId=1,n.base.initWebSocket(),e?(localStorage.loginTo="",n.$router.push({path:e})):n.$router.push({name:"index"})}else mui.toast(i.msg),localStorage.removeItem("userName"),$("#fullbg").css({display:"none"})}};n.base.callCommonApi(e)})}}else mui.toast("账户名或密码不能为空")},showBg:function(){$("body").height(),$("body").width();$("#fullbg").css({display:"block"})},clearUser:function(){$("#loginPhone").val("")},togoRegister:function(){this.$router.push({name:"register"})},get_ConfigureResult:function(){var n=this,t={type:"post",data:{},url:"/commonAPI/privacy/getSysConfigureResult",success:function(t){n.config=t.body,n.onlineUrl=n.config.onlineSys_config1,localStorage.setItem("config",(0,o.default)(t.body))}};this.base.callCommonApi(t)},togokefu:function(n){n?(localStorage.onlineServiceUrl=n,this.$router.push({name:"onlineService"})):mui.toast("请稍后重试")},togoIndex:function(){this.$router.push({name:"index"})},forget:function(){"none"==$(".popup").css("display")&&($(".popup").css({display:"block"}).addClass("ani"),$(".mask").css({display:"block"}))},togoyes:function(){$(".popup").css({display:"none"}).removeClass("ani"),$(".mask").css({display:"none"}),this.$router.push({name:"customerService"})},togono:function(){$(".popup").css({display:"none"}),$(".mask").css({display:"none"})}},watch:{$route:function(n,t){n.name}}}},"2let":function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAMAAADM4ogkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDJiODE3MC0yYzVkLTExNGQtYTVhZi1iOTRlZjk2ZTE3OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0NGRjA0QTM3MjMxMTFFOTgyQkZCMkJFREZGRjg5NUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0NGRjA0QTI3MjMxMTFFOTgyQkZCMkJFREZGRjg5NUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZWUxNTQ2ZTktNzk1My00OWNhLTk2OWItYjkzZWM5Zjk1NjMyIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNiOTI3MTMtYTUxNy0xMWU4LTgxODItODVjYzllYzkzNGFjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iVTaCwAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAAtElEQVR42pSUAQ7AIAgD2/9/eksWtUBRR7IE8QRhCKiCKcwCRzkWLZdQBCy7r6C7V7Rh2ljvr2ZELt1OVcupYYGWE58Kugpp8PdDx6nLb30EZWMHkmA1OfCLyiM49HTWZn0DLrWNjNRDprcKV0Knfw1ooY8gD+CoMz3I4JDCdaBsDNDnTfwAY+fC1zwc3T8F1KdAhOYstUzPtRVegnVS7Dmin2Up+83Uw+UgRTdx7UiZ8ggwALVPAttQACO/AAAAAElFTkSuQmCC"},"5XSH":function(n,t,i){n.exports=i.p+"static/img/log_bg.d612085.png"},"648q":function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAABQCAIAAABDMBZtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDJiODE3MC0yYzVkLTExNGQtYTVhZi1iOTRlZjk2ZTE3OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDc3RkQ5RjI0QzZDMTFFOTlDQkVBMTJFQzA0Q0M1OTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDc3RkQ5RjE0QzZDMTFFOTlDQkVBMTJFQzA0Q0M1OTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjI4NzUzZDAtZjI2Ny1iZDRkLTlmMzMtY2NmZDkyOTY2YmNmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNiOTI3MTMtYTUxNy0xMWU4LTgxODItODVjYzllYzkzNGFjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+AX3H3wAAAONJREFUeNrs3MEJgDAQBVETJVqdJ2u3nMQSPIQVVt6UMAw/exDLed0LItn2o7IQq7i1wkKs4nUlIVhxrYOFWMVjUBytmINoxYuKDcUPhoJiFeff4s6CoTAUoJhiW4zpil0UhoJiGAoVU4z5o81QqNhzBxVTbCigYhVTrGIV51fcKTYUhgIqVrGKoeIMR5uKVUwxPHcqVjHmLwoVq9gWQ8UqVjFUrGKKffyqYlsMFVNsKKBiiuEuVjHFoJhizx1UnEKxP79+MBQUGwqK8bbFhkLFP3ju4GhztOFNcafYc5ecR4ABAAtF0PNzdQcZAAAAAElFTkSuQmCC"},"7CwQ":function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDJiODE3MC0yYzVkLTExNGQtYTVhZi1iOTRlZjk2ZTE3OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkU4MkFBNjI0Qzc3MTFFOUFEMzBENDc2MEM5NzA0MEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkU4MkFBNjE0Qzc3MTFFOUFEMzBENDc2MEM5NzA0MEQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDFiM2Y0NGEtZmUxMy00NWRmLTliMGUtMmE2ODFlMjk3NzRhIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNiOTI3MTMtYTUxNy0xMWU4LTgxODItODVjYzllYzkzNGFjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2Do5tAAAAGZQTFRF39/f3t7e29vbw8PD4eHhx8fH4uLi/v7++vr61tbWzc3N+Pj48vLy6urqycnJxsbG/f39+/v71dXV/Pz84ODg1NTUxMTEyMjI5OTk3Nzc09PT5eXl2tra6enp3d3d////wsLC////dmOePQAAACJ0Uk5T////////////////////////////////////////////AA3Qw3EAAAE7SURBVHjalNXZlsIgDAbgAAPdNztus5G+/0tadNomQBVzpYfviPwNKUy0bG2KsjudurIwtWVLQD5X0CKpFqoozKVCr5TMQ9hojJRuPJhJ3CmZUdgfcbeO/QazAz6pQ7ZCiU9LLrDBF9U8YK5fwS6/w2Xj71HwdRgv2+YwVUvOo7VA3Ye1w5J8NcN1UVgmZ2ev649PYLfn+0mlc9tfaS3UZDMiuUOswWBM+g4NFBiRgcMCSi8SJ0OHJfhpOxk61BB0K8QcqhC6fXnyD6hjLpTaP8z9HBDK0ovn/7yhLHjgay6BNOwRkvx8WdOmYDlzOTfF1mbA83Nf/0ibscYVXvKscdercBmuPBIxGHoVEi6XzhOv62/iAPh5f6RM/VfakEofe+mD9I3R7Ia9OFN2FtXOW2F5fSgVeX3cBBgABXa0Wtd3VtYAAAAASUVORK5CYII="},AfOh:function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABKCAMAAABdNIDIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDJiODE3MC0yYzVkLTExNGQtYTVhZi1iOTRlZjk2ZTE3OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDU1MEVBMjE0QzZDMTFFOTlDQkVBMTJFQzA0Q0M1OTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDU1MEVBMjA0QzZDMTFFOTlDQkVBMTJFQzA0Q0M1OTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjI4NzUzZDAtZjI2Ny1iZDRkLTlmMzMtY2NmZDkyOTY2YmNmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNiOTI3MTMtYTUxNy0xMWU4LTgxODItODVjYzllYzkzNGFjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YtDbWAAAAN5QTFRFC3+BJ5WVCH1/CX5/F4mKB3x+KZeWBnp9HI2NZcbAS7GtFoiJM56dUbayXL+5NaCed9HNd9PMasrDMZ2bbMvEFIeIV7q2ddHKI5OSEIOFbczFIpGRD4KEHo6OP6ilc9DJcM7HG4yMGYqLJZSTDYGDK5iXc8nNQammDICCXsC7eNTNEYWGW724T7SwYsO9R66rbL7MVbm0O6Wib83GIJCQcs/IN6KfQ6uoL5uaBXR8Cn+AdtLLacjCZ8fBWby3Ra2pZMS+E4aGLZqZOaOhTbOvYMK8Y63LSbCsPaakU7ezUxTVKQAAALtJREFUeNrEwQdCAQAAQNEfkpSIkD3KHtlURpF1/wt1jP8eJwEjAU0BCQFdAc8CvgVkBVQEzAVUBUwF5AW8CEgKWAvYCLgX8CNgKOAooCPgSUBfwFZARsBYwFVATMBAwJ+AqICzgA8BOwFLAS0BZQEXARMBBwELAXEBjwJSAlYC9gIaAsICbgS8CXgVUBAwE1ASEBFQE1AXEBLwICAt4FdAT0BOQFHAu4C2AMWXgKCAgIBbAXcCPgX/AgwAqyzIIUFuktQAAAAASUVORK5CYII="},DhJC:function(n,t,i){var e=i("FEzi");"string"==typeof e&&(e=[[n.i,e,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};i("MTIv")(e,a);e.locals&&(n.exports=e.locals)},FEzi:function(n,t,i){var e=i("kxFB");(n.exports=i("FZ+f")(!1)).push([n.i,"/* body {\n    background-color: #ede9e9;\n    box-sizing: border-box;\n} */\n\n/*登录框*/\n\n/* .child-view{\n  position: absolute;\n  top: 0;\n  left: 0;\n} */\n#container[data-v-530c98a6] {\n  margin: 0;\n  padding-top: 50px;\n  background:url("+e(i("5XSH"))+");\n  background-size: cover;\n}\n\n/* .child-view {\n  background-color: #f5f5f5;\n} */\n\n/* .btn_bg{\n  background:url(../../assets/images/base/btn_bg_03.png) repeat-x;\n} */\n.loginDiv[data-v-530c98a6] {\n  /*margin: 3rem 1rem;*/\n  /*position: relative;*/\n  /* padding: 2rem 1rem; */\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.loginDiv .head[data-v-530c98a6]{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    /* padding: 50px 0; */\n    /* padding:3rem 0; */\n    margin: 0 auto;\n    width: 300px;\n    /* padding-top: 2rem; */\n    height: 100px;\n}\n.loginDiv .head>img[data-v-530c98a6]{\n   width: 80%;\n  /* height: 40px; */\n  /*height: 80px;*/\n}\n#login[data-v-530c98a6] {\n  width: 300px;\n  margin: 0 auto;\n  position: relative;\n  z-index: 10;\n}\n\n/* #login::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(250,250,250,0.2);\n  z-index: -1;\n  border-radius: 8px;\n} */\n.mui-input-row label[data-v-530c98a6]{\n  padding: 0;\n  width: 16%;\n  /* padding-left: 8%; */\n  /* margin-left:-16px; */\n  line-height: 42px;\n  /* width: 3.5rem; */\n  background: -webkit-gradient(linear,left top, left bottom,from(rgba(48,45,62,.2)),to(rgba(29,31,46,.4)));\n  background: linear-gradient(rgba(48,45,62,.2),rgba(29,31,46,.4));\n  height: 3rem;\n}\n.mui-input-row label i[data-v-530c98a6]{\n  padding-left: 50%;\n  margin-left: -12px;\n}\n.mui-input-row .mui-input[data-v-530c98a6]{\n  width: 84%;\n  text-indent: 1rem;\n  margin-top: 0;\n  height: 3rem;\n}\n.btn_bg[data-v-530c98a6]{\n  background: -webkit-gradient(linear,left top, left bottom,from(rgba(52,47,78,.2)),to(rgba(25,25,41,.4)));\n  background: linear-gradient(rgba(52,47,78,.2),rgba(25,25,41,.4));\n  border:1px solid #313444;\n  color: #fff;\n  border-radius: 8px;\n}\n.mui-input-row input[data-v-530c98a6]::-webkit-input-placeholder { /* WebKit browsers */\n  color:    #cdcfdd;\n}\n.mui-input-group .mui-input-row[data-v-530c98a6]:after{\n  height: 0;\n}\n.link-area[data-v-530c98a6] {\n  /* display: flex; */\n  /* margin-top: 15px; */\n  /* text-align: right; */\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 20px;\n}\n.link-area .mui-btn[data-v-530c98a6]{\n  /* border-radius: 8px;\n  color: rgb(255, 255, 255);\n  background: none; */\n  margin: 20px auto 0px;\n  width: 120px;\n  padding: 9px 0px;\n  width: 48%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #f2f2f2;\n  /* border-color: rgb(255, 255, 255); */\n}\n.link-area .mui-btn[data-v-530c98a6]:nth-child(1){\n  margin-right: 4%;\n}\n.link-area .mui-btn[data-v-530c98a6]:nth-child(2){\n  float: right;\n}\n.input_close[data-v-530c98a6]{\n  position: absolute;\n  right: 10px;\n  width: 20px;\n  height: 20px;\n  top: 10px;\n}\n.mui-input-group[data-v-530c98a6]::after, .mui-input-group[data-v-530c98a6]::before {\n  height: 0;\n}\n#login .mui-content-padded[data-v-530c98a6]{\n  margin-left: 0;\n  margin-right: 0;\n}\n.login_btnbg[data-v-530c98a6]{\n  background: url("+e(i("AfOh"))+") repeat-x;\n  color: #fff;\n}\n.reg_btnbg[data-v-530c98a6]{\n  background: url("+e(i("648q"))+") repeat-x;\n  color: #fff;\n  border-radius: inherit;\n  border:none;\n}\n.register[data-v-530c98a6]{\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n}\n.l_close[data-v-530c98a6]{\n  position: absolute;\n  top: 1.5rem;\n  right: 1.5rem;\n}\n.l_close>img[data-v-530c98a6]{\n  width: 1.2rem;\n  height: 1.2rem;\n}\n.loginDiv .ref[data-v-530c98a6] {\n  color: red;\n}\n.custome-14b2ba .child-view #container #main .loginDiv .ref[data-v-530c98a6]{\n  color: #fff;\n}\n.loginDiv p[data-v-530c98a6] {\n  font-size: 1rem;\n  margin-bottom: 10px;\n  position: relative;\n}\n\n/* .loginDiv span {\n  position: absolute;\n  left: 2.4rem;\n  margin-top: 0.4rem;\n} */\n.loginDiv>p>input[data-v-530c98a6] {\n  outline: none;\n  display: block;\n  width: 85%;\n  height: 2.5rem;\n  line-height: 1rem;\n  padding: 1rem 0 1rem 2.5rem;\n  font-size: 1rem;\n  margin: auto;\n  border: 0;\n  border-radius: 8px;\n  background-color: white !important;\n}\n.prompt[data-v-530c98a6] {\n  width: 100%;\n  height: 2rem;\n  padding-top: 1rem;\n  text-align: center;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fa5b5b;\n}\n.loginBtn[data-v-530c98a6] {\n  display: block;\n  width: 90%;\n  height: 2.5rem;\n  /* background-color: #ba142b; */\n  color: white;\n  font-size: 1rem;\n  text-align: center;\n  margin: 1rem auto;\n  border-radius: 7px;\n  line-height: 2.5rem;\n}\n\n/*其他方式登录*/\n\n/*.newLogin p{\n\tfont-size: 1.2rem;\n\tline-height: 10rem;\n\tpadding-left: 1rem;\n\tbox-sizing: border-box;\n}*/\n\n/*底部按钮*/\n.btn[data-v-530c98a6] {\n  font-size: 1rem;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  border-top: 1px solid #cccccc;\n}\n.btn>a[data-v-530c98a6] {\n  width: 49.7%;\n  float: left;\n  text-align: center;\n  line-height: 3.5rem;\n  color: #333333;\n  background-color: #FFFFFF;\n}\n.btn>a[data-v-530c98a6]:first-child {\n  border-right: 1px solid #ccc;\n}\n\n/* 联系客服 */\n.mask[data-v-530c98a6] {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.3);\n  display: none;\n}\n.popup[data-v-530c98a6] {\n  position: fixed;\n  top: 11rem;\n  left: 50%;\n  -webkit-transform: translate(-50%);\n          transform: translate(-50%);\n  width: 70%;\n  display: none;\n  -webkit-transition: all 0.6s;\n  transition: all 0.6s;\n  z-index: 6;\n}\n.popup .body[data-v-530c98a6] {\n  padding: 50px;\n  line-height: 22px;\n  background-color: #009f95;\n  color: #fff;\n  font-weight: 300;\n  text-align: center;\n}\n.popup .body p[data-v-530c98a6] {\n  color: #fff\n}\n.popup .footer[data-v-530c98a6] {\n  height: 3rem;\n  background: #fff;\n  padding: 0.6rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.popup a[data-v-530c98a6] {\n  display: block;\n  float: left;\n  height: 1.8rem;\n  line-height: 1.8rem;\n  text-align: center;\n  width: 5.0rem;\n  background: #1E9FFF;\n  border: 1px solid #dedede;\n  border-radius: 3px;\n  color: #fff;\n  font-size: .9rem;\n  margin-left: 2rem;\n}\n.popup .no[data-v-530c98a6] {\n  background: #fff;\n  color: #333;\n  margin-left: 3rem;\n}\n.popup.ani[data-v-530c98a6] {\n  -webkit-animation: Content-data-v-530c98a6 0.6s;\n          animation: Content-data-v-530c98a6 0.6s;\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n@-webkit-keyframes Content-data-v-530c98a6 {\nfrom {\n    -webkit-transform: translate(-100%) rotate(-90deg);\n            transform: translate(-100%) rotate(-90deg);\n}\nto {\n    -webkit-transform: translate(-55%) rotate(0deg);\n            transform: translate(-55%) rotate(0deg);\n}\n}\n@keyframes Content-data-v-530c98a6 {\nfrom {\n    -webkit-transform: translate(-100%) rotate(-90deg);\n            transform: translate(-100%) rotate(-90deg);\n}\nto {\n    -webkit-transform: translate(-55%) rotate(0deg);\n            transform: translate(-55%) rotate(0deg);\n}\n}\n\n/*弹窗*/\n#fullbg[data-v-530c98a6] {\n  background-color: gray;\n  left: 0;\n  opacity: 0.5;\n  position: fixed !important;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 3;\n  filter: alpha(opacity=50);\n  -moz-opacity: 0.5;\n  -khtml-opacity: 0.5;\n  display: none;\n}\n.area[data-v-530c98a6]{\n  position: absolute;\n  width: 90%;\n  left: 5%;\n  /* background: rgba(227,229,236,.4); */\n  /* background: linear-gradient(bottom,rgba(240,242,247,.4),rgba(162,160,180,.4));  */\n  background: -webkit-gradient(linear,left bottom, left top,from(hsla(220,2%,96%,.2)),to(hsla(246,11%,71%,.4)));\n  background: linear-gradient(bottom,hsla(220,2%,96%,.2),hsla(246,11%,71%,.4));\n  padding: 5%;\n  border-radius: 10px;\n  padding-right: 15%;\n  height: calc(100% - 200px);\n}\n.area .left .title[data-v-530c98a6]{\n  /* height: 20%; */\n  font-size: 1.5rem;\n  text-align: center;\n  color: #fff;\n  /* padding-top: 25px; */\n  padding-bottom: 10%;\n  letter-spacing: 5px;\n}\n.area .right[data-v-530c98a6]{\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 10%;\n  height: 100%;\n  /* background: #000; */\n  background: -webkit-gradient(\n\t\t\tlinear,\n\t\t\tleft top, left bottom,\n\t\t\tfrom(/* rgba(50,51,52,.5), */),\n      to(hsla(240,10%,8%,.9))\n\t\t);\n  background: linear-gradient(\n\t\t\tto bottom,\n\t\t\t/* rgba(50,51,52,.5), */\n      /* rgba(18,18,20,.8) */\n      hsla(220,4%,20%,.95),\n      hsla(240,10%,8%,.9)\n\t\t);\n\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n}\n.area .right span[data-v-530c98a6]:nth-child(2){\n  color: #fff;\n    position: absolute;\n    top: 50%;\n    margin-top: -2.5rem;\n    line-height: 1.5rem;\n    width: 1rem;\n    left: 50%;\n    margin-left: -.5rem;\n}\n.loginBtn[data-v-530c98a6]{\n  background: initial;\n  border: 1px solid #826375;\n  /* color: #262a38; */\n  color: #fff;\n}\n.rlicon[data-v-530c98a6]{\n  background: url("+e(i("2let"))+") no-repeat;\n  background-size: contain;\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-top: -4rem;\n  margin-left: -10px;\n}\n.leftCenter[data-v-530c98a6]{\n  position: absolute;\n  top: 50%;\n  padding-left: 5%;\n  width: 80%;\n}\n.rp_icon[data-v-530c98a6]{\n  background-image: url("+e(i("abyC"))+");\n  background-repeat:  no-repeat;\n  background-size: contain;\n  width: 30px;\n  height: 30px;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  margin-top: -15px;\n}\n.rp_icon.active[data-v-530c98a6]{\n  background-image: url("+e(i("Nfao"))+");\n}\n",""])},Nfao:function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACnklEQVRYR+2Wu2sUURTGvzOzaLZRsyA794hExAQLwUI0lYUYMGojERvxgY2IiLEQTRCrxAeKhYUkNuIDi9ikUAyC+gf4QBS7EFDD3Du7xOgKC7uwO0cGXfCxM3c2EYKQ295zvu833z1zZwgLvGiB/bEI8H8mICKuMaZLRDYC6CAi33GcyXw+/5qIaq3MVUsJBEHQHYbhVRHZQkRLmxiVReQhEQ0w88c0IKkApqens67rXgDQD8CxCYtIlYiGmXnYVmsFCIJgbRiGzwCssYk12R9XSu0lIonrTQQQEccY8wLApjmYN1pOMfP1OQH4vn+WiC7PwxwiUslkMhvy+fxUM53YBLTW60XkLREtmQ/Az96XSqnuZkeRBBDFdvIfmDckNjPzqz/1kgCeA9jWAkDZcZyeer0+REQ9fxkRHVFK3U4N4Pv+FyJakRIgFJFeInoD4B0A1aTvGjOfTgVQLBa9Wq1mYsyjo1kHYPcv+/1KqVFjzFMAW2P6njBzbyqAUqmUK5fLn2OEzimlrhhjHgHYAWCEmY9rrccB7ElIbIKZd6UCiIq01jomyuhSOayUGguCYNDzvCFjzBkAlyzHFd2M51sBeAxgZ4xo6DjOfs/zxrTWRwGMAtZ/iz5mjlL6bSW9BRcBDCY8VV1ERojoGIBMimHtYOZPqQF8319NRO8BLEshbitpev5RU+K3QGt9EMBdm7pl/5vjOJ2e5xWb1Vm/hlrrBwD2zQPiEDPfi+u3AszOzi6vVCq3APTNAeImM0czErusAI1OrfUBADdSzkSBfly9Ezbo1ACR0MzMzKpqtXqHiLYnCN/PZrMn2tvbv9rMrUMYJ1AoFPL1er1TRLoArHRd90MYhlNtbW2TuVyulMa4UdNSAq0Ip61dBFhM4DsSJN4hICymLwAAAABJRU5ErkJggg=="},abyC:function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC2klEQVRYR+2VT0gUYRjGn3dmdfWSEYRFiBEqHoIOUZ46RIKm1Q7GtLu2Y3kJicgOUUkEgvaHooOH0C6hza7suNDOliRBhef+EEXgwYT+Z0GUQbDqzryxkh50ZufbPEjgXL/3eZ7fPN/3zRBW+KEVzscqwP/ZgKqqspQpqoKFbURcbhN/klgan5z68Hx0dDSTz7nKq4FQQKsB+BqDdhLBvySI8ZuBe7JsnRu8M/hOBEQIQFXVYnnGfxFE7QAkL2NmTDOhe8jUu71mPQGaG5u32AXyIwCbvcyWNsLJeCp6EAC7aXMCdKJTGlPePCHQ9rzD/woYfMowoz3/BBAKRM6C6Mq/hs/pGGkmaathDkw4+bg2EN4frrZl+SWBCpcFMMfATw0zWuO0Fa4AoYDWA8LJ5YYv6G3siN/Vny32cwUIBrTHRNgtDJC9grZdC0nqIkKtg641bur94gCK9oOAtYIANtlcD7ZesCy/AmjjYh0D1w1TPy0EoDYc3SAXWl+cwhncQ4wKEDUurDParcJ0nzzjfwiiXY46xgMjpdeLAdSp6+Tiou+Ob898fnLq49XSkrJhItQxuNcwo8eDSiRJIMWtMQaPGGa0QQggOxRSIp8dq2RmIjpiFaQNedbfUW1WdI0Fxs8QSZdzb5fdHTdjF4QBgkrkPoH2upjaYLs5nooZQSVyDIw+Isr9VWW7KZ6KJYUBQop2CUBHjkotAL1gtBGRz+uwWhmUJ4b19+IAgVAZ4HsNojVe5l7rbvuf1eWsLaRoGoDbXgE515l/TUtUmUzq3/L6FM8PBxVtiAB1GRAtcVPX3fSev2NVVUuk2aJbBDTlC8HMN41UtC2XzhNgXnxIORyRmG4InQnmr0zcapixES9oYYCskbqvZZPkswcItMf1djDHpsl3wjT7f3qFex5CN4PwgXBpRvZVypZdBaL1AL8FSxOWPz2eSCSmRILnZ/JqIB9j0dlVgNUG/gCjjQAwg3g1wAAAAABJRU5ErkJggg=="},gJkk:function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=i("1Ki+"),a=i.n(e);for(var o in e)"default"!==o&&function(n){i.d(t,n,function(){return e[n]})}(o);var r=i("iDVf");var c=function(n){i("DhJC")},l=i("VU/8")(a.a,r.a,!1,c,"data-v-530c98a6",null);t.default=l.exports},iDVf:function(n,t,i){"use strict";var e={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{attrs:{id:"container"}},[e("div",{attrs:{id:"main"}},[e("div",{staticClass:"loginDiv"},[n._m(0),n._v(" "),e("div",{staticClass:"area"},[e("div",{staticClass:"left"},[e("div",{staticClass:"title"},[n._v(n._s(n.$t("登录")))]),n._v(" "),e("div",{staticClass:"leftCenter"},[e("div",{staticClass:"mui-input-row btn_bg",staticStyle:{"margin-bottom":"10px"}},[n._m(1),n._v(" "),e("input",{staticClass:"mui-input-clear mui-input",attrs:{name:"phone",type:"text",id:"loginPhone",placeholder:"账户名",onKeypress:"javascript:if(event.keyCode == 32)event.returnValue = false;","data-input-clear":"1"}}),e("span",{staticClass:"mui-icon mui-icon-clear mui-hidden"}),n._v(" "),e("img",{staticClass:"input_close",attrs:{src:i("7CwQ"),alt:""},on:{click:n.clearUser}})]),n._v(" "),n._m(2),n._v(" "),e("div",{staticClass:"link-area clearfix"},[e("a",{staticClass:"mui-btn btn_bg",staticStyle:{"padding-left":"10px"},attrs:{href:"javascript:void(0)"},on:{click:function(t){n.setRmPwd(t)}}},[e("span",{staticClass:"rp_icon"}),n._v(n._s(n.$t("记住密码")))]),n._v(" "),e("a",{staticClass:"mui-btn btn_bg",attrs:{href:"javascript:void(0)"},on:{click:function(t){n.togokefu(n.onlineUrl)}}},[n._v("忘记密码？")])]),n._v(" "),e("div",[e("span",{staticClass:"loginBtn",on:{click:n.clickBtn}},[n._v(n._s(n.$t("登录")))])])])]),n._v(" "),e("div",{staticClass:"right",on:{click:n.togoRegister}},[e("span",{staticClass:"rlicon"}),n._v(" "),e("span",[n._v(n._s(n.$t("注册新用户")))])])]),n._v(" "),e("div",{staticClass:"l_close",on:{click:n.routerBack}},[e("img",{attrs:{src:i("uVpr"),alt:""}})]),n._v(" "),e("div",{staticClass:"prompt"})]),n._v(" "),e("div",{attrs:{id:"fullbg"}}),n._v(" "),e("div",{staticClass:"popup"},[e("div",{staticClass:"body"},[e("div",{staticClass:"go_service"},[e("p",[n._v(n._s(n.$t("联系客服修改密码")))])])]),n._v(" "),e("div",{staticClass:"footer"},[e("a",{staticClass:"yes",attrs:{href:"javascript:;"},on:{click:n.togoyes}},[n._v(n._s(n.$t("火速前往")))]),n._v(" "),e("a",{staticClass:"no",attrs:{href:"javascript:;"},on:{click:n.togono}},[n._v(n._s(n.$t("残忍拒绝")))])])]),n._v(" "),e("div",{staticClass:"mask"})])])])},staticRenderFns:[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"head"},[t("img",{attrs:{src:i("XGiN")}})])},function(){var n=this.$createElement,t=this._self._c||n;return t("label",[t("i",{staticClass:"mui-icon mui-icon-person"})])},function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"mui-input-row btn_bg"},[t("label",[t("i",{staticClass:"mui-icon mui-icon-locked"})]),this._v(" "),t("input",{staticClass:"mui-input-clear mui-input",attrs:{name:"password",id:"loginPassword",type:"password",placeholder:"密码",onKeypress:"javascript:if(event.keyCode == 32)event.returnValue = false;","data-input-clear":"2"}}),t("span",{staticClass:"mui-icon mui-icon-clear mui-hidden"})])}]};t.a=e},uVpr:function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDJiODE3MC0yYzVkLTExNGQtYTVhZi1iOTRlZjk2ZTE3OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjBGQTkxNDA0QzZCMTFFOUEzQzhGOUI3RDc0MkNDMzkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjBGQTkxM0Y0QzZCMTFFOUEzQzhGOUI3RDc0MkNDMzkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjM4NjZjZmEtM2ZkYi1kMjRmLTlmYjgtZDAyY2QzYWFmODNlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNiOTI3MTMtYTUxNy0xMWU4LTgxODItODVjYzllYzkzNGFjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+76718AAAAT9JREFUeNq81s0KQVEQB/CJBxDxBLJhoTyzslLKUihl4as8CYWF3TFTR9047p2ZM2Pqv5q5zu9eNwNCCAPMEfPAzDAtDDinjZnHM/eYPkREsU7OmA7m/HHmlhr38F1emBSC6loDgCV81wizwLTArjrxM4eJ3gLinZ9CuqyezK8nQXXANN6DnpgyBL2oDZorXuCBYSE+IdYYNiIFscKIEL8guZi2FFEG0WJUiCqIFKNGcCBcTBaCC+FgshASSBUmCyGFSDAihAbCwYgRlJpii9I19ZJ+vaKfLsU/qzPjqxHvJg+ECmOB2FssSgsEvZjNXIwF4j2bhQHjLarGmK7yHIw1Qo3xQKgwXMRO87MtwXgiRBhvBBfTpKGpM4KDmdDA8w+IKsyNmts/IcowK2r0MBvMBTN2RhQxk3jmGtN9CTAA2UI3xuD9vvgAAAAASUVORK5CYII="}});
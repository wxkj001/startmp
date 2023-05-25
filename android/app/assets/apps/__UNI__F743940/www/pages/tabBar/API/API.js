"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(()=>{var T=Object.create;var b=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var S=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports);var k=(a,t,u,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of D(t))!v.call(a,n)&&n!==u&&b(a,n,{get:()=>t[n],enumerable:!(i=A(t,n))||i.enumerable});return a};var g=(a,t,u)=>(u=a!=null?T(y(a)):{},k(t||!a||!a.__esModule?b(u,"default",{value:a,enumerable:!0}):u,a));var m=S((Q,F)=>{F.exports=Vue});var d=g(m());var c=(a,t)=>{let u=a.__vccOpts||a;for(let[i,n]of t)u[i]=n;return u};var x={name:"u-link",props:{href:{type:String,default:""},text:{type:String,default:""},inWhiteList:{type:Boolean,default:!1}},methods:{openURL(){plus.runtime.openURL(this.href)}}};function w(a,t,u,i,n,o){return(0,d.openBlock)(),(0,d.createElementBlock)("u-text",{style:{"text-decoration":"underline"},href:u.href,onClick:t[0]||(t[0]=(...p)=>o.openURL&&o.openURL(...p)),inWhiteList:u.inWhiteList},(0,d.toDisplayString)(u.text),9,["href","inWhiteList"])}var E=c(x,[["render",w]]);var e=g(m());var G=g(m()),I=a=>typeof a=="string";function B(a,t){return I(a)?t:a}var L={name:"page-head",props:{title:{type:String,default:""}}};function P(a,t,u,i,n,o){return(0,e.openBlock)(),(0,e.createElementBlock)("view",{class:"common-page-head",renderWhole:!0},[(0,e.createElementVNode)("view",{class:"common-page-head-title"},[(0,e.createElementVNode)("u-text",null,(0,e.toDisplayString)(u.title),1)])])}var R=c(L,[["render",P]]),W={button:{"":{marginTop:"30rpx",marginLeft:0,marginRight:0}},"btn-area":{"":{paddingTop:"30rpx"}}},H={data(){return{title:"tababr",hasSetTabBarBadge:!1,hasShownTabBarRedDot:!1,hasCustomedStyle:!1,hasCustomedItem:!1,hasHiddenTabBar:!1}},destroyed(){if(this.hasSetTabBarBadge&&uni.removeTabBarBadge({index:1}),this.hasShownTabBarRedDot&&uni.hideTabBarRedDot({index:1}),this.hasHiddenTabBar&&uni.showTabBar(),this.hasCustomedStyle&&uni.setTabBarStyle({color:"#7A7E83",selectedColor:"#007AFF",backgroundColor:"#F8F8F8",borderStyle:"black"}),this.hasCustomedItem){let a={index:1,text:"\u63A5\u53E3",iconPath:"/static/api.png",selectedIconPath:"/static/apiHL.png"};uni.setTabBarItem(a)}},methods:{navigateBack(){this.$emit("unmount")},setTabBarBadge(){this.hasShownTabBarRedDot&&(uni.hideTabBarRedDot({index:1}),this.hasShownTabBarRedDot=!this.hasShownTabBarRedDot),this.hasSetTabBarBadge?uni.removeTabBarBadge({index:1}):uni.setTabBarBadge({index:1,text:"1"}),this.hasSetTabBarBadge=!this.hasSetTabBarBadge},showTabBarRedDot(){this.hasSetTabBarBadge&&(uni.removeTabBarBadge({index:1}),this.hasSetTabBarBadge=!this.hasSetTabBarBadge),this.hasShownTabBarRedDot?uni.hideTabBarRedDot({index:1}):uni.showTabBarRedDot({index:1}),this.hasShownTabBarRedDot=!this.hasShownTabBarRedDot},hideTabBar(){this.hasHiddenTabBar?uni.showTabBar():uni.hideTabBar(),this.hasHiddenTabBar=!this.hasHiddenTabBar},customStyle(){this.hasCustomedStyle?uni.setTabBarStyle({color:"#7A7E83",selectedColor:"#007AFF",backgroundColor:"#F8F8F8",borderStyle:"black"}):uni.setTabBarStyle({color:"#FFF",selectedColor:"#007AFF",backgroundColor:"#000000",borderStyle:"black"}),this.hasCustomedStyle=!this.hasCustomedStyle},customItem(){let a={index:1,text:"\u63A5\u53E3",iconPath:"/static/api.png",selectedIconPath:"/static/apiHL.png"};this.hasCustomedItem||(a.text="API"),uni.setTabBarItem(a),this.hasCustomedItem=!this.hasCustomedItem}}};function N(a,t,u,i,n,o){let p=B((0,e.resolveDynamicComponent)("page-head"),R),s=(0,e.resolveComponent)("button");return(0,e.openBlock)(),(0,e.createElementBlock)("view",{class:"uni-padding-wrap",renderWhole:!0},[(0,e.createVNode)(p,{title:n.title},null,8,["title"]),(0,e.createVNode)(s,{class:"button",onClick:o.setTabBarBadge},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)((0,e.toDisplayString)(n.hasSetTabBarBadge?"\u79FB\u9664tab\u5FBD\u6807":"\u8BBE\u7F6Etab\u5FBD\u6807"),1)]),_:1},8,["onClick"]),(0,e.createVNode)(s,{class:"button",onClick:o.showTabBarRedDot},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)((0,e.toDisplayString)(n.hasShownTabBarRedDot?"\u79FB\u9664\u7EA2\u70B9":"\u663E\u793A\u7EA2\u70B9"),1)]),_:1},8,["onClick"]),(0,e.createVNode)(s,{class:"button",onClick:o.customStyle},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)((0,e.toDisplayString)(n.hasCustomedStyle?"\u79FB\u9664\u81EA\u5B9A\u4E49\u6837\u5F0F":"\u81EA\u5B9A\u4E49Tab\u6837\u5F0F"),1)]),_:1},8,["onClick"]),(0,e.createVNode)(s,{class:"button",onClick:o.customItem},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)((0,e.toDisplayString)(n.hasCustomedItem?"\u79FB\u9664\u81EA\u5B9A\u4E49\u4FE1\u606F":"\u81EA\u5B9A\u4E49Tab\u4FE1\u606F"),1)]),_:1},8,["onClick"]),(0,e.createVNode)(s,{class:"button",onClick:o.hideTabBar},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)((0,e.toDisplayString)(n.hasHiddenTabBar?"\u663E\u793ATabBar":"\u9690\u85CFTabBar"),1)]),_:1},8,["onClick"]),(0,e.createElementVNode)("view",{class:"btn-area"},[(0,e.createVNode)(s,{class:"button",type:"primary",onClick:o.navigateBack},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)("\u8FD4\u56DE\u4E0A\u4E00\u7EA7")]),_:1},8,["onClick"])])])}var V=c(H,[["render",N],["styles",[W]]]),z={"uni-icon":{"":{fontFamily:"uniicons",fontWeight:"normal"}},"uni-container":{"":{paddingTop:15,paddingRight:15,paddingBottom:15,paddingLeft:15,backgroundColor:"#f8f8f8"}},"uni-header-logo":{"":{paddingTop:15,paddingRight:15,paddingBottom:15,paddingLeft:15,flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"10rpx"}},"uni-header-image":{"":{width:80,height:80}},"uni-hello-text":{"":{marginBottom:20}},"hello-text":{"":{color:"#7A7E83",fontSize:14,lineHeight:20}},"hello-link":{"":{color:"#7A7E83",fontSize:14,lineHeight:20}},"uni-panel":{"":{marginBottom:12}},"uni-panel-h":{"":{backgroundColor:"#ffffff","!flexDirection":"row","!alignItems":"center",paddingTop:12,paddingRight:12,paddingBottom:12,paddingLeft:12}},"uni-panel-h-on":{"":{backgroundColor:"#f0f0f0"}},"uni-panel-text":{"":{flex:1,color:"#000000",fontSize:14,fontWeight:"normal"}},"uni-panel-icon":{"":{marginLeft:15,color:"#999999",fontSize:14,fontWeight:"normal",transform:"rotate(0deg)",transitionDuration:0,transitionProperty:"transform"}},"uni-panel-icon-on":{"":{transform:"rotate(180deg)"}},"uni-navigate-item":{"":{flexDirection:"row",alignItems:"center",backgroundColor:"#FFFFFF",borderTopStyle:"solid",borderTopColor:"#f0f0f0",borderTopWidth:1,paddingTop:12,paddingRight:12,paddingBottom:12,paddingLeft:12,"backgroundColor:active":"#f8f8f8"}},"uni-navigate-text":{"":{flex:1,color:"#000000",fontSize:14,fontWeight:"normal"}},"uni-navigate-icon":{"":{marginLeft:15,color:"#999999",fontSize:14,fontWeight:"normal"}},"@TRANSITION":{"uni-panel-icon":{duration:0,property:"transform"}}},q={components:{setTabBar:V},props:{hasLeftWin:{type:Boolean},leftWinActive:{type:String}},data(){return{showSetTabBarPage:!1,list:[{id:"page",name:"\u754C\u9762",open:!1,pages:[{name:"\u8BBE\u7F6E\u5BFC\u822A\u6761",url:"set-navigation-bar-title"},{name:"\u539F\u751F\u5B50\u7A97\u4F53",url:"subnvue"},{name:"\u9875\u9762\u8DF3\u8F6C",url:"navigator"},{name:"\u8BBE\u7F6ETabBar",url:"set-tabbar"},{name:"\u4E0B\u62C9\u5237\u65B0",url:"pull-down-refresh"},{name:"\u521B\u5EFA\u52A8\u753B",url:"animation"},{name:"\u521B\u5EFA\u7ED8\u753B",url:"canvas"},{name:"\u8282\u70B9\u4FE1\u606F",url:"get-node-info"},{name:"\u8282\u70B9\u5E03\u5C40\u4EA4\u4E92\u72B6\u6001",url:"intersection-observer"},{name:"\u663E\u793A\u64CD\u4F5C\u83DC\u5355",url:"action-sheet"},{name:"\u663E\u793A\u6A21\u6001\u5F39\u7A97",url:"modal"},{name:"\u663E\u793A\u52A0\u8F7D\u63D0\u793A\u6846",url:"show-loading"},{name:"\u663E\u793A\u6D88\u606F\u63D0\u793A\u6846",url:"toast"}]},{id:"device",name:"\u8BBE\u5907",open:!1,pages:[{name:"\u83B7\u53D6\u8BBE\u5907\u7F51\u7EDC\u72B6\u6001",url:"get-network-type"},{name:"\u83B7\u53D6\u8BBE\u5907\u7CFB\u7EDF\u4FE1\u606F",url:"get-system-info"},{name:"\u6253\u7535\u8BDD",url:"make-phone-call"},{name:"\u9707\u52A8",url:"vibrate"},{name:"\u6DFB\u52A0\u624B\u673A\u8054\u7CFB\u4EBA",url:"add-phone-contact"},{name:"\u626B\u7801",url:"scan-code"},{name:"\u526A\u8D34\u677F",url:"clipboard"},{name:"\u5C4F\u5E55\u4EAE\u5EA6",url:"brightness"},{name:"\u84DD\u7259",url:"bluetooth"},{name:"\u751F\u7269\u8BA4\u8BC1",url:"soter"},{name:"iBeacon",url:"ibeacon"},{name:"\u76D1\u542C\u52A0\u901F\u5EA6\u4F20\u611F\u5668",url:"on-accelerometer-change"},{name:"\u76D1\u542C\u7F57\u76D8\u6570\u636E",url:"on-compass-change"},{name:"\u76D1\u542C\u8DDD\u79BB\u4F20\u611F\u5668",url:"/platforms/app-plus/proximity/proximity"},{name:"\u76D1\u542C\u65B9\u5411\u4F20\u611F\u5668",url:"/platforms/app-plus/orientation/orientation"}]},{id:"network",name:"\u7F51\u7EDC",open:!1,pages:[{name:"\u53D1\u8D77\u4E00\u4E2A\u8BF7\u6C42",url:"request"},{name:"\u4E0A\u4F20\u6587\u4EF6",url:"upload-file"},{name:"\u4E0B\u8F7D\u6587\u4EF6",url:"download-file"}]},{id:"websocket",name:"websocket",open:!1,pages:[{name:"socketTask",url:"websocket-socketTask"},{name:"\u5168\u5C40websocket",url:"websocket-global"}]},{id:"media",name:"\u5A92\u4F53",open:!1,pages:[{name:"\u56FE\u7247",url:"image"},{name:"\u97F3\u9891",url:"inner-audio"},{name:"\u5F55\u97F3",url:"voice"},{name:"\u80CC\u666F\u97F3\u9891",url:"background-audio"},{name:"\u89C6\u9891",url:"video"},{name:"\u6587\u4EF6",url:"file"},{name:"\u4FDD\u5B58\u5A92\u4F53\u5230\u672C\u5730",url:"save-media"}]},{id:"location",name:"\u4F4D\u7F6E",open:!1,pages:[{name:"\u83B7\u53D6\u5F53\u524D\u4F4D\u7F6E",url:"get-location"},{name:"\u4F7F\u7528\u5730\u56FE\u67E5\u770B\u4F4D\u7F6E",url:"open-location"},{name:"\u4F7F\u7528\u5730\u56FE\u9009\u62E9\u4F4D\u7F6E",url:"choose-location"},{name:"\u5730\u56FE\u63A7\u5236",url:"map"},{name:"\u5730\u56FE\u641C\u7D22",url:"map-search"}]},{id:"storage",name:"\u6570\u636E",open:!1,pages:[{name:"\u6570\u636E\u5B58\u50A8\uFF08key-value\uFF09",url:"storage"},{name:"SQLite",url:"sqlite"}]},{url:"rewarded-video-ad",name:"\u6FC0\u52B1\u89C6\u9891\u5E7F\u544A",open:!1},{url:"full-screen-video-ad",name:"\u5168\u5C4F\u89C6\u9891\u5E7F\u544A",open:!1},{id:"login",name:"\u767B\u5F55",open:!1,pages:[{name:"\u767B\u5F55",url:"login"},{name:"\u83B7\u53D6\u7528\u6237\u4FE1\u606F",url:"get-user-info"}]},{id:"share",name:"\u5206\u4EAB",open:!1,pages:[{name:"\u5206\u4EAB",url:"share"}]},{id:"payment",name:"\u652F\u4ED8",open:!1,pages:[{name:"\u53D1\u8D77\u652F\u4ED8",url:"request-payment"}]},{id:"speech",name:"\u8BED\u97F3",open:!1,pages:[{name:"\u8BED\u97F3\u8BC6\u522B",url:"/platforms/app-plus/speech/speech"}]},{id:"push",name:"\u63A8\u9001",open:!1,pages:[{name:"\u63A8\u9001",url:"/platforms/app-plus/push/push"}]}],notForPc:[{name:"\u8BBE\u7F6ETabBar",url:"set-tabbar"}]}},onShareAppMessage(){return{title:"\u6B22\u8FCE\u4F53\u9A8Cuni-app",path:"/pages/tabBar/API/API"}},onNavigationBarButtonTap(a){uni.navigateTo({url:"/pages/about/about"})},onLoad(){},onReady(){},onShow(){this.navigateFlag=!1,this.leaveSetTabBarPage()},onHide(){this.leaveSetTabBarPage()},methods:{triggerCollapse(a,t){if(!this.list[a].pages){this.goDetailPage("",this.list[a].url);return}for(var u=0;u<this.list.length;++u)a===u?this.list[u].open=!this.list[u].open:this.list[u].open=!1},goDetailPage(a,t){if(t==="set-tabbar"){this.showSetTabBarPage=!0;return}let u=~t.indexOf("platform")?t:"/pages/API/"+t+"/"+t;this.hasLeftWin?uni.reLaunch({url:u}):uni.navigateTo({url:u})},leaveSetTabBarPage(){this.showSetTabBarPage=!1}}};function O(a,t,u,i,n,o){let p=(0,e.resolveComponent)("set-tab-bar"),s=B((0,e.resolveDynamicComponent)("u-link"),E);return(0,e.openBlock)(),(0,e.createElementBlock)("scroll-view",{scrollY:!0,showScrollbar:!0,enableBackToTop:!0,bubble:"true",style:{flexDirection:"column"}},[(0,e.createElementVNode)("view",{class:"uni-container"},[n.showSetTabBarPage?((0,e.openBlock)(),(0,e.createBlock)(p,{key:0,onUnmount:o.leaveSetTabBarPage},null,8,["onUnmount"])):((0,e.openBlock)(),(0,e.createElementBlock)(e.Fragment,{key:1},[u.hasLeftWin?(0,e.createCommentVNode)("",!0):((0,e.openBlock)(),(0,e.createElementBlock)("view",{key:0,class:"uni-header-logo"},[(0,e.createElementVNode)("u-image",{class:"uni-header-image",src:"/static/apiIndex.png"})])),u.hasLeftWin?(0,e.createCommentVNode)("",!0):((0,e.openBlock)(),(0,e.createElementBlock)("view",{key:1,class:"uni-hello-text"},[(0,e.createElementVNode)("u-text",{class:"hello-text"},"\u4EE5\u4E0B\u5C06\u6F14\u793Auni-app\u63A5\u53E3\u80FD\u529B\uFF0C\u8BE6\u7EC6\u6587\u6863\u89C1\uFF1A"),(0,e.createVNode)(s,{class:"hello-link",href:"https://uniapp.dcloud.io/api/",text:"https://uniapp.dcloud.io/api/",inWhiteList:!0},null,8,["href","text"])])),((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(n.list,(r,C)=>((0,e.openBlock)(),(0,e.createElementBlock)("view",{class:"uni-panel",key:r.id},[(0,e.createElementVNode)("view",{class:(0,e.normalizeClass)(["uni-panel-h",r.open?"uni-panel-h-on":""]),onClick:l=>o.triggerCollapse(C,r.id)},[(0,e.createElementVNode)("u-text",{class:"uni-panel-text"},(0,e.toDisplayString)(r.name),1),(0,e.createElementVNode)("u-text",{class:(0,e.normalizeClass)(["uni-panel-icon uni-icon",r.open?"uni-panel-icon-on":""])},(0,e.toDisplayString)(r.pages?"\uE581":"\uE470"),3)],10,["onClick"]),r.open?((0,e.openBlock)(),(0,e.createElementBlock)("view",{key:0,class:"uni-panel-c"},[((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(r.pages,(l,_)=>((0,e.openBlock)(),(0,e.createElementBlock)("view",{class:(0,e.normalizeClass)([{"left-win-active":u.leftWinActive===l.url&&u.hasLeftWin,"pc-hide":l.name==="\u8BBE\u7F6ETabBar"&&u.hasLeftWin},"uni-navigate-item"]),key:_,url:r.url,onClick:U=>o.goDetailPage(r.id,l.url)},[(0,e.createElementVNode)("u-text",{class:"uni-navigate-text"},(0,e.toDisplayString)(l.name?l.name:l),1),(0,e.createElementVNode)("u-text",{class:"uni-navigate-icon uni-icon"},"\uE470")],10,["url","onClick"]))),128))])):(0,e.createCommentVNode)("",!0)]))),128))],64))])])}var h=c(q,[["render",O],["styles",[z]]]);var f=plus.webview.currentWebview();if(f){let a=parseInt(f.id),t="pages/tabBar/API/API",u={};try{u=JSON.parse(f.__query__)}catch(n){}h.mpType="page";let i=Vue.createPageApp(h,{$store:getApp({allowDefault:!0}).$store,__pageId:a,__pagePath:t,__pageQuery:u});i.provide("__globalStyles",Vue.useCssStyles([...__uniConfig.styles,...h.styles||[]])),i.mount("#root")}})();

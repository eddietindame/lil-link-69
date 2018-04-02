!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r.w={},r(r.s=9)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("mongoose-ttl")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=i(n),u=i(r(1));function i(e){return e&&e.__esModule?e:{default:e}}var a=new n.Schema({originalUrl:{type:String,required:!0},newUrl:{type:String,required:!0},emojiUrl:{type:String,required:!0}},{timestamps:!0});a.plugin(u.default,{ttl:"24h"}),t.default=o.default.model("shortUrl",a)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=process.env;t.nodeEnv="production",t.logStars=function(e){console.info("**********"),console.info(e),console.info("**********")},t.regex={protocol:/^(http|https):\/\//i,url:/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i,shortUrl:/^[a-zA-Z0-9-_]{7,14}$/,emoji:/^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]){7,14}$/},t.emojiMap={_:"😡","-":"😀",0:"😬",1:"😜",2:"😐",3:"😉",4:"🙂",5:"💀",6:"👽",7:"👺",8:"👹",9:"😈",a:"💩",b:"🤖",c:"😺",d:"🙌",e:"👏",f:"👍",g:"👎",h:"🙏",i:"💪",j:"🖖",k:"💅",l:"👅",m:"👀",n:"👳",o:"💁",p:"🙇",q:"👓",r:"🎩",s:"👙",t:"🐶",u:"🐱",v:"🐨",w:"🐷",x:"🐸",y:"🌵",z:"🍀",A:"🐉",B:"🎄",C:"🍁",D:"🍃",E:"🌚",F:"🌍",G:"🌎",H:"🌏",I:"🎃",J:"🍄",K:"💎",L:"✨",M:"🔥",N:"👌",O:"💦",P:"🌊",Q:"🍆",R:"🍑",S:"🎱",T:"😘",U:"🏈",V:"🏀",W:"🚗",X:"🎮",Y:"🔫",Z:"🔮",mapString:function(e){var t=this;return e.split("").map(function(e){return t[e]}).join("")}};t.default={port:n.PORT||8080,db:n.MONGODB_URI||"mongodb://localhost/shortUrls"}},function(e,t){e.exports=require("shortid")},function(e,t,r){"use strict";(e.exports=function(){}).prototype.hit=function(e,t,r){var n,o=this,u=e.ip;t.pathLimiter&&(n=e.baseUrl?e.baseUrl.replace(e.path,""):"",u+=t.path||n);var i=Date.now();o.get(u,function(e,n){if(e)r(e,void 0,i);else if(n){var a=n.date,l=a+t.innerTimeLimit,d=i>l;d&&(n.date=i),o.decreaseLimits(u,n,d,t,function(e,t){r(e,t,a)})}else{var c=Math.floor((i+t.outerTimeLimit)/1e3);n={date:i,inner:t.innerLimit,outer:t.outerLimit,firstDate:i,outerReset:c},o.create(u,n,t,function(e,t){r(e,t,i)})}},t)}},function(e,t,r){"use strict";var n=r(5),o=e.exports=function(){this.__cache={}};o.prototype=Object.create(n.prototype),o.prototype.get=function(e,t){var r=this.__cache[e];t(null,r&&r.expire>=Date.now()?r.value:void 0)},o.prototype.create=function(e,t,r,n){var o=this.__cache,u=o[e];u&&clearTimeout(u.timeout);var i={value:t,expire:r.outerTimeLimit+Date.now()};o[e]=i,i.timeout=setTimeout(function(){delete o[e]},r.outerTimeLimit),n(null,t)},o.prototype.decreaseLimits=function(e,t,r,n,o){!0===r?t.inner=n.innerLimit:t.inner--,t.inner>0&&t.outer--,o(null,t)}},function(e,t){e.exports=require("express-rate-limiter")},function(e,t){e.exports=require("express")},function(e,t,r){"use strict";var n=s(r(8)),o=s(r(7)),u=s(r(6)),i=s(r(0)),a=s(r(4)),l=r(3),d=s(l),c=s(r(2));function s(e){return e&&e.__esModule?e:{default:e}}var f=(0,n.default)(),p=new o.default({db:new u.default});process.setMaxListeners(0),i.default.connect(d.default.db),f.set("view engine","ejs"),f.use(n.default.static("public"));var m=function(e,t){var r=null;if(l.regex.url.test(e)){var n=a.default.generate();r=new c.default({originalUrl:e,newUrl:n,emojiUrl:l.emojiMap.mapString(n)})}r?r.save(function(e,r){e&&t.json(e);var n=r.originalUrl,o=r.newUrl,u=r.emojiUrl,i=r.createdAt,a=r._id;r&&t.json({originalUrl:n,newUrl:o,emojiUrl:u,createdAt:i,deleteUrl:"delete/"+a+"/"+o})}):t.json({error:"'"+e+"' is not a valid Url."})};f.get("/",function(e,t){var r=e.query.url;r?m(r,t):t.render("index",{origin:e.protocol+"://"+e.get("host")})}),f.get("/"+encodeURI("🔮"),function(e,t){t.json({h4x:"🔮"})}),f.get("/new/:urlToShorten(*)",p.middleware(),function(e,t){var r=e.params.urlToShorten;m(r,t)}),f.get("/all",function(e,t){c.default.find().then(function(e){t.json(e)}).catch(function(e){t.json(e)})}),f.get("/delete/all",function(e,t){c.default.remove().then(function(e){var r=e.n,n=e.ok;t.json(n?{success:"Deleted "+r+" entries."}:{error:"Failed to delete data."})}).catch(function(e){return t.json(e)})}),f.get("/delete/:_id/:newUrl",function(e,t){var r=e.params,n=r._id,o=r.newUrl;c.default.findOneAndRemove({_id:n,newUrl:o},function(e,r){e?t.json({error:e}):r?t.json({success:"Link "+r.newUrl+" deleted."}):t.json({error:"Failed."})})}),f.get("/:urlToForward(*)",function(e,t){var r=e.params.urlToForward;l.regex.shortUrl.test(r)?c.default.findOne({newUrl:r},function(e,r){e&&t.json(e),r?t.redirect(301,l.regex.protocol.test(r.originalUrl)?r.originalUrl:"http://"+r.originalUrl):t.json({error:"That Url doesn't exist! It may have expired."})}):l.regex.emoji.test(r)?c.default.findOne({emojiUrl:r},function(e,r){e&&t.json(e),r?t.redirect(301,l.regex.protocol.test(r.originalUrl)?r.originalUrl:"http://"+r.originalUrl):t.json({error:"That Url doesn't exist! It may have expired."})}):t.redirect(301,e.protocol+"://"+e.get("host"))}),f.listen(d.default.port,function(){console.info("Express listening on port",d.default.port)})}]);
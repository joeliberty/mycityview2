/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();
(function(){
    var app = angular.module('mycity-directives', []);

    app.directive("dayAstroQuote", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/day-astro-quote.html"
      };
    });

    app.directive("header", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/header.html"
      };
    });

    app.directive("forcast", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/forcast.html"
      };
    });

    app.directive("news-movies", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/news-movies.html"
      };
    });

    app.directive("yelp", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/yelp.html"
      };
    });

    app.directive("faroo", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/faroo.html"
      };
    });

    app.directive("movies", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/movies.html"
      };
    });

    app.directive("map", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/map.html"
      };
    });

    app.directive("events", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/events.html"
      };
    });

    app.directive("headerImage", function() {
      return {
        restrict: "E",
        templateUrl: "partials/header-image.html",
      };
    });

    app.directive("places", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/places.html"
      };
    });

    app.directive("credits", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/credits.html"
      };
    });

    app.directive("twitter", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/twitter.html"
      };
    });

    app.directive("meetup", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/meetup.html"
      };
    });

    app.directive("rates", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/rates.html"
      };
    });

    app.directive("nearby", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/nearby.html"
      };
    });

    app.directive("navbar", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/navbar.html"
      };
    });

    app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                $('#image_spinner, #image_spinner i').css('display', 'none');
                $('#header_image img').css('display', 'block');
            });
        }
    };
});
})();

(function() {
'use strict';
var events_app = angular.module('events_app', []);

events_app.factory('formatDate', function() {
    return {
        yyyy_mm_dd : function(today){
        var day = today.getDate(today);
        if(day < 10) {
            day = '0' + day;
        }
        var month = today.getMonth(today) + 1;
        if(month < 10) {
            month = '0' + month;
        }
        var year = today.getFullYear(today);
        return year + '-' + month + '-' + day; 
        }  
    };
});

// events_app.factory('dateSort', function() {
//     return {
//         comparator : function (a,b){
//         if (a.timestamp < b.timestamp) return -1;
//         if (a.timestamp > b.timestamp) return 1;
//         return 0;
//         }
//     };
// });

events_app.controller("EventsCtrl", ['$scope', '$rootScope', '$http', 'formatDate',
    function($scope, $rootScope, $http, formatDate) {
    $scope.categories = [];
    
    $scope.find_events = function(page_num, category) {
        $scope.spinner = true;
        var self = this;
        var t_city = $rootScope.city;
        var today = new Date();
        today = formatDate.yyyy_mm_dd(today);
        today = today.replace(/-/g, '')+'00';
        var date = today + '-' + today;
        var page_size = '10';

        $scope.events = { events: {title:'Retreiving events for ' + $rootScope.city + '.'}};
        var city_state_country = '';
        if($rootScope.state) {
            city_state_country = t_city +','+ $rootScope.state+','+$rootScope.country;
        } else {
            city_state_country = t_city +','+$rootScope.country;
        }

        var url = 'php/get_event.php';
        $http({
            url: url,
            dataType: 'json',
            method: 'GET',
            cache: true,
            params: {
                location: city_state_country,
                date: date,
                category: category,
                page_size: page_size,
                sort_order: 'popularity',
                page_number: page_num
            },
            config: {
                category: category
            }
        }).success(function(data, status, headers, config) {
            if(data.events) {
                $scope.spinner = false;
                var results;
                if(data.events.event.length) {
                    results = $scope.events = data.events.event;
                } else {
                    results = data.events;
                }
                var arr = [];
                $.each(results, function (i, item) {
                    var event = {};
                    event.image = (item.image !== null) ? item.image.medium.url : '';
                    event.title = (item.title !== null) ? item.title : false;
                    event.url = (item.url !== null) ? item.url : false;
                    event.venue_name = (item.venue_name !== null) ? item.venue_name : false;
                    event.start_time = (item.start_time !== null) ? item.start_time : false;
                    var stop_time = self.clean_stop_time(event.start_time, item.stop_time);
                    event.stop_time = (stop_time !== null) ? stop_time : false;
                    event.description = (item.description !== null) ? self.cleanIt(item.description) : false;
                    event.venue_address = (item.venue_address !== null) ? item.venue_address : false;
                    event.geocode_type = (item.geocode_type !== null) ? self.checkGeocode(item.geocode_type) : false;
                    event.latitude = (item.latitude !== null) ? item.latitude : false;
                    event.longitude = (item.longitude !== null) ? item.longitude : false;
                    arr.push(event);
                });
                $('.newspanel').scrollTop(0,0);

                var type = String(config.config.category);
                var catname = 'cat'+type;
                $scope[catname] = type;

                $scope[type+'totalItems'] = data.total_items;
                $scope[type+'currentPage'] = data.page_number;
                $scope[type+'numOfPages'] = data.page_count;
                $scope[type+'itemsPerPage'] = page_size;
                var pagerState = (parseInt($scope[type+'totalItems']) <= parseInt($scope[type+'itemsPerPage'])) ? 'none' : 'block';
                $('#'+catname).css('display', pagerState);

                $scope[type] = arr;

            }
            // console.log('totalItems: ', $scope[type+'totalItems'] + ' currentPage: ', $scope[type+'currentPage'] + ' numOfPages: ' , $scope[type+'numOfPages'] + ' itemsPerPage: ', $scope[type+'itemsPerPage'])
        }); 

        this.cleanIt = function(str) {
            return str.replace(/(<([^>]+)>)/ig," ");
        };

        this.clean_stop_time = function(start_time, stop_time) {
            if(start_time && stop_time ) {
                var ind = start_time.indexOf(' ');
                var sdate = start_time.slice(0, ind);
                ind = stop_time.indexOf(' ');
                var edate = stop_time.slice(0, ind);
                var etime = stop_time.slice(ind);
                etime = (sdate == edate) ? etime : stop_time;
                return etime;
            } else {
                return;
            }
        };

        this.checkGeocode = function(geocode) {
            // For ng-hide, hide if true
            return (geocode == 'EVDB Geocoder') ? false : true;
        };

    };

    var cats = ['attractions', 'art', 'business','clubs_associations', 'comedy', 'community', 'family_fun_kids', 'festivals_parades', 'fundraisers', 'learning_education', 'movies_film', 'music', 'outdoors_recreation', 'performing_arts', 'politics_activism', 'sales', 'singles_social', 'sports', 'support', 'technology'];
    for( var v = 0; v < cats.length; v++) {
        $scope.find_events(1, cats[v]);
    }

    $scope.setPage = function (pageNo, type) {
        $scope.find_events(pageNo, type);
    };

}]);

events_app.directive('hmtext', function () {
    return {
        restrict:'EA',
        scope:{
            hmtext : '=hmtext',
            hmlimit : '=',
            hmfulltext:'='
        },
        templateUrl: 'partials/moreless.html',
        controller : ['$scope', function($scope){
            $scope.toggleValue=function(){
                if($scope.hmfulltext === true)
                    $scope.hmfulltext=false;
                else if($scope.hmfulltext === false)
                    $scope.hmfulltext=true;
                else
                    $scope.hmfulltext=true;
            };
        }]
    };
});

events_app.directive('eventa', function () {
    return {
        restrict:'EA',
        scope:{
            url : '=',
            image : '=',
            title:'=',
            venuename: '=',
            start: '=',
            stop: '=',
            address: '='
        },
        templateUrl: 'partials/eventsa.html',
    };
});

events_app.directive('eventb', function () {
    return {
        restrict:'EA',
        scope:{
            geocode : '=',
            latitude : '=',
            longitude:'=',
            url: '='
        },
        templateUrl: 'partials/eventsb.html',
    };
});

events_app.filter('cleanTime', function () {
    return function (item) {
        if(!item) { return; }
        if(item.indexOf(' ')) {
            var arr = item.split(' ');
            var time = (arr[1] != '00:00:00') ? item : arr[0];
            return time;
        } else {
            return item;
        }
    };
});

events_app.filter('capitalize_fist_char', function () {
    return function (item) {
        if(!item) { return; }
        var title = item.charAt(0).toUpperCase() + item.slice(1);
        // Also take out underscore
        title = title.replace(/_/g, ' ');
        return title;
    };
});


})();

(function() {
'use strict';
var faroo_app = angular.module('faroo_app', []);

faroo_app.controller("FarooCtrl", ['$scope', '$rootScope', '$http', 'formatDate', '$q',
    function($scope, $rootScope, $http, formatDate, $q) {
        $('.tabs_container').css('visibility', 'visible');
        $scope.is_search = false;
        $scope.query = '';

    $scope.find_news = function(page, term) {
        $scope.news_spinner = true;
        $scope.is_search = false;
        var self = this;
        var query = (term == 'search') ? $scope.query : term;
        var url = 'php/get_faroo.php';
        $http({
            url: url,
            dataType: 'json',
            method: 'GET',
            cache: true,
            params: {
                start: (page - 1) * 10 + 1,
                query: query
            },
            config: {
                term: term,
                page: page
            }
        }).success(function(data, status, headers, config) {
            if(data) {
                $scope.news_spinner = false;
                $('.newspanel').scrollTop(0,0);
                var term = String(config.config.term);
                var cur_page = String(config.config.page);
                /* Add currentPage to data for pagination */
                data.currentPage = cur_page;
                /* Check if image is good */
                self.isImage(data, term);
                var numofpages = parseInt(data.count/10);
                $('.newspanel').css('display', 'block');
                var pagerState = (numofpages <= 1) ? 'false' : 'true';
                $scope['is_' + term] = pagerState; // For search pager
            }
        }); 

        this.isImage = function(data, term) {
            /* Check that the image  exits befor including it. */
            $.each(data.results, function (i, item) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function() {
                    deferred.resolve(false);
                };
                image.onload = function() {
                    deferred.resolve(true);
                };
                image.src = item.iurl;
                /* Add src_url if image is there or
                 * '', so no broken image icon
                */
                deferred.promise.then(function(ok) {
                  if(ok) {
                    // Use the url
                  } else {
                    item.iurl = '';
                  }
                });
            });
             $scope[term] = data;
          };

    };

    $scope.setPage = function (pageNo, type) {
        $scope.find_news(pageNo, type);
    };

    var terms = ['world', 'technology', 'entertainment', 'sports', 'travel', 'music'];
    for(var i = 0; i < terms.length; i++) {
        $scope.find_news(1, terms[i]);
    }
    $scope.submit = function() {
            if(this.query === '') {
                alert('Please type in a search term.');
                return;
            }
            $scope.query = this.query.replace(' ', '%20');
            $scope.find_news(1, 'search');
      };
}]);

faroo_app.directive('farootopic', function () {
    return {
        restrict:'EA',
        scope:{
            article : '=article',
            spinner : '='
        },
        templateUrl: 'partials/farootopic.html',
    };
});

})();


(function() {
'use strict';
//comment
// $( '#Aries' ).tooltip( "option", "content", "Awesome title!" );

var astro_app = angular.module('astro_app', []);

astro_app.controller("AstroCtrl", ['$scope', '$http',
  function($scope, $http) {
  $scope.horoscope = 'Choose your sign';

  $scope.call = function(sign) {
    // console.log('sign: ' + sign)
    $scope.horoscope = '';
    $('#astro_horoscope i').css('display', 'inline-block');
    $http({
      url: 'https://sender.blockspring.com/api_v2/blocks/dba3c2ca01c063df9cdf9fc6f0cf93f9?api_key=db81b1fa591380eb4110ff3093829176', 
      method: "POST",
      dataType: 'json',
      data: JSON.stringify({ sign: sign})
    })
    .success(function(data) {
      $('#astro_horoscope i').css('display', 'none');
      // console.log('data: ' + data)
      $scope.horoscope = data.horoscope;
    }); 
  };
}]);
})();



(function() {
'use strict';

var map_app = angular.module('map_app', []);

map_app.controller("GetMapCtrl", ['$scope', '$rootScope',
    function($scope, $rootScope) {
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    var city_state_country = $rootScope.city_state_country;

    $rootScope.lat_lng = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);
    $rootScope.zoom = 13;
    var mapOptions = {
        zoom: 13,
        center: $rootScope.lat_lng
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    $rootScope.map = map;
    var markers = [];
    $rootScope.markers = markers;
    var marker = '';
    // var geocoder = new google.maps.Geocoder();

    // Might need this later so leave it here for now.
    // geocoder.geocode( { 'address': city_state_country}, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       map.setCenter(results[0].geometry.location);
    //       marker = new google.maps.Marker({
    //           map: map,
    //           position: results[0].geometry.location
    //       });
    //       markers.push(marker);
    //       console.log('first zoom')
    //         map.setZoom(13);
    //     } else {
    //       alert('Geocode was not successful for the following reason: ' + status);
    //     }
    // });
    
    /*
    * Watch for change on $rootScope.lat_lng and update marker on map.
    */
    // var markers = [];
    $scope.$watch('lat_lng', function() {
        var lat_lng = null;
        var scroll_to_map = false;
        if(typeof $rootScope.lat_lng === 'object') {
            /*
            * Check to see if loading the map for the first time.
            */
            lat_lng = $rootScope.lat_lng;
        } else {
            // Clear markers
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            var coord_array = $rootScope.lat_lng.split(',');
            var lat = coord_array[0];
            var lng = coord_array[1];
            lat_lng = new google.maps.LatLng(lat, lng);
            scroll_to_map = true;
        }
        marker = new google.maps.Marker({
            position: lat_lng,
            map: map
        });
        map.setZoom($rootScope.zoom);
        map.setCenter(marker.getPosition());
        markers.push(marker);
        if(scroll_to_map) {
            // Scroll browser window to foucus google map
            var el = $('#map_container');
            var elOffset = el.offset().top;
            var elHeight = el.height();
            var windowHeight = $(window).height();
            var offset;

            if (elHeight < windowHeight) {
                offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
            } else {
                offset = elOffset;
            }
            var speed = 700;
            $('html, body').animate({scrollTop:offset}, speed);
        }
    });
    
    // Used with get_map_service.js
    // $scope.change_lat_lng = function(point){
    //     console.log('point: ' + point)
    // };

    // Copyright is hidden till last element is displayed
    $('#copyright').css('display', 'inline-block');
}]);

map_app.controller('SetLatLng', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
    $scope.isCollapsed = false;
    $scope.set_marker = function(loc1, loc2) {
        /*
        * Latitude and longitude are dependent on the datasource.
        * Until there is a better solution, sort them out here 
        * yelp: longitude
        * seatGeek: lon
        * eventFinda: lng
        */
        var lat, lng;
        if(typeof loc1 == 'object') {
            lat = null;
            lng = null;
            for(var key in loc1) {
                if(loc1.hasOwnProperty(key)) {
                    switch(key) {
                    case 'F':
                        lng = loc1[key];
                        break;
                    case 'lng':
                        lng = loc1[key];
                        break;
                    case 'lon':
                        lng = loc1[key];
                        break;
                    case 'longitude':
                        lng = loc1[key];
                        break;
                    case 'A':
                        lat = loc1[key];
                        break;
                    case 'lat':
                        lat = loc1[key];
                        break;
                    case 'latitude':
                        lat = loc1[key];
                        break;
                    case 'k':
                        lat = loc1[key];
                        break;
                    case 'D':
                        lng = loc1[key];
                        break;
                    }
                }
            }
        } else {
            lat = loc1;
            lng = loc2;
        }
        // console.log('lat: ', lat , ' lng: ', lng)
        $rootScope.lat_lng = lat + ', ' + lng;
        $rootScope.zoom = 18;
    };
}]);
})();
(function() {
'use strict';

var meetup_app = angular.module('meetup_app', []);

meetup_app.controller("meetupCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    var startdate = new Date();
    var now = new Date();
    var enddate = new Date(now);
    enddate = enddate.setDate(now.getDate()+5);
    enddate = new Date(enddate);
    var city = $rootScope.city;
    var state = $rootScope.state;
    var country = $rootScope.country;
    var city_data = $rootScope.locs;
    var t_city = $rootScope.city_id;
    var lat = city_data[t_city].lat;
    var lon = city_data[t_city].lon; 
    var url = 'https://api.meetup.com/2/open_events?callback=?&lat=' + lat + '&country=' + country + '&city=' + city + '&state=' + state + '&text=travel&lon=' + lon + '&key=5579136d5823c8054341258e452f';
    var arr = [];
    $('#meetup_spinner i').css('display', 'inline-block');
    $.getJSON(url, 
    function (data) {
        $('#meetup_spinner i').css('display', 'none');
        $.each(data.results, function (i, item) {
            if (item.time <= enddate) { 
                var event = {};
                event.city = city;
                event.name = item.name;
                event.group_name = item.group.name;
                event.description = item.description;
                event.join_mode = item.group.join_mode;
                event.who = item.group.who;
                event.why = typeof(item.why !== 'undefined') ? item.why : 0;
                event.how_to_find_us = typeof(item.how_to_find_us !== 'undefined') ? item.how_to_find_us : 0;
                if (typeof item.venue !== 'undefined') {
                    event.venue_name = typeof(item.venue.name !== 'undefined') ? item.venue.name : 0;
                    event.venue_address = typeof(item.venue.address !== 'undefined') ? item.venue.address : 0;
                    event.venue_city = typeof(item.venue.city !== 'undefined') ? item.venue.city : 0;
                    event.venue_phone = typeof(item.venue.phone !== 'undefined') ? item.venue.phone : 0;
                }
                var time = new Date(item.time).toString();
                event.time = time.slice(0, 21);
                if (typeof item.fee !== 'undefined') {
                    event.fee_amount = typeof(item.fee.amount !== 'undefined') ? item.fee.amount : 0;
                    event.fee_currency = typeof(item.fee.currency !== 'undefined') ? item.fee.currency : 0;
                    event.fee_description = typeof(item.fee.description !== 'undefined') ? item.fee.description : 0;
                }
                if (typeof item.venue !== 'undefined') {
                    var lat = typeof(item.venue.lat !== 'undefined') ? item.venue.lat : 0;
                    var lon = typeof(item.venue.lon !== 'undefined') ? item.venue.lon : 0;
                    if(item.venue.lat && item.venue.lon) {
                        event.point = {lat: lat, lon: lon};
                    }
                }
                arr.push(event);
            }
         });
        $scope.meetup_unavailable = (arr.length === 0) ? true : false;
        $scope.events = arr;
    });
    
    /*
    * Select and isActive toggle Yelp details
    */
    $scope.select= function(item) {
        $scope.selected = (item === $scope.selected) ? null : item;
        
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    }; 
}]);

})();

(function() {
'use strict';
var movie_app = angular.module('movie_app', ['ui.bootstrap']);

movie_app.controller("MovieCtrl", ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
    var city_state = $rootScope.city.replace(' ', ',') + ',' + $rootScope.state;
    // console.log('city_state: ' + city_state)
    $scope.good_data = true;
    $scope.theaters = { events: {name:'Unavailable'}};
    $http({
        url: 'php/get_movies.php',
        dataType: 'json', 
        method: "GET",
        params: {city: city_state}
    }).success(function(data) {
        if(data.length > 0) {
          $scope.theaters = data;
        }
    }); 

}]);

movie_app.filter('movie_times', function () {
  return function (item) {
      return item.replace(/(&nbsp)*/g,"");
  };
});

// movie_app.filter('movie_address', function () {
//   return function (item) {
//     /* Check for bad movie info */
//     if(item == null || item.indexOf(';&#')) {
//       return "";
//     }
//     /* Return good movie info */
//     // Remove ampersand
//     item.replace(/(&nbsp)*/g,"");
//     item.toUpperCase();
//     return item;
//   };
// });

movie_app.filter('theater_name', function () {
  return function (item,scope) {
    /* Check for bad movie info */
    if(item === null || item.indexOf(';&#') != -1){
      scope.good_data = false;
      return "Unavailable";
    }
    /* Return good movie info */
    // Remove ampersand
    item.replace(/(&nbsp)*/g,"");
    return item;
  };
});
})();
(function() {
'use strict';
var nearby_app = angular.module('nearby_app', []);

nearby_app.controller("NearbyCtrl", ['$scope', '$rootScope',
  function($scope, $rootScope) {
  $scope.message = 'Select a place to find.';
  //get lat-lng location
  $scope.getCoordinates = function(what){
    $scope.what = what;
    $scope.set_message('Finding nearby ' + what + '...');
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $rootScope.user_lat = position.coords.latitude;
        $rootScope.user_lng = position.coords.longitude;
        
        $scope.find_nearby($rootScope.user_lat, $rootScope.user_lng, what);
      },
        function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  };

  function handleNoGeolocation(errorFlag) {
    var content;
    if (errorFlag) {
      content = 'Error: The Geolocation service failed.';
    } else {
      content = 'Error: Your browser doesn\'t support geolocation.';
    }
    $scope.set_message(content);
  }

  $scope.set_message = function(message) {
    $scope.message = message;
  };

  $scope.find_nearby = function(lat, lng, what) {
    clearMarkers();
    var pyrmont = new google.maps.LatLng(lat, lng);
    var bounds = new google.maps.LatLngBounds();
    var lat_lng = new google.maps.LatLng(lat, lng);
    var user_marker = new google.maps.Marker({
            position: lat_lng,
            map: $rootScope.map
    });
    bounds.extend(user_marker.getPosition()); // Add user loc to bounds
    $rootScope.map.setCenter(user_marker.getPosition());
    $rootScope.markers.push(user_marker);


    var request = {
      location: pyrmont,
      // radius: 500,
      rankBy: google.maps.places.RankBy.DISTANCE,
      // rankBy: google.maps.places.RankBy.PROMINENCE,
      types: [what]
    };

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService($('#for_places').get(0));
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if(!results.length) {
        $scope.set_message("Sorry there were no " + what + "'s found in 500 meters of your area.");
      } else {
        var item = (results.length > 1) ? 'locations' : 'location';
        $scope.set_message('Found ' + results.length +' ' + item + ' for ' + $scope.what + '.');
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            $scope.createMarker(results[i], service);
          }
          $rootScope.map.fitBounds(bounds);
        }
      }
    }

    function clearMarkers() {
      for (var i = 0; i < $rootScope.markers.length; i++) {
      $rootScope.markers[i].setMap(null);
      }
    }

    $scope.getDetails = function(place, service) {
      var request = { placeId: place.place_id };
      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          if(typeof place.formatted_phone_number !== 'undefined') {
            var num = place.formatted_phone_number;
            num = num.replace(/ /g, '');
            num = num.replace('(', '');
            num = num.replace(')', '');
            if(place.formatted_phone_number) {
              $('#info_win_phone_detail').html('<a href=tel:' + num + '>ph: ' + place.formatted_phone_number + '</a>');
            }
            if(place.website) {
              $('#info_win_website').html('<a href="' + place.website + '"  target="blank">' + 'website' + '</a>');
            }
          }
        } else {
          console.log('got error');
        }
      });
    };

    $scope.createMarker = function(place, service) {
      var pinColor = "009933";
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: $rootScope.map,
        position: place.geometry.location,
        icon: pinImage
      });
      bounds.extend(marker.getPosition()); //Add marker locs to bounds
      $rootScope.markers.push(marker);
      
      google.maps.event.addListener(marker, 'click', function() {

        $scope.getDetails(place, service);

        var message = '';
        message += '<div><strong>' + place.name + '</strong><br/>';
        if(place.rating) { message += 'Rating: ' + place.rating + '<br/>'; }
        if(place.price_level) { message += 'Price Level: ' + place.price_level + '<br/>'; }
        if(place.opening_hours) {
          var isOpen = (place.opening_hours.open_now) ? 'Yes' : 'No';
          message += 'Open: ' + isOpen + '<br/>';
        }

        if(place.vicinity) { message +=  place.vicinity + '<br/>'; }
        message += "<p><span id='info_win_phone_detail'></span>";
        message += "<span style='padding-left:12px;' id='info_win_website'></span></p>";

        
        infowindow.setContent(message);
        infowindow.open($rootScope.map, this);
      
      });

    };

  
  };

  $scope.places = ['airport', 'aquarium', 'art_gallery', 'atm', 'bakery', 'bank', 'bar', 'beauty_salon', 'bicycle_store', 'book_store', 'bowling_alley', 'bus_station', 'cafe', 'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'church', 'clothing_store', 'convenience_store', 'dentist', 'department_store', 'doctor', 'electrician', 'electronics_store', 'fire_station', 'florist', 'food', 'furniture_store', 'gas_station',  'grocery_or_supermarket', 'gym', 'hair_care', 'hardware_store', 'hindu_temple', 'home_goods_store', 'hospital', 'jewelry_store', 'laundry', 'library', 'liquor_store', 'locksmith', 'lodging', 'meal_delivery', 'meal_takeaway', 'mosque', 'movie_rental', 'movie_theater', 'museum', 'night_club', 'park', 'parking', 'pet_store', 'pharmacy', 'place_of_worship', 'police', 'post_office', 'restaurant', 'rv_park', 'school', 'shoe_store', 'shopping_mall', 'spa', 'store', 'subway_station', 'synagogue', 'taxi_stand', 'train_station', 'university', 'veterinary_care', 'zoo'];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

}]); // end controller

nearby_app.filter('remove_underscore', function () {
  return function (item) {
    if(item.indexOf('_') == -1) {
      return item;
    } else {
      return item.replace(/_/g, ' ');
    } 
  };
});

})();
(function() {
'use strict';
var places_app = angular.module('places_app', []);

places_app.controller("PlacesCtrl", ['$scope', '$http', '$rootScope', '$q',
  function($scope, $http, $rootScope, $q) {
  var t_city = $rootScope.city_id;
  var city_data = $rootScope.locs;
  var pyrmont = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);
  var request = {
    location: pyrmont,
    radius: 500,
    types: ['amusement_park','aquarium','art_gallery','casino','gym','library', 'movie_theater', 'museum','night_club','park','shopping_mall','spa','stadium','train_station','zoo']
  };
  var service = new google.maps.places.PlacesService($('#for_places').get(0));
  service.nearbySearch(request, callback);

  function callback(results, status, pagination) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      return;
    } else {
      var places_service = new google.maps.places.PlacesService($('#for_places').get(0));

      /* Slow request to 1 every sec */
      $scope.places = [];
      for (var i = 0; i < results.length; i++) {
        get_details_per_sec(i, results, places_service);
      }
    }
  }

  var get_details_per_sec = function(i, results, places_service) {
    /* Send request for details per sec so not to exceed
     * googles rate limit
     */
    (function(ind) {
       setTimeout(function(){
        var request = {
          placeId: results[ind].place_id
        };
        places_service.getDetails(request, function(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            //Pull photo geturl from nested object
            var url = (typeof place.photos !== 'undefined') ?
              place.photos[0].getUrl({'maxWidth':200, 'maxHeight': 200}) : null;
            if(!url) { return; }
            isImage(url, place);
          } else {
            console.log('got error');
          }
        });
      }, 1000 + (1000 * ind));
   })(i);
  };

  var isImage = function(src, place) {
    /* Check that the image  exits befor including it. */
    var deferred = $q.defer();
    var image = new Image();
    image.onerror = function() {
        deferred.resolve(false);
    };
    image.onload = function() {
        deferred.resolve(true);
    };
    image.src = src;
    /* Add src_url if image is there or
     * false, so no broken image icon
     * to scope.places
    */
    deferred.promise.then(function(ok) {
      if(ok) {
        place.url = src;
        $scope.places.push(place);
      } else {
        place.url = false;
        $scope.places.push(place);
      }
    });
  };
}]);



places_app.filter('formatType', function () {
  return function (item) {
    if(item.indexOf('_') == -1) {
      return item;
    } else {
      var type_array = item.split('_');
      var str = '';
      for (var i = 0; i < type_array.length; i++) {
        var word = type_array[i];
        word = word.charAt(0).toUpperCase() + word.slice(1);
        str += word + ' ';
      } 
      return str;
    }
  };
});
})();
(function() {
'use strict';
var quote_app = angular.module('quote_app', []);

quote_app.controller("QuoteCtrl", ['$scope', '$http',
  function($scope, $http) {
  var self = this;
  var less_len = 300; 
  var quotes = [];
    $http.get('js/quotes.json').success(function(data){
      $.each(data, function () {
        var quote = {};
        quote.quote = this.quote;
        quote.author = this.author;
        quotes.push(quote);
      });
      /* choose random quote */
      var rand_num = Math.floor((Math.random() * quotes.length));
      var rand_quote = quotes[rand_num];
      $scope.fullquote = rand_quote.quote;
      $scope.author = '--' + rand_quote.author;
      $scope.toggle_quote = true;
      if($scope.fullquote.length <= less_len) {
        $scope.quote = $scope.fullquote;
      } else {
        self.get_less_n_more('less');
      }
    }); 

    this.get_less_n_more = function(state) {
      if(state == 'less') {
         $scope.quote = $scope.fullquote.substring(0, less_len) + '<span class=more>... more</span>';
      } else {
        $scope.quote = $scope.fullquote.substring(0 , $scope.fullquote.length) + '<span class=less> less</span>';
      }
    };

    $scope.toggle_more_less = function() {
      if($scope.toggle_quote) { 
        $scope.toggle_quote = false;
        self.get_less_n_more('more');
      } else {
         $scope.toggle_quote = true;
         self.get_less_n_more('less');
      }

    };
}]);

})();
(function() {
'use strict';

var rates_app = angular.module('rates_app', ['ui.bootstrap']);

// rates_app.config(['$tooltipProvider', function($tooltipProvider){
//   $tooltipProvider.setTriggers({
//     'mouseenter': 'mouseleave',
//     'click': 'click',
//     'focus': 'blur',
//     'hideonclick': 'click'
//   });
// }]);

rates_app.controller('RatesCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    
    var self = this;
    $scope.amount = 1;
    $scope.currencies = [];
    $scope.base_rates = ['USD', 'AUD', 'EUR'];
    $scope.sel_grp = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'CNY', 'NZD', 'JPY', 'RUB'];
    $http.get('js/currencies.json').success(function(data){
        $scope.all_currencies = data;
        for(var v = 0; v < $scope.base_rates.length; v++){
            var str = '';
            for(var x = 0; x < $scope.sel_grp.length; x++) {
                str += "'" + $scope.base_rates[v] + $scope.sel_grp[x] + "'" + ',';
            }
            str = str.substring(0, str.length - 1);
            var url = "https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in (" + str + ")&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=";
            $.getJSON(url, function (data) {
                var currency = {};
                /* Add necessary key:values */
                $.each(data.query.results.rate, function (i, item) {
                    var abbrev = item.id;
                    $scope.base = abbrev.slice(0,3);
                    currency.sortid = $scope.base_rates.indexOf($scope.base);
                    item.country = abbrev.slice(3);
                    item.fullname = self.get_full_names(abbrev.slice(3), $scope.all_currencies);
                });
                currency.base = $scope.base;
                currency.fullname = self.get_full_names($scope.base, $scope.all_currencies);
                currency.rates = data.query.results.rate;
                $scope.currencies.push(currency);
                if($scope.currencies.length == $scope.base_rates.length) {
                    $scope.currencies.sort(self.compare);
                }
            });
        }
    });

    this.compare = function(a,b) {
      if (a.sortid < b.sortid)
         return -1;
      if (a.sortid > b.sortid)
        return 1;
      return 0;
    };

    this.get_full_names= function(abbrev, data) {
    for(var key in data) {
            if(data.hasOwnProperty(key)) {
                if(key === abbrev) {
                    return data[key];
                }
            }
        }
    };

    /* For mobile devices */
    if($rootScope.isMobile) {
        $('.rate_container').on('click', function (e) {
            $('*[popover]').each(function () {
                //Only do this for all popovers other than the current one that cause this event
                if (!($(this).is(e.target) || $(this).has(e.target).length > 0) &&
                        $(this).siblings('.popover').length !== 0 &&
                        $(this).siblings('.popover').has(e.target).length === 0) {
                    //Remove the popover element from the DOM
                    $(this).siblings('.popover').remove();
                    //Set the state of the popover in the scope to reflect this
                    angular.element(this).scope().tt_isOpen = false;
                }
            });
        });
    }

}]);

})();
(function() {
'use strict';

var time_app = angular.module('time_app', []);

time_app.controller("GetTimeCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    // var self = this;
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    var decrypted = CryptoJS.AES.decrypt('U2FsdGVkX19chVesPhEt4kavFEA2gU1flPvBpDcAz0w=', "secret");
    var pass_phrase = decrypted.toString(CryptoJS.enc.Utf8);
    decrypted = CryptoJS.AES.decrypt('U2FsdGVkX19bsHe8yrrl85WI1eKcmTHVBUVyUJwLXRs=', pass_phrase);
    var username = decrypted.toString(CryptoJS.enc.Utf8);
    $http({
        url: 'http://api.geonames.org/timezoneJSON',
        dataType: 'jsonp', 
        method: "GET",
        params: {
                lat: city_data[t_city].lat,
                lng: city_data[t_city].lon,
                username: username
                }
    }).success(function(data) {
        $rootScope.times.fulltime = data.time;
        // console.log('from time api: ' + $rootScope.times.fulltime)
        var time_arr = data.time.split(' ');
         // $scope.current_time = time_arr[1];
        $rootScope.times.current = time_arr[1];
        var sunrise_arr = data.sunrise.split(' ');
        // $scope.sunrise = sunrise_arr[1];
        $rootScope.times.sunrise = sunrise_arr[1];
        var sunset_arr = data.sunset.split(' ');
        // $scope.sunset = sunset_arr[1];
        $rootScope.times.sunset = sunset_arr[1];
        // console.log('time: ' + $scope.current_time)
   });
}]);
})();
(function() {
'use strict';

var twitter_app = angular.module('twitter_app', []);

twitter_app.factory('formatText', function() {
    return {
        add_links : function(item, link_type){
            var done = false;
            var str = item;
            var x = 0;
            while(!done) {
                var url_start = str.indexOf(link_type);
                if(url_start == -1 || x > 100) {
                    done = true;
                    return item;
                }
                var url = str.substring(url_start);
                var url_end = url.indexOf(' ');
                var link = '';
                if(url_end == -1) {url_end = str.length;}
                url = url.substring(0, url_end);
                switch(link_type) {
                    case 'http':
                        link = '<a href=' + url + ' target="blank">' + url.substring(7) + '</a>';
                        break;
                    case '#':
                        link = '<a href=https://twitter.com/hashtag/' + url.substring(1) + '?src=hash target="blank">' + url.substring(0) + '</a>';
                        break;
                    case '@':
                        link = '<a href=https://twitter.com/' + url.substring(1) + ' target="blank">' + url.substring(0) + '</a>';
                        break;
                }
                var chomp = parseInt(url_start + url_end);
                str = str.substring(chomp);
                item = item.replace(url, link);
                x +=  1;
            } 
        }  
    };
});

twitter_app.controller('TwitterCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    var city_state_country = '';
    var t_city = $rootScope.city.replace(" ", "%20");
    if($rootScope.state) {
        city_state_country = '%23' + t_city +'%20'+ $rootScope.state;
    } else {
        city_state_country = '%23' + t_city +'%20'+$rootScope.country;
    }
    $('#twitter_spinner i').css('display', 'inline-block');
    $http({
        url: 'php/get_twitter.php',
        dataType: 'json',
        params: {q: city_state_country},
        method: "GET"
        
    }).success(function(data) {
        $('#twitter_spinner i').css('display', 'none');
        $scope.tweets = data;
    }); 
}]);

twitter_app.filter('addUrls', ['$sce', 'formatText',
    function ($sce, formatText) {
    return function (item) {
        if(item) {
            item = formatText.add_links(item, 'http');
            item = formatText.add_links(item, '#');
            item = formatText.add_links(item, '@');
            return $sce.trustAsHtml(item);
        }
    };
}]);

})();

(function() {
'use strict';

var weather_app = angular.module('weather_app', []);

weather_app.controller("CurWeatherCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        dataType: 'json', 
        method: "GET",
        params: {q: $rootScope.city_state_country,
            appid: "4e5600686359104d6dd1ad18d82bd70b"}
    }).success(function(data) {
        $scope.cur_temp = data.main.temp;
        $scope.temp_max = data.main.temp_max;
        $scope.imagepath = 'http://openweathermap.org/img/w/' + data.weather[0]['icon'] + '.png';
        $scope.description = data.weather[0]['description'];
    }); 
}]);

weather_app.controller("DayForcastCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    var url= 'http://api.openweathermap.org/data/2.5/forecast';
    $http({
        url: url,
        dataType: 'json', 
        method: "GET",
        params: {q: $rootScope.city_state_country,
            appid: "4e5600686359104d6dd1ad18d82bd70b"
        }
    }).success(function(data) {
        var date_time = '';
        if($rootScope.times.fulltime) {
            // console.log('using api time')
            date_time = new Date($rootScope.times.fulltime);
        } else {
            // console.log('using computer time')
            date_time = new Date();
        }
        var weather_data = [];
        var cnt = 0;
        var done = false;
        var grp_ob = data.list;
        for(var key in grp_ob) {
            if(grp_ob.hasOwnProperty(key)) {
                if(done) { break; }
                var data_list = {};
                var all_weather = grp_ob[key];
                // Check dates
                if(all_weather.dt == 'undefined') { continue; }
                var full_w_date = new Date(all_weather.dt * 1000);
                if(full_w_date < date_time) { continue; }
                data_list.temps = all_weather['main'].temp;
                // Add hour
                var t_date = full_w_date.toString();
                var t_hour = t_date.slice(16, 21);
                data_list.times = t_hour;
                // Add icon path
                var icon = all_weather['weather'][0]['icon'];
                var url = 'http://openweathermap.org/img/w/' + icon + '.png';
                data_list.icons = String(url);
                // Add description
                data_list.descripts = String(all_weather['weather'][0]['description']);
                cnt = cnt + 1;
                if(cnt > 11) { done = true; }
                weather_data.push(data_list);
            }
        }
        $scope.daycast = weather_data;
    });
}]);

weather_app.filter('temp', ['$filter', '$rootScope',
    function($filter, $rootScope) {
    return function(input, t_array) {
        if(input) {
            // conver from kelvin to celcius
            input = input - 273.15;
            var precision = t_array[0];
            var temp_type = t_array[1];
            precision = 1;
            var numberFilter = $filter('number');

            var degree = (temp_type == 'C') ? '\u00B0C' : '\u00B0F';

            if(input && temp_type == 'F') {
                input = (input* 9.0 / 5.0 + 32).toFixed(2);
            }
            return numberFilter(input, precision) + degree;
        } else {
            return '';
        }
    };
}]);
})();
(function() {
'use strict';
var yelp_app = angular.module('yelp_app', []);

yelp_app.controller("MusicVenueCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'hotels',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.musicvenues = data_array.businesses;
    });
    $scope.select= function(item) {
        var same = (item === $scope.selected) ? true : false;
        $scope.selected = (item === $scope.selected) ? null : item;
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.controller("RestaurantCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'restaurant',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.restaurants = data_array.businesses;
    });
    $scope.select= function(item) {
        var same = (item === $scope.selected) ? true : false;
        $scope.selected = (item === $scope.selected) ? null : item;
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.controller("ClubCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'happy hour',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        var type = Object.prototype.toString.call(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.clubs = data_array.businesses;
    });
    $scope.select= function(item) {
        var same = (item === $scope.selected) ? true : false;
        $scope.selected = (item === $scope.selected) ? null : item;
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.controller("GallaryCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'show',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.galleries = data_array.businesses;
    }); 
    /*
    * Select and isActive toggle Yelp details
    */
    $scope.select= function(item) {
        $scope.selected = (item === $scope.selected) ? null : item;
        
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.filter('toString', function () {
  return function (item) {
      return item.toString();
  };
});
})();
(function() {
'use strict';
var Site = angular.module('Site', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'weather_app', 'yelp_app', 'astro_app', 'movie_app','faroo_app', 'quote_app', 'time_app', 'mycity-directives', 'events_app', 'map_app', 'places_app', 'twitter_app', 'ngTouch', 'meetup_app', 'rates_app', 'nearby_app']);

Site.controller('ShowHomeController', ['$scope', '$rootScope', '$location', '$http', 'MyService',
  function($scope, $rootScope, $location, $http, MyService) {
  $rootScope.locs = MyService.get_json_data();
  $rootScope.nameLength = 20; // Yelp uses this!
  $rootScope.times = {
    "fulltime": 0,
    "current": 0,
    "sunrise": 0,
    "sunset": 0
  };

  /*
  * New_city is the user selected city from navbar dropdown menu.
  * Default is false, true when city selected from the dropdown.
  */
  var new_city = $location.hash();
  /* Set defaults */
  $rootScope.city = (new_city) ? new_city.replace(/_/g, ' ') : 'Melbourne';
  $rootScope.city_id = (new_city) ? new_city : 'Melbourne';
  $rootScope.state = (new_city) ? $rootScope.locs[new_city].state : '';
  $rootScope.country = (new_city) ? $rootScope.locs[new_city].country : 'au';
  $rootScope.newsdata = {};
  $rootScope.newsdata.cat = (new_city) ? $rootScope.locs[new_city].cat : '547';
  $rootScope.newsdata.subcat = (new_city) ? $rootScope.locs[new_city].subcat : '21594';
  $rootScope.map = null;

  /* Create City State County value*/
  $rootScope.city_state_country = '';
  if($rootScope.state) {
      $rootScope.city_state_country = $rootScope.city +', '+ $rootScope.state +', '+$rootScope.country;
  } else {
      $rootScope.city_state_country = $rootScope.city +', '+$rootScope.country;
  }
  
  /*
  * Loop throuth $rootScope.locs to create cities
  * navbar list.
  */

  var cities = $rootScope.locs;
  /* actions array used in navbar */
  $scope.actions = []; 
  for(var city in cities) {

    if(cities.hasOwnProperty(city)) {
      var obj = {};
      // Gets all listings values
      obj.id = city;
      var city_st = (cities[city].state) ?
        city.replace(/_/g, ' ') + ', ' + cities[city].state.toUpperCase() :
        city.replace(/_/g, ' ');
      obj.name = city_st;
      $scope.actions.push(obj);
    }
  }

  $scope.setAction = function(action) {
    $scope.selectedAction = action;
    $location.hash($scope.selectedAction.id);
  };

  $scope.mobileAndTabletcheck = function() {
    var check = false;
    (function(a) {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  $rootScope.isMobile = $scope.mobileAndTabletcheck();

}]);
 
Site.controller('GetHeaderImage', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
  var random_num = Math.floor((Math.random() * 10) + 1);
  var city = $rootScope.city_id.toLowerCase();
  var state;
  if($rootScope.state) {
    state = $rootScope.state.toLowerCase();
  }
  var country = $rootScope.country.toLowerCase();
  var path = '../images/' + city;
  if(state) {
    path += '_' + state;
  }
  
  /* 
  *Get list of files that are prepended with city, state, country
  */
  path += '_' + country;
  $scope.myInterval = 10000; //Carousel delay
  $http({
    url: 'php/get_image_files.php',
    dataType: 'json', 
    method: "GET",
    params: {filename: path}
  }).success(function(data) {
    $scope.slides = data;
  }); 
}]);

Site.service('MyService', ['$http',
  function($http) {
  var myData = null;

  var promise = $http.get('js/city_data.json').success(function (data) {
    myData = data;
  });

  return {
    promise:promise,
    // setData: function (data) {
      // myData = data;
    // },
    get_json_data: function () {
        return myData;
    }
  };
}]);

Site.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/ShowHome', {
        templateUrl: 'partials/home.html',
        controller: 'ShowHomeController',
        resolve:{
          // Wait for promise
          MyServiceData: ['MyService', function(MyService){
          return MyService.promise;
        }]}
      }).
      // when('/ShowAbout', {
      //   templateUrl: 'partials/about.html',
      //   controller: 'ShowAboutController'
      // }).
      // when('/ShowContact', {
      //   templateUrl: 'partials/contact.html',
      //   controller: 'ShowContactController'
      // }).
      otherwise({
        redirectTo: '/ShowHome'
      });
  }]);

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFlcy5qcyIsImRpcmVjdGl2ZXMuanMiLCJnZXRfZXZlbnRzLmpzIiwiZ2V0X2Zhcm9vLmpzIiwiZ2V0X2hvcm9zY29wZS5qcyIsImdldF9tYXAuanMiLCJnZXRfbWVldHVwLmpzIiwiZ2V0X21vdmllcy5qcyIsImdldF9uZWFyYnkuanMiLCJnZXRfcGxhY2VzLmpzIiwiZ2V0X3F1b3RlLmpzIiwiZ2V0X3JhdGVzLmpzIiwiZ2V0X3RpbWUuanMiLCJnZXRfdHdpdHRlci5qcyIsImdldF93ZWF0aGVyLmpzIiwiZ2V0X3llbHAuanMiLCJzaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5DcnlwdG9KUyB2My4xLjJcbmNvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qc1xuKGMpIDIwMDktMjAxMyBieSBKZWZmIE1vdHQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5jb2RlLmdvb2dsZS5jb20vcC9jcnlwdG8tanMvd2lraS9MaWNlbnNlXG4qL1xudmFyIENyeXB0b0pTPUNyeXB0b0pTfHxmdW5jdGlvbih1LHApe3ZhciBkPXt9LGw9ZC5saWI9e30scz1mdW5jdGlvbigpe30sdD1sLkJhc2U9e2V4dGVuZDpmdW5jdGlvbihhKXtzLnByb3RvdHlwZT10aGlzO3ZhciBjPW5ldyBzO2EmJmMubWl4SW4oYSk7Yy5oYXNPd25Qcm9wZXJ0eShcImluaXRcIil8fChjLmluaXQ9ZnVuY3Rpb24oKXtjLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pO2MuaW5pdC5wcm90b3R5cGU9YztjLiRzdXBlcj10aGlzO3JldHVybiBjfSxjcmVhdGU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmV4dGVuZCgpO2EuaW5pdC5hcHBseShhLGFyZ3VtZW50cyk7cmV0dXJuIGF9LGluaXQ6ZnVuY3Rpb24oKXt9LG1peEluOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYyBpbiBhKWEuaGFzT3duUHJvcGVydHkoYykmJih0aGlzW2NdPWFbY10pO2EuaGFzT3duUHJvcGVydHkoXCJ0b1N0cmluZ1wiKSYmKHRoaXMudG9TdHJpbmc9YS50b1N0cmluZyl9LGNsb25lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpfX0sXG5yPWwuV29yZEFycmF5PXQuZXh0ZW5kKHtpbml0OmZ1bmN0aW9uKGEsYyl7YT10aGlzLndvcmRzPWF8fFtdO3RoaXMuc2lnQnl0ZXM9YyE9cD9jOjQqYS5sZW5ndGh9LHRvU3RyaW5nOmZ1bmN0aW9uKGEpe3JldHVybihhfHx2KS5zdHJpbmdpZnkodGhpcyl9LGNvbmNhdDpmdW5jdGlvbihhKXt2YXIgYz10aGlzLndvcmRzLGU9YS53b3JkcyxqPXRoaXMuc2lnQnl0ZXM7YT1hLnNpZ0J5dGVzO3RoaXMuY2xhbXAoKTtpZihqJTQpZm9yKHZhciBrPTA7azxhO2srKyljW2oraz4+PjJdfD0oZVtrPj4+Ml0+Pj4yNC04KihrJTQpJjI1NSk8PDI0LTgqKChqK2spJTQpO2Vsc2UgaWYoNjU1MzU8ZS5sZW5ndGgpZm9yKGs9MDtrPGE7ays9NCljW2oraz4+PjJdPWVbaz4+PjJdO2Vsc2UgYy5wdXNoLmFwcGx5KGMsZSk7dGhpcy5zaWdCeXRlcys9YTtyZXR1cm4gdGhpc30sY2xhbXA6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLndvcmRzLGM9dGhpcy5zaWdCeXRlczthW2M+Pj4yXSY9NDI5NDk2NzI5NTw8XG4zMi04KihjJTQpO2EubGVuZ3RoPXUuY2VpbChjLzQpfSxjbG9uZTpmdW5jdGlvbigpe3ZhciBhPXQuY2xvbmUuY2FsbCh0aGlzKTthLndvcmRzPXRoaXMud29yZHMuc2xpY2UoMCk7cmV0dXJuIGF9LHJhbmRvbTpmdW5jdGlvbihhKXtmb3IodmFyIGM9W10sZT0wO2U8YTtlKz00KWMucHVzaCg0Mjk0OTY3Mjk2KnUucmFuZG9tKCl8MCk7cmV0dXJuIG5ldyByLmluaXQoYyxhKX19KSx3PWQuZW5jPXt9LHY9dy5IZXg9e3N0cmluZ2lmeTpmdW5jdGlvbihhKXt2YXIgYz1hLndvcmRzO2E9YS5zaWdCeXRlcztmb3IodmFyIGU9W10saj0wO2o8YTtqKyspe3ZhciBrPWNbaj4+PjJdPj4+MjQtOCooaiU0KSYyNTU7ZS5wdXNoKChrPj4+NCkudG9TdHJpbmcoMTYpKTtlLnB1c2goKGsmMTUpLnRvU3RyaW5nKDE2KSl9cmV0dXJuIGUuam9pbihcIlwiKX0scGFyc2U6ZnVuY3Rpb24oYSl7Zm9yKHZhciBjPWEubGVuZ3RoLGU9W10saj0wO2o8YztqKz0yKWVbaj4+PjNdfD1wYXJzZUludChhLnN1YnN0cihqLFxuMiksMTYpPDwyNC00KihqJTgpO3JldHVybiBuZXcgci5pbml0KGUsYy8yKX19LGI9dy5MYXRpbjE9e3N0cmluZ2lmeTpmdW5jdGlvbihhKXt2YXIgYz1hLndvcmRzO2E9YS5zaWdCeXRlcztmb3IodmFyIGU9W10saj0wO2o8YTtqKyspZS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY1tqPj4+Ml0+Pj4yNC04KihqJTQpJjI1NSkpO3JldHVybiBlLmpvaW4oXCJcIil9LHBhcnNlOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYz1hLmxlbmd0aCxlPVtdLGo9MDtqPGM7aisrKWVbaj4+PjJdfD0oYS5jaGFyQ29kZUF0KGopJjI1NSk8PDI0LTgqKGolNCk7cmV0dXJuIG5ldyByLmluaXQoZSxjKX19LHg9dy5VdGY4PXtzdHJpbmdpZnk6ZnVuY3Rpb24oYSl7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGIuc3RyaW5naWZ5KGEpKSl9Y2F0Y2goYyl7dGhyb3cgRXJyb3IoXCJNYWxmb3JtZWQgVVRGLTggZGF0YVwiKTt9fSxwYXJzZTpmdW5jdGlvbihhKXtyZXR1cm4gYi5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYSkpKX19LFxucT1sLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG09dC5leHRlbmQoe3Jlc2V0OmZ1bmN0aW9uKCl7dGhpcy5fZGF0YT1uZXcgci5pbml0O3RoaXMuX25EYXRhQnl0ZXM9MH0sX2FwcGVuZDpmdW5jdGlvbihhKXtcInN0cmluZ1wiPT10eXBlb2YgYSYmKGE9eC5wYXJzZShhKSk7dGhpcy5fZGF0YS5jb25jYXQoYSk7dGhpcy5fbkRhdGFCeXRlcys9YS5zaWdCeXRlc30sX3Byb2Nlc3M6ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcy5fZGF0YSxlPWMud29yZHMsaj1jLnNpZ0J5dGVzLGs9dGhpcy5ibG9ja1NpemUsYj1qLyg0KmspLGI9YT91LmNlaWwoYik6dS5tYXgoKGJ8MCktdGhpcy5fbWluQnVmZmVyU2l6ZSwwKTthPWIqaztqPXUubWluKDQqYSxqKTtpZihhKXtmb3IodmFyIHE9MDtxPGE7cSs9ayl0aGlzLl9kb1Byb2Nlc3NCbG9jayhlLHEpO3E9ZS5zcGxpY2UoMCxhKTtjLnNpZ0J5dGVzLT1qfXJldHVybiBuZXcgci5pbml0KHEsail9LGNsb25lOmZ1bmN0aW9uKCl7dmFyIGE9dC5jbG9uZS5jYWxsKHRoaXMpO1xuYS5fZGF0YT10aGlzLl9kYXRhLmNsb25lKCk7cmV0dXJuIGF9LF9taW5CdWZmZXJTaXplOjB9KTtsLkhhc2hlcj1xLmV4dGVuZCh7Y2ZnOnQuZXh0ZW5kKCksaW5pdDpmdW5jdGlvbihhKXt0aGlzLmNmZz10aGlzLmNmZy5leHRlbmQoYSk7dGhpcy5yZXNldCgpfSxyZXNldDpmdW5jdGlvbigpe3EucmVzZXQuY2FsbCh0aGlzKTt0aGlzLl9kb1Jlc2V0KCl9LHVwZGF0ZTpmdW5jdGlvbihhKXt0aGlzLl9hcHBlbmQoYSk7dGhpcy5fcHJvY2VzcygpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbihhKXthJiZ0aGlzLl9hcHBlbmQoYSk7cmV0dXJuIHRoaXMuX2RvRmluYWxpemUoKX0sYmxvY2tTaXplOjE2LF9jcmVhdGVIZWxwZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIsZSl7cmV0dXJuKG5ldyBhLmluaXQoZSkpLmZpbmFsaXplKGIpfX0sX2NyZWF0ZUhtYWNIZWxwZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIsZSl7cmV0dXJuKG5ldyBuLkhNQUMuaW5pdChhLFxuZSkpLmZpbmFsaXplKGIpfX19KTt2YXIgbj1kLmFsZ289e307cmV0dXJuIGR9KE1hdGgpO1xuKGZ1bmN0aW9uKCl7dmFyIHU9Q3J5cHRvSlMscD11LmxpYi5Xb3JkQXJyYXk7dS5lbmMuQmFzZTY0PXtzdHJpbmdpZnk6ZnVuY3Rpb24oZCl7dmFyIGw9ZC53b3JkcyxwPWQuc2lnQnl0ZXMsdD10aGlzLl9tYXA7ZC5jbGFtcCgpO2Q9W107Zm9yKHZhciByPTA7cjxwO3IrPTMpZm9yKHZhciB3PShsW3I+Pj4yXT4+PjI0LTgqKHIlNCkmMjU1KTw8MTZ8KGxbcisxPj4+Ml0+Pj4yNC04KigocisxKSU0KSYyNTUpPDw4fGxbcisyPj4+Ml0+Pj4yNC04KigocisyKSU0KSYyNTUsdj0wOzQ+diYmciswLjc1KnY8cDt2KyspZC5wdXNoKHQuY2hhckF0KHc+Pj42KigzLXYpJjYzKSk7aWYobD10LmNoYXJBdCg2NCkpZm9yKDtkLmxlbmd0aCU0OylkLnB1c2gobCk7cmV0dXJuIGQuam9pbihcIlwiKX0scGFyc2U6ZnVuY3Rpb24oZCl7dmFyIGw9ZC5sZW5ndGgscz10aGlzLl9tYXAsdD1zLmNoYXJBdCg2NCk7dCYmKHQ9ZC5pbmRleE9mKHQpLC0xIT10JiYobD10KSk7Zm9yKHZhciB0PVtdLHI9MCx3PTA7dzxcbmw7dysrKWlmKHclNCl7dmFyIHY9cy5pbmRleE9mKGQuY2hhckF0KHctMSkpPDwyKih3JTQpLGI9cy5pbmRleE9mKGQuY2hhckF0KHcpKT4+PjYtMioodyU0KTt0W3I+Pj4yXXw9KHZ8Yik8PDI0LTgqKHIlNCk7cisrfXJldHVybiBwLmNyZWF0ZSh0LHIpfSxfbWFwOlwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIn19KSgpO1xuKGZ1bmN0aW9uKHUpe2Z1bmN0aW9uIHAoYixuLGEsYyxlLGosayl7Yj1iKyhuJmF8fm4mYykrZStrO3JldHVybihiPDxqfGI+Pj4zMi1qKStufWZ1bmN0aW9uIGQoYixuLGEsYyxlLGosayl7Yj1iKyhuJmN8YSZ+YykrZStrO3JldHVybihiPDxqfGI+Pj4zMi1qKStufWZ1bmN0aW9uIGwoYixuLGEsYyxlLGosayl7Yj1iKyhuXmFeYykrZStrO3JldHVybihiPDxqfGI+Pj4zMi1qKStufWZ1bmN0aW9uIHMoYixuLGEsYyxlLGosayl7Yj1iKyhhXihufH5jKSkrZStrO3JldHVybihiPDxqfGI+Pj4zMi1qKStufWZvcih2YXIgdD1DcnlwdG9KUyxyPXQubGliLHc9ci5Xb3JkQXJyYXksdj1yLkhhc2hlcixyPXQuYWxnbyxiPVtdLHg9MDs2ND54O3grKyliW3hdPTQyOTQ5NjcyOTYqdS5hYnModS5zaW4oeCsxKSl8MDtyPXIuTUQ1PXYuZXh0ZW5kKHtfZG9SZXNldDpmdW5jdGlvbigpe3RoaXMuX2hhc2g9bmV3IHcuaW5pdChbMTczMjU4NDE5Myw0MDIzMjMzNDE3LDI1NjIzODMxMDIsMjcxNzMzODc4XSl9LFxuX2RvUHJvY2Vzc0Jsb2NrOmZ1bmN0aW9uKHEsbil7Zm9yKHZhciBhPTA7MTY+YTthKyspe3ZhciBjPW4rYSxlPXFbY107cVtjXT0oZTw8OHxlPj4+MjQpJjE2NzExOTM1fChlPDwyNHxlPj4+OCkmNDI3ODI1NTM2MH12YXIgYT10aGlzLl9oYXNoLndvcmRzLGM9cVtuKzBdLGU9cVtuKzFdLGo9cVtuKzJdLGs9cVtuKzNdLHo9cVtuKzRdLHI9cVtuKzVdLHQ9cVtuKzZdLHc9cVtuKzddLHY9cVtuKzhdLEE9cVtuKzldLEI9cVtuKzEwXSxDPXFbbisxMV0sdT1xW24rMTJdLEQ9cVtuKzEzXSxFPXFbbisxNF0seD1xW24rMTVdLGY9YVswXSxtPWFbMV0sZz1hWzJdLGg9YVszXSxmPXAoZixtLGcsaCxjLDcsYlswXSksaD1wKGgsZixtLGcsZSwxMixiWzFdKSxnPXAoZyxoLGYsbSxqLDE3LGJbMl0pLG09cChtLGcsaCxmLGssMjIsYlszXSksZj1wKGYsbSxnLGgseiw3LGJbNF0pLGg9cChoLGYsbSxnLHIsMTIsYls1XSksZz1wKGcsaCxmLG0sdCwxNyxiWzZdKSxtPXAobSxnLGgsZix3LDIyLGJbN10pLFxuZj1wKGYsbSxnLGgsdiw3LGJbOF0pLGg9cChoLGYsbSxnLEEsMTIsYls5XSksZz1wKGcsaCxmLG0sQiwxNyxiWzEwXSksbT1wKG0sZyxoLGYsQywyMixiWzExXSksZj1wKGYsbSxnLGgsdSw3LGJbMTJdKSxoPXAoaCxmLG0sZyxELDEyLGJbMTNdKSxnPXAoZyxoLGYsbSxFLDE3LGJbMTRdKSxtPXAobSxnLGgsZix4LDIyLGJbMTVdKSxmPWQoZixtLGcsaCxlLDUsYlsxNl0pLGg9ZChoLGYsbSxnLHQsOSxiWzE3XSksZz1kKGcsaCxmLG0sQywxNCxiWzE4XSksbT1kKG0sZyxoLGYsYywyMCxiWzE5XSksZj1kKGYsbSxnLGgsciw1LGJbMjBdKSxoPWQoaCxmLG0sZyxCLDksYlsyMV0pLGc9ZChnLGgsZixtLHgsMTQsYlsyMl0pLG09ZChtLGcsaCxmLHosMjAsYlsyM10pLGY9ZChmLG0sZyxoLEEsNSxiWzI0XSksaD1kKGgsZixtLGcsRSw5LGJbMjVdKSxnPWQoZyxoLGYsbSxrLDE0LGJbMjZdKSxtPWQobSxnLGgsZix2LDIwLGJbMjddKSxmPWQoZixtLGcsaCxELDUsYlsyOF0pLGg9ZChoLGYsXG5tLGcsaiw5LGJbMjldKSxnPWQoZyxoLGYsbSx3LDE0LGJbMzBdKSxtPWQobSxnLGgsZix1LDIwLGJbMzFdKSxmPWwoZixtLGcsaCxyLDQsYlszMl0pLGg9bChoLGYsbSxnLHYsMTEsYlszM10pLGc9bChnLGgsZixtLEMsMTYsYlszNF0pLG09bChtLGcsaCxmLEUsMjMsYlszNV0pLGY9bChmLG0sZyxoLGUsNCxiWzM2XSksaD1sKGgsZixtLGcseiwxMSxiWzM3XSksZz1sKGcsaCxmLG0sdywxNixiWzM4XSksbT1sKG0sZyxoLGYsQiwyMyxiWzM5XSksZj1sKGYsbSxnLGgsRCw0LGJbNDBdKSxoPWwoaCxmLG0sZyxjLDExLGJbNDFdKSxnPWwoZyxoLGYsbSxrLDE2LGJbNDJdKSxtPWwobSxnLGgsZix0LDIzLGJbNDNdKSxmPWwoZixtLGcsaCxBLDQsYls0NF0pLGg9bChoLGYsbSxnLHUsMTEsYls0NV0pLGc9bChnLGgsZixtLHgsMTYsYls0Nl0pLG09bChtLGcsaCxmLGosMjMsYls0N10pLGY9cyhmLG0sZyxoLGMsNixiWzQ4XSksaD1zKGgsZixtLGcsdywxMCxiWzQ5XSksZz1zKGcsaCxmLG0sXG5FLDE1LGJbNTBdKSxtPXMobSxnLGgsZixyLDIxLGJbNTFdKSxmPXMoZixtLGcsaCx1LDYsYls1Ml0pLGg9cyhoLGYsbSxnLGssMTAsYls1M10pLGc9cyhnLGgsZixtLEIsMTUsYls1NF0pLG09cyhtLGcsaCxmLGUsMjEsYls1NV0pLGY9cyhmLG0sZyxoLHYsNixiWzU2XSksaD1zKGgsZixtLGcseCwxMCxiWzU3XSksZz1zKGcsaCxmLG0sdCwxNSxiWzU4XSksbT1zKG0sZyxoLGYsRCwyMSxiWzU5XSksZj1zKGYsbSxnLGgseiw2LGJbNjBdKSxoPXMoaCxmLG0sZyxDLDEwLGJbNjFdKSxnPXMoZyxoLGYsbSxqLDE1LGJbNjJdKSxtPXMobSxnLGgsZixBLDIxLGJbNjNdKTthWzBdPWFbMF0rZnwwO2FbMV09YVsxXSttfDA7YVsyXT1hWzJdK2d8MDthWzNdPWFbM10raHwwfSxfZG9GaW5hbGl6ZTpmdW5jdGlvbigpe3ZhciBiPXRoaXMuX2RhdGEsbj1iLndvcmRzLGE9OCp0aGlzLl9uRGF0YUJ5dGVzLGM9OCpiLnNpZ0J5dGVzO25bYz4+PjVdfD0xMjg8PDI0LWMlMzI7dmFyIGU9dS5mbG9vcihhL1xuNDI5NDk2NzI5Nik7blsoYys2ND4+Pjk8PDQpKzE1XT0oZTw8OHxlPj4+MjQpJjE2NzExOTM1fChlPDwyNHxlPj4+OCkmNDI3ODI1NTM2MDtuWyhjKzY0Pj4+OTw8NCkrMTRdPShhPDw4fGE+Pj4yNCkmMTY3MTE5MzV8KGE8PDI0fGE+Pj44KSY0Mjc4MjU1MzYwO2Iuc2lnQnl0ZXM9NCoobi5sZW5ndGgrMSk7dGhpcy5fcHJvY2VzcygpO2I9dGhpcy5faGFzaDtuPWIud29yZHM7Zm9yKGE9MDs0PmE7YSsrKWM9blthXSxuW2FdPShjPDw4fGM+Pj4yNCkmMTY3MTE5MzV8KGM8PDI0fGM+Pj44KSY0Mjc4MjU1MzYwO3JldHVybiBifSxjbG9uZTpmdW5jdGlvbigpe3ZhciBiPXYuY2xvbmUuY2FsbCh0aGlzKTtiLl9oYXNoPXRoaXMuX2hhc2guY2xvbmUoKTtyZXR1cm4gYn19KTt0Lk1ENT12Ll9jcmVhdGVIZWxwZXIocik7dC5IbWFjTUQ1PXYuX2NyZWF0ZUhtYWNIZWxwZXIocil9KShNYXRoKTtcbihmdW5jdGlvbigpe3ZhciB1PUNyeXB0b0pTLHA9dS5saWIsZD1wLkJhc2UsbD1wLldvcmRBcnJheSxwPXUuYWxnbyxzPXAuRXZwS0RGPWQuZXh0ZW5kKHtjZmc6ZC5leHRlbmQoe2tleVNpemU6NCxoYXNoZXI6cC5NRDUsaXRlcmF0aW9uczoxfSksaW5pdDpmdW5jdGlvbihkKXt0aGlzLmNmZz10aGlzLmNmZy5leHRlbmQoZCl9LGNvbXB1dGU6ZnVuY3Rpb24oZCxyKXtmb3IodmFyIHA9dGhpcy5jZmcscz1wLmhhc2hlci5jcmVhdGUoKSxiPWwuY3JlYXRlKCksdT1iLndvcmRzLHE9cC5rZXlTaXplLHA9cC5pdGVyYXRpb25zO3UubGVuZ3RoPHE7KXtuJiZzLnVwZGF0ZShuKTt2YXIgbj1zLnVwZGF0ZShkKS5maW5hbGl6ZShyKTtzLnJlc2V0KCk7Zm9yKHZhciBhPTE7YTxwO2ErKyluPXMuZmluYWxpemUobikscy5yZXNldCgpO2IuY29uY2F0KG4pfWIuc2lnQnl0ZXM9NCpxO3JldHVybiBifX0pO3UuRXZwS0RGPWZ1bmN0aW9uKGQsbCxwKXtyZXR1cm4gcy5jcmVhdGUocCkuY29tcHV0ZShkLFxubCl9fSkoKTtcbkNyeXB0b0pTLmxpYi5DaXBoZXJ8fGZ1bmN0aW9uKHUpe3ZhciBwPUNyeXB0b0pTLGQ9cC5saWIsbD1kLkJhc2Uscz1kLldvcmRBcnJheSx0PWQuQnVmZmVyZWRCbG9ja0FsZ29yaXRobSxyPXAuZW5jLkJhc2U2NCx3PXAuYWxnby5FdnBLREYsdj1kLkNpcGhlcj10LmV4dGVuZCh7Y2ZnOmwuZXh0ZW5kKCksY3JlYXRlRW5jcnlwdG9yOmZ1bmN0aW9uKGUsYSl7cmV0dXJuIHRoaXMuY3JlYXRlKHRoaXMuX0VOQ19YRk9STV9NT0RFLGUsYSl9LGNyZWF0ZURlY3J5cHRvcjpmdW5jdGlvbihlLGEpe3JldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9ERUNfWEZPUk1fTU9ERSxlLGEpfSxpbml0OmZ1bmN0aW9uKGUsYSxiKXt0aGlzLmNmZz10aGlzLmNmZy5leHRlbmQoYik7dGhpcy5feGZvcm1Nb2RlPWU7dGhpcy5fa2V5PWE7dGhpcy5yZXNldCgpfSxyZXNldDpmdW5jdGlvbigpe3QucmVzZXQuY2FsbCh0aGlzKTt0aGlzLl9kb1Jlc2V0KCl9LHByb2Nlc3M6ZnVuY3Rpb24oZSl7dGhpcy5fYXBwZW5kKGUpO3JldHVybiB0aGlzLl9wcm9jZXNzKCl9LFxuZmluYWxpemU6ZnVuY3Rpb24oZSl7ZSYmdGhpcy5fYXBwZW5kKGUpO3JldHVybiB0aGlzLl9kb0ZpbmFsaXplKCl9LGtleVNpemU6NCxpdlNpemU6NCxfRU5DX1hGT1JNX01PREU6MSxfREVDX1hGT1JNX01PREU6MixfY3JlYXRlSGVscGVyOmZ1bmN0aW9uKGUpe3JldHVybntlbmNyeXB0OmZ1bmN0aW9uKGIsayxkKXtyZXR1cm4oXCJzdHJpbmdcIj09dHlwZW9mIGs/YzphKS5lbmNyeXB0KGUsYixrLGQpfSxkZWNyeXB0OmZ1bmN0aW9uKGIsayxkKXtyZXR1cm4oXCJzdHJpbmdcIj09dHlwZW9mIGs/YzphKS5kZWNyeXB0KGUsYixrLGQpfX19fSk7ZC5TdHJlYW1DaXBoZXI9di5leHRlbmQoe19kb0ZpbmFsaXplOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3Byb2Nlc3MoITApfSxibG9ja1NpemU6MX0pO3ZhciBiPXAubW9kZT17fSx4PWZ1bmN0aW9uKGUsYSxiKXt2YXIgYz10aGlzLl9pdjtjP3RoaXMuX2l2PXU6Yz10aGlzLl9wcmV2QmxvY2s7Zm9yKHZhciBkPTA7ZDxiO2QrKyllW2ErZF1ePVxuY1tkXX0scT0oZC5CbG9ja0NpcGhlck1vZGU9bC5leHRlbmQoe2NyZWF0ZUVuY3J5cHRvcjpmdW5jdGlvbihlLGEpe3JldHVybiB0aGlzLkVuY3J5cHRvci5jcmVhdGUoZSxhKX0sY3JlYXRlRGVjcnlwdG9yOmZ1bmN0aW9uKGUsYSl7cmV0dXJuIHRoaXMuRGVjcnlwdG9yLmNyZWF0ZShlLGEpfSxpbml0OmZ1bmN0aW9uKGUsYSl7dGhpcy5fY2lwaGVyPWU7dGhpcy5faXY9YX19KSkuZXh0ZW5kKCk7cS5FbmNyeXB0b3I9cS5leHRlbmQoe3Byb2Nlc3NCbG9jazpmdW5jdGlvbihlLGEpe3ZhciBiPXRoaXMuX2NpcGhlcixjPWIuYmxvY2tTaXplO3guY2FsbCh0aGlzLGUsYSxjKTtiLmVuY3J5cHRCbG9jayhlLGEpO3RoaXMuX3ByZXZCbG9jaz1lLnNsaWNlKGEsYStjKX19KTtxLkRlY3J5cHRvcj1xLmV4dGVuZCh7cHJvY2Vzc0Jsb2NrOmZ1bmN0aW9uKGUsYSl7dmFyIGI9dGhpcy5fY2lwaGVyLGM9Yi5ibG9ja1NpemUsZD1lLnNsaWNlKGEsYStjKTtiLmRlY3J5cHRCbG9jayhlLGEpO3guY2FsbCh0aGlzLFxuZSxhLGMpO3RoaXMuX3ByZXZCbG9jaz1kfX0pO2I9Yi5DQkM9cTtxPShwLnBhZD17fSkuUGtjczc9e3BhZDpmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz00KmIsYz1jLWEuc2lnQnl0ZXMlYyxkPWM8PDI0fGM8PDE2fGM8PDh8YyxsPVtdLG49MDtuPGM7bis9NClsLnB1c2goZCk7Yz1zLmNyZWF0ZShsLGMpO2EuY29uY2F0KGMpfSx1bnBhZDpmdW5jdGlvbihhKXthLnNpZ0J5dGVzLT1hLndvcmRzW2Euc2lnQnl0ZXMtMT4+PjJdJjI1NX19O2QuQmxvY2tDaXBoZXI9di5leHRlbmQoe2NmZzp2LmNmZy5leHRlbmQoe21vZGU6YixwYWRkaW5nOnF9KSxyZXNldDpmdW5jdGlvbigpe3YucmVzZXQuY2FsbCh0aGlzKTt2YXIgYT10aGlzLmNmZyxiPWEuaXYsYT1hLm1vZGU7aWYodGhpcy5feGZvcm1Nb2RlPT10aGlzLl9FTkNfWEZPUk1fTU9ERSl2YXIgYz1hLmNyZWF0ZUVuY3J5cHRvcjtlbHNlIGM9YS5jcmVhdGVEZWNyeXB0b3IsdGhpcy5fbWluQnVmZmVyU2l6ZT0xO3RoaXMuX21vZGU9Yy5jYWxsKGEsXG50aGlzLGImJmIud29yZHMpfSxfZG9Qcm9jZXNzQmxvY2s6ZnVuY3Rpb24oYSxiKXt0aGlzLl9tb2RlLnByb2Nlc3NCbG9jayhhLGIpfSxfZG9GaW5hbGl6ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuY2ZnLnBhZGRpbmc7aWYodGhpcy5feGZvcm1Nb2RlPT10aGlzLl9FTkNfWEZPUk1fTU9ERSl7YS5wYWQodGhpcy5fZGF0YSx0aGlzLmJsb2NrU2l6ZSk7dmFyIGI9dGhpcy5fcHJvY2VzcyghMCl9ZWxzZSBiPXRoaXMuX3Byb2Nlc3MoITApLGEudW5wYWQoYik7cmV0dXJuIGJ9LGJsb2NrU2l6ZTo0fSk7dmFyIG49ZC5DaXBoZXJQYXJhbXM9bC5leHRlbmQoe2luaXQ6ZnVuY3Rpb24oYSl7dGhpcy5taXhJbihhKX0sdG9TdHJpbmc6ZnVuY3Rpb24oYSl7cmV0dXJuKGF8fHRoaXMuZm9ybWF0dGVyKS5zdHJpbmdpZnkodGhpcyl9fSksYj0ocC5mb3JtYXQ9e30pLk9wZW5TU0w9e3N0cmluZ2lmeTpmdW5jdGlvbihhKXt2YXIgYj1hLmNpcGhlcnRleHQ7YT1hLnNhbHQ7cmV0dXJuKGE/cy5jcmVhdGUoWzEzOTg4OTM2ODQsXG4xNzAxMDc2ODMxXSkuY29uY2F0KGEpLmNvbmNhdChiKTpiKS50b1N0cmluZyhyKX0scGFyc2U6ZnVuY3Rpb24oYSl7YT1yLnBhcnNlKGEpO3ZhciBiPWEud29yZHM7aWYoMTM5ODg5MzY4ND09YlswXSYmMTcwMTA3NjgzMT09YlsxXSl7dmFyIGM9cy5jcmVhdGUoYi5zbGljZSgyLDQpKTtiLnNwbGljZSgwLDQpO2Euc2lnQnl0ZXMtPTE2fXJldHVybiBuLmNyZWF0ZSh7Y2lwaGVydGV4dDphLHNhbHQ6Y30pfX0sYT1kLlNlcmlhbGl6YWJsZUNpcGhlcj1sLmV4dGVuZCh7Y2ZnOmwuZXh0ZW5kKHtmb3JtYXQ6Yn0pLGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCl7ZD10aGlzLmNmZy5leHRlbmQoZCk7dmFyIGw9YS5jcmVhdGVFbmNyeXB0b3IoYyxkKTtiPWwuZmluYWxpemUoYik7bD1sLmNmZztyZXR1cm4gbi5jcmVhdGUoe2NpcGhlcnRleHQ6YixrZXk6YyxpdjpsLml2LGFsZ29yaXRobTphLG1vZGU6bC5tb2RlLHBhZGRpbmc6bC5wYWRkaW5nLGJsb2NrU2l6ZTphLmJsb2NrU2l6ZSxmb3JtYXR0ZXI6ZC5mb3JtYXR9KX0sXG5kZWNyeXB0OmZ1bmN0aW9uKGEsYixjLGQpe2Q9dGhpcy5jZmcuZXh0ZW5kKGQpO2I9dGhpcy5fcGFyc2UoYixkLmZvcm1hdCk7cmV0dXJuIGEuY3JlYXRlRGVjcnlwdG9yKGMsZCkuZmluYWxpemUoYi5jaXBoZXJ0ZXh0KX0sX3BhcnNlOmZ1bmN0aW9uKGEsYil7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGE/Yi5wYXJzZShhLHRoaXMpOmF9fSkscD0ocC5rZGY9e30pLk9wZW5TU0w9e2V4ZWN1dGU6ZnVuY3Rpb24oYSxiLGMsZCl7ZHx8KGQ9cy5yYW5kb20oOCkpO2E9dy5jcmVhdGUoe2tleVNpemU6YitjfSkuY29tcHV0ZShhLGQpO2M9cy5jcmVhdGUoYS53b3Jkcy5zbGljZShiKSw0KmMpO2Euc2lnQnl0ZXM9NCpiO3JldHVybiBuLmNyZWF0ZSh7a2V5OmEsaXY6YyxzYWx0OmR9KX19LGM9ZC5QYXNzd29yZEJhc2VkQ2lwaGVyPWEuZXh0ZW5kKHtjZmc6YS5jZmcuZXh0ZW5kKHtrZGY6cH0pLGVuY3J5cHQ6ZnVuY3Rpb24oYixjLGQsbCl7bD10aGlzLmNmZy5leHRlbmQobCk7ZD1sLmtkZi5leGVjdXRlKGQsXG5iLmtleVNpemUsYi5pdlNpemUpO2wuaXY9ZC5pdjtiPWEuZW5jcnlwdC5jYWxsKHRoaXMsYixjLGQua2V5LGwpO2IubWl4SW4oZCk7cmV0dXJuIGJ9LGRlY3J5cHQ6ZnVuY3Rpb24oYixjLGQsbCl7bD10aGlzLmNmZy5leHRlbmQobCk7Yz10aGlzLl9wYXJzZShjLGwuZm9ybWF0KTtkPWwua2RmLmV4ZWN1dGUoZCxiLmtleVNpemUsYi5pdlNpemUsYy5zYWx0KTtsLml2PWQuaXY7cmV0dXJuIGEuZGVjcnlwdC5jYWxsKHRoaXMsYixjLGQua2V5LGwpfX0pfSgpO1xuKGZ1bmN0aW9uKCl7Zm9yKHZhciB1PUNyeXB0b0pTLHA9dS5saWIuQmxvY2tDaXBoZXIsZD11LmFsZ28sbD1bXSxzPVtdLHQ9W10scj1bXSx3PVtdLHY9W10sYj1bXSx4PVtdLHE9W10sbj1bXSxhPVtdLGM9MDsyNTY+YztjKyspYVtjXT0xMjg+Yz9jPDwxOmM8PDFeMjgzO2Zvcih2YXIgZT0wLGo9MCxjPTA7MjU2PmM7YysrKXt2YXIgaz1qXmo8PDFeajw8Ml5qPDwzXmo8PDQsaz1rPj4+OF5rJjI1NV45OTtsW2VdPWs7c1trXT1lO3ZhciB6PWFbZV0sRj1hW3pdLEc9YVtGXSx5PTI1NyphW2tdXjE2ODQzMDA4Kms7dFtlXT15PDwyNHx5Pj4+ODtyW2VdPXk8PDE2fHk+Pj4xNjt3W2VdPXk8PDh8eT4+PjI0O3ZbZV09eTt5PTE2ODQzMDA5KkdeNjU1MzcqRl4yNTcqel4xNjg0MzAwOCplO2Jba109eTw8MjR8eT4+Pjg7eFtrXT15PDwxNnx5Pj4+MTY7cVtrXT15PDw4fHk+Pj4yNDtuW2tdPXk7ZT8oZT16XmFbYVthW0deel1dXSxqXj1hW2Fbal1dKTplPWo9MX12YXIgSD1bMCwxLDIsNCw4LFxuMTYsMzIsNjQsMTI4LDI3LDU0XSxkPWQuQUVTPXAuZXh0ZW5kKHtfZG9SZXNldDpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLl9rZXksYz1hLndvcmRzLGQ9YS5zaWdCeXRlcy80LGE9NCooKHRoaXMuX25Sb3VuZHM9ZCs2KSsxKSxlPXRoaXMuX2tleVNjaGVkdWxlPVtdLGo9MDtqPGE7aisrKWlmKGo8ZCllW2pdPWNbal07ZWxzZXt2YXIgaz1lW2otMV07aiVkPzY8ZCYmND09aiVkJiYoaz1sW2s+Pj4yNF08PDI0fGxbaz4+PjE2JjI1NV08PDE2fGxbaz4+PjgmMjU1XTw8OHxsW2smMjU1XSk6KGs9azw8OHxrPj4+MjQsaz1sW2s+Pj4yNF08PDI0fGxbaz4+PjE2JjI1NV08PDE2fGxbaz4+PjgmMjU1XTw8OHxsW2smMjU1XSxrXj1IW2ovZHwwXTw8MjQpO2Vbal09ZVtqLWRdXmt9Yz10aGlzLl9pbnZLZXlTY2hlZHVsZT1bXTtmb3IoZD0wO2Q8YTtkKyspaj1hLWQsaz1kJTQ/ZVtqXTplW2otNF0sY1tkXT00PmR8fDQ+PWo/azpiW2xbaz4+PjI0XV1eeFtsW2s+Pj4xNiYyNTVdXV5xW2xbaz4+PlxuOCYyNTVdXV5uW2xbayYyNTVdXX0sZW5jcnlwdEJsb2NrOmZ1bmN0aW9uKGEsYil7dGhpcy5fZG9DcnlwdEJsb2NrKGEsYix0aGlzLl9rZXlTY2hlZHVsZSx0LHIsdyx2LGwpfSxkZWNyeXB0QmxvY2s6ZnVuY3Rpb24oYSxjKXt2YXIgZD1hW2MrMV07YVtjKzFdPWFbYyszXTthW2MrM109ZDt0aGlzLl9kb0NyeXB0QmxvY2soYSxjLHRoaXMuX2ludktleVNjaGVkdWxlLGIseCxxLG4scyk7ZD1hW2MrMV07YVtjKzFdPWFbYyszXTthW2MrM109ZH0sX2RvQ3J5cHRCbG9jazpmdW5jdGlvbihhLGIsYyxkLGUsaixsLGYpe2Zvcih2YXIgbT10aGlzLl9uUm91bmRzLGc9YVtiXV5jWzBdLGg9YVtiKzFdXmNbMV0saz1hW2IrMl1eY1syXSxuPWFbYiszXV5jWzNdLHA9NCxyPTE7cjxtO3IrKyl2YXIgcT1kW2c+Pj4yNF1eZVtoPj4+MTYmMjU1XV5qW2s+Pj44JjI1NV1ebFtuJjI1NV1eY1twKytdLHM9ZFtoPj4+MjRdXmVbaz4+PjE2JjI1NV1ealtuPj4+OCYyNTVdXmxbZyYyNTVdXmNbcCsrXSx0PVxuZFtrPj4+MjRdXmVbbj4+PjE2JjI1NV1ealtnPj4+OCYyNTVdXmxbaCYyNTVdXmNbcCsrXSxuPWRbbj4+PjI0XV5lW2c+Pj4xNiYyNTVdXmpbaD4+PjgmMjU1XV5sW2smMjU1XV5jW3ArK10sZz1xLGg9cyxrPXQ7cT0oZltnPj4+MjRdPDwyNHxmW2g+Pj4xNiYyNTVdPDwxNnxmW2s+Pj44JjI1NV08PDh8ZltuJjI1NV0pXmNbcCsrXTtzPShmW2g+Pj4yNF08PDI0fGZbaz4+PjE2JjI1NV08PDE2fGZbbj4+PjgmMjU1XTw8OHxmW2cmMjU1XSleY1twKytdO3Q9KGZbaz4+PjI0XTw8MjR8ZltuPj4+MTYmMjU1XTw8MTZ8ZltnPj4+OCYyNTVdPDw4fGZbaCYyNTVdKV5jW3ArK107bj0oZltuPj4+MjRdPDwyNHxmW2c+Pj4xNiYyNTVdPDwxNnxmW2g+Pj44JjI1NV08PDh8ZltrJjI1NV0pXmNbcCsrXTthW2JdPXE7YVtiKzFdPXM7YVtiKzJdPXQ7YVtiKzNdPW59LGtleVNpemU6OH0pO3UuQUVTPXAuX2NyZWF0ZUhlbHBlcihkKX0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdteWNpdHktZGlyZWN0aXZlcycsIFtdKTtcblxuICAgIGFwcC5kaXJlY3RpdmUoXCJkYXlBc3Ryb1F1b3RlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwicGFydGlhbHMvZGF5LWFzdHJvLXF1b3RlLmh0bWxcIlxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoXCJoZWFkZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy9oZWFkZXIuaHRtbFwiXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLmRpcmVjdGl2ZShcImZvcmNhc3RcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy9mb3JjYXN0Lmh0bWxcIlxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoXCJuZXdzLW1vdmllc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL25ld3MtbW92aWVzLmh0bWxcIlxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoXCJ5ZWxwXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwicGFydGlhbHMveWVscC5odG1sXCJcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuZGlyZWN0aXZlKFwiZmFyb29cIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy9mYXJvby5odG1sXCJcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuZGlyZWN0aXZlKFwibW92aWVzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwicGFydGlhbHMvbW92aWVzLmh0bWxcIlxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoXCJtYXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy9tYXAuaHRtbFwiXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLmRpcmVjdGl2ZShcImV2ZW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL2V2ZW50cy5odG1sXCJcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuZGlyZWN0aXZlKFwiaGVhZGVySW1hZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL2hlYWRlci1pbWFnZS5odG1sXCIsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLmRpcmVjdGl2ZShcInBsYWNlc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL3BsYWNlcy5odG1sXCJcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuZGlyZWN0aXZlKFwiY3JlZGl0c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL2NyZWRpdHMuaHRtbFwiXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLmRpcmVjdGl2ZShcInR3aXR0ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy90d2l0dGVyLmh0bWxcIlxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoXCJtZWV0dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYXJ0aWFscy9tZWV0dXAuaHRtbFwiXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLmRpcmVjdGl2ZShcInJhdGVzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwicGFydGlhbHMvcmF0ZXMuaHRtbFwiXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLmRpcmVjdGl2ZShcIm5lYXJieVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInBhcnRpYWxzL25lYXJieS5odG1sXCJcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuZGlyZWN0aXZlKFwibmF2YmFyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwicGFydGlhbHMvbmF2YmFyLmh0bWxcIlxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoJ2ltYWdlb25sb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcjaW1hZ2Vfc3Bpbm5lciwgI2ltYWdlX3NwaW5uZXIgaScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgJCgnI2hlYWRlcl9pbWFnZSBpbWcnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcbnZhciBldmVudHNfYXBwID0gYW5ndWxhci5tb2R1bGUoJ2V2ZW50c19hcHAnLCBbXSk7XG5cbmV2ZW50c19hcHAuZmFjdG9yeSgnZm9ybWF0RGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHl5eXlfbW1fZGQgOiBmdW5jdGlvbih0b2RheSl7XG4gICAgICAgIHZhciBkYXkgPSB0b2RheS5nZXREYXRlKHRvZGF5KTtcbiAgICAgICAgaWYoZGF5IDwgMTApIHtcbiAgICAgICAgICAgIGRheSA9ICcwJyArIGRheTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9udGggPSB0b2RheS5nZXRNb250aCh0b2RheSkgKyAxO1xuICAgICAgICBpZihtb250aCA8IDEwKSB7XG4gICAgICAgICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIHZhciB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIodG9kYXkpO1xuICAgICAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5OyBcbiAgICAgICAgfSAgXG4gICAgfTtcbn0pO1xuXG4vLyBldmVudHNfYXBwLmZhY3RvcnkoJ2RhdGVTb3J0JywgZnVuY3Rpb24oKSB7XG4vLyAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgY29tcGFyYXRvciA6IGZ1bmN0aW9uIChhLGIpe1xuLy8gICAgICAgICBpZiAoYS50aW1lc3RhbXAgPCBiLnRpbWVzdGFtcCkgcmV0dXJuIC0xO1xuLy8gICAgICAgICBpZiAoYS50aW1lc3RhbXAgPiBiLnRpbWVzdGFtcCkgcmV0dXJuIDE7XG4vLyAgICAgICAgIHJldHVybiAwO1xuLy8gICAgICAgICB9XG4vLyAgICAgfTtcbi8vIH0pO1xuXG5ldmVudHNfYXBwLmNvbnRyb2xsZXIoXCJFdmVudHNDdHJsXCIsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLCAnZm9ybWF0RGF0ZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkaHR0cCwgZm9ybWF0RGF0ZSkge1xuICAgICRzY29wZS5jYXRlZ29yaWVzID0gW107XG4gICAgXG4gICAgJHNjb3BlLmZpbmRfZXZlbnRzID0gZnVuY3Rpb24ocGFnZV9udW0sIGNhdGVnb3J5KSB7XG4gICAgICAgICRzY29wZS5zcGlubmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdF9jaXR5ID0gJHJvb3RTY29wZS5jaXR5O1xuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0b2RheSA9IGZvcm1hdERhdGUueXl5eV9tbV9kZCh0b2RheSk7XG4gICAgICAgIHRvZGF5ID0gdG9kYXkucmVwbGFjZSgvLS9nLCAnJykrJzAwJztcbiAgICAgICAgdmFyIGRhdGUgPSB0b2RheSArICctJyArIHRvZGF5O1xuICAgICAgICB2YXIgcGFnZV9zaXplID0gJzEwJztcblxuICAgICAgICAkc2NvcGUuZXZlbnRzID0geyBldmVudHM6IHt0aXRsZTonUmV0cmVpdmluZyBldmVudHMgZm9yICcgKyAkcm9vdFNjb3BlLmNpdHkgKyAnLid9fTtcbiAgICAgICAgdmFyIGNpdHlfc3RhdGVfY291bnRyeSA9ICcnO1xuICAgICAgICBpZigkcm9vdFNjb3BlLnN0YXRlKSB7XG4gICAgICAgICAgICBjaXR5X3N0YXRlX2NvdW50cnkgPSB0X2NpdHkgKycsJysgJHJvb3RTY29wZS5zdGF0ZSsnLCcrJHJvb3RTY29wZS5jb3VudHJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2l0eV9zdGF0ZV9jb3VudHJ5ID0gdF9jaXR5ICsnLCcrJHJvb3RTY29wZS5jb3VudHJ5O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVybCA9ICdwaHAvZ2V0X2V2ZW50LnBocCc7XG4gICAgICAgICRodHRwKHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBjaXR5X3N0YXRlX2NvdW50cnksXG4gICAgICAgICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgcGFnZV9zaXplOiBwYWdlX3NpemUsXG4gICAgICAgICAgICAgICAgc29ydF9vcmRlcjogJ3BvcHVsYXJpdHknLFxuICAgICAgICAgICAgICAgIHBhZ2VfbnVtYmVyOiBwYWdlX251bVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBpZihkYXRhLmV2ZW50cykge1xuICAgICAgICAgICAgICAgICRzY29wZS5zcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5ldmVudHMuZXZlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSAkc2NvcGUuZXZlbnRzID0gZGF0YS5ldmVudHMuZXZlbnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IGRhdGEuZXZlbnRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBldmVudC5pbWFnZSA9IChpdGVtLmltYWdlICE9PSBudWxsKSA/IGl0ZW0uaW1hZ2UubWVkaXVtLnVybCA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC50aXRsZSA9IChpdGVtLnRpdGxlICE9PSBudWxsKSA/IGl0ZW0udGl0bGUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudXJsID0gKGl0ZW0udXJsICE9PSBudWxsKSA/IGl0ZW0udXJsIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnZlbnVlX25hbWUgPSAoaXRlbS52ZW51ZV9uYW1lICE9PSBudWxsKSA/IGl0ZW0udmVudWVfbmFtZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdGFydF90aW1lID0gKGl0ZW0uc3RhcnRfdGltZSAhPT0gbnVsbCkgPyBpdGVtLnN0YXJ0X3RpbWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3BfdGltZSA9IHNlbGYuY2xlYW5fc3RvcF90aW1lKGV2ZW50LnN0YXJ0X3RpbWUsIGl0ZW0uc3RvcF90aW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcF90aW1lID0gKHN0b3BfdGltZSAhPT0gbnVsbCkgPyBzdG9wX3RpbWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGVzY3JpcHRpb24gPSAoaXRlbS5kZXNjcmlwdGlvbiAhPT0gbnVsbCkgPyBzZWxmLmNsZWFuSXQoaXRlbS5kZXNjcmlwdGlvbikgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudmVudWVfYWRkcmVzcyA9IChpdGVtLnZlbnVlX2FkZHJlc3MgIT09IG51bGwpID8gaXRlbS52ZW51ZV9hZGRyZXNzIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Lmdlb2NvZGVfdHlwZSA9IChpdGVtLmdlb2NvZGVfdHlwZSAhPT0gbnVsbCkgPyBzZWxmLmNoZWNrR2VvY29kZShpdGVtLmdlb2NvZGVfdHlwZSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQubGF0aXR1ZGUgPSAoaXRlbS5sYXRpdHVkZSAhPT0gbnVsbCkgPyBpdGVtLmxhdGl0dWRlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmxvbmdpdHVkZSA9IChpdGVtLmxvbmdpdHVkZSAhPT0gbnVsbCkgPyBpdGVtLmxvbmdpdHVkZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJCgnLm5ld3NwYW5lbCcpLnNjcm9sbFRvcCgwLDApO1xuXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBTdHJpbmcoY29uZmlnLmNvbmZpZy5jYXRlZ29yeSk7XG4gICAgICAgICAgICAgICAgdmFyIGNhdG5hbWUgPSAnY2F0Jyt0eXBlO1xuICAgICAgICAgICAgICAgICRzY29wZVtjYXRuYW1lXSA9IHR5cGU7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGVbdHlwZSsndG90YWxJdGVtcyddID0gZGF0YS50b3RhbF9pdGVtcztcbiAgICAgICAgICAgICAgICAkc2NvcGVbdHlwZSsnY3VycmVudFBhZ2UnXSA9IGRhdGEucGFnZV9udW1iZXI7XG4gICAgICAgICAgICAgICAgJHNjb3BlW3R5cGUrJ251bU9mUGFnZXMnXSA9IGRhdGEucGFnZV9jb3VudDtcbiAgICAgICAgICAgICAgICAkc2NvcGVbdHlwZSsnaXRlbXNQZXJQYWdlJ10gPSBwYWdlX3NpemU7XG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VyU3RhdGUgPSAocGFyc2VJbnQoJHNjb3BlW3R5cGUrJ3RvdGFsSXRlbXMnXSkgPD0gcGFyc2VJbnQoJHNjb3BlW3R5cGUrJ2l0ZW1zUGVyUGFnZSddKSkgPyAnbm9uZScgOiAnYmxvY2snO1xuICAgICAgICAgICAgICAgICQoJyMnK2NhdG5hbWUpLmNzcygnZGlzcGxheScsIHBhZ2VyU3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlW3R5cGVdID0gYXJyO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG90YWxJdGVtczogJywgJHNjb3BlW3R5cGUrJ3RvdGFsSXRlbXMnXSArICcgY3VycmVudFBhZ2U6ICcsICRzY29wZVt0eXBlKydjdXJyZW50UGFnZSddICsgJyBudW1PZlBhZ2VzOiAnICwgJHNjb3BlW3R5cGUrJ251bU9mUGFnZXMnXSArICcgaXRlbXNQZXJQYWdlOiAnLCAkc2NvcGVbdHlwZSsnaXRlbXNQZXJQYWdlJ10pXG4gICAgICAgIH0pOyBcblxuICAgICAgICB0aGlzLmNsZWFuSXQgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvKDwoW14+XSspPikvaWcsXCIgXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY2xlYW5fc3RvcF90aW1lID0gZnVuY3Rpb24oc3RhcnRfdGltZSwgc3RvcF90aW1lKSB7XG4gICAgICAgICAgICBpZihzdGFydF90aW1lICYmIHN0b3BfdGltZSApIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kID0gc3RhcnRfdGltZS5pbmRleE9mKCcgJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNkYXRlID0gc3RhcnRfdGltZS5zbGljZSgwLCBpbmQpO1xuICAgICAgICAgICAgICAgIGluZCA9IHN0b3BfdGltZS5pbmRleE9mKCcgJyk7XG4gICAgICAgICAgICAgICAgdmFyIGVkYXRlID0gc3RvcF90aW1lLnNsaWNlKDAsIGluZCk7XG4gICAgICAgICAgICAgICAgdmFyIGV0aW1lID0gc3RvcF90aW1lLnNsaWNlKGluZCk7XG4gICAgICAgICAgICAgICAgZXRpbWUgPSAoc2RhdGUgPT0gZWRhdGUpID8gZXRpbWUgOiBzdG9wX3RpbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV0aW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jaGVja0dlb2NvZGUgPSBmdW5jdGlvbihnZW9jb2RlKSB7XG4gICAgICAgICAgICAvLyBGb3IgbmctaGlkZSwgaGlkZSBpZiB0cnVlXG4gICAgICAgICAgICByZXR1cm4gKGdlb2NvZGUgPT0gJ0VWREIgR2VvY29kZXInKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgIH07XG5cbiAgICB2YXIgY2F0cyA9IFsnYXR0cmFjdGlvbnMnLCAnYXJ0JywgJ2J1c2luZXNzJywnY2x1YnNfYXNzb2NpYXRpb25zJywgJ2NvbWVkeScsICdjb21tdW5pdHknLCAnZmFtaWx5X2Z1bl9raWRzJywgJ2Zlc3RpdmFsc19wYXJhZGVzJywgJ2Z1bmRyYWlzZXJzJywgJ2xlYXJuaW5nX2VkdWNhdGlvbicsICdtb3ZpZXNfZmlsbScsICdtdXNpYycsICdvdXRkb29yc19yZWNyZWF0aW9uJywgJ3BlcmZvcm1pbmdfYXJ0cycsICdwb2xpdGljc19hY3RpdmlzbScsICdzYWxlcycsICdzaW5nbGVzX3NvY2lhbCcsICdzcG9ydHMnLCAnc3VwcG9ydCcsICd0ZWNobm9sb2d5J107XG4gICAgZm9yKCB2YXIgdiA9IDA7IHYgPCBjYXRzLmxlbmd0aDsgdisrKSB7XG4gICAgICAgICRzY29wZS5maW5kX2V2ZW50cygxLCBjYXRzW3ZdKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuc2V0UGFnZSA9IGZ1bmN0aW9uIChwYWdlTm8sIHR5cGUpIHtcbiAgICAgICAgJHNjb3BlLmZpbmRfZXZlbnRzKHBhZ2VObywgdHlwZSk7XG4gICAgfTtcblxufV0pO1xuXG5ldmVudHNfYXBwLmRpcmVjdGl2ZSgnaG10ZXh0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OidFQScsXG4gICAgICAgIHNjb3BlOntcbiAgICAgICAgICAgIGhtdGV4dCA6ICc9aG10ZXh0JyxcbiAgICAgICAgICAgIGhtbGltaXQgOiAnPScsXG4gICAgICAgICAgICBobWZ1bGx0ZXh0Oic9J1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL21vcmVsZXNzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyIDogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuICAgICAgICAgICAgJHNjb3BlLnRvZ2dsZVZhbHVlPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoJHNjb3BlLmhtZnVsbHRleHQgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5obWZ1bGx0ZXh0PWZhbHNlO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYoJHNjb3BlLmhtZnVsbHRleHQgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaG1mdWxsdGV4dD10cnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmhtZnVsbHRleHQ9dHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1dXG4gICAgfTtcbn0pO1xuXG5ldmVudHNfYXBwLmRpcmVjdGl2ZSgnZXZlbnRhJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OidFQScsXG4gICAgICAgIHNjb3BlOntcbiAgICAgICAgICAgIHVybCA6ICc9JyxcbiAgICAgICAgICAgIGltYWdlIDogJz0nLFxuICAgICAgICAgICAgdGl0bGU6Jz0nLFxuICAgICAgICAgICAgdmVudWVuYW1lOiAnPScsXG4gICAgICAgICAgICBzdGFydDogJz0nLFxuICAgICAgICAgICAgc3RvcDogJz0nLFxuICAgICAgICAgICAgYWRkcmVzczogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZXZlbnRzYS5odG1sJyxcbiAgICB9O1xufSk7XG5cbmV2ZW50c19hcHAuZGlyZWN0aXZlKCdldmVudGInLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6J0VBJyxcbiAgICAgICAgc2NvcGU6e1xuICAgICAgICAgICAgZ2VvY29kZSA6ICc9JyxcbiAgICAgICAgICAgIGxhdGl0dWRlIDogJz0nLFxuICAgICAgICAgICAgbG9uZ2l0dWRlOic9JyxcbiAgICAgICAgICAgIHVybDogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZXZlbnRzYi5odG1sJyxcbiAgICB9O1xufSk7XG5cbmV2ZW50c19hcHAuZmlsdGVyKCdjbGVhblRpbWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmKCFpdGVtKSB7IHJldHVybjsgfVxuICAgICAgICBpZihpdGVtLmluZGV4T2YoJyAnKSkge1xuICAgICAgICAgICAgdmFyIGFyciA9IGl0ZW0uc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIHZhciB0aW1lID0gKGFyclsxXSAhPSAnMDA6MDA6MDAnKSA/IGl0ZW0gOiBhcnJbMF07XG4gICAgICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG5ldmVudHNfYXBwLmZpbHRlcignY2FwaXRhbGl6ZV9maXN0X2NoYXInLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmKCFpdGVtKSB7IHJldHVybjsgfVxuICAgICAgICB2YXIgdGl0bGUgPSBpdGVtLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5zbGljZSgxKTtcbiAgICAgICAgLy8gQWxzbyB0YWtlIG91dCB1bmRlcnNjb3JlXG4gICAgICAgIHRpdGxlID0gdGl0bGUucmVwbGFjZSgvXy9nLCAnICcpO1xuICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgfTtcbn0pO1xuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG52YXIgZmFyb29fYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Zhcm9vX2FwcCcsIFtdKTtcblxuZmFyb29fYXBwLmNvbnRyb2xsZXIoXCJGYXJvb0N0cmxcIiwgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckaHR0cCcsICdmb3JtYXREYXRlJywgJyRxJyxcbiAgICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRodHRwLCBmb3JtYXREYXRlLCAkcSkge1xuICAgICAgICAkKCcudGFic19jb250YWluZXInKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAkc2NvcGUuaXNfc2VhcmNoID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5xdWVyeSA9ICcnO1xuXG4gICAgJHNjb3BlLmZpbmRfbmV3cyA9IGZ1bmN0aW9uKHBhZ2UsIHRlcm0pIHtcbiAgICAgICAgJHNjb3BlLm5ld3Nfc3Bpbm5lciA9IHRydWU7XG4gICAgICAgICRzY29wZS5pc19zZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcXVlcnkgPSAodGVybSA9PSAnc2VhcmNoJykgPyAkc2NvcGUucXVlcnkgOiB0ZXJtO1xuICAgICAgICB2YXIgdXJsID0gJ3BocC9nZXRfZmFyb28ucGhwJztcbiAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IChwYWdlIC0gMSkgKiAxMCArIDEsXG4gICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgdGVybTogdGVybSxcbiAgICAgICAgICAgICAgICBwYWdlOiBwYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubmV3c19zcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJCgnLm5ld3NwYW5lbCcpLnNjcm9sbFRvcCgwLDApO1xuICAgICAgICAgICAgICAgIHZhciB0ZXJtID0gU3RyaW5nKGNvbmZpZy5jb25maWcudGVybSk7XG4gICAgICAgICAgICAgICAgdmFyIGN1cl9wYWdlID0gU3RyaW5nKGNvbmZpZy5jb25maWcucGFnZSk7XG4gICAgICAgICAgICAgICAgLyogQWRkIGN1cnJlbnRQYWdlIHRvIGRhdGEgZm9yIHBhZ2luYXRpb24gKi9cbiAgICAgICAgICAgICAgICBkYXRhLmN1cnJlbnRQYWdlID0gY3VyX3BhZ2U7XG4gICAgICAgICAgICAgICAgLyogQ2hlY2sgaWYgaW1hZ2UgaXMgZ29vZCAqL1xuICAgICAgICAgICAgICAgIHNlbGYuaXNJbWFnZShkYXRhLCB0ZXJtKTtcbiAgICAgICAgICAgICAgICB2YXIgbnVtb2ZwYWdlcyA9IHBhcnNlSW50KGRhdGEuY291bnQvMTApO1xuICAgICAgICAgICAgICAgICQoJy5uZXdzcGFuZWwnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICB2YXIgcGFnZXJTdGF0ZSA9IChudW1vZnBhZ2VzIDw9IDEpID8gJ2ZhbHNlJyA6ICd0cnVlJztcbiAgICAgICAgICAgICAgICAkc2NvcGVbJ2lzXycgKyB0ZXJtXSA9IHBhZ2VyU3RhdGU7IC8vIEZvciBzZWFyY2ggcGFnZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIHRoaXMuaXNJbWFnZSA9IGZ1bmN0aW9uKGRhdGEsIHRlcm0pIHtcbiAgICAgICAgICAgIC8qIENoZWNrIHRoYXQgdGhlIGltYWdlICBleGl0cyBiZWZvciBpbmNsdWRpbmcgaXQuICovXG4gICAgICAgICAgICAkLmVhY2goZGF0YS5yZXN1bHRzLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaXRlbS5pdXJsO1xuICAgICAgICAgICAgICAgIC8qIEFkZCBzcmNfdXJsIGlmIGltYWdlIGlzIHRoZXJlIG9yXG4gICAgICAgICAgICAgICAgICogJycsIHNvIG5vIGJyb2tlbiBpbWFnZSBpY29uXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5wcm9taXNlLnRoZW4oZnVuY3Rpb24ob2spIHtcbiAgICAgICAgICAgICAgICAgIGlmKG9rKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgdXJsXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLml1cmwgPSAnJztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICRzY29wZVt0ZXJtXSA9IGRhdGE7XG4gICAgICAgICAgfTtcblxuICAgIH07XG5cbiAgICAkc2NvcGUuc2V0UGFnZSA9IGZ1bmN0aW9uIChwYWdlTm8sIHR5cGUpIHtcbiAgICAgICAgJHNjb3BlLmZpbmRfbmV3cyhwYWdlTm8sIHR5cGUpO1xuICAgIH07XG5cbiAgICB2YXIgdGVybXMgPSBbJ3dvcmxkJywgJ3RlY2hub2xvZ3knLCAnZW50ZXJ0YWlubWVudCcsICdzcG9ydHMnLCAndHJhdmVsJywgJ211c2ljJ107XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRlcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICRzY29wZS5maW5kX25ld3MoMSwgdGVybXNbaV0pO1xuICAgIH1cbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZih0aGlzLnF1ZXJ5ID09PSAnJykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgdHlwZSBpbiBhIHNlYXJjaCB0ZXJtLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5xdWVyeSA9IHRoaXMucXVlcnkucmVwbGFjZSgnICcsICclMjAnKTtcbiAgICAgICAgICAgICRzY29wZS5maW5kX25ld3MoMSwgJ3NlYXJjaCcpO1xuICAgICAgfTtcbn1dKTtcblxuZmFyb29fYXBwLmRpcmVjdGl2ZSgnZmFyb290b3BpYycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDonRUEnLFxuICAgICAgICBzY29wZTp7XG4gICAgICAgICAgICBhcnRpY2xlIDogJz1hcnRpY2xlJyxcbiAgICAgICAgICAgIHNwaW5uZXIgOiAnPSdcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9mYXJvb3RvcGljLmh0bWwnLFxuICAgIH07XG59KTtcblxufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuLy9jb21tZW50XG4vLyAkKCAnI0FyaWVzJyApLnRvb2x0aXAoIFwib3B0aW9uXCIsIFwiY29udGVudFwiLCBcIkF3ZXNvbWUgdGl0bGUhXCIgKTtcblxudmFyIGFzdHJvX2FwcCA9IGFuZ3VsYXIubW9kdWxlKCdhc3Ryb19hcHAnLCBbXSk7XG5cbmFzdHJvX2FwcC5jb250cm9sbGVyKFwiQXN0cm9DdHJsXCIsIFsnJHNjb3BlJywgJyRodHRwJyxcbiAgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAkc2NvcGUuaG9yb3Njb3BlID0gJ0Nob29zZSB5b3VyIHNpZ24nO1xuXG4gICRzY29wZS5jYWxsID0gZnVuY3Rpb24oc2lnbikge1xuICAgIC8vIGNvbnNvbGUubG9nKCdzaWduOiAnICsgc2lnbilcbiAgICAkc2NvcGUuaG9yb3Njb3BlID0gJyc7XG4gICAgJCgnI2FzdHJvX2hvcm9zY29wZSBpJykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICRodHRwKHtcbiAgICAgIHVybDogJ2h0dHBzOi8vc2VuZGVyLmJsb2Nrc3ByaW5nLmNvbS9hcGlfdjIvYmxvY2tzL2RiYTNjMmNhMDFjMDYzZGY5Y2RmOWZjNmYwY2Y5M2Y5P2FwaV9rZXk9ZGI4MWIxZmE1OTEzODBlYjQxMTBmZjMwOTM4MjkxNzYnLCBcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBzaWduOiBzaWdufSlcbiAgICB9KVxuICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICQoJyNhc3Ryb19ob3Jvc2NvcGUgaScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZGF0YTogJyArIGRhdGEpXG4gICAgICAkc2NvcGUuaG9yb3Njb3BlID0gZGF0YS5ob3Jvc2NvcGU7XG4gICAgfSk7IFxuICB9O1xufV0pO1xufSkoKTtcblxuXG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBtYXBfYXBwID0gYW5ndWxhci5tb2R1bGUoJ21hcF9hcHAnLCBbXSk7XG5cbm1hcF9hcHAuY29udHJvbGxlcihcIkdldE1hcEN0cmxcIiwgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlKSB7XG4gICAgdmFyIHRfY2l0eSA9ICRyb290U2NvcGUuY2l0eV9pZDtcbiAgICB2YXIgY2l0eV9kYXRhID0gJHJvb3RTY29wZS5sb2NzO1xuICAgIHZhciBjaXR5X3N0YXRlX2NvdW50cnkgPSAkcm9vdFNjb3BlLmNpdHlfc3RhdGVfY291bnRyeTtcblxuICAgICRyb290U2NvcGUubGF0X2xuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoY2l0eV9kYXRhW3RfY2l0eV0ubGF0LGNpdHlfZGF0YVt0X2NpdHldLmxvbik7XG4gICAgJHJvb3RTY29wZS56b29tID0gMTM7XG4gICAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgICAgIHpvb206IDEzLFxuICAgICAgICBjZW50ZXI6ICRyb290U2NvcGUubGF0X2xuZ1xuICAgIH07XG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1jYW52YXMnKSwgbWFwT3B0aW9ucyk7XG4gICAgJHJvb3RTY29wZS5tYXAgPSBtYXA7XG4gICAgdmFyIG1hcmtlcnMgPSBbXTtcbiAgICAkcm9vdFNjb3BlLm1hcmtlcnMgPSBtYXJrZXJzO1xuICAgIHZhciBtYXJrZXIgPSAnJztcbiAgICAvLyB2YXIgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcblxuICAgIC8vIE1pZ2h0IG5lZWQgdGhpcyBsYXRlciBzbyBsZWF2ZSBpdCBoZXJlIGZvciBub3cuXG4gICAgLy8gZ2VvY29kZXIuZ2VvY29kZSggeyAnYWRkcmVzcyc6IGNpdHlfc3RhdGVfY291bnRyeX0sIGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xuICAgIC8vICAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgLy8gICAgICAgbWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAvLyAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAvLyAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgLy8gICAgICAgICAgIHBvc2l0aW9uOiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uXG4gICAgLy8gICAgICAgfSk7XG4gICAgLy8gICAgICAgbWFya2Vycy5wdXNoKG1hcmtlcik7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coJ2ZpcnN0IHpvb20nKVxuICAgIC8vICAgICAgICAgbWFwLnNldFpvb20oMTMpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIGFsZXJ0KCdHZW9jb2RlIHdhcyBub3Qgc3VjY2Vzc2Z1bCBmb3IgdGhlIGZvbGxvd2luZyByZWFzb246ICcgKyBzdGF0dXMpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG4gICAgXG4gICAgLypcbiAgICAqIFdhdGNoIGZvciBjaGFuZ2Ugb24gJHJvb3RTY29wZS5sYXRfbG5nIGFuZCB1cGRhdGUgbWFya2VyIG9uIG1hcC5cbiAgICAqL1xuICAgIC8vIHZhciBtYXJrZXJzID0gW107XG4gICAgJHNjb3BlLiR3YXRjaCgnbGF0X2xuZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGF0X2xuZyA9IG51bGw7XG4gICAgICAgIHZhciBzY3JvbGxfdG9fbWFwID0gZmFsc2U7XG4gICAgICAgIGlmKHR5cGVvZiAkcm9vdFNjb3BlLmxhdF9sbmcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgKiBDaGVjayB0byBzZWUgaWYgbG9hZGluZyB0aGUgbWFwIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBsYXRfbG5nID0gJHJvb3RTY29wZS5sYXRfbG5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ2xlYXIgbWFya2Vyc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY29vcmRfYXJyYXkgPSAkcm9vdFNjb3BlLmxhdF9sbmcuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIHZhciBsYXQgPSBjb29yZF9hcnJheVswXTtcbiAgICAgICAgICAgIHZhciBsbmcgPSBjb29yZF9hcnJheVsxXTtcbiAgICAgICAgICAgIGxhdF9sbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcbiAgICAgICAgICAgIHNjcm9sbF90b19tYXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgcG9zaXRpb246IGxhdF9sbmcsXG4gICAgICAgICAgICBtYXA6IG1hcFxuICAgICAgICB9KTtcbiAgICAgICAgbWFwLnNldFpvb20oJHJvb3RTY29wZS56b29tKTtcbiAgICAgICAgbWFwLnNldENlbnRlcihtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIG1hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgICBpZihzY3JvbGxfdG9fbWFwKSB7XG4gICAgICAgICAgICAvLyBTY3JvbGwgYnJvd3NlciB3aW5kb3cgdG8gZm91Y3VzIGdvb2dsZSBtYXBcbiAgICAgICAgICAgIHZhciBlbCA9ICQoJyNtYXBfY29udGFpbmVyJyk7XG4gICAgICAgICAgICB2YXIgZWxPZmZzZXQgPSBlbC5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICB2YXIgZWxIZWlnaHQgPSBlbC5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0O1xuXG4gICAgICAgICAgICBpZiAoZWxIZWlnaHQgPCB3aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBlbE9mZnNldCAtICgod2luZG93SGVpZ2h0IC8gMikgLSAoZWxIZWlnaHQgLyAyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IGVsT2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNwZWVkID0gNzAwO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDpvZmZzZXR9LCBzcGVlZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBVc2VkIHdpdGggZ2V0X21hcF9zZXJ2aWNlLmpzXG4gICAgLy8gJHNjb3BlLmNoYW5nZV9sYXRfbG5nID0gZnVuY3Rpb24ocG9pbnQpe1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncG9pbnQ6ICcgKyBwb2ludClcbiAgICAvLyB9O1xuXG4gICAgLy8gQ29weXJpZ2h0IGlzIGhpZGRlbiB0aWxsIGxhc3QgZWxlbWVudCBpcyBkaXNwbGF5ZWRcbiAgICAkKCcjY29weXJpZ2h0JykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xufV0pO1xuXG5tYXBfYXBwLmNvbnRyb2xsZXIoJ1NldExhdExuZycsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLFxuICAgIGZ1bmN0aW9uICgkc2NvcGUsICRyb290U2NvcGUpIHtcbiAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAkc2NvcGUuc2V0X21hcmtlciA9IGZ1bmN0aW9uKGxvYzEsIGxvYzIpIHtcbiAgICAgICAgLypcbiAgICAgICAgKiBMYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGFyZSBkZXBlbmRlbnQgb24gdGhlIGRhdGFzb3VyY2UuXG4gICAgICAgICogVW50aWwgdGhlcmUgaXMgYSBiZXR0ZXIgc29sdXRpb24sIHNvcnQgdGhlbSBvdXQgaGVyZSBcbiAgICAgICAgKiB5ZWxwOiBsb25naXR1ZGVcbiAgICAgICAgKiBzZWF0R2VlazogbG9uXG4gICAgICAgICogZXZlbnRGaW5kYTogbG5nXG4gICAgICAgICovXG4gICAgICAgIHZhciBsYXQsIGxuZztcbiAgICAgICAgaWYodHlwZW9mIGxvYzEgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGxhdCA9IG51bGw7XG4gICAgICAgICAgICBsbmcgPSBudWxsO1xuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gbG9jMSkge1xuICAgICAgICAgICAgICAgIGlmKGxvYzEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2goa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbG5nID0gbG9jMVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xuZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBsbmcgPSBsb2MxW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbG9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuZyA9IGxvYzFba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsb25naXR1ZGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbG5nID0gbG9jMVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ID0gbG9jMVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xhdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXQgPSBsb2MxW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGF0aXR1ZGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ID0gbG9jMVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2snOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ID0gbG9jMVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbG5nID0gbG9jMVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXQgPSBsb2MxO1xuICAgICAgICAgICAgbG5nID0gbG9jMjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbGF0OiAnLCBsYXQgLCAnIGxuZzogJywgbG5nKVxuICAgICAgICAkcm9vdFNjb3BlLmxhdF9sbmcgPSBsYXQgKyAnLCAnICsgbG5nO1xuICAgICAgICAkcm9vdFNjb3BlLnpvb20gPSAxODtcbiAgICB9O1xufV0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBtZWV0dXBfYXBwID0gYW5ndWxhci5tb2R1bGUoJ21lZXR1cF9hcHAnLCBbXSk7XG5cbm1lZXR1cF9hcHAuY29udHJvbGxlcihcIm1lZXR1cEN0cmxcIiwgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckaHR0cCcsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkaHR0cCkge1xuICAgIHZhciBzdGFydGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBlbmRkYXRlID0gbmV3IERhdGUobm93KTtcbiAgICBlbmRkYXRlID0gZW5kZGF0ZS5zZXREYXRlKG5vdy5nZXREYXRlKCkrNSk7XG4gICAgZW5kZGF0ZSA9IG5ldyBEYXRlKGVuZGRhdGUpO1xuICAgIHZhciBjaXR5ID0gJHJvb3RTY29wZS5jaXR5O1xuICAgIHZhciBzdGF0ZSA9ICRyb290U2NvcGUuc3RhdGU7XG4gICAgdmFyIGNvdW50cnkgPSAkcm9vdFNjb3BlLmNvdW50cnk7XG4gICAgdmFyIGNpdHlfZGF0YSA9ICRyb290U2NvcGUubG9jcztcbiAgICB2YXIgdF9jaXR5ID0gJHJvb3RTY29wZS5jaXR5X2lkO1xuICAgIHZhciBsYXQgPSBjaXR5X2RhdGFbdF9jaXR5XS5sYXQ7XG4gICAgdmFyIGxvbiA9IGNpdHlfZGF0YVt0X2NpdHldLmxvbjsgXG4gICAgdmFyIHVybCA9ICdodHRwczovL2FwaS5tZWV0dXAuY29tLzIvb3Blbl9ldmVudHM/Y2FsbGJhY2s9PyZsYXQ9JyArIGxhdCArICcmY291bnRyeT0nICsgY291bnRyeSArICcmY2l0eT0nICsgY2l0eSArICcmc3RhdGU9JyArIHN0YXRlICsgJyZ0ZXh0PXRyYXZlbCZsb249JyArIGxvbiArICcma2V5PTU1NzkxMzZkNTgyM2M4MDU0MzQxMjU4ZTQ1MmYnO1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICAkKCcjbWVldHVwX3NwaW5uZXIgaScpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICAkLmdldEpTT04odXJsLCBcbiAgICBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkKCcjbWVldHVwX3NwaW5uZXIgaScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQuZWFjaChkYXRhLnJlc3VsdHMsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS50aW1lIDw9IGVuZGRhdGUpIHsgXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0ge307XG4gICAgICAgICAgICAgICAgZXZlbnQuY2l0eSA9IGNpdHk7XG4gICAgICAgICAgICAgICAgZXZlbnQubmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICBldmVudC5ncm91cF9uYW1lID0gaXRlbS5ncm91cC5uYW1lO1xuICAgICAgICAgICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uID0gaXRlbS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBldmVudC5qb2luX21vZGUgPSBpdGVtLmdyb3VwLmpvaW5fbW9kZTtcbiAgICAgICAgICAgICAgICBldmVudC53aG8gPSBpdGVtLmdyb3VwLndobztcbiAgICAgICAgICAgICAgICBldmVudC53aHkgPSB0eXBlb2YoaXRlbS53aHkgIT09ICd1bmRlZmluZWQnKSA/IGl0ZW0ud2h5IDogMDtcbiAgICAgICAgICAgICAgICBldmVudC5ob3dfdG9fZmluZF91cyA9IHR5cGVvZihpdGVtLmhvd190b19maW5kX3VzICE9PSAndW5kZWZpbmVkJykgPyBpdGVtLmhvd190b19maW5kX3VzIDogMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmVudWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnZlbnVlX25hbWUgPSB0eXBlb2YoaXRlbS52ZW51ZS5uYW1lICE9PSAndW5kZWZpbmVkJykgPyBpdGVtLnZlbnVlLm5hbWUgOiAwO1xuICAgICAgICAgICAgICAgICAgICBldmVudC52ZW51ZV9hZGRyZXNzID0gdHlwZW9mKGl0ZW0udmVudWUuYWRkcmVzcyAhPT0gJ3VuZGVmaW5lZCcpID8gaXRlbS52ZW51ZS5hZGRyZXNzIDogMDtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudmVudWVfY2l0eSA9IHR5cGVvZihpdGVtLnZlbnVlLmNpdHkgIT09ICd1bmRlZmluZWQnKSA/IGl0ZW0udmVudWUuY2l0eSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnZlbnVlX3Bob25lID0gdHlwZW9mKGl0ZW0udmVudWUucGhvbmUgIT09ICd1bmRlZmluZWQnKSA/IGl0ZW0udmVudWUucGhvbmUgOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IG5ldyBEYXRlKGl0ZW0udGltZSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBldmVudC50aW1lID0gdGltZS5zbGljZSgwLCAyMSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmZlZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZmVlX2Ftb3VudCA9IHR5cGVvZihpdGVtLmZlZS5hbW91bnQgIT09ICd1bmRlZmluZWQnKSA/IGl0ZW0uZmVlLmFtb3VudCA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmZlZV9jdXJyZW5jeSA9IHR5cGVvZihpdGVtLmZlZS5jdXJyZW5jeSAhPT0gJ3VuZGVmaW5lZCcpID8gaXRlbS5mZWUuY3VycmVuY3kgOiAwO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5mZWVfZGVzY3JpcHRpb24gPSB0eXBlb2YoaXRlbS5mZWUuZGVzY3JpcHRpb24gIT09ICd1bmRlZmluZWQnKSA/IGl0ZW0uZmVlLmRlc2NyaXB0aW9uIDogMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnZlbnVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGF0ID0gdHlwZW9mKGl0ZW0udmVudWUubGF0ICE9PSAndW5kZWZpbmVkJykgPyBpdGVtLnZlbnVlLmxhdCA6IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb24gPSB0eXBlb2YoaXRlbS52ZW51ZS5sb24gIT09ICd1bmRlZmluZWQnKSA/IGl0ZW0udmVudWUubG9uIDogMDtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS52ZW51ZS5sYXQgJiYgaXRlbS52ZW51ZS5sb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnBvaW50ID0ge2xhdDogbGF0LCBsb246IGxvbn07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5tZWV0dXBfdW5hdmFpbGFibGUgPSAoYXJyLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICRzY29wZS5ldmVudHMgPSBhcnI7XG4gICAgfSk7XG4gICAgXG4gICAgLypcbiAgICAqIFNlbGVjdCBhbmQgaXNBY3RpdmUgdG9nZ2xlIFllbHAgZGV0YWlsc1xuICAgICovXG4gICAgJHNjb3BlLnNlbGVjdD0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAkc2NvcGUuc2VsZWN0ZWQgPSAoaXRlbSA9PT0gJHNjb3BlLnNlbGVjdGVkKSA/IG51bGwgOiBpdGVtO1xuICAgICAgICBcbiAgICB9O1xuXG4gICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkID09PSBpdGVtO1xuICAgIH07IFxufV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xudmFyIG1vdmllX2FwcCA9IGFuZ3VsYXIubW9kdWxlKCdtb3ZpZV9hcHAnLCBbJ3VpLmJvb3RzdHJhcCddKTtcblxubW92aWVfYXBwLmNvbnRyb2xsZXIoXCJNb3ZpZUN0cmxcIiwgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckaHR0cCcsXG4gIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJGh0dHApIHtcbiAgICB2YXIgY2l0eV9zdGF0ZSA9ICRyb290U2NvcGUuY2l0eS5yZXBsYWNlKCcgJywgJywnKSArICcsJyArICRyb290U2NvcGUuc3RhdGU7XG4gICAgLy8gY29uc29sZS5sb2coJ2NpdHlfc3RhdGU6ICcgKyBjaXR5X3N0YXRlKVxuICAgICRzY29wZS5nb29kX2RhdGEgPSB0cnVlO1xuICAgICRzY29wZS50aGVhdGVycyA9IHsgZXZlbnRzOiB7bmFtZTonVW5hdmFpbGFibGUnfX07XG4gICAgJGh0dHAoe1xuICAgICAgICB1cmw6ICdwaHAvZ2V0X21vdmllcy5waHAnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLCBcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBwYXJhbXM6IHtjaXR5OiBjaXR5X3N0YXRlfVxuICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBpZihkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkc2NvcGUudGhlYXRlcnMgPSBkYXRhO1xuICAgICAgICB9XG4gICAgfSk7IFxuXG59XSk7XG5cbm1vdmllX2FwcC5maWx0ZXIoJ21vdmllX3RpbWVzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLnJlcGxhY2UoLygmbmJzcCkqL2csXCJcIik7XG4gIH07XG59KTtcblxuLy8gbW92aWVfYXBwLmZpbHRlcignbW92aWVfYWRkcmVzcycsIGZ1bmN0aW9uICgpIHtcbi8vICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtKSB7XG4vLyAgICAgLyogQ2hlY2sgZm9yIGJhZCBtb3ZpZSBpbmZvICovXG4vLyAgICAgaWYoaXRlbSA9PSBudWxsIHx8IGl0ZW0uaW5kZXhPZignOyYjJykpIHtcbi8vICAgICAgIHJldHVybiBcIlwiO1xuLy8gICAgIH1cbi8vICAgICAvKiBSZXR1cm4gZ29vZCBtb3ZpZSBpbmZvICovXG4vLyAgICAgLy8gUmVtb3ZlIGFtcGVyc2FuZFxuLy8gICAgIGl0ZW0ucmVwbGFjZSgvKCZuYnNwKSovZyxcIlwiKTtcbi8vICAgICBpdGVtLnRvVXBwZXJDYXNlKCk7XG4vLyAgICAgcmV0dXJuIGl0ZW07XG4vLyAgIH07XG4vLyB9KTtcblxubW92aWVfYXBwLmZpbHRlcigndGhlYXRlcl9uYW1lJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0ZW0sc2NvcGUpIHtcbiAgICAvKiBDaGVjayBmb3IgYmFkIG1vdmllIGluZm8gKi9cbiAgICBpZihpdGVtID09PSBudWxsIHx8IGl0ZW0uaW5kZXhPZignOyYjJykgIT0gLTEpe1xuICAgICAgc2NvcGUuZ29vZF9kYXRhID0gZmFsc2U7XG4gICAgICByZXR1cm4gXCJVbmF2YWlsYWJsZVwiO1xuICAgIH1cbiAgICAvKiBSZXR1cm4gZ29vZCBtb3ZpZSBpbmZvICovXG4gICAgLy8gUmVtb3ZlIGFtcGVyc2FuZFxuICAgIGl0ZW0ucmVwbGFjZSgvKCZuYnNwKSovZyxcIlwiKTtcbiAgICByZXR1cm4gaXRlbTtcbiAgfTtcbn0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG52YXIgbmVhcmJ5X2FwcCA9IGFuZ3VsYXIubW9kdWxlKCduZWFyYnlfYXBwJywgW10pO1xuXG5uZWFyYnlfYXBwLmNvbnRyb2xsZXIoXCJOZWFyYnlDdHJsXCIsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLFxuICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUpIHtcbiAgJHNjb3BlLm1lc3NhZ2UgPSAnU2VsZWN0IGEgcGxhY2UgdG8gZmluZC4nO1xuICAvL2dldCBsYXQtbG5nIGxvY2F0aW9uXG4gICRzY29wZS5nZXRDb29yZGluYXRlcyA9IGZ1bmN0aW9uKHdoYXQpe1xuICAgICRzY29wZS53aGF0ID0gd2hhdDtcbiAgICAkc2NvcGUuc2V0X21lc3NhZ2UoJ0ZpbmRpbmcgbmVhcmJ5ICcgKyB3aGF0ICsgJy4uLicpO1xuICAgIGlmKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICAkcm9vdFNjb3BlLnVzZXJfbGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICAkcm9vdFNjb3BlLnVzZXJfbG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5maW5kX25lYXJieSgkcm9vdFNjb3BlLnVzZXJfbGF0LCAkcm9vdFNjb3BlLnVzZXJfbG5nLCB3aGF0KTtcbiAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICBoYW5kbGVOb0dlb2xvY2F0aW9uKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEdlb2xvY2F0aW9uXG4gICAgICBoYW5kbGVOb0dlb2xvY2F0aW9uKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaGFuZGxlTm9HZW9sb2NhdGlvbihlcnJvckZsYWcpIHtcbiAgICB2YXIgY29udGVudDtcbiAgICBpZiAoZXJyb3JGbGFnKSB7XG4gICAgICBjb250ZW50ID0gJ0Vycm9yOiBUaGUgR2VvbG9jYXRpb24gc2VydmljZSBmYWlsZWQuJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9ICdFcnJvcjogWW91ciBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IGdlb2xvY2F0aW9uLic7XG4gICAgfVxuICAgICRzY29wZS5zZXRfbWVzc2FnZShjb250ZW50KTtcbiAgfVxuXG4gICRzY29wZS5zZXRfbWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAkc2NvcGUubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH07XG5cbiAgJHNjb3BlLmZpbmRfbmVhcmJ5ID0gZnVuY3Rpb24obGF0LCBsbmcsIHdoYXQpIHtcbiAgICBjbGVhck1hcmtlcnMoKTtcbiAgICB2YXIgcHlybW9udCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gICAgdmFyIGxhdF9sbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcbiAgICB2YXIgdXNlcl9tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBsYXRfbG5nLFxuICAgICAgICAgICAgbWFwOiAkcm9vdFNjb3BlLm1hcFxuICAgIH0pO1xuICAgIGJvdW5kcy5leHRlbmQodXNlcl9tYXJrZXIuZ2V0UG9zaXRpb24oKSk7IC8vIEFkZCB1c2VyIGxvYyB0byBib3VuZHNcbiAgICAkcm9vdFNjb3BlLm1hcC5zZXRDZW50ZXIodXNlcl9tYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgJHJvb3RTY29wZS5tYXJrZXJzLnB1c2godXNlcl9tYXJrZXIpO1xuXG5cbiAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgIGxvY2F0aW9uOiBweXJtb250LFxuICAgICAgLy8gcmFkaXVzOiA1MDAsXG4gICAgICByYW5rQnk6IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuRElTVEFOQ0UsXG4gICAgICAvLyByYW5rQnk6IGdvb2dsZS5tYXBzLnBsYWNlcy5SYW5rQnkuUFJPTUlORU5DRSxcbiAgICAgIHR5cGVzOiBbd2hhdF1cbiAgICB9O1xuXG4gICAgdmFyIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuICAgIHZhciBzZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKCQoJyNmb3JfcGxhY2VzJykuZ2V0KDApKTtcbiAgICBzZXJ2aWNlLm5lYXJieVNlYXJjaChyZXF1ZXN0LCBjYWxsYmFjayk7XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgIGlmKCFyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAkc2NvcGUuc2V0X21lc3NhZ2UoXCJTb3JyeSB0aGVyZSB3ZXJlIG5vIFwiICsgd2hhdCArIFwiJ3MgZm91bmQgaW4gNTAwIG1ldGVycyBvZiB5b3VyIGFyZWEuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAocmVzdWx0cy5sZW5ndGggPiAxKSA/ICdsb2NhdGlvbnMnIDogJ2xvY2F0aW9uJztcbiAgICAgICAgJHNjb3BlLnNldF9tZXNzYWdlKCdGb3VuZCAnICsgcmVzdWx0cy5sZW5ndGggKycgJyArIGl0ZW0gKyAnIGZvciAnICsgJHNjb3BlLndoYXQgKyAnLicpO1xuICAgICAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlTWFya2VyKHJlc3VsdHNbaV0sIHNlcnZpY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkcm9vdFNjb3BlLm1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyTWFya2VycygpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJHJvb3RTY29wZS5tYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAkcm9vdFNjb3BlLm1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xuICAgICAgfVxuICAgIH1cblxuICAgICRzY29wZS5nZXREZXRhaWxzID0gZnVuY3Rpb24ocGxhY2UsIHNlcnZpY2UpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0geyBwbGFjZUlkOiBwbGFjZS5wbGFjZV9pZCB9O1xuICAgICAgc2VydmljZS5nZXREZXRhaWxzKHJlcXVlc3QsIGZ1bmN0aW9uKHBsYWNlLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xuICAgICAgICAgIGlmKHR5cGVvZiBwbGFjZS5mb3JtYXR0ZWRfcGhvbmVfbnVtYmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIG51bSA9IHBsYWNlLmZvcm1hdHRlZF9waG9uZV9udW1iZXI7XG4gICAgICAgICAgICBudW0gPSBudW0ucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgICAgICAgICBudW0gPSBudW0ucmVwbGFjZSgnKCcsICcnKTtcbiAgICAgICAgICAgIG51bSA9IG51bS5yZXBsYWNlKCcpJywgJycpO1xuICAgICAgICAgICAgaWYocGxhY2UuZm9ybWF0dGVkX3Bob25lX251bWJlcikge1xuICAgICAgICAgICAgICAkKCcjaW5mb193aW5fcGhvbmVfZGV0YWlsJykuaHRtbCgnPGEgaHJlZj10ZWw6JyArIG51bSArICc+cGg6ICcgKyBwbGFjZS5mb3JtYXR0ZWRfcGhvbmVfbnVtYmVyICsgJzwvYT4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYWNlLndlYnNpdGUpIHtcbiAgICAgICAgICAgICAgJCgnI2luZm9fd2luX3dlYnNpdGUnKS5odG1sKCc8YSBocmVmPVwiJyArIHBsYWNlLndlYnNpdGUgKyAnXCIgIHRhcmdldD1cImJsYW5rXCI+JyArICd3ZWJzaXRlJyArICc8L2E+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdnb3QgZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbihwbGFjZSwgc2VydmljZSkge1xuICAgICAgdmFyIHBpbkNvbG9yID0gXCIwMDk5MzNcIjtcbiAgICAgIHZhciBwaW5JbWFnZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJJbWFnZShcImh0dHA6Ly9jaGFydC5hcGlzLmdvb2dsZS5jb20vY2hhcnQ/Y2hzdD1kX21hcF9waW5fbGV0dGVyJmNobGQ9JUUyJTgwJUEyfFwiICsgcGluQ29sb3IsXG4gICAgICAgIG5ldyBnb29nbGUubWFwcy5TaXplKDIxLCAzNCksXG4gICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLDApLFxuICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMTAsIDM0KSk7XG4gICAgICB2YXIgcGxhY2VMb2MgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbjtcbiAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgbWFwOiAkcm9vdFNjb3BlLm1hcCxcbiAgICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLFxuICAgICAgICBpY29uOiBwaW5JbWFnZVxuICAgICAgfSk7XG4gICAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTsgLy9BZGQgbWFya2VyIGxvY3MgdG8gYm91bmRzXG4gICAgICAkcm9vdFNjb3BlLm1hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICRzY29wZS5nZXREZXRhaWxzKHBsYWNlLCBzZXJ2aWNlKTtcblxuICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICBtZXNzYWdlICs9ICc8ZGl2PjxzdHJvbmc+JyArIHBsYWNlLm5hbWUgKyAnPC9zdHJvbmc+PGJyLz4nO1xuICAgICAgICBpZihwbGFjZS5yYXRpbmcpIHsgbWVzc2FnZSArPSAnUmF0aW5nOiAnICsgcGxhY2UucmF0aW5nICsgJzxici8+JzsgfVxuICAgICAgICBpZihwbGFjZS5wcmljZV9sZXZlbCkgeyBtZXNzYWdlICs9ICdQcmljZSBMZXZlbDogJyArIHBsYWNlLnByaWNlX2xldmVsICsgJzxici8+JzsgfVxuICAgICAgICBpZihwbGFjZS5vcGVuaW5nX2hvdXJzKSB7XG4gICAgICAgICAgdmFyIGlzT3BlbiA9IChwbGFjZS5vcGVuaW5nX2hvdXJzLm9wZW5fbm93KSA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgICBtZXNzYWdlICs9ICdPcGVuOiAnICsgaXNPcGVuICsgJzxici8+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBsYWNlLnZpY2luaXR5KSB7IG1lc3NhZ2UgKz0gIHBsYWNlLnZpY2luaXR5ICsgJzxici8+JzsgfVxuICAgICAgICBtZXNzYWdlICs9IFwiPHA+PHNwYW4gaWQ9J2luZm9fd2luX3Bob25lX2RldGFpbCc+PC9zcGFuPlwiO1xuICAgICAgICBtZXNzYWdlICs9IFwiPHNwYW4gc3R5bGU9J3BhZGRpbmctbGVmdDoxMnB4OycgaWQ9J2luZm9fd2luX3dlYnNpdGUnPjwvc3Bhbj48L3A+XCI7XG5cbiAgICAgICAgXG4gICAgICAgIGluZm93aW5kb3cuc2V0Q29udGVudChtZXNzYWdlKTtcbiAgICAgICAgaW5mb3dpbmRvdy5vcGVuKCRyb290U2NvcGUubWFwLCB0aGlzKTtcbiAgICAgIFxuICAgICAgfSk7XG5cbiAgICB9O1xuXG4gIFxuICB9O1xuXG4gICRzY29wZS5wbGFjZXMgPSBbJ2FpcnBvcnQnLCAnYXF1YXJpdW0nLCAnYXJ0X2dhbGxlcnknLCAnYXRtJywgJ2Jha2VyeScsICdiYW5rJywgJ2JhcicsICdiZWF1dHlfc2Fsb24nLCAnYmljeWNsZV9zdG9yZScsICdib29rX3N0b3JlJywgJ2Jvd2xpbmdfYWxsZXknLCAnYnVzX3N0YXRpb24nLCAnY2FmZScsICdjYW1wZ3JvdW5kJywgJ2Nhcl9kZWFsZXInLCAnY2FyX3JlbnRhbCcsICdjYXJfcmVwYWlyJywgJ2Nhcl93YXNoJywgJ2Nhc2lubycsICdjaHVyY2gnLCAnY2xvdGhpbmdfc3RvcmUnLCAnY29udmVuaWVuY2Vfc3RvcmUnLCAnZGVudGlzdCcsICdkZXBhcnRtZW50X3N0b3JlJywgJ2RvY3RvcicsICdlbGVjdHJpY2lhbicsICdlbGVjdHJvbmljc19zdG9yZScsICdmaXJlX3N0YXRpb24nLCAnZmxvcmlzdCcsICdmb29kJywgJ2Z1cm5pdHVyZV9zdG9yZScsICdnYXNfc3RhdGlvbicsICAnZ3JvY2VyeV9vcl9zdXBlcm1hcmtldCcsICdneW0nLCAnaGFpcl9jYXJlJywgJ2hhcmR3YXJlX3N0b3JlJywgJ2hpbmR1X3RlbXBsZScsICdob21lX2dvb2RzX3N0b3JlJywgJ2hvc3BpdGFsJywgJ2pld2Vscnlfc3RvcmUnLCAnbGF1bmRyeScsICdsaWJyYXJ5JywgJ2xpcXVvcl9zdG9yZScsICdsb2Nrc21pdGgnLCAnbG9kZ2luZycsICdtZWFsX2RlbGl2ZXJ5JywgJ21lYWxfdGFrZWF3YXknLCAnbW9zcXVlJywgJ21vdmllX3JlbnRhbCcsICdtb3ZpZV90aGVhdGVyJywgJ211c2V1bScsICduaWdodF9jbHViJywgJ3BhcmsnLCAncGFya2luZycsICdwZXRfc3RvcmUnLCAncGhhcm1hY3knLCAncGxhY2Vfb2Zfd29yc2hpcCcsICdwb2xpY2UnLCAncG9zdF9vZmZpY2UnLCAncmVzdGF1cmFudCcsICdydl9wYXJrJywgJ3NjaG9vbCcsICdzaG9lX3N0b3JlJywgJ3Nob3BwaW5nX21hbGwnLCAnc3BhJywgJ3N0b3JlJywgJ3N1YndheV9zdGF0aW9uJywgJ3N5bmFnb2d1ZScsICd0YXhpX3N0YW5kJywgJ3RyYWluX3N0YXRpb24nLCAndW5pdmVyc2l0eScsICd2ZXRlcmluYXJ5X2NhcmUnLCAnem9vJ107XG5cbiAgJHNjb3BlLnN0YXR1cyA9IHtcbiAgICBpc29wZW46IGZhbHNlXG4gIH07XG5cbiAgJHNjb3BlLnRvZ2dsZWQgPSBmdW5jdGlvbihvcGVuKSB7XG4gICAgJGxvZy5sb2coJ0Ryb3Bkb3duIGlzIG5vdzogJywgb3Blbik7XG4gIH07XG5cbiAgJHNjb3BlLnRvZ2dsZURyb3Bkb3duID0gZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICRzY29wZS5zdGF0dXMuaXNvcGVuID0gISRzY29wZS5zdGF0dXMuaXNvcGVuO1xuICB9O1xuXG59XSk7IC8vIGVuZCBjb250cm9sbGVyXG5cbm5lYXJieV9hcHAuZmlsdGVyKCdyZW1vdmVfdW5kZXJzY29yZScsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYoaXRlbS5pbmRleE9mKCdfJykgPT0gLTEpIHtcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXRlbS5yZXBsYWNlKC9fL2csICcgJyk7XG4gICAgfSBcbiAgfTtcbn0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcbnZhciBwbGFjZXNfYXBwID0gYW5ndWxhci5tb2R1bGUoJ3BsYWNlc19hcHAnLCBbXSk7XG5cbnBsYWNlc19hcHAuY29udHJvbGxlcihcIlBsYWNlc0N0cmxcIiwgWyckc2NvcGUnLCAnJGh0dHAnLCAnJHJvb3RTY29wZScsICckcScsXG4gIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRyb290U2NvcGUsICRxKSB7XG4gIHZhciB0X2NpdHkgPSAkcm9vdFNjb3BlLmNpdHlfaWQ7XG4gIHZhciBjaXR5X2RhdGEgPSAkcm9vdFNjb3BlLmxvY3M7XG4gIHZhciBweXJtb250ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhjaXR5X2RhdGFbdF9jaXR5XS5sYXQsY2l0eV9kYXRhW3RfY2l0eV0ubG9uKTtcbiAgdmFyIHJlcXVlc3QgPSB7XG4gICAgbG9jYXRpb246IHB5cm1vbnQsXG4gICAgcmFkaXVzOiA1MDAsXG4gICAgdHlwZXM6IFsnYW11c2VtZW50X3BhcmsnLCdhcXVhcml1bScsJ2FydF9nYWxsZXJ5JywnY2FzaW5vJywnZ3ltJywnbGlicmFyeScsICdtb3ZpZV90aGVhdGVyJywgJ211c2V1bScsJ25pZ2h0X2NsdWInLCdwYXJrJywnc2hvcHBpbmdfbWFsbCcsJ3NwYScsJ3N0YWRpdW0nLCd0cmFpbl9zdGF0aW9uJywnem9vJ11cbiAgfTtcbiAgdmFyIHNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UoJCgnI2Zvcl9wbGFjZXMnKS5nZXQoMCkpO1xuICBzZXJ2aWNlLm5lYXJieVNlYXJjaChyZXF1ZXN0LCBjYWxsYmFjayk7XG5cbiAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0cywgc3RhdHVzLCBwYWdpbmF0aW9uKSB7XG4gICAgaWYgKHN0YXR1cyAhPSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGxhY2VzX3NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UoJCgnI2Zvcl9wbGFjZXMnKS5nZXQoMCkpO1xuXG4gICAgICAvKiBTbG93IHJlcXVlc3QgdG8gMSBldmVyeSBzZWMgKi9cbiAgICAgICRzY29wZS5wbGFjZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBnZXRfZGV0YWlsc19wZXJfc2VjKGksIHJlc3VsdHMsIHBsYWNlc19zZXJ2aWNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgZ2V0X2RldGFpbHNfcGVyX3NlYyA9IGZ1bmN0aW9uKGksIHJlc3VsdHMsIHBsYWNlc19zZXJ2aWNlKSB7XG4gICAgLyogU2VuZCByZXF1ZXN0IGZvciBkZXRhaWxzIHBlciBzZWMgc28gbm90IHRvIGV4Y2VlZFxuICAgICAqIGdvb2dsZXMgcmF0ZSBsaW1pdFxuICAgICAqL1xuICAgIChmdW5jdGlvbihpbmQpIHtcbiAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgIHBsYWNlSWQ6IHJlc3VsdHNbaW5kXS5wbGFjZV9pZFxuICAgICAgICB9O1xuICAgICAgICBwbGFjZXNfc2VydmljZS5nZXREZXRhaWxzKHJlcXVlc3QsIGZ1bmN0aW9uKHBsYWNlLCBzdGF0dXMpIHtcbiAgICAgICAgICBpZiAoc3RhdHVzID09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAvL1B1bGwgcGhvdG8gZ2V0dXJsIGZyb20gbmVzdGVkIG9iamVjdFxuICAgICAgICAgICAgdmFyIHVybCA9ICh0eXBlb2YgcGxhY2UucGhvdG9zICE9PSAndW5kZWZpbmVkJykgP1xuICAgICAgICAgICAgICBwbGFjZS5waG90b3NbMF0uZ2V0VXJsKHsnbWF4V2lkdGgnOjIwMCwgJ21heEhlaWdodCc6IDIwMH0pIDogbnVsbDtcbiAgICAgICAgICAgIGlmKCF1cmwpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBpc0ltYWdlKHVybCwgcGxhY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ290IGVycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sIDEwMDAgKyAoMTAwMCAqIGluZCkpO1xuICAgfSkoaSk7XG4gIH07XG5cbiAgdmFyIGlzSW1hZ2UgPSBmdW5jdGlvbihzcmMsIHBsYWNlKSB7XG4gICAgLyogQ2hlY2sgdGhhdCB0aGUgaW1hZ2UgIGV4aXRzIGJlZm9yIGluY2x1ZGluZyBpdC4gKi9cbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmYWxzZSk7XG4gICAgfTtcbiAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcbiAgICB9O1xuICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICAvKiBBZGQgc3JjX3VybCBpZiBpbWFnZSBpcyB0aGVyZSBvclxuICAgICAqIGZhbHNlLCBzbyBubyBicm9rZW4gaW1hZ2UgaWNvblxuICAgICAqIHRvIHNjb3BlLnBsYWNlc1xuICAgICovXG4gICAgZGVmZXJyZWQucHJvbWlzZS50aGVuKGZ1bmN0aW9uKG9rKSB7XG4gICAgICBpZihvaykge1xuICAgICAgICBwbGFjZS51cmwgPSBzcmM7XG4gICAgICAgICRzY29wZS5wbGFjZXMucHVzaChwbGFjZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGFjZS51cmwgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLnBsYWNlcy5wdXNoKHBsYWNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1dKTtcblxuXG5cbnBsYWNlc19hcHAuZmlsdGVyKCdmb3JtYXRUeXBlJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZihpdGVtLmluZGV4T2YoJ18nKSA9PSAtMSkge1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0eXBlX2FycmF5ID0gaXRlbS5zcGxpdCgnXycpO1xuICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlX2FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB3b3JkID0gdHlwZV9hcnJheVtpXTtcbiAgICAgICAgd29yZCA9IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpO1xuICAgICAgICBzdHIgKz0gd29yZCArICcgJztcbiAgICAgIH0gXG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfTtcbn0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG52YXIgcXVvdGVfYXBwID0gYW5ndWxhci5tb2R1bGUoJ3F1b3RlX2FwcCcsIFtdKTtcblxucXVvdGVfYXBwLmNvbnRyb2xsZXIoXCJRdW90ZUN0cmxcIiwgWyckc2NvcGUnLCAnJGh0dHAnLFxuICBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGxlc3NfbGVuID0gMzAwOyBcbiAgdmFyIHF1b3RlcyA9IFtdO1xuICAgICRodHRwLmdldCgnanMvcXVvdGVzLmpzb24nKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHF1b3RlID0ge307XG4gICAgICAgIHF1b3RlLnF1b3RlID0gdGhpcy5xdW90ZTtcbiAgICAgICAgcXVvdGUuYXV0aG9yID0gdGhpcy5hdXRob3I7XG4gICAgICAgIHF1b3Rlcy5wdXNoKHF1b3RlKTtcbiAgICAgIH0pO1xuICAgICAgLyogY2hvb3NlIHJhbmRvbSBxdW90ZSAqL1xuICAgICAgdmFyIHJhbmRfbnVtID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHF1b3Rlcy5sZW5ndGgpKTtcbiAgICAgIHZhciByYW5kX3F1b3RlID0gcXVvdGVzW3JhbmRfbnVtXTtcbiAgICAgICRzY29wZS5mdWxscXVvdGUgPSByYW5kX3F1b3RlLnF1b3RlO1xuICAgICAgJHNjb3BlLmF1dGhvciA9ICctLScgKyByYW5kX3F1b3RlLmF1dGhvcjtcbiAgICAgICRzY29wZS50b2dnbGVfcXVvdGUgPSB0cnVlO1xuICAgICAgaWYoJHNjb3BlLmZ1bGxxdW90ZS5sZW5ndGggPD0gbGVzc19sZW4pIHtcbiAgICAgICAgJHNjb3BlLnF1b3RlID0gJHNjb3BlLmZ1bGxxdW90ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuZ2V0X2xlc3Nfbl9tb3JlKCdsZXNzJyk7XG4gICAgICB9XG4gICAgfSk7IFxuXG4gICAgdGhpcy5nZXRfbGVzc19uX21vcmUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgaWYoc3RhdGUgPT0gJ2xlc3MnKSB7XG4gICAgICAgICAkc2NvcGUucXVvdGUgPSAkc2NvcGUuZnVsbHF1b3RlLnN1YnN0cmluZygwLCBsZXNzX2xlbikgKyAnPHNwYW4gY2xhc3M9bW9yZT4uLi4gbW9yZTwvc3Bhbj4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNjb3BlLnF1b3RlID0gJHNjb3BlLmZ1bGxxdW90ZS5zdWJzdHJpbmcoMCAsICRzY29wZS5mdWxscXVvdGUubGVuZ3RoKSArICc8c3BhbiBjbGFzcz1sZXNzPiBsZXNzPC9zcGFuPic7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS50b2dnbGVfbW9yZV9sZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZigkc2NvcGUudG9nZ2xlX3F1b3RlKSB7IFxuICAgICAgICAkc2NvcGUudG9nZ2xlX3F1b3RlID0gZmFsc2U7XG4gICAgICAgIHNlbGYuZ2V0X2xlc3Nfbl9tb3JlKCdtb3JlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgJHNjb3BlLnRvZ2dsZV9xdW90ZSA9IHRydWU7XG4gICAgICAgICBzZWxmLmdldF9sZXNzX25fbW9yZSgnbGVzcycpO1xuICAgICAgfVxuXG4gICAgfTtcbn1dKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciByYXRlc19hcHAgPSBhbmd1bGFyLm1vZHVsZSgncmF0ZXNfYXBwJywgWyd1aS5ib290c3RyYXAnXSk7XG5cbi8vIHJhdGVzX2FwcC5jb25maWcoWyckdG9vbHRpcFByb3ZpZGVyJywgZnVuY3Rpb24oJHRvb2x0aXBQcm92aWRlcil7XG4vLyAgICR0b29sdGlwUHJvdmlkZXIuc2V0VHJpZ2dlcnMoe1xuLy8gICAgICdtb3VzZWVudGVyJzogJ21vdXNlbGVhdmUnLFxuLy8gICAgICdjbGljayc6ICdjbGljaycsXG4vLyAgICAgJ2ZvY3VzJzogJ2JsdXInLFxuLy8gICAgICdoaWRlb25jbGljayc6ICdjbGljaydcbi8vICAgfSk7XG4vLyB9XSk7XG5cbnJhdGVzX2FwcC5jb250cm9sbGVyKCdSYXRlc0N0cmwnLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRodHRwJyxcbiAgICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRodHRwKSB7XG4gICAgXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICRzY29wZS5hbW91bnQgPSAxO1xuICAgICRzY29wZS5jdXJyZW5jaWVzID0gW107XG4gICAgJHNjb3BlLmJhc2VfcmF0ZXMgPSBbJ1VTRCcsICdBVUQnLCAnRVVSJ107XG4gICAgJHNjb3BlLnNlbF9ncnAgPSBbJ1VTRCcsICdFVVInLCAnR0JQJywgJ0lOUicsICdBVUQnLCAnQ0FEJywgJ0NOWScsICdOWkQnLCAnSlBZJywgJ1JVQiddO1xuICAgICRodHRwLmdldCgnanMvY3VycmVuY2llcy5qc29uJykuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgJHNjb3BlLmFsbF9jdXJyZW5jaWVzID0gZGF0YTtcbiAgICAgICAgZm9yKHZhciB2ID0gMDsgdiA8ICRzY29wZS5iYXNlX3JhdGVzLmxlbmd0aDsgdisrKXtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIGZvcih2YXIgeCA9IDA7IHggPCAkc2NvcGUuc2VsX2dycC5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHN0ciArPSBcIidcIiArICRzY29wZS5iYXNlX3JhdGVzW3ZdICsgJHNjb3BlLnNlbF9ncnBbeF0gKyBcIidcIiArICcsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgc3RyLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgdmFyIHVybCA9IFwiaHR0cHM6Ly9xdWVyeS55YWhvb2FwaXMuY29tL3YxL3B1YmxpYy95cWw/cT1zZWxlY3QgKiBmcm9tIHlhaG9vLmZpbmFuY2UueGNoYW5nZSB3aGVyZSBwYWlyIGluIChcIiArIHN0ciArIFwiKSZmb3JtYXQ9anNvbiZkaWFnbm9zdGljcz10cnVlJmVudj1zdG9yZTovL2RhdGF0YWJsZXMub3JnL2FsbHRhYmxlc3dpdGhrZXlzJmNhbGxiYWNrPVwiO1xuICAgICAgICAgICAgJC5nZXRKU09OKHVybCwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVuY3kgPSB7fTtcbiAgICAgICAgICAgICAgICAvKiBBZGQgbmVjZXNzYXJ5IGtleTp2YWx1ZXMgKi9cbiAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS5xdWVyeS5yZXN1bHRzLnJhdGUsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhYmJyZXYgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYmFzZSA9IGFiYnJldi5zbGljZSgwLDMpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeS5zb3J0aWQgPSAkc2NvcGUuYmFzZV9yYXRlcy5pbmRleE9mKCRzY29wZS5iYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb3VudHJ5ID0gYWJicmV2LnNsaWNlKDMpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZ1bGxuYW1lID0gc2VsZi5nZXRfZnVsbF9uYW1lcyhhYmJyZXYuc2xpY2UoMyksICRzY29wZS5hbGxfY3VycmVuY2llcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3VycmVuY3kuYmFzZSA9ICRzY29wZS5iYXNlO1xuICAgICAgICAgICAgICAgIGN1cnJlbmN5LmZ1bGxuYW1lID0gc2VsZi5nZXRfZnVsbF9uYW1lcygkc2NvcGUuYmFzZSwgJHNjb3BlLmFsbF9jdXJyZW5jaWVzKTtcbiAgICAgICAgICAgICAgICBjdXJyZW5jeS5yYXRlcyA9IGRhdGEucXVlcnkucmVzdWx0cy5yYXRlO1xuICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW5jaWVzLnB1c2goY3VycmVuY3kpO1xuICAgICAgICAgICAgICAgIGlmKCRzY29wZS5jdXJyZW5jaWVzLmxlbmd0aCA9PSAkc2NvcGUuYmFzZV9yYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbmNpZXMuc29ydChzZWxmLmNvbXBhcmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbXBhcmUgPSBmdW5jdGlvbihhLGIpIHtcbiAgICAgIGlmIChhLnNvcnRpZCA8IGIuc29ydGlkKVxuICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgaWYgKGEuc29ydGlkID4gYi5zb3J0aWQpXG4gICAgICAgIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0X2Z1bGxfbmFtZXM9IGZ1bmN0aW9uKGFiYnJldiwgZGF0YSkge1xuICAgIGZvcih2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gYWJicmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qIEZvciBtb2JpbGUgZGV2aWNlcyAqL1xuICAgIGlmKCRyb290U2NvcGUuaXNNb2JpbGUpIHtcbiAgICAgICAgJCgnLnJhdGVfY29udGFpbmVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICQoJypbcG9wb3Zlcl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL09ubHkgZG8gdGhpcyBmb3IgYWxsIHBvcG92ZXJzIG90aGVyIHRoYW4gdGhlIGN1cnJlbnQgb25lIHRoYXQgY2F1c2UgdGhpcyBldmVudFxuICAgICAgICAgICAgICAgIGlmICghKCQodGhpcykuaXMoZS50YXJnZXQpIHx8ICQodGhpcykuaGFzKGUudGFyZ2V0KS5sZW5ndGggPiAwKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLnBvcG92ZXInKS5sZW5ndGggIT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuc2libGluZ3MoJy5wb3BvdmVyJykuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhlIHBvcG92ZXIgZWxlbWVudCBmcm9tIHRoZSBET01cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLnBvcG92ZXInKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIHN0YXRlIG9mIHRoZSBwb3BvdmVyIGluIHRoZSBzY29wZSB0byByZWZsZWN0IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KHRoaXMpLnNjb3BlKCkudHRfaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufV0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIHRpbWVfYXBwID0gYW5ndWxhci5tb2R1bGUoJ3RpbWVfYXBwJywgW10pO1xuXG50aW1lX2FwcC5jb250cm9sbGVyKFwiR2V0VGltZUN0cmxcIiwgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckaHR0cCcsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkaHR0cCkge1xuICAgIC8vIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgdF9jaXR5ID0gJHJvb3RTY29wZS5jaXR5X2lkO1xuICAgIHZhciBjaXR5X2RhdGEgPSAkcm9vdFNjb3BlLmxvY3M7XG4gICAgdmFyIGRlY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KCdVMkZzZEdWa1gxOWNoVmVzUGhFdDRrYXZGRUEyZ1UxZmxQdkJwRGNBejB3PScsIFwic2VjcmV0XCIpO1xuICAgIHZhciBwYXNzX3BocmFzZSA9IGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG4gICAgZGVjcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoJ1UyRnNkR1ZrWDE5YnNIZTh5cnJsODVXSTFlS2NtVEhWQlVWeVVKd0xYUnM9JywgcGFzc19waHJhc2UpO1xuICAgIHZhciB1c2VybmFtZSA9IGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG4gICAgJGh0dHAoe1xuICAgICAgICB1cmw6ICdodHRwOi8vYXBpLmdlb25hbWVzLm9yZy90aW1lem9uZUpTT04nLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJywgXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgbGF0OiBjaXR5X2RhdGFbdF9jaXR5XS5sYXQsXG4gICAgICAgICAgICAgICAgbG5nOiBjaXR5X2RhdGFbdF9jaXR5XS5sb24sXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkcm9vdFNjb3BlLnRpbWVzLmZ1bGx0aW1lID0gZGF0YS50aW1lO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZnJvbSB0aW1lIGFwaTogJyArICRyb290U2NvcGUudGltZXMuZnVsbHRpbWUpXG4gICAgICAgIHZhciB0aW1lX2FyciA9IGRhdGEudGltZS5zcGxpdCgnICcpO1xuICAgICAgICAgLy8gJHNjb3BlLmN1cnJlbnRfdGltZSA9IHRpbWVfYXJyWzFdO1xuICAgICAgICAkcm9vdFNjb3BlLnRpbWVzLmN1cnJlbnQgPSB0aW1lX2FyclsxXTtcbiAgICAgICAgdmFyIHN1bnJpc2VfYXJyID0gZGF0YS5zdW5yaXNlLnNwbGl0KCcgJyk7XG4gICAgICAgIC8vICRzY29wZS5zdW5yaXNlID0gc3VucmlzZV9hcnJbMV07XG4gICAgICAgICRyb290U2NvcGUudGltZXMuc3VucmlzZSA9IHN1bnJpc2VfYXJyWzFdO1xuICAgICAgICB2YXIgc3Vuc2V0X2FyciA9IGRhdGEuc3Vuc2V0LnNwbGl0KCcgJyk7XG4gICAgICAgIC8vICRzY29wZS5zdW5zZXQgPSBzdW5zZXRfYXJyWzFdO1xuICAgICAgICAkcm9vdFNjb3BlLnRpbWVzLnN1bnNldCA9IHN1bnNldF9hcnJbMV07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aW1lOiAnICsgJHNjb3BlLmN1cnJlbnRfdGltZSlcbiAgIH0pO1xufV0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciB0d2l0dGVyX2FwcCA9IGFuZ3VsYXIubW9kdWxlKCd0d2l0dGVyX2FwcCcsIFtdKTtcblxudHdpdHRlcl9hcHAuZmFjdG9yeSgnZm9ybWF0VGV4dCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZF9saW5rcyA6IGZ1bmN0aW9uKGl0ZW0sIGxpbmtfdHlwZSl7XG4gICAgICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHN0ciA9IGl0ZW07XG4gICAgICAgICAgICB2YXIgeCA9IDA7XG4gICAgICAgICAgICB3aGlsZSghZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciB1cmxfc3RhcnQgPSBzdHIuaW5kZXhPZihsaW5rX3R5cGUpO1xuICAgICAgICAgICAgICAgIGlmKHVybF9zdGFydCA9PSAtMSB8fCB4ID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IHN0ci5zdWJzdHJpbmcodXJsX3N0YXJ0KTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsX2VuZCA9IHVybC5pbmRleE9mKCcgJyk7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmsgPSAnJztcbiAgICAgICAgICAgICAgICBpZih1cmxfZW5kID09IC0xKSB7dXJsX2VuZCA9IHN0ci5sZW5ndGg7fVxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsX2VuZCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGxpbmtfdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdodHRwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsgPSAnPGEgaHJlZj0nICsgdXJsICsgJyB0YXJnZXQ9XCJibGFua1wiPicgKyB1cmwuc3Vic3RyaW5nKDcpICsgJzwvYT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGluayA9ICc8YSBocmVmPWh0dHBzOi8vdHdpdHRlci5jb20vaGFzaHRhZy8nICsgdXJsLnN1YnN0cmluZygxKSArICc/c3JjPWhhc2ggdGFyZ2V0PVwiYmxhbmtcIj4nICsgdXJsLnN1YnN0cmluZygwKSArICc8L2E+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdAJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsgPSAnPGEgaHJlZj1odHRwczovL3R3aXR0ZXIuY29tLycgKyB1cmwuc3Vic3RyaW5nKDEpICsgJyB0YXJnZXQ9XCJibGFua1wiPicgKyB1cmwuc3Vic3RyaW5nKDApICsgJzwvYT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjaG9tcCA9IHBhcnNlSW50KHVybF9zdGFydCArIHVybF9lbmQpO1xuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoY2hvbXApO1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UodXJsLCBsaW5rKTtcbiAgICAgICAgICAgICAgICB4ICs9ICAxO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfSAgXG4gICAgfTtcbn0pO1xuXG50d2l0dGVyX2FwcC5jb250cm9sbGVyKCdUd2l0dGVyQ3RybCcsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLFxuICAgIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJGh0dHApIHtcbiAgICB2YXIgY2l0eV9zdGF0ZV9jb3VudHJ5ID0gJyc7XG4gICAgdmFyIHRfY2l0eSA9ICRyb290U2NvcGUuY2l0eS5yZXBsYWNlKFwiIFwiLCBcIiUyMFwiKTtcbiAgICBpZigkcm9vdFNjb3BlLnN0YXRlKSB7XG4gICAgICAgIGNpdHlfc3RhdGVfY291bnRyeSA9ICclMjMnICsgdF9jaXR5ICsnJTIwJysgJHJvb3RTY29wZS5zdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjaXR5X3N0YXRlX2NvdW50cnkgPSAnJTIzJyArIHRfY2l0eSArJyUyMCcrJHJvb3RTY29wZS5jb3VudHJ5O1xuICAgIH1cbiAgICAkKCcjdHdpdHRlcl9zcGlubmVyIGknKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgJGh0dHAoe1xuICAgICAgICB1cmw6ICdwaHAvZ2V0X3R3aXR0ZXIucGhwJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgcGFyYW1zOiB7cTogY2l0eV9zdGF0ZV9jb3VudHJ5fSxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgIFxuICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkKCcjdHdpdHRlcl9zcGlubmVyIGknKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkc2NvcGUudHdlZXRzID0gZGF0YTtcbiAgICB9KTsgXG59XSk7XG5cbnR3aXR0ZXJfYXBwLmZpbHRlcignYWRkVXJscycsIFsnJHNjZScsICdmb3JtYXRUZXh0JyxcbiAgICBmdW5jdGlvbiAoJHNjZSwgZm9ybWF0VGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZihpdGVtKSB7XG4gICAgICAgICAgICBpdGVtID0gZm9ybWF0VGV4dC5hZGRfbGlua3MoaXRlbSwgJ2h0dHAnKTtcbiAgICAgICAgICAgIGl0ZW0gPSBmb3JtYXRUZXh0LmFkZF9saW5rcyhpdGVtLCAnIycpO1xuICAgICAgICAgICAgaXRlbSA9IGZvcm1hdFRleHQuYWRkX2xpbmtzKGl0ZW0sICdAJyk7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChpdGVtKTtcbiAgICAgICAgfVxuICAgIH07XG59XSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciB3ZWF0aGVyX2FwcCA9IGFuZ3VsYXIubW9kdWxlKCd3ZWF0aGVyX2FwcCcsIFtdKTtcblxud2VhdGhlcl9hcHAuY29udHJvbGxlcihcIkN1cldlYXRoZXJDdHJsXCIsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLFxuICAgIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJGh0dHApIHtcbiAgICAkaHR0cCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXInLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLCBcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBwYXJhbXM6IHtxOiAkcm9vdFNjb3BlLmNpdHlfc3RhdGVfY291bnRyeSxcbiAgICAgICAgICAgIGFwcGlkOiBcIjRlNTYwMDY4NjM1OTEwNGQ2ZGQxYWQxOGQ4MmJkNzBiXCJ9XG4gICAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICRzY29wZS5jdXJfdGVtcCA9IGRhdGEubWFpbi50ZW1wO1xuICAgICAgICAkc2NvcGUudGVtcF9tYXggPSBkYXRhLm1haW4udGVtcF9tYXg7XG4gICAgICAgICRzY29wZS5pbWFnZXBhdGggPSAnaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8nICsgZGF0YS53ZWF0aGVyWzBdWydpY29uJ10gKyAnLnBuZyc7XG4gICAgICAgICRzY29wZS5kZXNjcmlwdGlvbiA9IGRhdGEud2VhdGhlclswXVsnZGVzY3JpcHRpb24nXTtcbiAgICB9KTsgXG59XSk7XG5cbndlYXRoZXJfYXBwLmNvbnRyb2xsZXIoXCJEYXlGb3JjYXN0Q3RybFwiLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRodHRwJyxcbiAgICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRodHRwKSB7XG4gICAgdmFyIHVybD0gJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0JztcbiAgICAkaHR0cCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLCBcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBwYXJhbXM6IHtxOiAkcm9vdFNjb3BlLmNpdHlfc3RhdGVfY291bnRyeSxcbiAgICAgICAgICAgIGFwcGlkOiBcIjRlNTYwMDY4NjM1OTEwNGQ2ZGQxYWQxOGQ4MmJkNzBiXCJcbiAgICAgICAgfVxuICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgZGF0ZV90aW1lID0gJyc7XG4gICAgICAgIGlmKCRyb290U2NvcGUudGltZXMuZnVsbHRpbWUpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2luZyBhcGkgdGltZScpXG4gICAgICAgICAgICBkYXRlX3RpbWUgPSBuZXcgRGF0ZSgkcm9vdFNjb3BlLnRpbWVzLmZ1bGx0aW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2luZyBjb21wdXRlciB0aW1lJylcbiAgICAgICAgICAgIGRhdGVfdGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdlYXRoZXJfZGF0YSA9IFtdO1xuICAgICAgICB2YXIgY250ID0gMDtcbiAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGdycF9vYiA9IGRhdGEubGlzdDtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZ3JwX29iKSB7XG4gICAgICAgICAgICBpZihncnBfb2IuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmKGRvbmUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICB2YXIgZGF0YV9saXN0ID0ge307XG4gICAgICAgICAgICAgICAgdmFyIGFsbF93ZWF0aGVyID0gZ3JwX29iW2tleV07XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZGF0ZXNcbiAgICAgICAgICAgICAgICBpZihhbGxfd2VhdGhlci5kdCA9PSAndW5kZWZpbmVkJykgeyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgIHZhciBmdWxsX3dfZGF0ZSA9IG5ldyBEYXRlKGFsbF93ZWF0aGVyLmR0ICogMTAwMCk7XG4gICAgICAgICAgICAgICAgaWYoZnVsbF93X2RhdGUgPCBkYXRlX3RpbWUpIHsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICBkYXRhX2xpc3QudGVtcHMgPSBhbGxfd2VhdGhlclsnbWFpbiddLnRlbXA7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGhvdXJcbiAgICAgICAgICAgICAgICB2YXIgdF9kYXRlID0gZnVsbF93X2RhdGUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB2YXIgdF9ob3VyID0gdF9kYXRlLnNsaWNlKDE2LCAyMSk7XG4gICAgICAgICAgICAgICAgZGF0YV9saXN0LnRpbWVzID0gdF9ob3VyO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBpY29uIHBhdGhcbiAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IGFsbF93ZWF0aGVyWyd3ZWF0aGVyJ11bMF1bJ2ljb24nXTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJyArIGljb24gKyAnLnBuZyc7XG4gICAgICAgICAgICAgICAgZGF0YV9saXN0Lmljb25zID0gU3RyaW5nKHVybCk7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgZGF0YV9saXN0LmRlc2NyaXB0cyA9IFN0cmluZyhhbGxfd2VhdGhlclsnd2VhdGhlciddWzBdWydkZXNjcmlwdGlvbiddKTtcbiAgICAgICAgICAgICAgICBjbnQgPSBjbnQgKyAxO1xuICAgICAgICAgICAgICAgIGlmKGNudCA+IDExKSB7IGRvbmUgPSB0cnVlOyB9XG4gICAgICAgICAgICAgICAgd2VhdGhlcl9kYXRhLnB1c2goZGF0YV9saXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuZGF5Y2FzdCA9IHdlYXRoZXJfZGF0YTtcbiAgICB9KTtcbn1dKTtcblxud2VhdGhlcl9hcHAuZmlsdGVyKCd0ZW1wJywgWyckZmlsdGVyJywgJyRyb290U2NvcGUnLFxuICAgIGZ1bmN0aW9uKCRmaWx0ZXIsICRyb290U2NvcGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQsIHRfYXJyYXkpIHtcbiAgICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgICAgIC8vIGNvbnZlciBmcm9tIGtlbHZpbiB0byBjZWxjaXVzXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0IC0gMjczLjE1O1xuICAgICAgICAgICAgdmFyIHByZWNpc2lvbiA9IHRfYXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgdGVtcF90eXBlID0gdF9hcnJheVsxXTtcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IDE7XG4gICAgICAgICAgICB2YXIgbnVtYmVyRmlsdGVyID0gJGZpbHRlcignbnVtYmVyJyk7XG5cbiAgICAgICAgICAgIHZhciBkZWdyZWUgPSAodGVtcF90eXBlID09ICdDJykgPyAnXFx1MDBCMEMnIDogJ1xcdTAwQjBGJztcblxuICAgICAgICAgICAgaWYoaW5wdXQgJiYgdGVtcF90eXBlID09ICdGJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gKGlucHV0KiA5LjAgLyA1LjAgKyAzMikudG9GaXhlZCgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudW1iZXJGaWx0ZXIoaW5wdXQsIHByZWNpc2lvbikgKyBkZWdyZWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9O1xufV0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG52YXIgeWVscF9hcHAgPSBhbmd1bGFyLm1vZHVsZSgneWVscF9hcHAnLCBbXSk7XG5cbnllbHBfYXBwLmNvbnRyb2xsZXIoXCJNdXNpY1ZlbnVlQ3RybFwiLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRodHRwJyxcbiAgICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRodHRwKSB7XG4gICAgJGh0dHAoe1xuICAgICAgICB1cmw6ICdwaHAveWVscF9zYW1wbGUucGhwJywgXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgcGFyYW1zOiB7dGVybTogJ2hvdGVscycsXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICRyb290U2NvcGUuY2l0eV9zdGF0ZV9jb3VudHJ5fVxuICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgZGF0YV9hcnJheSA9IFtdO1xuICAgICAgICBkYXRhX2FycmF5LnB1c2goalF1ZXJ5LnBhcnNlSlNPTihkYXRhKSk7XG4gICAgICAgIGRhdGFfYXJyYXkgPSBqUXVlcnkucGFyc2VKU09OKGRhdGFfYXJyYXkpO1xuICAgICAgICAkc2NvcGUueWVscF91bmF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICBpZihkYXRhX2FycmF5LmVycm9yKSB7XG4gICAgICAgICAgICAkc2NvcGUueWVscF91bmF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLm11c2ljdmVudWVzID0gZGF0YV9hcnJheS5idXNpbmVzc2VzO1xuICAgIH0pO1xuICAgICRzY29wZS5zZWxlY3Q9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIHNhbWUgPSAoaXRlbSA9PT0gJHNjb3BlLnNlbGVjdGVkKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkID0gKGl0ZW0gPT09ICRzY29wZS5zZWxlY3RlZCkgPyBudWxsIDogaXRlbTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkID09PSBpdGVtO1xuICAgIH07XG59XSk7XG5cbnllbHBfYXBwLmNvbnRyb2xsZXIoXCJSZXN0YXVyYW50Q3RybFwiLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRodHRwJyxcbiAgICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRodHRwKSB7XG4gICAgJGh0dHAoe1xuICAgICAgICB1cmw6ICdwaHAveWVscF9zYW1wbGUucGhwJywgXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgcGFyYW1zOiB7dGVybTogJ3Jlc3RhdXJhbnQnLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAkcm9vdFNjb3BlLmNpdHlfc3RhdGVfY291bnRyeX1cbiAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIGRhdGFfYXJyYXkgPSBbXTtcbiAgICAgICAgZGF0YV9hcnJheS5wdXNoKGpRdWVyeS5wYXJzZUpTT04oZGF0YSkpO1xuICAgICAgICBkYXRhX2FycmF5ID0galF1ZXJ5LnBhcnNlSlNPTihkYXRhX2FycmF5KTtcbiAgICAgICAgJHNjb3BlLnllbHBfdW5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgaWYoZGF0YV9hcnJheS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLnllbHBfdW5hdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5yZXN0YXVyYW50cyA9IGRhdGFfYXJyYXkuYnVzaW5lc3NlcztcbiAgICB9KTtcbiAgICAkc2NvcGUuc2VsZWN0PSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciBzYW1lID0gKGl0ZW0gPT09ICRzY29wZS5zZWxlY3RlZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IChpdGVtID09PSAkc2NvcGUuc2VsZWN0ZWQpID8gbnVsbCA6IGl0ZW07XG4gICAgfTtcblxuICAgICRzY29wZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZCA9PT0gaXRlbTtcbiAgICB9O1xufV0pO1xuXG55ZWxwX2FwcC5jb250cm9sbGVyKFwiQ2x1YkN0cmxcIiwgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckaHR0cCcsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkaHR0cCkge1xuICAgICRodHRwKHtcbiAgICAgICAgdXJsOiAncGhwL3llbHBfc2FtcGxlLnBocCcsIFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIHBhcmFtczoge3Rlcm06ICdoYXBweSBob3VyJyxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJHJvb3RTY29wZS5jaXR5X3N0YXRlX2NvdW50cnl9XG4gICAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciBkYXRhX2FycmF5ID0gW107XG4gICAgICAgIGRhdGFfYXJyYXkucHVzaChqUXVlcnkucGFyc2VKU09OKGRhdGEpKTtcbiAgICAgICAgZGF0YV9hcnJheSA9IGpRdWVyeS5wYXJzZUpTT04oZGF0YV9hcnJheSk7XG4gICAgICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGFfYXJyYXkpO1xuICAgICAgICAkc2NvcGUueWVscF91bmF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICBpZihkYXRhX2FycmF5LmVycm9yKSB7XG4gICAgICAgICAgICAkc2NvcGUueWVscF91bmF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmNsdWJzID0gZGF0YV9hcnJheS5idXNpbmVzc2VzO1xuICAgIH0pO1xuICAgICRzY29wZS5zZWxlY3Q9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIHNhbWUgPSAoaXRlbSA9PT0gJHNjb3BlLnNlbGVjdGVkKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkID0gKGl0ZW0gPT09ICRzY29wZS5zZWxlY3RlZCkgPyBudWxsIDogaXRlbTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkID09PSBpdGVtO1xuICAgIH07XG59XSk7XG5cbnllbHBfYXBwLmNvbnRyb2xsZXIoXCJHYWxsYXJ5Q3RybFwiLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRodHRwJyxcbiAgICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRodHRwKSB7XG4gICAgJGh0dHAoe1xuICAgICAgICB1cmw6ICdwaHAveWVscF9zYW1wbGUucGhwJywgXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgcGFyYW1zOiB7dGVybTogJ3Nob3cnLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAkcm9vdFNjb3BlLmNpdHlfc3RhdGVfY291bnRyeX1cbiAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIGRhdGFfYXJyYXkgPSBbXTtcbiAgICAgICAgZGF0YV9hcnJheS5wdXNoKGpRdWVyeS5wYXJzZUpTT04oZGF0YSkpO1xuICAgICAgICBkYXRhX2FycmF5ID0galF1ZXJ5LnBhcnNlSlNPTihkYXRhX2FycmF5KTtcbiAgICAgICAgJHNjb3BlLnllbHBfdW5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgaWYoZGF0YV9hcnJheS5lcnJvcikge1xuICAgICAgICAgICAgJHNjb3BlLnllbHBfdW5hdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5nYWxsZXJpZXMgPSBkYXRhX2FycmF5LmJ1c2luZXNzZXM7XG4gICAgfSk7IFxuICAgIC8qXG4gICAgKiBTZWxlY3QgYW5kIGlzQWN0aXZlIHRvZ2dsZSBZZWxwIGRldGFpbHNcbiAgICAqL1xuICAgICRzY29wZS5zZWxlY3Q9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkID0gKGl0ZW0gPT09ICRzY29wZS5zZWxlY3RlZCkgPyBudWxsIDogaXRlbTtcbiAgICAgICAgXG4gICAgfTtcblxuICAgICRzY29wZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZCA9PT0gaXRlbTtcbiAgICB9O1xufV0pO1xuXG55ZWxwX2FwcC5maWx0ZXIoJ3RvU3RyaW5nJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gIH07XG59KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xudmFyIFNpdGUgPSBhbmd1bGFyLm1vZHVsZSgnU2l0ZScsIFsnbmdSb3V0ZScsICd1aS5ib290c3RyYXAnLCAnbmdTYW5pdGl6ZScsICd3ZWF0aGVyX2FwcCcsICd5ZWxwX2FwcCcsICdhc3Ryb19hcHAnLCAnbW92aWVfYXBwJywnZmFyb29fYXBwJywgJ3F1b3RlX2FwcCcsICd0aW1lX2FwcCcsICdteWNpdHktZGlyZWN0aXZlcycsICdldmVudHNfYXBwJywgJ21hcF9hcHAnLCAncGxhY2VzX2FwcCcsICd0d2l0dGVyX2FwcCcsICduZ1RvdWNoJywgJ21lZXR1cF9hcHAnLCAncmF0ZXNfYXBwJywgJ25lYXJieV9hcHAnXSk7XG5cblNpdGUuY29udHJvbGxlcignU2hvd0hvbWVDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckbG9jYXRpb24nLCAnJGh0dHAnLCAnTXlTZXJ2aWNlJyxcbiAgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRodHRwLCBNeVNlcnZpY2UpIHtcbiAgJHJvb3RTY29wZS5sb2NzID0gTXlTZXJ2aWNlLmdldF9qc29uX2RhdGEoKTtcbiAgJHJvb3RTY29wZS5uYW1lTGVuZ3RoID0gMjA7IC8vIFllbHAgdXNlcyB0aGlzIVxuICAkcm9vdFNjb3BlLnRpbWVzID0ge1xuICAgIFwiZnVsbHRpbWVcIjogMCxcbiAgICBcImN1cnJlbnRcIjogMCxcbiAgICBcInN1bnJpc2VcIjogMCxcbiAgICBcInN1bnNldFwiOiAwXG4gIH07XG5cbiAgLypcbiAgKiBOZXdfY2l0eSBpcyB0aGUgdXNlciBzZWxlY3RlZCBjaXR5IGZyb20gbmF2YmFyIGRyb3Bkb3duIG1lbnUuXG4gICogRGVmYXVsdCBpcyBmYWxzZSwgdHJ1ZSB3aGVuIGNpdHkgc2VsZWN0ZWQgZnJvbSB0aGUgZHJvcGRvd24uXG4gICovXG4gIHZhciBuZXdfY2l0eSA9ICRsb2NhdGlvbi5oYXNoKCk7XG4gIC8qIFNldCBkZWZhdWx0cyAqL1xuICAkcm9vdFNjb3BlLmNpdHkgPSAobmV3X2NpdHkpID8gbmV3X2NpdHkucmVwbGFjZSgvXy9nLCAnICcpIDogJ01lbGJvdXJuZSc7XG4gICRyb290U2NvcGUuY2l0eV9pZCA9IChuZXdfY2l0eSkgPyBuZXdfY2l0eSA6ICdNZWxib3VybmUnO1xuICAkcm9vdFNjb3BlLnN0YXRlID0gKG5ld19jaXR5KSA/ICRyb290U2NvcGUubG9jc1tuZXdfY2l0eV0uc3RhdGUgOiAnJztcbiAgJHJvb3RTY29wZS5jb3VudHJ5ID0gKG5ld19jaXR5KSA/ICRyb290U2NvcGUubG9jc1tuZXdfY2l0eV0uY291bnRyeSA6ICdhdSc7XG4gICRyb290U2NvcGUubmV3c2RhdGEgPSB7fTtcbiAgJHJvb3RTY29wZS5uZXdzZGF0YS5jYXQgPSAobmV3X2NpdHkpID8gJHJvb3RTY29wZS5sb2NzW25ld19jaXR5XS5jYXQgOiAnNTQ3JztcbiAgJHJvb3RTY29wZS5uZXdzZGF0YS5zdWJjYXQgPSAobmV3X2NpdHkpID8gJHJvb3RTY29wZS5sb2NzW25ld19jaXR5XS5zdWJjYXQgOiAnMjE1OTQnO1xuICAkcm9vdFNjb3BlLm1hcCA9IG51bGw7XG5cbiAgLyogQ3JlYXRlIENpdHkgU3RhdGUgQ291bnR5IHZhbHVlKi9cbiAgJHJvb3RTY29wZS5jaXR5X3N0YXRlX2NvdW50cnkgPSAnJztcbiAgaWYoJHJvb3RTY29wZS5zdGF0ZSkge1xuICAgICAgJHJvb3RTY29wZS5jaXR5X3N0YXRlX2NvdW50cnkgPSAkcm9vdFNjb3BlLmNpdHkgKycsICcrICRyb290U2NvcGUuc3RhdGUgKycsICcrJHJvb3RTY29wZS5jb3VudHJ5O1xuICB9IGVsc2Uge1xuICAgICAgJHJvb3RTY29wZS5jaXR5X3N0YXRlX2NvdW50cnkgPSAkcm9vdFNjb3BlLmNpdHkgKycsICcrJHJvb3RTY29wZS5jb3VudHJ5O1xuICB9XG4gIFxuICAvKlxuICAqIExvb3AgdGhyb3V0aCAkcm9vdFNjb3BlLmxvY3MgdG8gY3JlYXRlIGNpdGllc1xuICAqIG5hdmJhciBsaXN0LlxuICAqL1xuXG4gIHZhciBjaXRpZXMgPSAkcm9vdFNjb3BlLmxvY3M7XG4gIC8qIGFjdGlvbnMgYXJyYXkgdXNlZCBpbiBuYXZiYXIgKi9cbiAgJHNjb3BlLmFjdGlvbnMgPSBbXTsgXG4gIGZvcih2YXIgY2l0eSBpbiBjaXRpZXMpIHtcblxuICAgIGlmKGNpdGllcy5oYXNPd25Qcm9wZXJ0eShjaXR5KSkge1xuICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgLy8gR2V0cyBhbGwgbGlzdGluZ3MgdmFsdWVzXG4gICAgICBvYmouaWQgPSBjaXR5O1xuICAgICAgdmFyIGNpdHlfc3QgPSAoY2l0aWVzW2NpdHldLnN0YXRlKSA/XG4gICAgICAgIGNpdHkucmVwbGFjZSgvXy9nLCAnICcpICsgJywgJyArIGNpdGllc1tjaXR5XS5zdGF0ZS50b1VwcGVyQ2FzZSgpIDpcbiAgICAgICAgY2l0eS5yZXBsYWNlKC9fL2csICcgJyk7XG4gICAgICBvYmoubmFtZSA9IGNpdHlfc3Q7XG4gICAgICAkc2NvcGUuYWN0aW9ucy5wdXNoKG9iaik7XG4gICAgfVxuICB9XG5cbiAgJHNjb3BlLnNldEFjdGlvbiA9IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgICRzY29wZS5zZWxlY3RlZEFjdGlvbiA9IGFjdGlvbjtcbiAgICAkbG9jYXRpb24uaGFzaCgkc2NvcGUuc2VsZWN0ZWRBY3Rpb24uaWQpO1xuICB9O1xuXG4gICRzY29wZS5tb2JpbGVBbmRUYWJsZXRjaGVjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaGVjayA9IGZhbHNlO1xuICAgIChmdW5jdGlvbihhKSB7aWYoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpY2hlY2sgPSB0cnVlfSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTtcbiAgICByZXR1cm4gY2hlY2s7XG4gIH07XG5cbiAgJHJvb3RTY29wZS5pc01vYmlsZSA9ICRzY29wZS5tb2JpbGVBbmRUYWJsZXRjaGVjaygpO1xuXG59XSk7XG4gXG5TaXRlLmNvbnRyb2xsZXIoJ0dldEhlYWRlckltYWdlJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckaHR0cCcsXG4gIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJGh0dHApIHtcbiAgdmFyIHJhbmRvbV9udW0gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTApICsgMSk7XG4gIHZhciBjaXR5ID0gJHJvb3RTY29wZS5jaXR5X2lkLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBzdGF0ZTtcbiAgaWYoJHJvb3RTY29wZS5zdGF0ZSkge1xuICAgIHN0YXRlID0gJHJvb3RTY29wZS5zdGF0ZS50b0xvd2VyQ2FzZSgpO1xuICB9XG4gIHZhciBjb3VudHJ5ID0gJHJvb3RTY29wZS5jb3VudHJ5LnRvTG93ZXJDYXNlKCk7XG4gIHZhciBwYXRoID0gJy4uL2ltYWdlcy8nICsgY2l0eTtcbiAgaWYoc3RhdGUpIHtcbiAgICBwYXRoICs9ICdfJyArIHN0YXRlO1xuICB9XG4gIFxuICAvKiBcbiAgKkdldCBsaXN0IG9mIGZpbGVzIHRoYXQgYXJlIHByZXBlbmRlZCB3aXRoIGNpdHksIHN0YXRlLCBjb3VudHJ5XG4gICovXG4gIHBhdGggKz0gJ18nICsgY291bnRyeTtcbiAgJHNjb3BlLm15SW50ZXJ2YWwgPSAxMDAwMDsgLy9DYXJvdXNlbCBkZWxheVxuICAkaHR0cCh7XG4gICAgdXJsOiAncGhwL2dldF9pbWFnZV9maWxlcy5waHAnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsIFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBwYXJhbXM6IHtmaWxlbmFtZTogcGF0aH1cbiAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgJHNjb3BlLnNsaWRlcyA9IGRhdGE7XG4gIH0pOyBcbn1dKTtcblxuU2l0ZS5zZXJ2aWNlKCdNeVNlcnZpY2UnLCBbJyRodHRwJyxcbiAgZnVuY3Rpb24oJGh0dHApIHtcbiAgdmFyIG15RGF0YSA9IG51bGw7XG5cbiAgdmFyIHByb21pc2UgPSAkaHR0cC5nZXQoJ2pzL2NpdHlfZGF0YS5qc29uJykuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgIG15RGF0YSA9IGRhdGE7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgcHJvbWlzZTpwcm9taXNlLFxuICAgIC8vIHNldERhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAvLyBteURhdGEgPSBkYXRhO1xuICAgIC8vIH0sXG4gICAgZ2V0X2pzb25fZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbXlEYXRhO1xuICAgIH1cbiAgfTtcbn1dKTtcblxuU2l0ZS5jb25maWcoWyckcm91dGVQcm92aWRlcicsXG4gIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIuXG4gICAgICB3aGVuKCcvU2hvd0hvbWUnLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1Nob3dIb21lQ29udHJvbGxlcicsXG4gICAgICAgIHJlc29sdmU6e1xuICAgICAgICAgIC8vIFdhaXQgZm9yIHByb21pc2VcbiAgICAgICAgICBNeVNlcnZpY2VEYXRhOiBbJ015U2VydmljZScsIGZ1bmN0aW9uKE15U2VydmljZSl7XG4gICAgICAgICAgcmV0dXJuIE15U2VydmljZS5wcm9taXNlO1xuICAgICAgICB9XX1cbiAgICAgIH0pLlxuICAgICAgLy8gd2hlbignL1Nob3dBYm91dCcsIHtcbiAgICAgIC8vICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9hYm91dC5odG1sJyxcbiAgICAgIC8vICAgY29udHJvbGxlcjogJ1Nob3dBYm91dENvbnRyb2xsZXInXG4gICAgICAvLyB9KS5cbiAgICAgIC8vIHdoZW4oJy9TaG93Q29udGFjdCcsIHtcbiAgICAgIC8vICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9jb250YWN0Lmh0bWwnLFxuICAgICAgLy8gICBjb250cm9sbGVyOiAnU2hvd0NvbnRhY3RDb250cm9sbGVyJ1xuICAgICAgLy8gfSkuXG4gICAgICBvdGhlcndpc2Uoe1xuICAgICAgICByZWRpcmVjdFRvOiAnL1Nob3dIb21lJ1xuICAgICAgfSk7XG4gIH1dKTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
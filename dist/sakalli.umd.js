var Sakalli;Sakalli=(()=>{var n={10:(n,o,s)=>{const t=s(365);n.exports=t},365:n=>{n.exports=class extends class{constructor(){this.callbacks={}}on(n,o){this.callbacks[n]||(this.callbacks[n]=[]),this.callbacks[n].push(o)}emit(n,o){let s=this.callbacks[n];s&&s.forEach((n=>n(o)))}}{constructor(n,o){super(),this.host=n,this.id=o,this._hasConnection=!1,this.conn=null}connect(n){return n&&(this.id=n),this.host.endsWith("/")||(this.host+="/"),!this.connection_count&&window.WebSocket?(this.conn=new WebSocket("ws://"+this.host+"listen/"+this.id),this.conn&&(this._hasConnection=!0),this.conn.onclose=function(n){console.log("sakalli connection closed"),this._hasConnection=!1,this.emit("closed")}.bind(this),this.conn.onopen=function(n){console.log("sakalli connection open ..."),this.emit("opened")}.bind(this),this.conn.onmessage=function(n){this.emit("notification",JSON.parse(n.data))}.bind(this),window.onbeforeunload=function(){this.conn.close(),this._hasConnection=!1},!0):this.connection_count>0?(console.error("There's already a sakalli connection"),!1):(console.error("browser does not support websocket"),!1)}destroy(){this.emit("closed"),this.conn.close(),this._hasConnection=!1,delete this.conn,this.callbacks={}}}}},o={};return function s(t){if(o[t])return o[t].exports;var i=o[t]={exports:{}};return n[t](i,i.exports,s),i.exports}(10)})();
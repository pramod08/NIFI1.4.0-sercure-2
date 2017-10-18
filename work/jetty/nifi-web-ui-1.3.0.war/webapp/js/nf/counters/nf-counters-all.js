(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery"],function(c){return(nf.Dialog=b(c))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.Dialog=b(require("jquery")))}else{nf.Dialog=b(a.$)}}}(this,function(b){b(document).ready(function(){b("#nf-ok-dialog").modal({scrollableContentStyle:"scrollable",handler:{close:function(){b("#nf-ok-dialog-content").empty()}}});b("#nf-yes-no-dialog").modal({scrollableContentStyle:"scrollable",handler:{close:function(){b("#nf-yes-no-dialog-content").empty();b("#nf-yes-no-dialog").modal("setButtonModel",[])}}})});var a={showOkDialog:function(c){c=b.extend({headerText:"",dialogContent:""},c);var d=b("<p></p>").append(c.dialogContent);b("#nf-ok-dialog-content").append(d).append("</br>");b("#nf-ok-dialog").modal("setButtonModel",[{buttonText:"Ok",color:{base:"#728E9B",hover:"#004849",text:"#ffffff"},handler:{click:function(){b("#nf-ok-dialog").modal("hide");if(typeof c.okHandler==="function"){c.okHandler.call(this)}}}}]);b("#nf-ok-dialog").modal("setHeaderText",c.headerText).modal("show")},showYesNoDialog:function(c){c=b.extend({headerText:"",dialogContent:"",yesText:"Yes",noText:"No"},c);var d=b("<p></p>").append(c.dialogContent);b("#nf-yes-no-dialog-content").append(d);b("#nf-yes-no-dialog").modal("setButtonModel",[{buttonText:c.yesText,color:{base:"#728E9B",hover:"#004849",text:"#ffffff"},handler:{click:function(){b("#nf-yes-no-dialog").modal("hide");if(typeof c.yesHandler==="function"){c.yesHandler.call(this)}}}},{buttonText:c.noText,color:{base:"#E3E8EB",hover:"#C7D2D7",text:"#004849"},handler:{click:function(){b("#nf-yes-no-dialog").modal("hide");if(typeof c.noHandler==="function"){c.noHandler.call(this)}}}}]);b("#nf-yes-no-dialog").modal("setHeaderText",c.headerText).modal("show")},showDisconnectedFromClusterMessage:function(){a.showOkDialog({headerText:"Cluster Connection",dialogContent:"This node is currently not connected to the cluster. Any modifications to the data flow made here will not replicate across the cluster."})},showConnectedToClusterMessage:function(){a.showOkDialog({headerText:"Cluster Connection",dialogContent:"This node just joined the cluster. Any modifications to the data flow made here will replicate across the cluster."})}};return a}));
(function(a,b){if(typeof define==="function"&&define.amd){define([],function(){return(nf.Storage=b())})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.Storage=b())}else{nf.Storage=b()}}}(this,function(){var g=86400000;var f=g*2;var b=function(h){return typeof h==="undefined"};var e=function(h){return h===null};var d=function(h){return !b(h)&&!e(h)};var c=function(j){if(d(j.expires)){var h=new Date(j.expires);var i=new Date();return h.valueOf()<i.valueOf()}else{return false}};var a=function(h){try{var i=JSON.parse(localStorage.getItem(h));if(d(i)){return i}else{return null}}catch(j){return null}};return{init:function(){for(var j=0;j<localStorage.length;j++){try{var h=localStorage.key(j);this.getItem(h)}catch(k){}}},setItem:function(i,k,h){h=d(h)?h:new Date().valueOf()+f;var j={expires:h,item:k};localStorage.setItem(i,JSON.stringify(j))},hasItem:function(h){return a(h)!==null},getItem:function(h){var i=a(h);if(i===null){return null}if(c(i)){this.removeItem(h);return null}if(d(i.item)){return i.item}else{return null}},getItemExpiration:function(h){var i=a(h);if(i===null){return null}if(d(i.expires)){return i.expires}else{return null}},removeItem:function(h){localStorage.removeItem(h)}}}));
(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","d3","nf.Storage"],function(e,d,c){return(nf.Common=b(e,d,c))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.Common=b(require("jquery"),require("d3"),require("nf.Storage")))}else{nf.Common=b(a.$,a.d3,a.nf.Storage)}}}(this,function(e,d,b){e(document).ready(function(){var g="images/bg-error.png";e("<img/>").attr("src",g).on("load",function(){e("div.message-pane").css("background-image",g)});e(document).on("mouseenter","span.link",function(){e(this).addClass("link-over")}).on("mouseleave","span.link",function(){e(this).removeClass("link-over")});e(document).on("click","div.nf-checkbox",function(){var h=e(this);if(h.hasClass("checkbox-unchecked")){h.removeClass("checkbox-unchecked").addClass("checkbox-checked")}else{h.removeClass("checkbox-checked").addClass("checkbox-unchecked")}});e(document).on("click",".nf-checkbox-label",function(h){e(h.target).parent().find(".nf-checkbox").click()});e(document).ajaxStart(function(){e("div.loading-container").addClass("ajax-loading")}).ajaxStop(function(){e("div.loading-container").removeClass("ajax-loading")});if(b.getItem("jwt")!==null){e("#user-logout-container").css("display","block");f.scheduleTokenRefresh()}e("#user-logout").on("click",function(){b.removeItem("jwt");window.location="/nifi/login"});e("#user-home").on("click",function(){if(top!==window){parent.window.location="/nifi"}else{window.location="/nifi"}})});var c=null;var a=[{text:"view the user interface",value:"flow",description:"Allows users to view the user interface"},{text:"access the controller",value:"controller",description:"Allows users to view/modify the controller including Reporting Tasks, Controller Services, and Nodes in the Cluster"},{text:"query provenance",value:"provenance",description:"Allows users to submit a Provenance Search and request Event Lineage"},{text:"access restricted components",value:"restricted-components",description:"Allows users to create/modify restricted components assuming otherwise sufficient permissions"},{text:"access all policies",value:"policies",description:"Allows users to view/modify the policies for all components"},{text:"access users/user groups",value:"tenants",description:"Allows users to view/modify the users and user groups"},{text:"retrieve site-to-site details",value:"site-to-site",description:"Allows other NiFi instances to retrieve Site-To-Site details of this NiFi"},{text:"view system diagnostics",value:"system",description:"Allows users to view System Diagnostics"},{text:"proxy user requests",value:"proxy",description:"Allows proxy machines to send requests on the behalf of others"},{text:"access counters",value:"counters",description:"Allows users to view/modify Counters"}];var f={ANONYMOUS_USER_TEXT:"Anonymous user",config:{sensitiveText:"Sensitive value set",tooltipConfig:{style:{classes:"nifi-tooltip"},show:{solo:true,effect:function(g){e(this).slideDown(100)}},hide:{effect:function(g){e(this).slideUp(100)}},position:{at:"top center",my:"bottom center"}}},SUPPORTS_SVG:!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,currentUser:undefined,sortVersion:function(g,r){if(g===r){return 0}var n=g.split(/-/);var s=r.split(/-/);if(n.length>=1&&s.length>=1){var p=n[0].split(/\./);var m=s[0].split(/\./);if(p.length>=1&&m.length>=1){var k=Math.min(p.length,m.length);for(var l=0;l<k;l++){var q=parseInt(p[l],10);var j=parseInt(m[l],10);if(isNaN(q)&&isNaN(j)){continue}else{if(isNaN(q)){return -1}else{if(isNaN(j)){return 1}}}if(q!==j){return q-j}}if(p.length===m.length){if(n.length===s.length){var o=f.substringAfterFirst(g,n[0]);var h=f.substringAfterFirst(r,s[0]);return o===h?0:o>h?1:-1}else{return s.length-n.length}}else{return p.length-m.length}}else{if(p.length>=1){return 1}else{if(m.length>=1){return -1}else{return 0}}}}else{if(n.length>=1){return 1}else{if(s.length>=1){return -1}else{return 0}}}},sortType:function(g,j){var h=function(m,k){var n=f.formatBundle(m.bundle);var l=f.formatBundle(k.bundle);return n===l?0:n>l?1:-1};var i=function(r,q){if(g.columnId==="version"){var p=f.isDefinedAndNotNull(r.bundle[g.columnId])?r.bundle[g.columnId]:"";var n=f.isDefinedAndNotNull(q.bundle[g.columnId])?q.bundle[g.columnId]:"";var l=f.sortVersion(p,n);return l===0?h(r,q):l}else{if(g.columnId==="type"){var o=f.substringAfterLast(r[g.columnId],".");var m=f.substringAfterLast(q[g.columnId],".");return o===m?0:o>m?1:-1}else{var k=f.isDefinedAndNotNull(r[g.columnId])?r[g.columnId]:"";var s=f.isDefinedAndNotNull(q[g.columnId])?q[g.columnId]:"";return k===s?h(r,q):k>s?1:-1}}};j.sort(i,g.sortAsc)},typeFormatter:function(l,h,k,j,g){var i="";if(f.isBlank(g.usageRestriction)===false){i+='<div class="view-usage-restriction fa fa-shield"></div><span class="hidden row-id">'+f.escapeHtml(g.id)+"</span>"}else{i+='<div class="fa"></div>'}i+=f.escapeHtml(k);return i},genericValueFormatter:function(k,h,j,i,g){return f.escapeHtml(j)},typeBundleFormatter:function(k,h,j,i,g){return f.escapeHtml(f.formatBundle(g.bundle))},typeVersionFormatter:function(l,h,k,j,g){var i="";if(f.isDefinedAndNotNull(g.bundle)){i+=('<div style="float: left;">'+f.escapeHtml(g.bundle.version)+"</div>")}else{i+='<div style="float: left;">unversioned</div>'}if(!f.isEmpty(g.controllerServiceApis)){i+='<div class="controller-service-apis fa fa-list" title="Compatible Controller Service" style="margin-top: 2px; margin-left: 4px;"></div><span class="hidden row-id">'+f.escapeHtml(g.id)+"</span>"}i+='<div class="clear"></div>';return i},instanceTypeFormatter:function(k,h,j,i,g){if(!g.permissions.canRead){return""}return f.escapeHtml(f.formatType(g.component))},instanceBundleFormatter:function(k,h,j,i,g){if(!g.permissions.canRead){return""}return f.typeBundleFormatter(k,h,j,i,g.component)},formatType:function(g){var h=f.substringAfterLast(g.type,".");if(g.bundle.version!=="unversioned"){h+=(" "+g.bundle.version)}return h},formatBundle:function(g){var h="";if(g.group!=="default"){h=g.group+" - "}return h+g.artifact},setCurrentUser:function(g){f.currentUser=g},scheduleTokenRefresh:function(){if(c!==null){clearInterval(c)}var g=f.MILLIS_PER_MINUTE;var h=function(){var j=b.getItemExpiration("jwt");if(j!==null){var l=new Date(j);var k=new Date();var i=l.valueOf()-k.valueOf()-(30*f.MILLIS_PER_SECOND);if(i<g){if(e("#current-user").text()!==f.ANONYMOUS_USER_TEXT&&!e("#anonymous-user-alert").is(":visible")){e("#anonymous-user-alert").show().qtip(e.extend({},f.config.tooltipConfig,{content:"Your session will expire soon. Please log in again to avoid being automatically logged out.",position:{my:"top right",at:"bottom left"}}))}}}};h();c=setInterval(h,g)},setAnonymousUserLabel:function(){var g=e("#anonymous-user-alert");if(g.data("qtip")){g.qtip("api").destroy(true)}g.show().qtip(e.extend({},f.config.tooltipConfig,{content:"You are accessing with limited authority. Log in or request an account to access with additional authority granted to you by an administrator.",position:{my:"top right",at:"bottom left"}}));e("#current-user").text(f.ANONYMOUS_USER_TEXT).show()},getJwtPayload:function(h){if(f.isDefinedAndNotNull(h)){var g=h.split(/\./);if(g.length!==3){return""}var j=e.base64.atob(g[1]);var i=JSON.parse(j);if(f.isDefinedAndNotNull(i)){return i}else{return null}}return null},canAccessProvenance:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.provenancePermissions.canRead===true}else{return false}},canAccessRestrictedComponents:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.restrictedComponentsPermissions.canWrite===true}else{return false}},canAccessCounters:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.countersPermissions.canRead===true}else{return false}},canModifyCounters:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.countersPermissions.canRead===true&&f.currentUser.countersPermissions.canWrite===true}else{return false}},canAccessTenants:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.tenantsPermissions.canRead===true}else{return false}},canModifyTenants:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.tenantsPermissions.canRead===true&&f.currentUser.tenantsPermissions.canWrite===true}else{return false}},canAccessPolicies:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.policiesPermissions.canRead===true}else{return false}},canModifyPolicies:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.policiesPermissions.canRead===true&&f.currentUser.policiesPermissions.canWrite===true}else{return false}},canAccessController:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.controllerPermissions.canRead===true}else{return false}},canModifyController:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.controllerPermissions.canRead===true&&f.currentUser.controllerPermissions.canWrite===true}else{return false}},canAccessSystem:function(){if(f.isDefinedAndNotNull(f.currentUser)){return f.currentUser.systemPermissions.canRead===true}else{return false}},addHoverEffect:function(g,i,h){e(document).on("mouseenter",g,function(){e(this).removeClass(i).addClass(h)}).on("mouseleave",g,function(){e(this).removeClass(h).addClass(i)});return e(g).addClass(i)},toggleScrollable:function(g){if(e(g).is(":visible")){if(g.offsetHeight<g.scrollHeight||g.offsetWidth<g.scrollWidth){e(g).addClass("scrollable")}else{e(g).removeClass("scrollable")}}},determineContrastColor:function(g){if(parseInt(g,16)>16777215/1.5){return"#000000"}return"#ffffff"},showLogoutLink:function(){if(b.getItem("jwt")===null){e("#user-logout-container").css("display","none")}else{e("#user-logout-container").css("display","block")}},isContentViewConfigured:function(){var g=e("#nifi-content-viewer-url").text();return !f.isBlank(g)},populateField:function(h,g){if(f.isUndefined(g)||f.isNull(g)){return e("#"+h).addClass("unset").text("No value set")}else{if(g===""){return e("#"+h).addClass("blank").text("Empty string set")}else{return e("#"+h).text(g)}}},clearField:function(g){return e("#"+g).removeClass("unset blank").text("")},cleanUpTooltips:function(g,h){g.find(h).each(function(){var j=e(this);if(j.data("qtip")){var i=j.qtip("api");i.destroy(true)}})},formatPropertyTooltip:function(h,j){var k=[];if(f.isDefinedAndNotNull(h)){if(!f.isBlank(h.description)){k.push(f.escapeHtml(h.description))}if(!f.isBlank(h.defaultValue)){k.push("<b>Default value:</b> "+f.escapeHtml(h.defaultValue))}if(!f.isBlank(h.supportsEl)){k.push("<b>Supports expression language:</b> "+f.escapeHtml(h.supportsEl))}if(!f.isBlank(h.identifiesControllerService)){var g=f.formatType({type:h.identifiesControllerService,bundle:h.identifiesControllerServiceBundle});var i=f.formatBundle(h.identifiesControllerServiceBundle);k.push("<b>Requires Controller Service:</b> "+f.escapeHtml(g+" from "+i))}}if(f.isDefinedAndNotNull(j)){if(!f.isEmpty(j.previousValues)){var l=[];e.each(j.previousValues,function(n,m){l.push("<li>"+f.escapeHtml(m.previousValue)+" - "+f.escapeHtml(m.timestamp)+" ("+f.escapeHtml(m.userIdentity)+")</li>")});k.push('<b>History:</b><ul class="property-info">'+l.join("")+"</ul>")}}if(k.length>0){return k.join("<br/><br/>")}else{return null}},formatProperty:function(g,h){return'<div><span class="label">'+f.formatValue(g)+": </span>"+f.formatValue(h)+"</div>"},formatValue:function(g){if(f.isDefinedAndNotNull(g)){if(g===""){return'<span class="blank" style="font-size: 13px; padding-top: 2px;">Empty string set</span>'}else{return f.escapeHtml(g)}}else{return'<span class="unset" style="font-size: 13px; padding-top: 2px;">No value set</span>'}},escapeHtml:(function(){var g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2f;"};return function(h){if(f.isDefinedAndNotNull(h)){return String(h).replace(/[&<>"'\/]/g,function(i){return g[i]})}else{return""}}}()),isSensitiveProperty:function(g){if(f.isDefinedAndNotNull(g)){return g.sensitive===true}else{return false}},isRequiredProperty:function(g){if(f.isDefinedAndNotNull(g)){return g.required===true}else{return false}},isDynamicProperty:function(g){if(f.isDefinedAndNotNull(g)){return g.dynamic===true}else{return false}},getAllowableValues:function(g){if(f.isDefinedAndNotNull(g)){return g.allowableValues}else{return null}},supportsEl:function(g){if(f.isDefinedAndNotNull(g)){return g.supportsEl===true}else{return false}},formatUnorderedList:function(h){if(e.isArray(h)){var g=e('<ul class="result"></ul>');e.each(h,function(j,k){var i=e("<li></li>").appendTo(g);if(k instanceof jQuery){i.append(k)}else{i.text(k)}});return g}else{return null}},substringAfterLast:function(k,j){var h="";var i=k.lastIndexOf(j);if(i>=0){var g=i+j.length;if(g<k.length){h=k.substr(g)}}return h},substringAfterFirst:function(k,j){var h="";var i=k.indexOf(j);if(i>=0){var g=i+j.length;if(g<k.length){h=k.substr(g)}}return h},substringBeforeFirst:function(j,i){var g="";var h=j.indexOf(i);if(h>=0){g=j.substr(0,h)}return g},setCursor:function(h,g){if(g){e("#"+h).addClass("pointer")}else{e("#"+h).removeClass("pointer")}},getAccessToken:function(g){return e.Deferred(function(h){if(b.hasItem("jwt")){e.ajax({type:"POST",url:g}).done(function(i){h.resolve(i)}).fail(function(){h.reject()})}else{h.resolve("")}}).promise()},MILLIS_PER_DAY:86400000,MILLIS_PER_HOUR:3600000,MILLIS_PER_MINUTE:60000,MILLIS_PER_SECOND:1000,formatDuration:function(j){j=j<1?0:j;var l=j/f.MILLIS_PER_DAY;l=l>=1?parseInt(l,10):0;j%=f.MILLIS_PER_DAY;var g=j/f.MILLIS_PER_HOUR;g=g>=1?parseInt(g,10):0;j%=f.MILLIS_PER_HOUR;var h=j/f.MILLIS_PER_MINUTE;h=h>=1?parseInt(h,10):0;j%=f.MILLIS_PER_MINUTE;var k=j/f.MILLIS_PER_SECOND;k=k>=1?parseInt(k,10):0;j=Math.floor(j%f.MILLIS_PER_SECOND);var i=f.pad(g,2,"0")+":"+f.pad(h,2,"0")+":"+f.pad(k,2,"0")+"."+f.pad(j,3,"0");if(l>0){return l+" days and "+i}else{return i}},BYTES_IN_KILOBYTE:1024,BYTES_IN_MEGABYTE:1048576,BYTES_IN_GIGABYTE:1073741824,BYTES_IN_TERABYTE:1099511627776,formatDataSize:function(h){var g=parseFloat(h/f.BYTES_IN_TERABYTE);if(g>1){return g.toFixed(2)+" TB"}g=parseFloat(h/f.BYTES_IN_GIGABYTE);if(g>1){return g.toFixed(2)+" GB"}g=parseFloat(h/f.BYTES_IN_MEGABYTE);if(g>1){return g.toFixed(2)+" MB"}g=parseFloat(h/f.BYTES_IN_KILOBYTE);if(g>1){return g.toFixed(2)+" KB"}return parseFloat(h).toFixed(2)+" bytes"},formatInteger:function(h){var g=h+"";var i=/(\d+)(\d{3})/;while(i.test(g)){g=g.replace(i,"$1,$2")}return f.escapeHtml(g)},formatFloat:function(g){if(f.isUndefinedOrNull(g)){return 0+""}return g.toFixed(2)+""},pad:function(j,h,i){var g=j+"";while(g.length<h){g=i+g}return g},formatDateTime:function(g){return f.pad(g.getMonth()+1,2,"0")+"/"+f.pad(g.getDate(),2,"0")+"/"+f.pad(g.getFullYear(),2,"0")+" "+f.pad(g.getHours(),2,"0")+":"+f.pad(g.getMinutes(),2,"0")+":"+f.pad(g.getSeconds(),2,"0")+"."+f.pad(g.getMilliseconds(),3,"0")},parseDateTime:function(k){if(!f.isDefinedAndNotNull(k)){return new Date()}if(k==="No value set"){return new Date()}if(k==="Empty string set"){return new Date()}var r=k.split(/ /);if(r.length!==3){return new Date()}var h=r[0].split(/\//);var g=r[1].split(/:/);if(h.length!==3||g.length!==3){return new Date()}var m=parseInt(h[2],10);var l=parseInt(h[0],10)-1;var n=parseInt(h[1],10);var o=parseInt(g[0],10);var j=parseInt(g[1],10);var q=g[2].split(/\./);var p=parseInt(q[0],10);var i=0;if(q.length===2){i=parseInt(q[1],10)}return new Date(m,l,n,o,j,p,i)},parseDuration:function(g){var h=g.split(/:/);if(h.length!==3){return 0}var i=h[2].split(/\./);if(i.length===2){return new Date(1970,0,1,parseInt(h[0],10),parseInt(h[1],10),parseInt(i[0],10),parseInt(i[1],10)).getTime()}else{return new Date(1970,0,1,parseInt(h[0],10),parseInt(h[1],10),parseInt(h[2],10),0).getTime()}},parseSize:function(i){var j=i.split(/ /);var h=parseFloat(j[0].replace(/,/g,""));var g=j[1];if(g==="KB"){return h*1024}else{if(g==="MB"){return h*1024*1024}else{if(g==="GB"){return h*1024*1024*1024}else{if(g==="TB"){return h*1024*1024*1024*1024}else{return h}}}}},parseCount:function(i){var h=i.split(/ /,1);if(h.length!==1){return 0}var g=parseInt(h[0].replace(/,/g,""),10);if(isNaN(g)){return 0}return g},isDefinedAndNotNull:function(g){return !f.isUndefined(g)&&!f.isNull(g)},isUndefinedOrNull:function(g){return f.isUndefined(g)||f.isNull(g)},isUndefined:function(g){return typeof g==="undefined"},isBlank:function(g){return f.isUndefined(g)||f.isNull(g)||e.trim(g)===""},isNull:function(g){return g===null},isEmpty:function(g){return e.isArray(g)?g.length===0:true},doBulletinsDiffer:function(h,j){if(e.isArray(h)&&e.isArray(j)){if(h.length===j.length){for(var g=0;g<h.length;g++){if(h[g].id!==j[g].id||h[g].canRead!==j[g].canRead){return true}}}else{return true}}else{if(e.isArray(h)||e.isArray(j)){return true}}return false},getFormattedBulletins:function(h){var g=[];e.each(h,function(k,l){if(l.canRead===true){var i=l.bulletin;var o="";if(f.isDefinedAndNotNull(i.nodeAddress)){o="-&nbsp;"+f.escapeHtml(i.nodeAddress)+"&nbsp;-&nbsp;"}var n=e("<pre></pre>").css({"white-space":"pre-wrap"}).text(i.message);var m=e("<div>"+f.escapeHtml(i.timestamp)+"&nbsp;"+o+"&nbsp;<b>"+f.escapeHtml(i.level)+"</b>&nbsp;</div>").append(n);g.push(m)}});return g},getFormattedServiceApis:function(h){var g=[];e.each(h,function(l,m){var j=f.formatType({type:m.type,bundle:m.bundle});var k=f.formatBundle(m.bundle);g.push(e("<div></div>").text(j+" from "+k))});return g},getFormattedGarbageCollections:function(h){h.sort(function(j,i){return i.collectionCount-j.collectionCount});var g=[];e.each(h,function(k,i){var j=e('<span style="font-weight: bold;"></span>').text(i.name);var l=e("<span></span>").text(" - "+i.collectionCount+" times ("+i.collectionTime+")");var m=e("<div></div>").append(j).append(l);g.push(m)});return g},getPolicyTypeListing:function(h){var g=d.nest().key(function(i){return i.value}).map(a,d.map);return g.get(h)[0]}};return f}));
(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","nf.Dialog","nf.Common"],function(d,c,e){return(nf.ErrorHandler=b(d,c,e))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.ErrorHandler=b(require("jquery"),require("nf.Dialog"),require("nf.Common")))}else{nf.ErrorHandler=b(a.$,a.nf.Dialog,a.nf.Common)}}}(this,function(b,a,c){return{handleAjaxError:function(g,d,e){if(d==="canceled"){if(b("#splash").is(":visible")){b("#message-title").text("Session Expired");b("#message-content").text("Your session has expired. Please reload to log in again.");b("#message-pane").show()}else{a.showOkDialog({headerText:"Session Expired",dialogContent:"Your session has expired. Please press Ok to log in again.",okHandler:function(){window.location="/nifi"}})}return}if(b("#splash").is(":visible")){if(g.status===401){b("#message-title").text("Unauthorized")}else{if(g.status===403){b("#message-title").text("Insufficient Permissions")}else{if(g.status===409){b("#message-title").text("Invalid State")}else{b("#message-title").text("An unexpected error has occurred")}}}if(b.trim(g.responseText)===""){b("#message-content").text("Please check the logs.")}else{b("#message-content").text(g.responseText)}b("#message-pane").show();return}if(g.status===400||g.status===404||g.status===409||g.status===503){a.showOkDialog({headerText:"Error",dialogContent:c.escapeHtml(g.responseText)})}else{if(g.status===403){a.showOkDialog({headerText:"Insufficient Permissions",dialogContent:c.escapeHtml(g.responseText)})}else{if(g.status<99||g.status===12007||g.status===12029){var f="Please ensure the application is running and check the logs for any errors.";if(c.isDefinedAndNotNull(d)){if(d==="timeout"){f="Request has timed out. Please ensure the application is running and check the logs for any errors."}else{if(d==="abort"){f="Request has been aborted."}else{if(d==="No Transport"){f="Request transport mechanism failed. Please ensure the host where the application is running is accessible."}}}}b("#message-title").text("Unable to communicate with NiFi");b("#message-content").text(f)}else{if(g.status===401){b("#message-title").text("Unauthorized");if(b.trim(g.responseText)===""){b("#message-content").text("Authentication is required to use this NiFi.")}else{b("#message-content").text(g.responseText)}}else{if(g.status===500){b("#message-title").text("An unexpected error has occurred");if(b.trim(g.responseText)===""){b("#message-content").text("An error occurred communicating with the application core. Please check the logs and fix any configuration issues before restarting.")}else{b("#message-content").text(g.responseText)}}else{if(g.status===200||g.status===201){b("#message-title").text("Parse Error");if(b.trim(g.responseText)===""){b("#message-content").text("Unable to interpret response from NiFi.")}else{b("#message-content").text(g.responseText)}}else{b("#message-title").text(g.status+": Unexpected Response");b("#message-content").text("An unexpected error has occurred. Please check the logs.")}}}}b("#message-pane").show()}}}}}));
(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery"],function(c){return(nf.UniversalCapture=b(c))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.UniversalCapture=b(require("jquery")))}else{nf.UniversalCapture=b(a.$)}}}(this,function(b){b(document).ready(function(c){c(window).on("keydown",function(d){var i=d.ctrlKey||d.metaKey;if(!i&&d.keyCode===27){var g=c("div.value-combo");if(g.is(":visible")&&g.parent().hasClass("combo-editor")){return}if(c("div.property-detail").is(":visible")){a.removeAllPropertyDetailDialogs();d.stopImmediatePropagation();d.preventDefault()}else{var h=c(d.target);if(h.length){var j=c(".cancellable");if(j.length){var e=null;var f=null;c.each(j,function(k,m){var l=c(m);var n=l.css("zIndex");if(l.is(":visible")&&(n!==null&&typeof n!=="undefined")){n=parseInt(n,10);if(e===null||n>e){e=n;f=l}}});if(f!==null){if(f.hasClass("modal")){f.modal("hide")}else{f.hide()}d.stopImmediatePropagation();d.preventDefault();return}}if(top!==window){if(typeof parent.nf!=="undefined"&&typeof parent.nf.Shell!=="undefined"){parent.$("#shell-close-button").click();d.stopImmediatePropagation();d.preventDefault();return}}}}}else{if(i){if(d.keyCode===82){d.preventDefault()}}else{if(!c("input, textarea").is(":focus")&&(d.keyCode==8||d.keyCode===46)){d.preventDefault()}}}})});var a={removeAllPropertyDetailDialogs:function(){var c=b("body").find("div.property-detail");c.find("div.nfel-editor").nfeditor("destroy");c.find("div.value-combo").combo("destroy");c.hide().remove()}};return a}));
(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","nf.Storage"],function(d,c){return(nf.AjaxSetup=b(d,c))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.AjaxSetup=b(require("jquery"),require("nf.Storage")))}else{nf.AjaxSetup=b(a.$,a.nf.Storage)}}}(this,function(b,a){b(document).ready(function(c){c.ajaxSetup({beforeSend:function(f){var d=a.hasItem("jwt");var e=a.getItem("jwt");if(e!==null){f.setRequestHeader("Authorization","Bearer "+e)}else{if(d===true){return false}}}})})}));
(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","Slick","nf.Common","nf.ErrorHandler"],function(c,f,d,e){return(nf.CountersTable=b(c,f,d,e))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.CountersTable=b(require("jquery"),require("Slick"),require("nf.Common"),require("nf.ErrorHandler")))}else{nf.CountersTable=b(a.$,a.Slick,a.nf.Common,a.nf.ErrorHandler)}}}(this,function(f,d,e,i){var b={urls:{counters:"../nifi-api/counters"}};var g=function(k,m){var l=function(p,n){if(k.columnId==="value"){var s=e.parseCount(p[k.columnId]);var r=e.parseCount(n[k.columnId]);return s-r}else{var o=e.isDefinedAndNotNull(p[k.columnId])?p[k.columnId]:"";var q=e.isDefinedAndNotNull(n[k.columnId])?n[k.columnId]:"";return o===q?0:o>q?1:-1}};m.sort(l,k.sortAsc)};var j=function(){return f("#counters-filter").val()};var h=function(){var k=f("#counters-table").data("gridInstance");if(e.isDefinedAndNotNull(k)){var l=k.getData();l.setFilterArgs({searchString:j(),property:f("#counters-filter-type").combo("getSelectedOption").value});l.refresh()}};var a=function(l,k){if(k.searchString===""){return true}try{var n=new RegExp(k.searchString,"i")}catch(m){return false}return l[k.property].search(n)>=0};var c=function(k){f.ajax({type:"PUT",url:b.urls.counters+"/"+encodeURIComponent(k.id),dataType:"json"}).done(function(n){var l=n.counter;var m=f("#counters-table").data("gridInstance");var o=m.getData();o.updateItem(l.id,l)}).fail(i.handleAjaxError)};return{init:function(){f("#counters-filter").keyup(function(){h()});f("#counters-filter-type").combo({options:[{text:"by name",value:"name"},{text:"by context",value:"context"}],select:function(p){h()}});var m=[{id:"context",name:"Context",field:"context",sortable:true,resizable:true,formatter:e.genericValueFormatter},{id:"name",name:"Name",field:"name",sortable:true,resizable:true,formatter:e.genericValueFormatter},{id:"value",name:"Value",field:"value",sortable:true,resizable:true,defaultSortAsc:false,formatter:e.genericValueFormatter}];if(e.canModifyCounters()){var o=function(t,q,s,r,p){return'<div title="Reset Counter" class="pointer reset-counter fa fa-undo" style="margin-top: 2px;"></div>'};m.push({id:"actions",name:"&nbsp;",sortable:false,resizable:false,formatter:o,width:100,maxWidth:100})}var l={forceFitColumns:true,enableTextSelectionOnCells:true,enableCellNavigation:false,enableColumnReorder:false,autoEdit:false,rowHeight:24};var n=new d.Data.DataView({inlineFilters:false});n.setItems([]);n.setFilterArgs({searchString:j(),property:f("#counters-filter-type").combo("getSelectedOption").value});n.setFilter(a);g({columnId:"context",sortAsc:true},n);var k=new d.Grid("#counters-table",n,m,l);k.setSelectionModel(new d.RowSelectionModel());k.registerPlugin(new d.AutoTooltips());k.setSortColumn("context",true);k.onSort.subscribe(function(q,p){g({columnId:p.sortCol.field,sortAsc:p.sortAsc},n)});k.onClick.subscribe(function(s,p){var r=f(s.target);var q=n.getItem(p.row);if(k.getColumns()[p.cell].id==="actions"){if(r.hasClass("reset-counter")){c(q)}}});n.onRowCountChanged.subscribe(function(q,p){k.updateRowCount();k.render();f("#displayed-counters").text(p.current)});n.onRowsChanged.subscribe(function(q,p){k.invalidateRows(p.rows);k.render()});f("#counters-table").data("gridInstance",k);f("#displayed-counters").text("0")},resetTableSize:function(){var k=f("#counters-table").data("gridInstance");if(e.isDefinedAndNotNull(k)){k.resizeCanvas()}},loadCountersTable:function(){return f.ajax({type:"GET",url:b.urls.counters,dataType:"json"}).done(function(m){var k=m.counters;var o=k.aggregateSnapshot;if(e.isDefinedAndNotNull(o.counters)){var l=f("#counters-table").data("gridInstance");var n=l.getData();n.setItems(o.counters);n.reSort();l.invalidate();f("#counters-last-refreshed").text(o.generated);f("#total-counters").text(o.counters.length)}else{f("#total-counters").text("0")}}).fail(i.handleAjaxError)}}}));
(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","nf.Common","nf.CountersTable","nf.ErrorHandler","nf.Storage"],function(e,f,c,g,d){return(nf.Counters=b(e,f,c,g,d))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.Counters=b(require("jquery"),require("nf.Common"),require("nf.CountersTable"),require("nf.ErrorHandler"),require("nf.Storage")))}else{nf.Counters=b(a.$,a.nf.Common,a.nf.CountersTable,a.nf.ErrorHandler,a.nf.Storage)}}}(this,function(e,d,a,g,f){e(document).ready(function(){i.init()});var b={urls:{banners:"../nifi-api/flow/banners",about:"../nifi-api/flow/about",currentUser:"../nifi-api/flow/current-user"}};var h=function(){return e.ajax({type:"GET",url:b.urls.currentUser,dataType:"json"}).done(function(j){d.setCurrentUser(j)}).fail(g.handleAjaxError)};var c=function(){e("#refresh-button").click(function(){a.loadCountersTable()});return e.Deferred(function(j){if(top===window){e.ajax({type:"GET",url:b.urls.banners,dataType:"json"}).done(function(o){if(d.isDefinedAndNotNull(o.banners)){if(d.isDefinedAndNotNull(o.banners.headerText)&&o.banners.headerText!==""){var l=e("#banner-header").text(o.banners.headerText).show();var n=function(p){var q=e("#"+p);q.css("top",(parseInt(l.css("height"),10)+parseInt(q.css("top"),10))+"px")};n("counters")}if(d.isDefinedAndNotNull(o.banners.footerText)&&o.banners.footerText!==""){var k=e("#banner-footer").text(o.banners.footerText).show();var m=function(p){var q=e("#"+p);q.css("bottom",parseInt(k.css("height"),10)+"px")};m("counters")}}j.resolve()}).fail(function(m,k,l){g.handleAjaxError(m,k,l);j.reject()})}else{j.resolve()}}).promise()};var i={init:function(){f.init();h().done(function(){a.init();a.loadCountersTable().done(function(){c().done(function(){var j=function(){if(top===window){e("body").css({height:e(window).height()+"px",width:e(window).width()+"px"});e("#counters").css("margin",40);e("#counters-table").css("bottom",127);e("#counters-refresh-container").css("margin",40)}a.resetTableSize()};e.ajax({type:"GET",url:b.urls.about,dataType:"json"}).done(function(l){var k=l.about;var m=k.title+" Counters";document.title=m;e("#counters-header-text").text(m);j()}).fail(g.handleAjaxError);e(window).on("resize",function(s){j();var l=e(".dialog");for(var q=0,r=l.length;q<r;q++){if(e(l[q]).is(":visible")){setTimeout(function(k){k.modal("resize")},50,e(l[q]))}}var t=e('*[class*="slickgrid_"]');for(var p=0,r=t.length;p<r;p++){if(e(t[p]).is(":visible")){setTimeout(function(k){k.data("gridInstance").resizeCanvas()},50,e(t[p]))}}var n=e(".tab-container");var m=[];for(var o=0,r=n.length;o<r;o++){if(e(n[o]).is(":visible")){m.push(e("#"+e(n[o]).attr("id")+"-content"))}}e.each(m,function(k,u){d.toggleScrollable(u.get(0))})})})})})}};return i}));

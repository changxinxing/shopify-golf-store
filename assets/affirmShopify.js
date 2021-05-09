
  <!-- -->
<!-- Affirm -->
	_affirm_config = {
	   public_api_key: "1RBZSC524SCW66FL",
	   script:          "https://cdn1.affirm.com/js/v2/affirm.js"
	};
	(function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","ready");
	// Use your live public API Key and https://cdn1.affirm.com/js/v2/affirm.js script to point to Affirm production environment.
<!-- End Affirm -->;
	
if(meta.page.pageType === "product"){
				    					pagePricingData(".product-single .price-item--sale","afterend","product",
				    									"12px","logo","blue");
				    					}pagePricingData(".cart-price-item ","beforeend","cart",
			     									"10px","logo","blue");



setObserver("salePrice",".product-single .price-item--sale","afterend","product",
									"12px","logo","blue");setObserver("cartTable",".cart-price-item ","beforeend","cart",
									"10px","logo","blue");

function setObserver(onChange,selector,position,pageType,fontSize,logoType,logoColor){

	setTimeout(function(){

		const targetNode = document.getElementById(onChange);
		const config = { attributes: true, childList: true, subtree: true };

		const callback = function(mutationsList, observer) {
		    for(let mutation of mutationsList) {
		        if (mutation.type === "childList") {

			        
	                      
					changePrice(observer,selector,position,pageType,fontSize,logoType,logoColor,null, function(){

						observer.observe(targetNode, config);
					});
					break;
		        }
		    }
		};

		const observer = new MutationObserver(callback);
		if(targetNode) observer.observe(targetNode, config);

	}, 1250);
}

function changePrice(observer,selector,position,pageType,fontSize,logoType,logoColor, styleArray, callback) { 

	observer.disconnect();
	
    pagePricingData(selector,position,pageType,fontSize,logoType,logoColor, styleArray, function(){
        
        setTimeout(callback, 1250);
    });
}
function pagePricingData(selector,position,pageType,fontSize,logoType,logoColor,styleArray,callback) {

  	let prices = document.querySelectorAll(selector);
  	if(!callback){if(document.getElementsByClassName("affirm-as-low-as")[0])return;}

    for (let i in prices) {
      
      let price = prices[i].innerText;

      if(price){
        
        
        if(callback){
          
          var child = prices[i].querySelector(".affirm-as-low-as");
          if(child) prices[i].removeChild(child);
          
        }
   
		let ala = getAffirmALA(pageType,fontSize,logoType,logoColor,price,styleArray);

        if(ala){
          
          prices[i].insertAdjacentElement(position, ala);
   
        }  
         
      } 

    }
  	affirm.ui.ready(function () {
      affirm.ui.refresh();

      if(callback) callback();
    });
}
function getAffirmALA(pageType,fontSize,logoType,logoColor,itemPrice, styleArray) {

	let totalAmount = itemPrice.replace(/[^\d.]/g,"");

	var price = '';

	if(totalAmount.indexOf(".") === -1 && totalAmount.substr(2, 2) === "00"){

		price = parseInt(totalAmount).toString();

	} else {
		price = convertPricing(parseInt(totalAmount)).toString();
	}

	var numOnly = price.match(/^[0-9]+$/) != null;
	
	var promoEl = document.createElement("p");
  	
  	var style = "";

	if(numOnly){ 
		promoEl.className = "affirm-as-low-as";
        style = "font-size: "+fontSize+";";
		promoEl.dataset.amount = price;
		promoEl.dataset.affirmType = logoType;

		if(logoType === "logo" || logoType === "symbol") promoEl.dataset.affirmColor = logoColor;

		promoEl.dataset.pageType = pageType;
	}
  
    if(styleArray){
      for(i in styleArray)style += styleArray[i];
  	}
  	
  	promoEl.style = style;
  
	return promoEl;
}
function convertPricing(price){
	return price*100;
}
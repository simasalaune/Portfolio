function ueMiniCart(){
  
  //classes
  var g_classLoading;
  
  //selectors
  var g_itemSelector, g_debugSelector, g_removeFromCartSelector, g_itemsHolderSelector, g_plusItemSelector, g_minusItemSelector, g_inputNumSelector, g_totalHolderSelector, g_emptyMessageSelector;
  
  //obj
  var g_objMiniCart, g_objItems, g_objRemoveButton, g_objItemsHolder, g_objPlusItems, g_objMinusItems, g_objBody, g_objEmptyMessage, g_objCheckoutButton;
  
  //data
  var g_productKey, g_hideCheckoutButton;
  
  //helpers
  var g_quantity, g_pageLoaded = false, g_shopPageUrl, g_ucFrontAjaxActionString;  
  
  function updateFragments(fragments) {    
    jQuery.each(fragments, function (key, value) {      
      jQuery(key).addClass("updating");      
    });
    
    jQuery.each(fragments, function (key, value) {      
      jQuery(key).replaceWith(value);      
    });
    
    g_objBody.trigger("wc_fragments_loaded");    
  }
  
  /**
  * on success ajax
  */
  function onAjaxSeccess(data){    
    //update items holder var
    g_objItemsHolder = g_objMiniCart.find(g_itemsHolderSelector);
    
    if(!data.fragments)
      return(false);
    
    var updatedCartHtml = jQuery(data.fragments[g_itemsHolderSelector]);
    
    // Update the cart HTML on your page
    g_objItemsHolder.html(updatedCartHtml); 
    
    //update fragments using woo function    
    updateFragments(data.fragments);  
  }
  
  /*
  * on error
  */
  function onAjaxErrorRemoveItem(error){    
    //var elemError = "<div class='ue-error'>"+error.message+"</div>";
    
    //g_objItemsHolder.prepend(elemError);
    
    console.error('Error removing item from Mini Cart widget:', error);    
  }
  
  /*
  * on error
  */
  function onAjaxErrorCountItem(error){    
    console.error('Error counting item from Mini Cart widget:', error);    
  }
  
  /**
  * small ajax request
  */
  function ajaxRequestRemoveItem(key, objItem){    
    //refresh vars
    g_objItems = g_objMiniCart.find(g_itemSelector);
    
    //show loader
    objItem.addClass(g_classLoading);
    
    
    var ajaxOptions = {
      method: 'POST',
      url: g_shopPageUrl+g_ucFrontAjaxActionString+"=removefromcart&key="+key,
      success: function(responseJSON){
        onAjaxSeccess(responseJSON);
      },
      error: function(error) {
        onAjaxErrorRemoveItem(error);        
      }
    }
    
    var handle = jQuery.ajax(ajaxOptions);
    
    return(handle);    
  }
  
  /**
  * ajax request each time quantity button is clicked
  */
  function ajaxRequestCountItem(key, quantity, objItem){    
    //refresh vars
    g_objItems = g_objMiniCart.find(g_itemSelector);
    
    //show loader
    objItem.addClass(g_classLoading);
    
    var ajaxOptions = {
      method: 'POST',
      url: g_shopPageUrl+g_ucFrontAjaxActionString+"=updatecartquantity&key="+key+"&quantity="+quantity,
      success: function(responseJSON){
        onAjaxSeccess(responseJSON);
      },
      error: function(error) {
        onAjaxErrorCountItem(error);        
      }
    }
    
    var handle = jQuery.ajax(ajaxOptions);
    
    return(handle);    
  }
  
  /*
  ** get parent item
  */
  function getParentItem(objElem){    
    var objParentItem = objElem.parents(g_itemSelector);
    
    return(objParentItem);    
  }
  
  /**
  * get product key val
  */
  function getProductKey(objElem){    
    var objItem = getParentItem(objElem);
    var dataKey = objItem.data(g_productKey);
    
    return(dataKey);    
  }
  
  /**
  * get input number
  */
  function getInputNumberObject(objButton){    
    var objItem = getParentItem(objButton);
    var objInput = objItem.find(g_inputNumSelector);
    
    return(objInput);    
  }
  
  /**
  * click on remove button
  */
  function onRemoveButtonClick(objButton){    
    var objItem = getParentItem(objButton);
    var dataKey = getProductKey(objButton);
    
    //send ajax reauest with product key
    ajaxRequestRemoveItem(dataKey, objItem);    
  } 
  
  /**
  * click on plus button
  */
  function onPlusButtonClick(objButton){    
    var objInput = getInputNumberObject(objButton);
    var objItem = getParentItem(objButton);
    var objMinusButton = objItem.find(g_minusItemSelector);
    var dataKey = getProductKey(objButton);
    
    g_quantity = parseInt(objInput.val());
    
    g_quantity++;
    
    objInput.val(g_quantity);
    
    objMinusButton.prop('disabled', false); 
    
    //send ajax request here
    ajaxRequestCountItem(dataKey, g_quantity, objItem);    
  }
  
  /**
  * click on minus button
  */
  function onMinusButtonClick(objButton){    
    var objInput = getInputNumberObject(objButton);
    var dataKey = getProductKey(objButton);
    var objItem = getParentItem(objButton);
    
    g_quantity = parseInt(objInput.val());
    
    g_quantity--;
    
    if(g_quantity == 1)
      objButton.prop('disabled', true);
    
    objInput.val(g_quantity);
    
    //send ajax request here
    ajaxRequestCountItem(dataKey, g_quantity, objItem);    
  }
  
  /**
  * input number manually
  */
  function onInputNumberChange(){    
    var objInput = jQuery(this);
    var objItem = getParentItem(objInput);
    var objMinusButton = objItem.find(g_minusItemSelector);
    var dataKey = getProductKey(objInput);

    if(objInput.val() == "")
      return(true);
    
    g_quantity = parseInt(objInput.val());
    
    if(g_quantity == 1)
      objMinusButton.prop('disabled', true);
    
    if(g_quantity <= 1){      
      objMinusButton.prop('disabled', true);
      
      g_quantity = 1;      
    }   
    
    //send ajax request here
    ajaxRequestCountItem(dataKey, g_quantity, objItem);    
  }
  
  /**
  * schow empy message
  */
  function showEmptyMessage(){    
    if(g_objItems.length == 0 || !g_objItems.length){
      g_objEmptyMessage.show();
      if(g_objCheckoutButton.data(g_hideCheckoutButton) == true)
        g_objCheckoutButton.hide();
    }
    
    if(g_objItems.length > 0){
      g_objEmptyMessage.hide();    
      if(g_objCheckoutButton.data(g_hideCheckoutButton) == true)
        g_objCheckoutButton.show();
    }
  }
  
  /**
  * show empty messagge
  */
  function onFragmentsLoaded(){    
    g_objItems = g_objMiniCart.find(g_itemSelector);
    
    showEmptyMessage();
    
    //push state to history to make sure mini cart is updated when returming back in browser
    if(g_pageLoaded == true)
      history.pushState({ "ue_mini_cart_product_added": true }, "", "");
    
    setTimeout(function(){
      g_pageLoaded = true;
    },1000);
  }
  
  /**
  * get ajax data
  */
  function getAjaxData(){
    g_objItems = g_objMiniCart.find(g_itemSelector);
    
    //show loader
    
    var ajaxOptions = {
      method: 'GET',
      url: g_shopPageUrl+g_ucFrontAjaxActionString+"=getcartdata",
      success: function(responseJSON){
        onAjaxSeccess(responseJSON);
      },
      error: function(error) {
        onAjaxErrorCountItem(error);        
      }
    }
    
    var handle = jQuery.ajax(ajaxOptions);  
  }
  
  /**
  * on back event in browser
  */
  function onPopstate(){

    getAjaxData();   
  }
  
  /**
  * on added to cart
  */
  function onAddingToCart(){    
    //push state to history to make sure mini cart is updated when returming back in browser
    history.pushState({ "ue_mini_cart_product_added": true }, "", "");
  }
  
  /**
  * get ajax action string
  */
  function getUCAjaxActionString(){
    var isSeparatorExist = g_shopPageUrl.indexOf("?") > -1;

    if(isSeparatorExist == true)
      g_ucFrontAjaxActionString = "&ucfrontajaxaction";
    else
    g_ucFrontAjaxActionString = "/?ucfrontajaxaction";

    return(g_ucFrontAjaxActionString);
  }
  
  /**
  * init from external file
  */
  this.init = function(objWidget, shopPageUrl){    
    //classes
    g_classLoading = "ue-loading";
    
    //selectors
    g_itemSelector = ".ue-mini-cart-item";
    g_debugSelector = ".ue-debug";
    g_removeFromCartSelector = ".ue-mini-cart-item-delete";   
    g_itemsHolderSelector = ".ue-mini-cart-items-holder"; 
    g_plusItemSelector = ".ue_mini_plus";
    g_minusItemSelector = ".ue_mini_minus";
    g_inputNumSelector = ".ue_mini_input";
    g_totalHolderSelector = ".ue-mini-cart-totals-holder";
    g_emptyMessageSelector = ".ue-mini-cart-empty-message";

    
    g_objMiniCart = objWidget;
    g_objItems = g_objMiniCart.find(g_itemSelector);
    g_objRemoveButton = g_objMiniCart.find(g_removeFromCartSelector);
    g_objItemsHolder = g_objMiniCart.find(g_itemsHolderSelector);    
    g_objPlusItems = g_objMiniCart.find(g_plusItemSelector);
    g_objMinusItems = g_objMiniCart.find(g_minusItemSelector);
    g_objEmptyMessage = g_objMiniCart.find(g_emptyMessageSelector);
    g_objCheckoutButton = g_objMiniCart.find(".ue-mini-cart-checkout-btn");
    g_objBody = jQuery("body");
    
    //data attrs without "data-" prefix
    g_productKey = "key";
    g_hideCheckoutButton = "hide";
    
    //helpers    
    g_shopPageUrl = shopPageUrl;
    g_ucFrontAjaxActionString = getUCAjaxActionString();
    
    //show empty message if needed
    showEmptyMessage();
    
    //get ajax data on init in case showin wrong html
  //  getAjaxData()
    
    //init events    
    g_objMiniCart.on("click", function(event){      
      var objTarget = jQuery(event.target);
      
      //remove from cart element can contain child elements, they also can be target
      if(objTarget.is(g_removeFromCartSelector) == true || objTarget.is(g_removeFromCartSelector+">*") == true)
        onRemoveButtonClick(objTarget);
      
      if(objTarget.is(g_minusItemSelector) == true)
        onMinusButtonClick(objTarget);
      
      if(objTarget.is(g_plusItemSelector) == true)
        onPlusButtonClick(objTarget);      
    });    
    
    g_objMiniCart.delegate(g_inputNumSelector, "input", onInputNumberChange);  
    g_objBody.on("wc_fragments_loaded", onFragmentsLoaded); 
    g_objBody.on("wc_fragments_refreshed", onFragmentsLoaded); 
    g_objBody.on("updated_wc_div", onPopstate); 
    g_objBody.on("adding_to_cart", onAddingToCart);
    
    window.addEventListener("popstate", onPopstate);
    
    //cerate observer
    // const targetNode = g_objMiniCart[0]; // You can change this to any other element you want to observe.
    
    // Configuration of the observer
    // const config = { attributes: true, childList: true, subtree: true, characterData: true };
    
    // Create a new instance of the Mutation Observer
    // const observer = new MutationObserver(function(mutationsList, observer) {
    // console.log('Changes detected:', mutationsList);
    // });
    
    // Start observing the target node with the specified configuration
    // observer.observe(targetNode, config);       
    
  }  
}
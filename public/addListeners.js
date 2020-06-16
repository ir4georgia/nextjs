if (document.readyState !== 'loading') {
  console.log('ADSTATS: LOADED: Adding Listener for AdFuel Created at ' + Date.now() / 1000);
  addEventListener('AdFuelCreated', function (event) {
    alert("AdFuel Created")
  })
  console.log('ADSTATS: LOADED: Adding Listener for DCL at ' + Date.now() / 1000);
  addEventListener('DOMContentLoaded', function (event) {
    console.log("ADSTATS: DOM Content Loaded")
  });
  console.log('ADSTATS: LOADED: Adding Listener for Scrolling at ' + Date.now() / 1000);
  addEventListener('scroll', function (event) {
    //console.log("ADSTATS: We be scrollin")
  });
  if (window.AdFuel) {
    console.log('ADSTATS: LOADED: Adding Listener for AdFuelRequestComplete at ' + Date.now() / 1000);
    AdFuel.addEvent(document, 'AdFuelRequestComplete', function (event) {
      console.log('ADSTATS: AdFuelRequestComplete fired at ' + Date.now() / 1000 + ' for ' + event.detail.slots.length + ' slots');
      var requestedSlots = event.detail.slots;
      var dispatchOptions = event.detail.options;
    });
    console.log('ADSTATS: LOADED: Adding Listener for GPTRenderComplete at ' + Date.now() / 1000);
    AdFuel.addEvent(document, 'GPTRenderComplete', function (event) {
      console.log('ADSTATS: GPTRenderComplete for ' + event.detail.divId + ' fired at ' + Date.now() / 1000);
      var gptSlot = event.detail.asset;
      var renderedSlotId = 'ad_' + event.detail.pos;
      var isEmpty = event.detail.empty;
      var adSize = event.detail.renderedSize;
    });
  } else {
    console.log('ADSTATS: LOADED: No Window.AdFuel ' + Date.now() / 1000);
  }
} else {
  console.log('ADSTATS: LOADING: Adding Listener for AdFuel Created at ' + Date.now() / 1000);
  addEventListener('AdFuelCreated', function (event) {
    alert("AdFuel Created")
  })
  console.log('ADSTATS: LOADING: Adding DCL Listener at ' + Date.now() / 1000);
  document.addEventListener('DOMContentLoaded', function () {
    console.log('ADSTATS: DOMContentLoaded2 fired at ' + Date.now() / 1000);
  });

  if (window.AdFuel) {
    AdFuel.addEvent(document, 'AdFuelRequestComplete', function (event) {
      console.log('ADSTATS: AdFuelRequestComplete fired at ' + Date.now() / 1000 + ' for ' + event.detail.slots.length + ' slots');
      var requestedSlots = event.detail.slots;
      var dispatchOptions = event.detail.options;
    });

    AdFuel.addEvent(document, 'GPTRenderComplete', function (event) {
      console.log('ADSTATS: GPTRenderComplete for ' + event.detail.divId + ' fired at ' + Date.now() / 1000);
      var gptSlot = event.detail.asset;
      var renderedSlotId = 'ad_' + event.detail.pos;
      var isEmpty = event.detail.empty;
      var adSize = event.detail.renderedSize;
    });
  } else {
    console.log('ADSTATS: LOADED: No Window.AdFuel ' + Date.now() / 1000);
  }
}
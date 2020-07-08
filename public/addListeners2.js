console.log('ADSTATS: Adding Key Event Listeners for AdFuel at ' + Date.now() / 1000);
document.addEventListener('userConsentReady', function (event) {
    console.log('ADSTATS: userConsentReady fired at ' + Date.now() / 1000);
});
document.addEventListener('AdFuelCreated', function (event) {
    console.log("ADSTATS: AdFuel Created fired at " + Date.now() / 1000)
})
// console.log('ADSTATS: Adding Listener for DCL at ' + Date.now() / 1000);
window.addEventListener('DOMContentLoaded', function (event) {
    console.log("ADSTATS: DOM Content Loaded fired at " + Date.now() / 1000)
});
// console.log('ADSTATS: Adding Listener for Loaded at ' + Date.now() / 1000);
window.addEventListener('load', function (event) {
    console.log("ADSTATS: Loaded fired at " + Date.now() / 1000)
});
// console.log('ADSTATS: Adding Listener for Scrolling at ' + Date.now() / 1000);
window.addEventListener('scroll', function (event) {
    //console.log("ADSTATS: We be scrollin")
});
// console.log('ADSTATS: Adding Listener for AdFuelRequestComplete at ' + Date.now() / 1000);
document.addEventListener('AdFuelRequestComplete', function (event) {
    console.log('ADSTATS: AdFuelRequestComplete fired at ' + Date.now() / 1000 + ' for ' + event.detail.slots.length + ' slots');
    var requestedSlots = event.detail.slots;
    var dispatchOptions = event.detail.options;
});
// console.log('ADSTATS: Adding Listener for GPTRenderComplete at ' + Date.now() / 1000);
document.addEventListener('GPTRenderComplete', function (event) {
    console.log('ADSTATS: GPTRenderComplete for ' + event.detail.divId + ' fired at ' + Date.now() / 1000);
    var gptSlot = event.detail.asset;
    var renderedSlotId = 'ad_' + event.detail.pos;
    var isEmpty = event.detail.empty;
    var adSize = event.detail.renderedSize;
});
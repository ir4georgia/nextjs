if (document.readyState !== 'loading') {
    if (window.AdFuel) {
        console.log('ADSTATS: LOADED: Queuing the Registry at ' + Date.now() / 1000);
        AdFuel.addPageLevelTarget('status','nba_endeavor')
        AdFuel.queueRegistry("https://i.cdn.turner.com/ads/nba3/nba_homepage.min.js");
    } else {
        console.log('ADSTATS: LOADED: No Window.AdFuel at ' + Date.now() / 1000);
    }
} else {
    if (window.AdFuel) {
        console.log('ADSTATS: LOADING: Queuing the Registry at ' + Date.now() / 1000);
        AdFuel.addPageLevelTarget('status','nba_endeavor')
        AdFuel.queueRegistry("https://i.cdn.turner.com/ads/nba3/nba_homepage.min.js");
    } else {
        console.log('ADSTATS: LOADING: No Window.AdFuel at ' + Date.now() / 1000);
    }
}
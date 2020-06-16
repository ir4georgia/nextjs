if (document.readyState !== 'loading') {
    console.log('ADSTATS: LOADED: adding User Consent Config at ' + Date.now() / 1000);
    window.WM = window.WM || {};
    window.WM.UserConsentConfig = {
        cookieDomain: '.nba.com',
        domId: '7992f959-c30b-4bc2-a2b7-50dbd02eb075-test',
        src: '//otcc-demo.otprivacy.com/scripttemplates/otSDKStub.js',
        countryCode: "US",
    };
} else {
    console.log('ADSTATS: LOADING: adding User Consent2 Config at ' + Date.now() / 1000);
    window.WM = window.WM || {};
    window.WM.UserConsentConfig = {
        cookieDomain: '.nba.com',
        domId: '7992f959-c30b-4bc2-a2b7-50dbd02eb075-test',
        src: '//otcc-demo.otprivacy.com/scripttemplates/otSDKStub.js',
        countryCode: "US",
    };
}
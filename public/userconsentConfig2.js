if (window.WM && window.WM.UserConsentConfig) {
    console.log('ADSTATS: User Consent Config already present at ' + Date.now() / 1000);
} else {
    console.log('ADSTATS: Adding User Consent Config at ' + Date.now() / 1000);
    window.WM = window.WM || {};
    window.WM.UserConsentConfig = {
        cookieDomain: '.nba.com',
        domId: '7992f959-c30b-4bc2-a2b7-50dbd02eb075-test',
        src: '//otcc-demo.otprivacy.com/scripttemplates/otSDKStub.js',
        countryCode: "US"
    };
}
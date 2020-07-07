
window.WM = window.WM || {};

/*
 * Sample config object, to either be initialized in "WM.UserConsentConfig"
 * before invoking this script or passed in as the "config" parameter to
 * the "init" function.  Note that if initialized in "WM.UserConsentConfig",
 * then it is not necessary to invoke init.
 *
 * Note that most values shown here reflect the default if left unset.
 *
    WM.UserConsentConfig = WM.UserConsentConfig || {
        // These three things MUST ALWAYS be set:
        cookieDomain: '',  // e.g.: '.cnn.com'
        domId: '',  // Should look like a GUID
        src: '',  // Should be a URL to a script
        // *** Everything below this line reflects the default value used if the option isn't set ***
        categories: {
            req: 'required',
            ad: 'ads-general',
            adv: 'ads-vendor',
            bb: 'behavior-general',
            bbv: 'behavior-vendor',
            pf: 'perf-general',
            pfv: 'perf-vendor',
            pz: 'person-general',
            pzv: 'person-vendor',
            sa: 'storage-general',
            sav: 'storage-vendor',
            sm: 'social-general',
            smv: 'social-vendor'
        },
        ccCookie: 'countryCode',
        confirmCookie: 'OptanonAlertBoxClosed',
        consentChangeAction: null,
        consentCookie: 'OptanonConsent',
        controlCookie: 'OptanonControl',
        consentDefaults: {
            required: true,
            'ads-general': true,
            'ads-vendor': true,
            'behavior-general': true,
            'behavior-vendor': true,
            'perf-general': true,
            'perf-vendor': true,
            'person-general': true,
            'person-vendor': true,
            'social-general': true,
            'social-vendor': true,
            'storage-general': true,
            'storage-vendor': true
        },
        consentLinkTitle: '',
        debug: false,
        privacyCenterLinkTitle: '',
        regionChangeAction: null,
        regions: [
            {
                id: 'ccpa',
                consentLinkTitle: 'Do Not Sell My Personal Information',
                geoMatch: ['US', 'PR', 'VI', 'UM', ''],
                useIAB: false
            },
            {
                id: 'gdpr',
                consentLinkTitle: 'Cookie Settings',
                consentDefaults: {  // Setting this here will override the top-level defaults when in this region
                    required: true,
                    'ads-general': false,
                    'ads-vendor': false,
                    'behavior-general': false,
                    'behavior-vendor': false,
                    'perf-general': false,
                    'perf-vendor': false,
                    'person-general': false,
                    'person-vendor': false,
                    'social-general': false,
                    'social-vendor': false,
                    'storage-general': false,
                    'storage-vendor': false
                },
                geoMatch: ['GB', 'DE', 'FR', 'IT', 'ES', 'PL', 'RO', 'NL', 'BE', 'GR', 'CZ', 'PT', 'SE', 'HU', 'AT', 'BG', 'DK', 'FI', 'SK', 'IE', 'HR', 'LT', 'SI', 'LV', 'EE', 'CY', 'LU', 'MT', 'NO', 'IS', 'LI'],
                useIAB: true
            },
            {
                id: 'global',
                geoMatch: ['*'],
                useIAB: false
            }
        ]
    };
 *
 */


/**
 * Polyfill for CustomEvent constructor for IE
 */
(function (win, doc) {
    if (typeof win.CustomEvent !== 'function') {
        function CustomEvent(event, params) {
            var evt;

            params = params || { bubbles: false, cancelable: false, detail: undefined };
            evt = doc.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = win.Event.prototype;
        win.CustomEvent = CustomEvent;
        if (win.Event !== 'function') win.Event = CustomEvent;
    }
})(window, document);


/**
 * User Consent checking and setup of global object
 *
 * @name WM.UserConsent
 * @namespace
 * @memberOf WM
 */
window.WM.UserConsent = window.WM.UserConsent || (function UserConsent(win, doc) {
    'use strict';

    var categories,
        config = {},
        consentState = null,
        consentTime = null,
        consentVersion = '',
        controls = {},
        geoCountry = '',
        optanonEvent = new CustomEvent('optanonLoaded'),
        optanonLoaded = false,
        userConsentEvent = new CustomEvent('userConsentReady'),
        userConsentVersion = '1.3.3',  /* Probably pull this from somewhere else at some point */
        defaults = {
            categories: {
                req: 'required',
                ad: 'ads-general',
                adv: 'ads-vendor',
                bb: 'behavior-general',
                bbv: 'behavior-vendor',
                pf: 'perf-general',
                pfv: 'perf-vendor',
                pz: 'person-general',
                pzv: 'person-vendor',
                sa: 'storage-general',
                sav: 'storage-vendor',
                sm: 'social-general',
                smv: 'social-vendor'
            },
            ccCookie: 'countryCode',
            confirmCookie: 'OptanonAlertBoxClosed',
            consentChangeAction: null,
            consentCookie: 'OptanonConsent',
            consentDefaults: {
                required: true,
                'ads-general': true,
                'ads-vendor': true,
                'behavior-general': true,
                'behavior-vendor': true,
                'perf-general': true,
                'perf-vendor': true,
                'person-general': true,
                'person-vendor': true,
                'social-general': true,
                'social-vendor': true,
                'storage-general': true,
                'storage-vendor': true
            },
            consentLinkTitle: '',
            controlCookie: 'OptanonControl',
            privacyCenterLinkTitle: '',
            regionChangeAction: null,
            regions: [
                {
                    id: 'ccpa',
                    consentLinkTitle: 'Do Not Sell My Personal Information',
                    geoMatch: ['US', 'PR', 'VI', 'UM', ''],
                    useIAB: false
                },
                {
                    id: 'gdpr',
                    consentLinkTitle: 'Cookie Settings',
                    consentDefaults: {  // Setting this here will override the top-level defaults when in this region
                        required: true,
                        'ads-general': false,
                        'ads-vendor': false,
                        'behavior-general': false,
                        'behavior-vendor': false,
                        'perf-general': false,
                        'perf-vendor': false,
                        'person-general': false,
                        'person-vendor': false,
                        'social-general': false,
                        'social-vendor': false,
                        'storage-general': false,
                        'storage-vendor': false
                    },
                    geoMatch: ['GB', 'DE', 'FR', 'IT', 'ES', 'PL', 'RO', 'NL', 'BE', 'GR', 'CZ', 'PT', 'SE', 'HU', 'AT', 'BG', 'DK', 'FI', 'SK', 'IE', 'HR', 'LT', 'SI', 'LV', 'EE', 'CY', 'LU', 'MT', 'NO', 'IS', 'LI'],
                    useIAB: true
                },
                {
                    id: 'global',
                    geoMatch: ['*'], // Matches everything not yet matched
                    useIAB: false
                }
            ]
        };

    /**
     * Returns the value of the given cookie name
     *
     * @param {string} name - the cookie name
     * @returns {string} value of the cookie
     */
    function getCookie(name) {
        var re = new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'),
            matches = document.cookie.match(re);

        return matches ? matches.pop() : null;
    }

    /**
     * Sets a new cookie with the given values.
     *
     * @param {string} name - the cookie name
     * @param {string} value - the cookie value
     * @param {object} [opts] - the cookie option strings (expires, maxage, domain, path, secure, httponly, samesite)
     * @returns {string} value of the cookie
     */
    function setCookie(name, value, opts) {
        if (!name) return;  /* Nothing to do */
        opts = opts || {};
        doc.cookie = name + '=' + (typeof value === 'string' ? value : '') +
            '; Domain=' + (opts.domain || config.cookieDomain) +
            '; Path=' + (opts.path || '/') +
            (opts.maxage ? '; Max-Age=' + opts.maxage : (opts.expires && '; Expires=' + opts.expires) || '') +
            (opts.secure && '; Secure') || '' +
            (opts.httponly && '; HttpOnly') || '' +
            (opts.samesite ? '; SameSite=' + opts.samesite : '');
    }

    /**
     * Returns the value of the country from the country code cookie.
     *
     * @param {string} [name] - the cookie name to get the country code from
     * @returns {string} - 2-letter country code from country field or empty string if not set/found
     */
    function getCountry(name) {
        var fields,
            value = getCookie(name || 'countryCode');

        if (value && value.length === 2) {
            return value.toUpperCase();
        }
        console.log('User-Consent unable to determine country, missing or invalid cookies.');
        return '';
    }

    /**
     * Checks if the geoCountry is in the specified region
     *
     * @param {Array} codes - An array of 2-character country codes that represent the region
     * @returns {boolean} - true if in the specified region
     */
    function checkInRegion(codes) {
        var i;

        for (i = 0; i < codes.length; i++) {
            if (geoCountry === codes[i].toUpperCase() || codes[i] === '*') {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns a shallow copy of the passed-in consent object
     *
     * @param {Object} cObj - A consent object
     * @returns {Object} - A shallow copy of the consent object
     */
    function copyConsent(cObj) {
        var c = 0,
            nObj = {};

        for (c = 0; c < categories.length; c++) {
            nObj[categories[c]] = cObj[categories[c]];
        }
        return nObj;
    }

    function processConsentState() {
        var confirmValue = getCookie(config.confirmCookie),
            cookieValue = getCookie(config.consentCookie),
            encodedParameterGroup,
            fieldIndex,
            fields,
            values,
            paramName,
            paramValue,
            group,
            groups,
            groupIndex,
            consentCode,
            consentValue,
            state = copyConsent(config.consentDefaults);

        if (!confirmValue) {
            if (cookieValue) {
                /* Remove the consent value cookie if the confirmation is not present to prevent the multiple tab problem. */
                doc.cookie = config.consentCookie + '=; Domain=' + config.cookieDomain + '; Path=/; Expires=Thu, 01 Jan 2000 00:00:01 GMT;';
            }
            return state;
        }
        if (!cookieValue) return state;

        fields = cookieValue.split('&');

        for (fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
            encodedParameterGroup = fields[fieldIndex];
            if (encodedParameterGroup) {
                /* fields are encoded paramName=paramVal */
                values = encodedParameterGroup.split('=');
                paramName = values[0];
                paramValue = values[1];

                /* the 'groups' parameter contains consent data */
                if (paramName === 'groups' && paramValue) {
                    /* group value is uri encoded */
                    groups = decodeURIComponent(paramValue).split(',');

                    for (groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                        group = groups[groupIndex].split(':');
                        consentCode = group[0].toLowerCase();
                        consentValue = group[1];

                        /* skip codes not in our lookup */
                        if (consentCode && consentValue && config.categories[consentCode]) {
                            state[config.categories[consentCode]] = consentValue !== '0';
                        }
                    }
                } else if (paramName === 'version' && paramValue) {
                    consentVersion = paramValue;
                }
            }
        }

        return state;
    }

    function getConsentState() {
        return consentState;
    }

    function getConsentTime() {
        return consentTime;
    }

    function getConsentVersion() {
        return consentVersion;
    }

    function getLinkAction() {
        return config.consentLinkAction || (win.OneTrust && win.OneTrust.ToggleInfoDisplay) || function _linkAct() {
            if (win.OneTrust && win.OneTrust.ToggleInfoDisplay) {
                win.OneTrust.ToggleInfoDisplay();
            }
        };
    }

    function getLinkTitle() {
        return config.consentLinkTitle;
    }

    function getPrivacyCenterLinkAction() {
        if (typeof config.privacyCenterLinkAction === 'function') {
            return config.privacyCenterLinkAction;
        } else if (typeof config.privacyCenterLinkAction === 'string' && config.privacyCenterLinkAction.search(/^http/) !== -1) {
            // We have a URL instead of an action function, so return a function that loads it in a new window/tab.
            return function _redirToPC() {
                win.open(config.privacyCenterLinkAction, '_blank');
            };
        }
        return null;
    }

    function getPrivacyCenterLinkTitle() {
        return config.privacyCenterLinkTitle;
    }

    function getRegion() {
        return config.regId;
    }

    function getVersion() {
        return version;
    }

    function isEnabled() {
        return true;
    }

    function isInCcpaRegion() {
        return config.regId === 'ccpa';
    }

    function isInGdprRegion() {
        return config.regId === 'gdpr';
    }

    function isInRegion(region) {
        return config.regId === region;
    }

    function isOptanonLoaded() {
        return optanonLoaded;
    }

    function isReady() {
        return consentState !== null;
    }

    function inUserConsentState(states, options) {
        var cat,
            i,
            state = true;

        if (states) {
            states = Array.isArray(states) ? states : [states];
            for (i = 0; i < states.length; i++) {
                if (states[i] === 'iab') {
                    if (config.useIAB && !(options && options.ignoreIAB)) {
                        break;  /* If the "iab" consent type is added, and use IAB is true, consent is true */
                    }
                } else {
                    cat = typeof consentState[states[i]] === 'boolean' ? states[i] : ((config.migratePrevious && config.migratePrevious[states[i]]) || 'required');
                    if (consentState[cat] === false) {
                        state = false;
                        break;
                    }
                }
            }
        }
        if (config.debug && options && (options.id || options.name)) {
            console.log('Consent check of [' + (states.join(',') || 'empty') + '] ' + (state ? 'allows ' : 'rejects ') + (options.id || options.name));
        }
        return state;
    }

    function getUserConsentAdvertisingState() {
        return consentState['ads-general'] && consentState['ads-vendor'];
    }

    function getUserConsentBehaviorState() {
        return consentState['behavior-general'] && consentState['behavior-vendor'];
    }

    function getUserConsentPerformanceState() {
        return consentState['perf-general'] && consentState['perf-vendor'];
    }

    function getUserConsentPersonalizationState() {
        return consentState['person-general'] && consentState['person-vendor'];
    }

    function getUserConsentSocialState() {
        return consentState['social-general'] && consentState['social-vendor'];
    }

    function getUserConsentStorageState() {
        return consentState['storage-general'] && consentState['storage-vendor'];
    }

    function usingIAB() {
        return config.useIAB;
    }

    function addScriptElement(elem, consent, parent) {
        var p = parent || doc.head;

        if (elem) {
            if (isReady() && inUserConsentState(consent)) {
                if (config.debug) {
                    console.log('Adding with [' + (consent.join(',') || 'empty') + '] consent: ' + (elem.src || elem.id || 'unknown inline'));
                }
                p.appendChild(elem);
                return true;
            }
            if (config.debug) {
                console.log('Not adding, no [' + (consent.join(',') || 'empty') + '] consent: ' + (elem.src || elem.id || 'unknown inline'));
            }
        }
        return false;
    }

    function addScript(options, consent, parent) {
        var ns,
            o,
            ops,
            p = parent || doc.head;

        if (options && (options.src || options.text)) {
            if (isReady() && inUserConsentState(consent)) {
                if (config.debug) {
                    console.log('Adding with [' + (consent.join(',') || 'empty') + '] consent: ' + (options.src || options.id || 'unknown inline'));
                }
                ns = doc.createElement('script');
                ops = Object.keys(options);
                for (o = 0; o < ops.length; o++) {
                    ns[ops[o]] = options[ops[o]];
                }
                p.appendChild(ns);
                return true;
            }
            if (config.debug) {
                console.log('Not adding, no [' + (consent.join(',') || 'empty') + '] consent: ' + (options.src || options.id || 'unknown inline'));
            }
        }
        return false;
    }

    function doReload() {
        win.location.reload();
    }

    function forceReconsent() {
        doc.cookie = config.consentCookie + '=; Domain=' + config.cookieDomain + '; Path=/; Expires=Thu, 01 Jan 2000 00:00:01 GMT;';
        doc.cookie = config.confirmCookie + '=; Domain=' + config.cookieDomain + '; Path=/; Expires=Thu, 01 Jan 2000 00:00:01 GMT;';
        setTimeout(doReload, 100);
    }

    function onRegionChange(prevRegion, newRegion) {
        if (config.debug) {
            console.log('User-Consent detected region change from "' + prevRegion + '" to "' + newRegion + '".');
        }
        if (typeof config.regionChangeAction === 'function') {
            config.regionChangeAction(prevRegion, newRegion, config.consentLinkAction);
        }
    }

    function processControls() {
        var result = {},
            fields,
            f,
            value = getCookie(config.controlCookie),
            vals;

        /* Grab control values from control cookie, if set */
        if (typeof value === 'string' && value.length !== 0) {
            /* We have a control cookie */
            fields = value.split('&');
            for (f = 0; f < fields.length; f++) {
                vals = fields[f].split('=');
                if (typeof vals[1] === 'string') {
                    if (vals[0] === 'ccc') {
                        result.countryCode = vals[1].toLowerCase();
                    } else if (vals[0] === 'otvers') {
                        result.consentVersion = vals[1].toLowerCase();
                    } else if (vals[0] === 'reg') {
                        result.region = vals[1].toLowerCase();
                    } else if (vals[0] === 'vers') {
                        result.userConsentVersion = vals[1].toLowerCase();
                    }
                }
            }
        }

        return result;
    }

    function processConsentTime() {
        var newTime = consentTime,
            val = getCookie(config.confirmCookie);

        /* Grab consent time data from cookie, if set */
        if (typeof val === 'string' && val.length !== 0) {
            /* We have a confirmation cookie */
            newTime = new Date(val);
            if (win.isNaN(newTime.valueOf()) === true) {
                newTime = null;
            }
        }

        return newTime;
    }

    function setControlsCookie() {
        setCookie(config.controlCookie, 'ccc=' + geoCountry + '&otvers=' + consentVersion + '&reg=' + config.regId + '&vers=' + userConsentVersion, {
            domain: config.cookieDomain,
            maxage: '31536000',
            path: '/',
            samesite: 'Lax'
        });
    }

    function processConsentChanges() {
        var c,
            newDate,
            newState = processConsentState();


        /* Compare the new state to the previous state */
        for (c = 0; c < categories.length; c++) {
            if (newState[categories[c]] !== consentState[categories[c]]) {
                /* The consent states are different so set the control cookie and reload... */
                setControlsCookie();
                /* If we have a consentChangeAction, do that now... */
                if (typeof config.consentChangeAction === 'function') {
                    config.consentChangeAction(newState, config.regId, consentVersion);
                }
                setTimeout(doReload, 100);
                return;
            }
        }
        if (!controls.region) {
            /* No controlCookie set, so do that now */
            setControlsCookie();
        }
    }

    /* This creates the CMP stub function used for Ad vendors and IAB-compliant third parties
     * used when in GDPR regions.
     * This code was based off the example from OneTrust.
     */
    function createCMPStub() {
        function addFrame() {
            var iframe;

            if (!win.frames.__cmpLocator) {
                if (doc.body) {
                    iframe = doc.createElement('iframe');
                    iframe.style = 'display:none';
                    iframe.name = '__cmpLocator';
                    doc.body.appendChild(iframe);
                } else {
                    /* In the case where this stub is located in the head,
                     * this allows us to inject the iframe more quickly than
                     * relying on DOMContentLoaded or other events.
                     */
                    setTimeout(addFrame, 5);
                }
            }
        }

        addFrame();

        // eslint-disable-next-line consistent-return
        function stubCMP() {
            var b = arguments;

            win.__cmp.a = win.__cmp.a || [];
            if (!b.length) {
                return win.__cmp.a;
            }
            if (b[0] === 'ping') {
                b[2]({ gdprAppliesGlobally: false, cmpLoaded: false }, true);
            } else {
                win.__cmp.a.push([].slice.apply(b));
            }
        }

        function cmpMsgHandler(event) {
            var msgIsString = typeof event.data === 'string',
                i,
                json;

            try {
                json = msgIsString ? JSON.parse(event.data) : event.data;
            } catch (e) {
                json = {};
            }

            if (json.__cmpCall) {
                i = json.__cmpCall;

                win.__cmp(i.command, i.parameter, function __cmpDefCB(retValue, success) {
                    var returnMsg = {
                        __cmpReturn: {
                            returnValue: retValue,
                            success: success,
                            callId: i.callId,
                        }
                    };

                    event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
                });
            }
        }

        if (typeof win.__cmp !== 'function') {
            win.__cmp = stubCMP;
            win.__cmp.msgHandler = cmpMsgHandler;
            if (win.addEventListener) {
                win.addEventListener('message', cmpMsgHandler, false);
            } else {
                win.attachEvent('onmessage', cmpMsgHandler);
            }
        }
    }

    /**
     * Function to initialize the UserConsent code
     *
     * @param {object} conf - the configuration object
     */
    function init(conf) {
        var cats,
            headPtr = doc.getElementsByTagName('head')[0],
            ots = doc.createElement('script'),
            r,
            reg = null;

        if (consentState !== null) {
            return;  /* init already called */
        }
        /* Process config */
        if (!conf || !conf.src || !conf.domId || !conf.cookieDomain) {
            throw new Error('Invalid config passed to user-consent!');
        }
        config.debug = !!(console && (conf.enableDebug || (win.location.search.search(/[?&]wmuc_debug=[1t]/) !== -1)));
        if (typeof conf.countryCode === 'string' && conf.countryCode.length === 2) {
            geoCountry = conf.countryCode.toUpperCase();
        } else {
            geoCountry = getCountry(conf.ccCookie);
        }
        config.categories = conf.categories || defaults.categories;
        config.regions = conf.regions || defaults.regions;
        config.cookieDomain = conf.cookieDomain;
        config.consentChangeAction = conf.consentChangeAction || defaults.consentChangeAction;
        config.controlCookie = conf.controlCookie || defaults.controlCookie;
        config.regionChangeAction = conf.regionChangeAction || defaults.regionChangeAction;
        cats = Object.keys(config.categories);
        categories = [];
        for (r = 0; r < cats.length; r++) {
            categories.push(config.categories[cats[r]]);
        }
        for (r = 0; r < config.regions.length; r++) {
            if (checkInRegion(config.regions[r].geoMatch)) {
                reg = config.regions[r];
                break;
            }
        }
        if (!reg) {
            throw new Error('No matching user-consent region!');
        }
        config.regId = reg.id;
        config.consentLinkAction = reg.consentLinkAction || conf.consentLinkAction || null;
        config.consentLinkTitle = reg.consentLinkTitle || conf.consentLinkTitle || defaults.consentLinkTitle;
        config.confirmCookie = reg.confirmCookie || conf.confirmCookie || defaults.confirmCookie;
        config.consentCookie = reg.consentCookie || conf.consentCookie || defaults.consentCookie;
        config.consentDefaults = reg.consentDefaults || conf.consentDefaults || defaults.consentDefaults;
        config.domId = reg.domId || conf.domId;
        config.privacyCenterLinkAction = reg.privacyCenterLinkAction || conf.privacyCenterLinkAction || null;
        config.privacyCenterLinkTitle = reg.privacyCenterLinkTitle || conf.privacyCenterLinkTitle || defaults.privacyCenterLinkTitle;
        config.src = reg.src || conf.src;
        config.useIAB = reg.useIAB || defaults.useIAB;
        if (reg.migratePrevious) {
            config.migratePrevious = reg.migratePrevious;
        }

        if (config.debug) {
            console.log('GeoIP Country Code: ' + geoCountry + ', using consent region: ' + config.regId);
            console.log('IAB ' + (config.useIAB ? 'enabled' : 'disabled'));
        }

        /* Grab control values from control cookie, if set */
        controls = processControls();

        /* Grab consent time data from cookie, if set */
        consentTime = processConsentTime();
        if (consentTime !== null) {
            /* We have a confirmation cookie */
            consentState = processConsentState();
            ots.async = true;
            if (config.debug) {
                console.log('Consent time read from "' + config.confirmCookie + '": ', consentTime);
                console.log('Consent state read from "' + config.consentCookie + '" (' + consentVersion + '): ', consentState);
            }
        } else {
            /* We are using the defaults */
            consentState = copyConsent(config.consentDefaults);
            if (config.debug) {
                console.log('Consent state from defaults: ', consentState);
            }
        }

        /* Make sure this is not a second instance */
        if (win.WM.UserConsent_initted) {
            console.log('ERROR:  Second instance of UserConsent initialized!');
            return;
        }
        win.WM.UserConsent_initted = true;

        if (config.useIAB) {
            /* We are using IAB, so prep the __cmp stub */
            createCMPStub();
        }

        /* If we have switched regions, maybe do something about that... */
        if (controls.region && controls.region !== config.regId) {
            onRegionChange(controls.region, config.regId);
        }

        /* We are ready to handle consent at this point */
        doc.dispatchEvent(userConsentEvent);

        /* Load the OneTrust script */
        ots.charset = 'utf-8';
        ots.dataset.documentLanguage = 'true';
        ots.dataset.domainScript = config.domId;
        ots.src = config.src;
        headPtr.appendChild(ots);
    }

    /* The wrapper called on Optanon load and cookie changes */
    win.OptanonWrapper = function OptanonWrapper() {
        if (!optanonLoaded) {
            /* This is the first call, on page load */
            optanonLoaded = true;
            doc.dispatchEvent(optanonEvent);
        } else {
            /* This is a subsequent call, on possible consent change */
            setTimeout(processConsentChanges, 2000);
        }
    };

    /* Auto-init if we can */
    if (typeof win.WM.UserConsentConfig === 'object' && win.WM.UserConsentConfig !== null) {
        init(win.WM.UserConsentConfig);
    }

    return {
        addScript: addScript,
        addScriptElement: addScriptElement,
        forceReconsent: forceReconsent,
        getConsentState: getConsentState,
        getConsentTime: getConsentTime,
        getConsentVersion: getConsentVersion,
        getLinkAction: getLinkAction,
        getLinkTitle: getLinkTitle,
        getPrivacyCenterLinkAction: getPrivacyCenterLinkAction,
        getPrivacyCenterLinkTitle: getPrivacyCenterLinkTitle,
        getRegion: getRegion,
        getUserConsentAdvertisingState: getUserConsentAdvertisingState,
        getUserConsentBehaviorState: getUserConsentBehaviorState,
        getUserConsentPerformanceState: getUserConsentPerformanceState,
        getUserConsentPersonalizationState: getUserConsentPersonalizationState,
        getUserConsentSocialState: getUserConsentSocialState,
        getUserConsentStorageState: getUserConsentStorageState,
        getVersion: getVersion,
        init: init,
        inUserConsentState: inUserConsentState,
        isEnabled: isEnabled,
        isInCcpaRegion: isInCcpaRegion,
        isInGdprRegion: isInGdprRegion,
        isInRegion: isInRegion,
        isOptanonLoaded: isOptanonLoaded,
        isReady: isReady,
        usingIAB: usingIAB
    };
})(window, document);

/**
 * Config Object
 *
 * @name WM.ConsentSiteConfig
 * @namespace
 * @memberof WM
 */
window.WM.UserConsentConfig = {
    cookieDomain: ".nba.com",
    domId: "d0494fd0-8921-497a-8323-e3d29775ce1b",
    src: "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
}

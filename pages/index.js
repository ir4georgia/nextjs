import React, { useState, useEffect } from 'react';
import Head from 'next/head'


export default function Home() {

  // This gets called on every request
  async function getServerSideProps() {

    return { props: { "org": "TechPubOps" } }
  }

  useEffect(() => {
    // if (window) {
    //   // if (window.addEventListener) {
    //   //   addEventListener('DOMContentLoaded', function (event) {
    //   //     console.log("ADSTATS: DOM Content Loaded")
    //   //   });
    //   //   addEventListener('scroll', function (event) {
    //   //     //console.log("ADSTATS: We be scrollin")
    //   //   });
    //   // }

    //   // if (window.addEventListener) {
    //   //   addEventListener('AdFuelCreated', function (event) {
    //   //     alert("AdFuel Created")
    //   //   })
    //   // }
    // }

    // if (window.AdFuel) {
    //   AdFuel.addEvent(document, 'AdFuelRequestComplete', function (event) {
    //     console.log('ADSTATS: AdFuelRequestComplete fired at ' + Date.now() / 1000 + ' for ' + event.detail.slots.length + ' slots');
    //     var requestedSlots = event.detail.slots;
    //     var dispatchOptions = event.detail.options;
    //   });
    
    //   AdFuel.addEvent(document, 'GPTRenderComplete', function (event) {
    //     console.log('ADSTATS: GPTRenderComplete for ' + event.detail.divId + ' fired at ' + Date.now() / 1000);
    //     var gptSlot = event.detail.asset;
    //     var renderedSlotId = 'ad_' + event.detail.pos;
    //     var isEmpty = event.detail.empty;
    //     var adSize = event.detail.renderedSize;
    //   });
    // }

    // if (window) {
    //   // console.log('ADSTATS: Loading User Consent Config at ' + Date.now() / 1000);
    //   // window.WM = window.WM || {};
    //   // window.WM.UserConsentConfig = {
    //   //   cookieDomain: '.nba.com',
    //   //   domId: '7992f959-c30b-4bc2-a2b7-50dbd02eb075-test',
    //   //   src: '//otcc-demo.otprivacy.com/scripttemplates/otSDKStub.js',
    //   //   countryCode: "US",
    //   // };
    // }
    if (window.AdFuel) {
      console.log('ADSTATS: Queuing the Registry at ' + Date.now() / 1000);
      AdFuel.queueRegistry("https://i.cdn.turner.com/ads/qa/nba2/nba_endeavor.min.js")
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>MP and Next.js</title>
        <link rel="icon" href="/favicon.ico" />

        <script type="text/javascript" src="/userconsent.js"></script>
        <script type="text/javascript" async src="/addListeners.js"></script>
        <script type="text/javascript" src="/addAdFuelComponents.js"></script>
        {/* <script type="text/javascript" async src="//i.cdn.turner.com/ads/qa/adfuel/ais/2.0/nba2-ais.js"></script>
        <script type="text/javascript" async src="//i.cdn.turner.com/ads/adfuel/adfuel-2.0.js"></script> */}
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">MP on Next.js! What????</a>
        </h1>
        <li>Let's use Next.js HEAD function to load "addListeners.js" file</li>
        <li>Let's use Next.js HEAD function to load "userconsent.js" file</li>
        <li>Let's use Next.js HEAD function to load "addAdFuelComponents.js" file</li>
        <li>Finally, queue the registry via useEffect (when component mounts)</li>
        <p>Here is ad_bnr_atf_01</p>
        <div className="slotWrapper">
          <div id="ad_bnr_atf_01"></div>
        </div>
        <p>Here is ad_bnr_btf_01</p>
        <div className="slotWrapper">
          <div id="ad_bnr_btf_01"></div>
        </div>
    
        <p>This page using PROD Ad Fuel and QA AIS: </p>
        <p><a href="//i.cdn.turner.com/ads/adfuel/adfuel-2.0.js" target="_blank">//i.cdn.turner.com/ads/adfuel/adfuel-2.0.js</a> </p>
        <p><a href="//i.cdn.turner.com/ads/qa/adfuel/ais/2.0/nba2-ais.js" target="_blank">//i.cdn.turner.com/ads/qa/adfuel/ais/2.0/nba2-ais.js</a> </p>
      </main>

      <footer>
        <p>Michael J. Pierce - Tech Pub Ops</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .slotWrapper {
          width: 728px;
          height: 90px;
          border: thin solid red;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

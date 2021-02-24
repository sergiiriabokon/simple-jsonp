'use strict';

/**
 * Object that holds page-related methods
 */
let pageObj = {

  /**
   * Entry-function
   */
  init() {

    /**
     * Four custom ways without anything XHR related
     */
    this.iframeInjection();
    this.scriptTagInjection();
    this.linkTagInjection();
    this.objectTagInjection();

    /**
     * Latest XHR-like request with fetch
     */
    this.simpleFetch();
  },

  /**
   * Receives data via inserting <IFRAME> tag
   * and subscribing to its onload event
   */
  iframeInjection() {
    let iframeEl = document.createElement("iframe");
    iframeEl.style.display = "none";
    iframeEl.setAttribute("src", "/iframe-data.txt");

    let getContent = () => 
                iframeEl.contentWindow.document.body.textContent;

    iframeEl.onload = () => 
                console.log('Iframe tag injection: ' + getContent());

    document.body.appendChild(iframeEl);
  },

  /**
   * Receives data from a global variable 
   * added afer lazy-load script tag
   */
  scriptTagInjection() {
    let srcTag = document.createElement("script");
    srcTag.setAttribute("src", " /data.txt");

    srcTag.onload = () => 
                console.log("Script tag injection: " + dataList.sample);

    document.body.appendChild(srcTag);
  },

  /**
   * Receives data from a content property
   * of lazy-load CSS rule
   */
  linkTagInjection() {
    let linkTag = document.createElement("link");
    linkTag.setAttribute("rel", " stylesheet");
    linkTag.setAttribute("href", " /style.css");

    let getContent = () => document.styleSheets[document.styleSheets.length - 1]
                            .cssRules[0]
                            .styleMap.get("content");

    linkTag.onload = () => 
                console.log("Link tag injection: " + getContent());

    document.body.appendChild(linkTag);
  },

  /**
   * Receives data from an image
   * represented as an SVG XML
   */
  objectTagInjection() {
    let objectTag = document.createElement("object");
    objectTag.setAttribute("data", "/vector.svg");
    objectTag.setAttribute("width", "0");
    objectTag.setAttribute("height", "0");

    let getContent = () => 
                objectTag.contentDocument.firstChild.textContent;

    objectTag.onload = () =>  
        console.log("Object tag injection " + getContent());
    
    document.body.appendChild(objectTag);
  },

  /**
   * Just for comparision modern Fetch API
   */
  simpleFetch() {
    fetch('https://jgtbdylysi.execute-api.us-east-1.amazonaws.com/listBooks')
        .then(r => r.json())
        .then(c =>
                console.log("Fetch: " + JSON.stringify(c)));
  }
};

window.onload = () => pageObj.init();
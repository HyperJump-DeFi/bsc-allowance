// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"227na":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "a37b807814a899cbbc5c05344c7f5667";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3zc2R":[function(require,module,exports) {
var _abi = require('./abi');
var _networkSettings = require('./networkSettings');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _networkSettingsDefault = _parcelHelpers.interopDefault(_networkSettings);
const approvalHash = "0x095ea7b3";
const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
// -- Web3Modal
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal;
let provider;
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://bsc-dataseed.binance.org/',
        56: 'https://bsc-dataseed.binance.org/',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        250: 'https://rpcapi.fantom.network'
      }
    }
  }
};
const inject = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  } else {
    try {
      web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        disableInjectedProvider: false
      });
      provider = await web3Modal.connect();
      window.web3 = new Web3(provider);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
  return false;
};
async function onChainChange(chainId) {
  $("#results").children().not(':first').remove();
  await inject();
  await onReady();
}
function initialise() {
  (async () => {
    const injected = await inject();
    if (!injected) {
      alert("web3 object not found");
      return;
    }
    if (window.web3.currentProvider) {
      window.web3.currentProvider.on("chainChanged", async chainId => {
        await onChainChange(chainId);
      });
    }
    onReady();
  })();
}
async function onReady() {
  const web3 = window.web3;
  const chainId = await web3.eth.getChainId();
  let settings = _networkSettingsDefault.default[chainId];
  if (!settings) {
    alert(`Error: chain ID ${chainId} is not supported`);
    return;
  }
  try {
    await web3.eth.currentProvider.request({
      method: 'wallet_addEthereumChain',
      params: [settings]
    });
  } catch (e) {
    alert(`Cannot connect to network: ${e.message}`);
    return;
  }
  document.querySelector("#connect-btn").style.display = "none";
  web3.eth.requestAccounts().then(accounts => {
    init(accounts[0]);
    document.querySelector("#disconnect-btn").style.display = "block";
  }).catch(err => {
    console.log(err);
    // some web3 objects don't have requestAccounts
    if (!window.ethereum) {
      return;
    }
    window.ethereum.enable().then(accounts => {
      init(accounts[0]);
      document.querySelector("#disconnect-btn").style.display = "block";
    }).catch(err => {
      alert(e + err);
    });
  });
  function init(account) {
    web3.eth.getChainId().then(chainId => {
      return chainId;
    }).then(chainId => {
      let query = getQuery(chainId, account);
      if (query === "") {
        alert(`No allowances found in chain(${chainId}) for ${account}`);
      } else {
        getApproveTransactions(query, txs => {
          // display the logic
          // console.log(txs);
          buildResults(chainId, txs, account);
        });
      }
    }).catch(err => {
      throw err;
    });
  }
  function getQuery(chainId, address) {
    const apiAddress = chainId === 250 ? 'ftmscan.com' : 'bscscan.com';
    return `https://api.${apiAddress}/api?module=account&action=txlist&address=${address}`;
  }
  function getExplorerPage(chainId) {
    return `${settings.blockExplorerUrls[0]}address/`;
  }
  function getApproveTransactions(query, cb) {
    fetch(query).then(data => data.text()).then(text => {
      let approveTransactions = [];
      let dataObj = JSON.parse(text).result;
      for (let tx of dataObj) {
        if (tx.input && tx.input.includes(approvalHash)) {
          let approveObj = {};
          approveObj.contract = web3.utils.toChecksumAddress(tx.to);
          approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
          const contract = new web3.eth.Contract(_abi.ERC20_ABI, approveObj.contract);
          contract.methods.symbol().call().then(symbol => {
            $("#results").find(`#${approveObj.contract} .grid-symbol`).html(`<span>${symbol}</span>`);
          });
          let allowance = tx.input.substring(74);
          if (allowance.includes(unlimitedAllowance)) {
            approveObj.allowance = "unlimited";
          } else {
            approveObj.allowance = "limited";
          }
          if (parseInt(allowance, 16) !== 0) {
            approveTransactions.push(approveObj);
          } else {
            // TODO clean up
            // Remove all previous additions of this approval transaction as it is now cleared up
            approveTransactions = approveTransactions.filter(val => {
              return !(val.approved === approveObj.approved && val.contract === val.contract);
            });
          }
        }
      }
      cb(approveTransactions);
    });
  }
  function buildResults(chainId, txs, account) {
    let explorerURL = getExplorerPage(chainId);
    let parentElement = $('#results');
    for (let index in txs) {
      parentElement.append(`
        <div class="grid-container" id="${txs[index].contract}">
        <div class="grid-symbol"></div>
        <div class="grid-address"><a href=${explorerURL + txs[index].contract} target="_blank" rel="noopener noreferrer">${txs[index].contract}</a></div>
        <div class="grid-address"><a href=${explorerURL + txs[index].approved} target="_blank" rel="noopener noreferrer">${txs[index].approved}</a></div>
        <div class="grid-action"><span class="${txs[index].allowance}">${txs[index].allowance}</span><button class="${txs[index].allowance}" id="revoke${index}"> Revoke</button></div>
        </div>
        `);
      setRevokeButtonClick(txs[index], "#revoke" + index, account);
    }
  }
  function setRevokeButtonClick(tx, id, account) {
    $(id).click(() => {
      let contract = new web3.eth.Contract(_abi.approvalABI, tx.contract);
      contract.methods.approve(tx.approved, 0).send({
        from: account
      }).then(receipt => {
        console.log("revoked: " + JSON.stringify(receipt));
        $(id).parents('.grid-container').remove();
      }).catch(err => {
        console.log("failed: " + JSON.stringify(err));
      });
    });
  }
  function onRevokeAll() {
    $('.grid-action button').trigger('click');
  }
  function onRevoke10() {
    const $btns = $('.grid-action button');
    $btns.slice(0, Math.min(10, $btns.length)).trigger('click');
  }
  $('.revoke-10-btn').click(onRevoke10);
  $('.revoke-all-btn').click(onRevokeAll);
  $("#disconnect-btn").click(handleDisconnection);
}
$("#connect-btn").click(async () => {
  await handleConnection();
});
async function handleDisconnection() {
  await disconnect();
  $("#results").children().not(':first').remove();
  document.querySelector("#connect-btn").style.display = "block";
  document.querySelector("#disconnect-btn").style.display = "none";
}
async function handleConnection() {
  await inject();
  await onReady();
}
async function disconnect() {
  const foundProvider = provider || window.web3.currentProvider;
  if (!foundProvider) {
    console.log("No provider found");
    return;
  }
  if (foundProvider.close) {
    console.log("Killing the wallet connection", foundProvider);
    await foundProvider.close();
    await web3Modal.clearCachedProvider();
  }
  provider = null;
  window.web3.currentProvider = null;
}
$(initialise);

},{"./abi":"7fwKW","./networkSettings":"1ozhu","@parcel/transformer-js/lib/esmodule-helpers.js":"5J4vU"}],"7fwKW":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "ERC20_ABI", function () {
  return ERC20_ABI;
});
_parcelHelpers.export(exports, "approvalABI", function () {
  return approvalABI;
});
const ERC20_ABI = [{
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [{
    "name": "",
    "type": "uint8"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "balance",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "type": "function"
}];
const approvalABI = [{
  "constant": false,
  "inputs": [{
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "tokens",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "internalType": "bool",
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5J4vU"}],"5J4vU":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"1ozhu":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
exports.default = {
  1: {
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/']
  },
  56: {
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/']
  },
  97: {
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/']
  },
  250: {
    chainId: '0xFA',
    chainName: 'FANTOM Mainnet',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com/']
  }
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5J4vU"}]},["227na","3zc2R"], "3zc2R", "parcelRequirea877")


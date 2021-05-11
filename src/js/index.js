import { ERC20_ABI, approvalABI } from './abi';
import networkSettings from './networkSettings';

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
      },
    },
  },
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
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
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
      window.web3.currentProvider.on("chainChanged", async (chainId) => {
        await onChainChange(chainId);
      });
    }
    onReady();
  })();
}

async function onReady() {
  const web3 = window.web3;
  const chainId = await web3.eth.getChainId();
  let settings = networkSettings[chainId];
  if (!settings) {
    alert(`Error: chain ID ${chainId} is not supported`);
    return;
  }
  try {
    await web3.eth.currentProvider
      .request({
        method: 'wallet_addEthereumChain',
        params: [settings]
      });
  } catch (e) {
    alert(`Cannot connect to network: ${e.message}`);
    return;
  }

  document.querySelector("#connect-btn").style.display = "none";
  web3.eth.requestAccounts().then((accounts) => {
    init(accounts[0]);
    document.querySelector("#disconnect-btn").style.display = "block";
  }).catch((err) => {
    console.log(err);
    // some web3 objects don't have requestAccounts
    if (!window.ethereum) {
      return;
    }
    window.ethereum.enable().then((accounts) => {
      init(accounts[0]);
      document.querySelector("#disconnect-btn").style.display = "block";
    }).catch((err) => {
      alert(e + err);
    });
  });

  function init(account) {
    web3.eth.getChainId().then((chainId) => {
      return chainId;

    }).then((chainId) => {
      let query = getQuery(chainId, account);
      if(query === "") {
        alert(`No allowances found in chain(${chainId}) for ${account}`);

      } else {
        getApproveTransactions(query, (txs) => {
          // display the logic
          // console.log(txs);
          buildResults(chainId, txs, account);
        });
      }
    }).catch((err) => {
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
    fetch(query)
      .then(data => data.text())
      .then(text => {
        let approveTransactions = [];
        let dataObj = JSON.parse(text).result;

        for(let tx of dataObj) {

          if(tx.input && tx.input.includes(approvalHash)) {
            let approveObj = {};
            approveObj.contract = web3.utils.toChecksumAddress(tx.to);
            approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));

            const contract = new web3.eth.Contract(ERC20_ABI, approveObj.contract);
            contract.methods.symbol().call().then(symbol => {
              $("#results").find(`#${approveObj.contract} .grid-symbol`).html(`<span>${symbol}</span>`);
            });

            let allowance = tx.input.substring(74);
            if(allowance.includes(unlimitedAllowance)) {
              approveObj.allowance = "unlimited";
            } else {
              approveObj.allowance = "limited";
            }

            if(parseInt(allowance, 16) !== 0) {
              approveTransactions.push(approveObj);
            } else {
              // TODO clean up
              // Remove all previous additions of this approval transaction as it is now cleared up
              approveTransactions = approveTransactions.filter((val) => {
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
    for(let index in txs) {
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
      let contract = new web3.eth.Contract(approvalABI, tx.contract);
      contract.methods.approve(tx.approved, 0).send({ from: account }).then((receipt) => {
        console.log("revoked: " + JSON.stringify(receipt));
        $(id).parents('.grid-container').remove();
      }).catch((err) => {
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

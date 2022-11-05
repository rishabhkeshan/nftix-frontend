import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";
import base64url from "base64url";
import Axios from "axios";
import sha1 from "js-sha1";
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

const tmSig = require("@tendermint/sig");
const bip39 = require("bip39");
const bip32 = require("bip32");

const prefix = "mantle";
const denom = "umntl";
const gas = 400000;

const Hash = (meta) => {
  console.log("hashing", meta);
  const hash = sha1.array(meta);
  return base64url.encode(hash) + "=";
};

const routes = {
  nubRequest: "https://rest.devnet.assetmantle.one/xprt/identities/nub",
  faucet: "https://faucet.devnet.assetmantle.one/faucet",
  tx: "https://rest.devnet.assetmantle.one/txs",
};

const sendPostRequest = async (url, payload) => {
  const resp = await Axios.post(url, payload);
  return resp.data;
};

const sendGetRequest = async (url) => {
  const resp = await Axios.get(url);
  return resp.data;
};

async function getAccount(address) {
  let result = {};
  result.success = false;
  result.account = {};
  try {
    let response = await fetch(
      "https://rest.devnet.assetmantle.one" + "/auth/accounts/" + address
    );
    let json = await response.json();
    result.success = true;
    result.account = json;
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
}

const generateNubRequest = (walletId, nubId) => {
  return {
    type: "/xprt/identities/nub/request",
    value: {
      baseReq: {
        from: walletId,
        chain_id: "devnet-mantle-1",
        memo: "",
        fees: [
          {
            amount: "0",
            denom: "umntl",
          },
        ],
        gas: "200000",
      },
      nubID: nubId,
    },
  };
};

const generateTransactMoneyTemplate = (fromAddress, toAddress, amount) => {
  const tx = {
    msg: [
      {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: fromAddress,
          to_address: toAddress,
          amount: [
            {
              amount: String(amount),
              denom: denom,
            },
          ],
        },
      },
    ],
    fee: {
      amount: [{ amount: String(amount), denom: denom }],
      gas: String(gas),
    },
    memo: "",
  };
  return tx;
};


function getWalletPath() {
  return "m/44'/118'/0'/0/0";
}

function getWallet(mnemonic, bip39Passphrase = "") {
  const seed = bip39.mnemonicToSeedSync(mnemonic, bip39Passphrase);
  const masterKey = bip32.fromSeed(seed);
  const walletPath = getWalletPath();
  return tmSig.createWalletFromMasterKey(masterKey, prefix, walletPath);
}

class AssetMantleFunctions {
  walletId;
  wallet;

  async walletFromWords(mnemonic) {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
      mnemonic,
      { prefix: "mantle" },
      stringToPath("m/44'/118'/0'/0/0")
    );
    const account = await wallet.getAccounts();
    console.log(account[0].address);
    this.wallet = wallet;
    this.walletId = account[0].address;
  }

  async createWallet(username) {
    const wallet = await DirectSecp256k1HdWallet.generate(
      24,
      { prefix: "mantle" },
      stringToPath("m/44'/118'/0'/0/0")
    );
    console.log(wallet.mnemonic);
    const account = await wallet.getAccounts();
    console.log(account[0].address);
    this.walletId = account[0].address;
    this.wallet = wallet;
    await this.checkFaucet(this.walletId);
    this.createNubId(username);
  }

  async checkFaucet() {
    const result = await sendGetRequest(`${routes.faucet}/${this.walletId}`);
    console.log("check faucet results", result);
  }

  async mintToken() {}

  async transactMntl(toAddress, umntl) {
    const template = generateTransactMoneyTemplate(
      this.walletId,
      toAddress,
      umntl
    );
    const signedTemplated = await this.try(template);
    const response = await sendPostRequest(routes.tx, signedTemplated);
    console.log(response.data);
  }

  async createNubId(username) {
    console.log("creating nubID");
    const hashGenerate = Hash(Hash(username));
    const identityID =
      "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=" + "|" + hashGenerate;
    console.log(
      `https://rest.devnet.assetmantle.one/xprt/identities/identities/${identityID}`
    );
    const template = await sendPostRequest(
      routes.nubRequest,
      generateNubRequest(this.walletId, username)
    );
    console.log(JSON.stringify(template));
    const tx = {
      msg: template.value.msg,
      fee: template.value.fee,
      memo: template.value.memo,
    };
    const signedTemplated = await this.try(tx);
    const response = await sendPostRequest(routes.tx, signedTemplated);
    console.log(response.data);
  }

  async try(tx) {
    let accountResult = await getAccount(this.walletId);
    let accountNum = accountResult.account.result.value.account_number;
    if (accountNum === undefined) {
      accountNum = String(0);
    }
    let seq = accountResult.account.result.value.sequence;
    if (seq === undefined) {
      seq = String(0);
    }
    const signMeta = {
      account_number: accountNum,
      chain_id: "devnet-mantle-1",
      sequence: seq,
    };
    const wallet = getWallet(this.wallet.mnemonic);
    let stdTx = tmSig.signTx(tx, signMeta, wallet);
    console.log("std", stdTx);
    let broadcastReq = {
      tx: stdTx,
      mode: "sync",
    };
    return broadcastReq;
  }
}

export default AssetMantleFunctions;

import AssetMantleFunctions from "../../blockchain/assetmantle";

function TestScreen() {
  const assetMantleClass = new AssetMantleFunctions();

  const createWallet = async () => {
    console.log("creating wallet");
    await assetMantleClass.createWallet("ggwp");
  };

  const mintToken = () => {
    console.log("minting token");
  };

  const transactMntl = async () => {
    console.log("transacting mntl");
    await assetMantleClass.walletFromWords(
      ""
    );
    await assetMantleClass.transactMntl(
      "mantle1eespcw7hczhrtytcud8630pdh8x359zwhd7zhu",
      69000000
    );
  };

  return (
    <div>
      <button onClick={createWallet}>Create Wallet</button>
      <br />
      <button onClick={mintToken}>Mint Token</button>
      <br />
      <button onClick={transactMntl}>Transact Mntl</button>
      <br />
    </div>
  );
}

export default TestScreen;

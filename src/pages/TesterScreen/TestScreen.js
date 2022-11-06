import AssetMantleFunctions from "../../blockchain/assetmantle";

function TestScreen() {
  const assetMantleClass = new AssetMantleFunctions("ggwp");

  const createWallet = async () => {
    console.log("creating wallet");
    await assetMantleClass.createWallet("ggwp");
  };

  const mintToken = async () => {
    console.log("minting token");
    await assetMantleClass.walletFromWords(
      ""
    );
    const propertiesArray = [
      { propertyName: "location", propertyValue: "ggwp" },
      { propertyName: "organisationName", propertyValue: "ggwp" },
      { propertyName: "date", propertyValue: "ggwp" },
    ];
    const image =
      "https://demo-assetmantle.mypinata.cloud/ipfs/QmZuNgMqiU4iymkuj57SEjLR4GBawpH8V5gK3aR3gHDBtc/gg.png";
    const name = "ggwp";
    const desc = "ggwp";
    await assetMantleClass.mintToken(name, desc, image, propertiesArray);
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

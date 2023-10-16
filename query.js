const { ApiPromise, WsProvider } = require("@polkadot/api");
const { encodeAddress } = require("@polkadot/util-crypto");

// const { CustomRpcBalance } = require("@composable/types/interfaces/common");
// const{ ComposableTraitsCurrencyRational64, XcmV1MultiLocation } = require('@composable/types/interfaces/crowdloanRewards');
// const { Bytes, Option, Struct, u128, u32 } = require('@polkadot/types-codec');


async function main() {
  const provider = new WsProvider(
    "ws://127.0.0.1:9188"
  );
  const api = await ApiPromise.create({
    provider,
    rpc: {
      ibc: {
        queryBalanceWithAddress: {
          description: "Query balance of an address on chain",
          params: [
            {
              name: "addr",
              type: "String",
            },
            {
              name: "asset_id",
              type: "AssetId",
            },
          ],
          type: "Coin",
        },
        queryDenomTrace: {
          description:
            "Query the denom trace for an ibc denom from the asset Id",
          params: [
            {
              name: "asset_id",
              type: "AssetId",
            },
          ],
          type: "DenomTrace",
        },
      },
      assets: {
        listAssets: {
          description: "list all local and foreign assets",
          params: [
            {
              name: "at",
              type: "Hash",
              isOptional: true
            },
          ],
          type: "Vec<Asset>",
        },
      },
    },
    types: {
      Coin: {
        amount: "u128",
        denom: "String",
      },
      DenomTrace: {
        path: "String",
        base_denom: "String",
      },
      Asset: {
        name: "Vec<u8>",
        id: "u128",
        decimals: "u32",
        // ratio: "Option<Rational64>",
        // foreignId: "Option<XcmV1MultiLocation>",
        existentialDeposit: "u128",
      },
    },
  });
  // Example usage
  for (let i = 0; i < 25; i++) {
    const balance = await api.rpc.ibc.queryBalanceWithAddress(addr, Number(ids[i]));
    if (balance.denom != "") {
      console.log(`Asset balance of ${balance}: ${balance.amount}`);
    } else {
      continue;
    }
  }
  
}

main()
  .catch(console.error)
  .finally(() => process.exit());

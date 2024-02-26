# Estfor Kingdom contracts from other modules imported

### Fantom mainnet deployed contract addresses:

SamWitchVRF [0xeF5AC0489fc8ABC1085E8D1f5BEE85e74E6D2cC2](https://ftmscan.com/address/0xeF5AC0489fc8ABC1085E8D1f5BEE85e74E6D2cC2)  
SamWitchOrderBook [0x6996c519dA4ac7815bEFbd836cf0b78Aa62fdBcE](https://ftmscan.com/address/0x6996c519dA4ac7815bEFbd836cf0b78Aa62fdBcE)

Oracle is found at [0x28ade840602d0363a2ab675479f1b590b23b0490](https://ftmscan.com/address/0x28ade840602d0363a2ab675479f1b590b23b0490)

### Fantom mainnet beta deployed contract addresses:

SamWitchVRF [0x58E9fd2Fae18c861B9F564200510A88106C05756](https://ftmscan.com/address/0x58E9fd2Fae18c861B9F564200510A88106C05756)  
SamWitchOrderBook [0x082480aAAF1ac5bb0Db2c241eF8b4230Da85E191](https://ftmscan.com/address/0x082480aAAF1ac5bb0Db2c241eF8b4230Da85E191)

Oracle is found at [0x6f7911cbbd4b5a1d2bdaa817a76056e510d728e7](https://ftmscan.com/address/0x6f7911cbbd4b5a1d2bdaa817a76056e510d728e7)

Read more at:  
[samwitch-vrf](https://github.com/PaintSwap/samwitch-vrf)  
[samwitch-orderbook](https://github.com/PaintSwap/samwitch-orderbook)

To deploy the contracts:

```js
yarn deploy:vrf
yarn deploy:orderbook
```

To upgrade the contracts:

```js
yarn deployUpgrade:vrf
yarn deployUpgrade:orderbook
```

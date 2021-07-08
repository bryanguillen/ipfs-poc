const Ipfs = require('ipfs');

/**
 * @description Script that starts a local node of ipfs
 */
(async function() {
  try {
    /**
     * Note: The configuration options come from the OrbitDB tutorial
     * https://github.com/orbitdb/field-manual/blob/main/01_Tutorial/01_Basics.md
     */
    await Ipfs.create({
      preload: { enabled: false },
      repo: './ipfs',
      EXPERIMENTAL: { pubsub: true },
      config: {
        Bootstrap: [],
        Addresses: { Swarm: [] }
      }
    });
  } catch(error) {
    console.log(error);
  }
})();
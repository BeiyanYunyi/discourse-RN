import keypair, { KeypairResults } from "keypair";
import config from "../config/config";
import SecureStore from "./secureStoreWrapper";

const genKeyPair = async () => {
  return new Promise<KeypairResults>((resolve) => {
    const keyp = keypair({ bits: 1024 });
    resolve(keyp);
  });
};

const rsaKeyWrapper = {
  keyp: { public: "", private: "" },

  async init() {
    const keypInDB = await SecureStore.getItemAsync(
      `${config.applicationName}.rsaKeyPair`
    );
    if (!keypInDB) {
      const keyp = await genKeyPair();
      this.keyp = keyp;
      await SecureStore.setItemAsync(
        `${config.applicationName}.rsaKeyPair`,
        JSON.stringify(keyp)
      );
    } else {
      this.keyp = JSON.parse(keypInDB);
    }
  },
};

export default rsaKeyWrapper;

import config from "../config/config";
import SecureStore from "./secureStoreWrapper";

const apiKeyWrapper = {
  key: "",

  async changeKey(key: string) {
    this.key = key;
    await SecureStore.setItemAsync(`${config.applicationName}.apiKey`, key);
  },

  async init() {
    const keyInDB = await SecureStore.getItemAsync(
      `${config.applicationName}.apiKey`
    );
    if (!keyInDB) {
      return false;
    }
    this.key = keyInDB;
    return true;
  },
};

export default apiKeyWrapper;

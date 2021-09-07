import discourseWrapper from "./discourseWrapper";
import SecureStore from "./secureStoreWrapper";

const apiKeyWrapper = {
  key: "",

  async changeKey(key: string) {
    this.key = key;
    await SecureStore.setItemAsync(
      `${discourseWrapper.params.application_name}.apiKey`,
      key
    );
  },

  async init() {
    const keyInDB = await SecureStore.getItemAsync(
      `${discourseWrapper.params.application_name}.apiKey`
    );
    if (!keyInDB) {
      return false;
    } else {
      this.key = keyInDB;
      return true;
    }
  },
};

export default apiKeyWrapper;

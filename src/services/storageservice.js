export default class StorageService {
  constructor(key) {
    this.keyValue = key;
  }

  parseJsonObject(value) {
    try {
      const parseObj = JSON.parse(value);
      if (parseObj && typeof parseObj === 'object') {
        return parseObj;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }

  getStorageData() {
    const getData = localStorage.getItem(this.keyValue);
    const jsonObj = this.parseJsonObject(getData);
    if (jsonObj) {
      return jsonObj;
    }

    return getData;
  }

  setStorageData(value) {
    const jsonStr = JSON.stringify(value);
    localStorage.setItem(this.keyValue, jsonStr);
  }
}

// axiosモジュールを読み込む
const axiosBase = require("axios");
// axios変数をprivate変数にするための準備。Getterがないとアクセスできない(本クラス内ではGetter不要)
const axios = Symbol();

/**
 * axios base REST-Client
 *
 * @class Rest
 */
class Rest {
  /**
   * コンストラクタ
   *
   * REST通信するベースURLを渡すこと
   * @param {String} baseUrl Http通信先の基底となるURL
   */
  constructor(baseUrl) {
    // axiosBaseからHttp通信に必要な情報を設定し、作成したインスタンスを保存する
    this[axios] = axiosBase.create({
      baseURL: baseUrl, //通信先URLにコンストラクタの引数であるbaseUrlを設定
      proxy: false, // プロキシはoff
      responseType: "json", // レスポンスタイプ(Http通信時の応答時のデータ型をjsonに設定)
      timeout: 15000, // タイムアウト(応答までの時間)を15秒に設定
      // ヘッダーの設定
      headers: {
        "Access-Control-Allow-Origin": "*", // CROSをすべて許可する
      },
    });
  }

  /**
   * GETリクエスト
   * 引数にリクエスト先のパスを渡すこと
   * @param {String} url リクエスト先URL
   * @param {Object} option axiosのオプション(デフォルトはnull)
   */
  get(url, option = null) {
    return new Promise((resolve, reject) => {
      this[axios]
        .get(url, option)
        .then((response) => {
          resolve(convertResponse(response));
        })
        .catch((error) => {
          reject(convertError(error));
        });
    });
  }

  /**
   * POSTリクエスト
   * 引数にリクエスト先のパスとリクエストデータを渡すこと
   * @param {String} url リクエスト先URL
   * @param {Object} data リクエストボディ(json形式)
   * @param {Object} option axiosのオプション(デフォルトはnull)
   */
  post(url, data, option = null) {
    return new Promise((resolve, reject) => {
      this[axios]
        .post(url, data, option)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * PUTリクエスト
   * 引数にリクエスト先のパスとリクエストデータを渡すこと
   * @param {String} url リクエスト先URL
   * @param {Object} data リクエストボディ(json形式)
   * @param {Object} option axiosのオプション(デフォルトはnull)
   */
  put(url, data, option = null) {
    return new Promise((resolve, reject) => {
      this[axios]
        .put(url, data, option)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * DELETEリクエスト
   * 引数にリクエスト先のパスを渡すこと
   * @param {String} url リクエスト先URL
   * @param {Object} option axiosのオプション(デフォルトはnull)
   */
  delete(url, option = null) {
    return new Promise((resolve, reject) => {
      this[axios]
        .delete(url, option)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

/**
 * axiosのResponseオブジェを独自オブジェに変換し返却する
 *
 * @param {*} response axios Responseオブジェクト
 * @returns {Object} 変換したResponseオブジェクト
 */
function convertResponse(response) {
  return {
    data:
      response.data.results === undefined
        ? response.data
        : response.data.results,
    status: response.statusText === "OK" ? true : false,
    code: response.status,
    headers: response.headers,
  };
}

/**
 * axiosのErrorオブジェを独自オブジェに変換し返却する
 *
 * @param {*} error axios Errorオブジェクト
 * @returns {Object} 変換したResponseオブジェクト
 */
function convertError(error) {
  return {
    data: error.data,
    status: false,
    code: error.response.status,
    headers: error.response.headers,
  };
}

module.exports = Rest;

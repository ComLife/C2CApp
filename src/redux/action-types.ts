// auth
export const LOGIN = 'LOGIN';
export const LOGIN_SAFE = 'LOGIN_SAFE';
export const REMOVE_LOGIN_SAFE_CODE = 'REMOVE_LOGIN_SAFE_CODE';
export const REMOVE_LOGIN_CODE = 'REMOVE_LOGIN_CODE';
export const REGISTER_CODE = 'REGISTER_CODE';
export const REMOVE_MESS_CODE = 'REMOVE_MESS_CODE';
export const REMOVE_MESS_DATA = 'REMOVE_MESS_CODE';
export const REGISTER_RESET = 'REGISTER_RESET';
export const REMOVE_PASS_CODE = 'REMOVE_MESS_CODE';

export const REMOVE_FORGOT_MESS_CODE = 'REMOVE_MESS_CODE';
export const REMOVE_FORGOT_COMFIRE_CODE = 'REMOVE_FORGOT_COMFIRE_CODE';

export const LOGINPWD_CODE = 'LOGINPWD_CODE';
export const LOGINPWD_RESET = 'LOGINPWD_RESET';
// 重置资金密码
export const TRADEPWD_CODE = 'TRADEPWD_CODE';
export const REMOVE_TRADEPWD_CODE = 'REMOVE_TRADEPWD_CODE';
export const TRADEPWD_RESET = 'TRADEPWD_RESET';
export const REMOVE_TRADEPWD_RESET = 'REMOVE_TRADEPWD_RESET';

export const RTRADEPWD_PWDINIT = 'RTRADEPWD_PWDINIT';
export const REMOVE_RTRADEPWD_PWDINIT = 'REMOVE_RTRADEPWD_PWDINIT';

export const GOOGLE_SECTET_KEY = 'GOOGLE_SECTET_KEY';
export const REMOVE_GOOGLE_SECTET_KEY_CODE = 'REMOVE_GOOGLE_SECTET_KEY_CODE';

export const GOOGLE_CODE_KEY = 'GOOGLE_CODE_KEY';
export const REMOVE_GOOGLE_MESS_CODE = 'REMOVE_GOOGLE_MESS_CODE';

export const GOOGLE_ISOPEN = 'GOOGLE_ISOPEN';
export const GOOGLE_AUTH_DATA = 'GOOGLE_AUTH_DATA';
export const REMOVE_GOOGLE_AUTH_DATA = 'REMOVE_GOOGLE_AUTH_DATA';

export const CLOSE_GOOGLE_AUTH = 'CLOSE_GOOGLE_AUTH';
export const REMOVE_CLOSE_GOOGLE_AUTH = 'REMOVE_CLOSE_GOOGLE_AUTH';

export const REMOVE_REGISTER = 'REMOVE_REGISTER';
export const LOGOUT = 'LOGOUT';
export const AUTH_API = 'AUTH_API';
export const REMOVE_AUTH_API = 'REMOVE_AUTH_API';
export const AUTH = 'AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';
export const AUTHONOFF = 'AUTHONOFF';
export const AUTHEN_QUETA = 'AUTHEN_QUETA';
export const UPLOAD_IMG_AUTH = 'UPLOAD_IMG_AUTH';
export const REMOVE_UPLOAD_IMG_AUTH = 'REMOVE_UPLOAD_IMG_AUTH';
export const UPLOAD_FACE_AUTH = 'UPLOAD_FACE_AUTH';
export const REMOVE_UPLOAD_FACE_AUTH = 'REMOVE_UPLOAD_FACE_AUTH';
export const UPLOAD_SAVE_AUTH = 'UPLOAD_SAVE_AUTH';
export const REMOVE_UPLOAD_SAVE_AUTH = 'REMOVE_UPLOAD_SAVE_AUTH';

export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_INSTALLED = 'CHANGE_INSTALLED';

// websocket msgType
export const MARKET_LIST_INFO = 'market_list_info';
export const MARKET_INFO = 'market_info';
export const ORDERBOOK = 'orderbook'; // 最频繁
export const TURNOVERRECORD = 'turnoverrecord'; // 初始化一次
export const TURNOVERRECORD_ADD = 'turnoverrecord_add'; // 每次有成交刷新，比较频繁
export const PAYMENT_CURRENCYS = 'payment_currencys';
export const KLINE_PUSH = 'kline_push';
export const USER_ENTRUST_ORDERS = 'user_entrust_orders';
export const USER_ENTRUST_ORDERS_REMOVE = 'user_entrust_orders_remove'; // 清除当前委托
export const USER_AVAILABLEFUNDS = 'user_availablefunds';
export const COLLECTION_LIST = 'collection_list'; // 自选交易对
export const CREATE_ENTRUST_ORDER_REPLY = 'create_entrust_order_reply'; // 委托下单返回
export const REVOKE_ENTRUST_ORDER_REPLY = 'revoke_entrust_order_reply'; // 撤单返回
export const RECEIVE_REVOKE_ENTRUST_ORDER_REPLY = 'receive_revoke_entrust_order_reply'; // 消除撤单
export const BBS_INCREASETOP_R = 'bbs_increasetop_r'; // 涨幅榜信息
export const BBS_COLLECTION_LIST = 'collection_list'; // 自选交易对

// websocket msgType

// movies
export const GET_MOVIES = 'GET_MOVIES';
export const REMOVE_MOVIES = 'REMOVE_MOVIES';

// base
export const GET_COMPARE_VERSION = 'GET_COMPARE_VERSION';
export const REMOVE_COMPARE_VERSION = 'REMOVE_COMPARE_VERSION';
export const GET_EMERGENT_NOTICE = 'GET_EMERGENT_NOTICE';
export const REMOVE_EMERGENT_NOTICE = 'REMOVE_EMERGENT_NOTICE';
export const GETTOKEN = 'GETTOKEN';

// wallet
export const GET_WALLET_TYPE = 'GET_WALLET_TYPE';
export const REMOVE_WALLET_TYPE = 'REMOVE_WALLET_TYPE';

export const GET_VIEW_WALLET = 'GET_VIEW_WALLET';
export const GET_VIEW_WALLET_REMOVE = 'GET_VIEW_WALLET_REMOVE';

export const GET_WALLET_TRANSFER = 'GET_WALLET_TRANSFER';
export const REMOVE_WALLET_TRANSFER = 'REMOVE_WALLET_TRANSFER';

export const GET_WALLET_CLOUDASSETS = 'GET_WALLET_CLOUDASSETS';
export const GET_WALLET_CLOUDASSETS_REMOVE = 'GET_WALLET_CLOUDASSETS_REMOVE';

export const GET_CLOUD_WALLET_TYPE = 'GET_CLOUD_WALLET_TYPE';
export const GET_CLOUD_WALLET_TYPE_REMOVE = 'GET_CLOUD_WALLET_TYPE_REMOVE';

export const GET_ALL_CLOUD_WALLET_TYPE = 'GET_ALL_CLOUD_WALLET_TYPE';
export const GET_ALL_CLOUD_WALLET_TYPE_REMOVE = 'GET_ALL_CLOUD_WALLET_TYPE_REMOVE';

export const GET_CLOUD_WALLET_CASH = 'GET_CLOUD_WALLET_CASH'; // 提现
export const REMOVE_CLOUD_WALLET_CASH = 'REMOVE_CLOUD_WALLET_CASH'; // 移除提现
export const GET_CLOUD_WALLET_CARRY = 'GET_CLOUD_WALLET_CARRY'; // 转账
export const REMOVE_CLOUD_WALLET_CARRY = 'REMOVE_CLOUD_WALLET_CARRY'; // 移除提现
export const RECHARGE_CURENCY = 'RECHARGE_CURENCY';
export const RECEIVEADDRESS = 'RECEIVEADDRESS';
export const REMOVE_RECEIVEADDRESS = 'REMOVE_RECEIVEADDRESS';
export const CHECK_BB_LOG = 'CHECK_BB_LOG'; // bb日志列表
export const REMOVE_CHECK_BB_LOG = 'REMOVE_CHECK_BB_LOG'; // bb日志列表
export const CHECK_RULE_LOG = 'CHECK_RULE_LOG'; // 法币日志列表
export const REMOVE_CHECK_RULE_LOG = 'REMOVE_CHECK_RULE_LOG'; // 法币日志列表

// collection 币币自选交易对
export const ADD_COLLECTION = 'ADD_COLLECTION';
export const DELETE_COLLECTION = 'DELETE_COLLECTION';
export const REMOVE_COLLECTION = 'REMOVE_COLLECTION';
export const REMOVE_CALLBACK_COLLECTION = 'REMOVE_CALLBACK_COLLECTION';
export const LOCAL_COLLECTION = 'LOCAL_COLLECTION'; // 本地收藏的自选交易对
export const ASS_LOCAL_COLLECTION = 'ASS_LOCAL_COLLECTION'; // 交易对copy
export const ASS_DELETE_COLLECTION = 'ASS_DELETE_COLLECTION';
export const ASS_REMOVE_COLLECTION = 'ASS_REMOVE_COLLECTION';
export const GET_SEARCH_WALLET_TYPE = 'GET_SEARCH_WALLET_TYPE'; // 自选交易对联想输入查询
export const REMOVE_SEARCH_WALLET_TYPE = 'REMOVE_SEARCH_WALLET_TYPE';

// kline history
export const GET_KLINE_HISTORY = 'GET_KLINE_HISTORY';
export const REMOVE_KLINE_HISTORY = 'REMOVE_KLINE_HISTORY';

// banner_list
export const GET_BANNER_LIST = 'GET_BANNER_LIST';
export const REMOVE_BANNER_LIST = 'REMOVE_BANNER_LIST';

export const NETWORK_ERROR = '服务器错误，请稍后重试';

//login-mode
export const GESTURE_LOGIN = 'GESTURE_LOGIN';
export const TOUCH_LOGIN = 'TOUCH_LOGIN';

// entrust 交易记录
export const ENTRUST_HISTORY = 'ENTRUST_HISTORY';
export const MORE_ENTRUST_HISTORY = 'ENTRUST_HISTORY';
export const ENTRUST_DEAL = 'ENTRUST_DEAL';
export const MORE_ENTRUST_DEAL = 'ENTRUST_DEAL';
export const ENTRUST_DETAIL = 'ENTRUST_DETAIL';

export const BASE_AUTHS = 'BASE_AUTHS';
export const REMOVE_BASE_AUTHS = 'REMOVE_BASE_AUTHS';
export const CHECKTRADEPWD = 'CHECKTRADEPWD';

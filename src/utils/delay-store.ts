class DelayStore {
  public static klinePushData: Record<string, any>;

  // cache内容
  public static chacheData = {
    orderBook: {
      data: [],
      interval: 300,
      waitTime: 0,
    },
    marketInfo: {
      data: [],
      interval: 500,
      waitTime: 0,
    },
    marketListInfo: {
      data: [],
      interval: 500,
      waitTime: 0,
    },
    bbsIncreasetopR: {
      data: [],
      interval: 300,
      waitTime: 0,
    },
    turnoverrecordAdd: {
      data: [],
      interval: 300,
      waitTime: 0,
      isArray: true,
    },
  };
}

export default DelayStore;

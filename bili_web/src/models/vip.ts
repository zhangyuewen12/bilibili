import {queryVipInfo} from '@/services/bilibili/userinfo'
import {Effect,Reducer} from 'react';

export type Entity = {
  id: number,
  is_vip: string,
  is_year_vip: string,
  count_n: number,
}

export type Entities = {
  info: Entity[],
}

export type ModelType = {
  namespace: string,
  state: Entities,
  effects: {
    getInfo: Effect;
  };
  reducers: {
    saveValue: Reducer<Entities>;
  };
}
const VipModel: ModelType = {
  namespace: "VipModel",
  state: {
    info: []
  },
  effects: {
    *getInfo(_, {call, put}) {
      const res = yield call(queryVipInfo)
      console.log(typeof res)
      yield put({
        type: 'saveValue',
        payload: res
      })
    }
  },
  reducers: {
    saveValue(state, {payload}) {
      console.log(payload.datas)
      return {
        info: payload.datas
      };
    }
  }
}

export default VipModel;

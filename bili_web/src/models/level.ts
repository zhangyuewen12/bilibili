import {queryLevelInfo} from '@/services/bilibili/userinfo'
import {Effect,Reducer} from 'react';

export type Entity = {
  id: number,
  levelKind: string,
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
const LevelModel: ModelType = {
  namespace: "LevelModel",
  state: {
    info: []
  },
  effects: {
    *getInfo(_, {call, put}) {
      const res = yield call(queryLevelInfo)
      console.log(typeof res)
      yield put({
        type: 'saveValue',
        payload: res
      })
    }
  },
  reducers: {
    saveValue(state, {payload}) {
      console.log(payload)
      return {
        info: payload.datas
      };
    }
  }
}

export default LevelModel;

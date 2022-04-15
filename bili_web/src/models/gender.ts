import {queryGenderInfo} from '@/services/bilibili/userinfo'
import {Effect,Reducer} from 'react';

export type GenderInfoEntity = {
  id: number,
  genderKind: string,
  count_n: number,
}

export type GenderInfoStateType = {
  info: GenderInfoEntity[],
}

export type ModelType = {
  namespace: string,
  state: GenderInfoStateType,
  effects: {
    getInfo: Effect;
  };
  reducers: {
    saveValue: Reducer<GenderInfoStateType>;
  };
}
const GenderModel: ModelType = {
  namespace: "GenderModel",
  state: {
    info: []
  },
  effects: {
    *getInfo(_, {call, put}) {
      const res = yield call(queryGenderInfo)
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

export default GenderModel;

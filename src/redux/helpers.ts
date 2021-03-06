import { Action } from "redux";
import { EntityStateData } from "../types/entities";

export interface PayloadedAction<T, P> extends Action<T> {
    payload: P;
}

export const actionCreator = <T extends Action<T["type"]>>(type: T["type"]): () => Action<T["type"]> => {
    return () => ({
        type
    })
}

export const payloadedActionCreator = <T extends PayloadedAction<T["type"], T["payload"]>>(type: T["type"]): (payload: T["payload"]) => PayloadedAction<T["type"], T["payload"]> => {
    return (payload: T["payload"]) => ({
        type,
        payload
    })
}

export const arrayGroupBy = <T>(objectArray: any[], property: string): T => {
    return objectArray.reduce(function (acc, obj, i) {
      //let key = obj[property]
      if (!acc[i]) {
        acc[i] = {}
      }
      acc[i] = {...obj}
      return acc
    }, {})
  }


// export function payloadedActionCreator<TAction extends PayloadedAction<TAction['type'], TAction['payload']>>(
//     type: TAction['type'],
// ): (payload: TAction['payload']) => PayloadedAction<TAction['type'], TAction['payload']> {
//     return (payload: TAction['payload']) => ({
//         payload,
//         type,
//     });
// }
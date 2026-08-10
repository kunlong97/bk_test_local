import {createSlice, PayloadAction} from '@reduxjs/toolkit';


/**
 * 创建一个通用的临时 Slice 工厂函数
 * @template T 这是一个泛型，代表状态（State）的数据类型，调用时由传入的 initialState 自动推导
 * @param name Slice 的名称
 * @param initialState 初始状态
 * @param key 可选参数，用来作为名称的前缀（例如用于命名空间划分）
 */
export const createTempSlice = <T,>(name:string, initialState:T, key?:string) => {   //通过这个方法传入name和initialSate就可以创建slice
   
   // 使用 Redux Toolkit 的 createSlice 创建一个切片
   const slice = createSlice({
      name: `${key}.${name}`,
      initialState,   // 初始状态
      reducers:{

         /**
          * set 方法：用传入的最新数据直接覆盖旧的 state
          * @param _ 下划线代表旧的 state。因为我们要直接用 payload 覆盖它，用不到旧状态，所以用 _ 占位忽略
          * @param action 携带新数据的 Action，其 payload 的类型必须和初始状态 T 一致
                   */
         set: (_, action:PayloadAction<T>) => action.payload,
      }
   })

   // 返回一个精简后的对象，只暴露外部关心的 set Action 创建器和 reducer
   return {set: slice.actions.set, reducer: slice.reducer};
}
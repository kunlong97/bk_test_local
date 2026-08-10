import {configureStore, Middleware, Reducer} from '@reduxjs/toolkit';
import createReducerManager from '@/store/createReducerManager';


export interface IReducers{   //定义一个接口，用来约束传入的 reducers 参数的结构
   [key:string] : Reducer
}


// * 核心配置函数：用于创建并配置增强版的 Redux Store
// * @param reducers 初始传入的静态 Reducer 集合
// * @param middleware 传入的中间件数组（如日志、异步处理等）
const configStore = (reducers:IReducers, middleware:Middleware[]) => {

   // 1. 初始化 Reducer 管理器，把初始的 reducers 浅拷贝一份传进去
   const reducerManager = createReducerManager({...reducers});

   // 2. 调用 Redux Toolkit 官方的 configureStore 创建一个基础的 Store
   const internalStore = configureStore({
      reducer: reducerManager.reduce,  // 关键：将管理器的 reduce 方法作为根 Reducer 传给 Store
      middleware,  // 注入中间件
   });
   type TStore = typeof internalStore;   //typeof?运算符返回一个字符串，表示操作数的类型。 获取基础 Store 的 TypeScript 类型

   //4. 【核心类型扩展】定义一个新的接口 IStore，继承自基础 Store 的类型
   // 并明确声明：这个增强版的 Store 身上会有一个 reducerManager 属性
   // ReturnType<typeof createReducerManager> 意思是“createReducerManager 函数返回的对象类型”
   interface IStore extends TStore {
       reducerManager: ReturnType<typeof createReducerManager>;   //ReturnType?是TS中的一个内置的条件类型，用于提取函数的返回值类型
   }

   // 5. 使用类型断言（Type Assertion），把基础的 internalStore 强转为增强版的 IStore
   // 这样 TypeScript 编译器就知道这个 store 身上允许挂载 reducerManager 了
   const store = internalStore as IStore;

   // 6. 顺理成章地把刚刚创建的管理器挂载到 store 的属性上
   store.reducerManager = reducerManager;

// 7. 返回这个“全副武装”的增强版 Store
   return store;
}

export default configStore;
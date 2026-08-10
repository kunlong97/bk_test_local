import { AxiosRequestConfig, AxiosError } from 'axios';
import AxiosInstance from '@/hooks/useRequest/axiosInstance';

import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite';

interface Response<Data> {
  code: number;
  data: Data;
  msg: string;
}

function getKey(pageIndex: number, url: string) {
  return `${url}?pageIndex=${pageIndex + 1}`;
}

/**
 * Pick<...> 是 TypeScript 的内置工具类型，它的作用是从一个庞大的对象类型中，挑选（Pick）出你需要的几个属性。
 * 这里从 SWR 官方提供的 SWRInfiniteResponse 类型中，只挑选了 5 个核心属性：
 * 这个接口又额外定义了 2 个属性data和response
 */
interface Return<Data, Error>
  extends Pick<
    SWRInfiniteResponse<Response<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  data: Data[] | undefined;
  response: Response<Data>[] | undefined;
}
function useInfiniteRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  config?: SWRInfiniteConfiguration
): Return<Data, Error> {
  const {
    data: response,   //将 data 属性的值赋值给一个新的局部变量response(对象解构赋值语法)
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<Response<Data>, AxiosError<Error>>(
    (pageIndex: number) => getKey(pageIndex, request.url!),   //这里写成箭头函数是为了拿到request.url的值(因为request.url在useInfiniteRequest函数里,getKey函数是在外面定义的,直接拿拿不到useInfiniteRequest里的值)
    (url: string) => AxiosInstance.request({ url }),
    { ...config, revalidateFirstPage: false }
  );

  return {
    data: response?.map((item) => item.data),
    response,
    mutate,
    error,
    isValidating,
    size,
    setSize,
  };
}

export default useInfiniteRequest;




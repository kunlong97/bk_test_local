import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  responseType: 'json',
};

const AxiosInstance = axios.create(axiosConfig);

AxiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    // 1. 基础校验
    if (res.status !== 200 || !res.data) {
      throw new Error('Network Error or Empty Response');
    }

    const responseData = res.data;

    
    // 如果返回的是数组，或者对象中没有 code 字段，手动包装一层
    const isMockData = Array.isArray(responseData) || responseData.code === undefined;

    if (isMockData) {
      // 手动包装成标准格式
      return {
        code: 200,
        msg: 'ok',
        data: responseData, // 把原始数组放入 data 字段
      };
    }

    // 如果是返回的是标准数据,保持原样返回
    return responseData;
  },
  (error: AxiosError) => {
    // 建议在这里统一处理错误提示
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

export default AxiosInstance;
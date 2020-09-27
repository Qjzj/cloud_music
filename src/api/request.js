/**
 * @Author QJ
 * @date 2020--22 15:19
 * @desc request.js
 */
import axiosInstance from './config'

export const getBannerRequest = () => axiosInstance.get('/banner');

export const getRecommendListRequest = () => axiosInstance.get('/personalized');

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
};

export const getRankListRequest = () => axiosInstance.get(`/toplist/detail`);

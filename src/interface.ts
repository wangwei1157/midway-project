/**
 * @description User-Service parameters
 */
import '@midwayjs/core';
import { UserContext } from './common/UserContext';

export interface IUserOptions {
  uid: number;
}
export interface WeatherInfo {
  weatherinfo: {
    city: string;
    cityid: string;
    temp: string;
    WD: string;
    WS: string;
    SD: string;
    AP: string;
    njd: string;
    WSE: string;
    time: string;
    sm: string;
    isRadar: string;
    Radar: string;
  };

}
declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}
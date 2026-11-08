import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { EcowittClient, Url } from '../src';
import mockAxios from './__mocks__/axios';
import { responseMock } from './mocks/responseMock';

describe('EcowittClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should parse soil moisture sensor data', async () => {
    // given
    const response = responseMock[Url.GET_LIVEDATA_INFO];
    mockApiResponse(response);

    const client = new EcowittClient('http://any');

    // when
    const sensors = await client.getSensors();

    // then
    expect(mockAxios.get).toHaveBeenCalledWith(Url.GET_LIVEDATA_INFO);
    expect(sensors).toHaveLength(response.ch_soil.length);
  });

  const axiosResponse = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  });

  const mockApiResponse = (data: object) => {
    jest.mocked(mockAxios.get).mockImplementationOnce(() => Promise.resolve(axiosResponse(data)));
  };
});

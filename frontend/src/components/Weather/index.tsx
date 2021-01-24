import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import Loading from '../Loading';
import { WeatherContainer, WeatherDescription, WeatherImage } from './styles';

interface IDust {
  fine: string;
  fineLevel: string;
  ultra: string;
  ultraLevel: string;
}

interface IWeather {
  temp: string;
  info?: string;
  message: string;
  image: string;
  dust: IDust;
}

const Weather = () => {
  const { data: weatherData } = useSWR<IWeather>('/weather', fetcher);

  return (
    <WeatherContainer>
      {!weatherData ? (
        <Loading />
      ) : (
        <>
          {weatherData.info ? (
            <div className="info">
              <div className="info-message">{weatherData.info}</div>
              <Link to="/profile">프로필로 이동</Link>
            </div>
          ) : (
            <>
              <WeatherImage>
                <div className={`${weatherData.image}`}></div>
              </WeatherImage>
              <WeatherDescription>
                <div className="temperature">{weatherData.temp}℃</div>
                <div className="message">{weatherData.message}</div>
                <div className="dust">
                  <div className={`${weatherData.dust.fineLevel}`}>
                    미세먼지 {weatherData.dust.fine.split('㎍/㎥')[0]}㎍/㎥{' '}
                    {weatherData.dust.fine.split('㎍/㎥')[1]}
                  </div>
                  <div className={`${weatherData.dust.ultraLevel}`}>
                    초미세먼지 {weatherData.dust.ultra.split('㎍/㎥')[0]}㎍/㎥{' '}
                    {weatherData.dust.ultra.split('㎍/㎥')[1]}
                  </div>
                </div>
              </WeatherDescription>
              <div className="sources">출처: 네이버 날씨</div>
            </>
          )}
        </>
      )}
    </WeatherContainer>
  );
};

export default Weather;

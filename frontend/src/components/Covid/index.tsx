import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { ICovid } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import Loading from '../Loading';
import { Container } from './styles';

export interface ICovidStatus {
  wholeCountryStatus: ICovid;
  cityStatus?: ICovid;
}

const Covid = () => {
  const { data: covidData, error } = useSWR<ICovidStatus>('/covid', fetcher);

  return (
    <Container>
      {!covidData ? (
        <Loading />
      ) : (
        <>
          <div className="title">코로나 확진자 수</div>
          <div className="country-status">
            <div className="country">전국 확진자 수</div>
            <div className="total-cases">
              {covidData.wholeCountryStatus.totalCases}명
              <span className="increased-cases">
                {covidData.wholeCountryStatus.increasedCases}
              </span>
            </div>
          </div>
          <div className="city-status">
            {!covidData.cityStatus ? (
              <div className="info">
                <span className="info-message">
                  지역 확진자 정보를 가져오기 위한 설정을 먼저 해주세요
                </span>
                <Link to="/profile">프로필로 이동</Link>
              </div>
            ) : (
              <div className="city-container">
                <div className="city">{covidData.cityStatus.city}</div>
                <div className="total-cases">
                  {covidData.cityStatus.totalCases}명
                  <span className="increased-cases">
                    {covidData.cityStatus.increasedCases}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="update-time">{covidData.wholeCountryStatus.date} 기준</div>
          <div className="sources">출처: http://ncov.mohw.go.kr/</div>
        </>
      )}
    </Container>
  );
};

export default Covid;

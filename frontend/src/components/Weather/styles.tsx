import styled from 'styled-components';

export const WeatherContainer = styled.div`
  min-width: 350px;
  max-width: 720px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 3%;
  margin-bottom: 1rem;

  & .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    & .info-message {
      width: 60%;
      text-align: center;
      font-weight: bold;
      margin-bottom: .5rem;
      letter-spacing: .6px;
      line-height: 1.5rem;
    }

    & a {
      color: #03c75a;
    }
    
    @media ${(props) => props.theme.tablet} {
      width: 100%;
    }
  }

  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    width: 55%;
    height: 30vh;
  }

  @media ${(props) => props.theme.desktop} {
    width: 60%;
  }
`;

export const WeatherImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;

  .ico_state {
    width: 150px;
    height: 150px;
    margin-top: 1.5rem;

    @media ${(props) => props.theme.tablet} {
      width: 80%;
      height: 80%;
      margin-top: 0;
    }
  }

  & .ico_state.ws1 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_01.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws2 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_02.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws3 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_03.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws4 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_04.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws5 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_05.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws6 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_06.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws7 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_07.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws8 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_08.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws9 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_09.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws10 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_10.svg')
      no-repeat;
    background-size: contain;
  }

  & .ico_state.ws11 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_11.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws12 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_12.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws13 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_13.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws14 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_14.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws15 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_15.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws16 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_16.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws17 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_17.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws18 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_18.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws19 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_19.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws20 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_20.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws21 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_21.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws22 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_22.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws23 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_23.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws24 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_24.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws25 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_25.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws26 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_26.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws27 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_27.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws28 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_28.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws29 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_29.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws30 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_30.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws31 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_31.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws32 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_32.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws33 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_33.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws34 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_34.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws35 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_35.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws36 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_36.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws37 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_37.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws38 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_38.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws39 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_39.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws40 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_40.svg')
      no-repeat;
    background-size: contain;
  }
  & .ico_state.ws41 {
    background: url('https://ssl.pstatic.net/sstatic/keypage/outside/scui/weather_new/img/weather_svg/icon_wt_41.svg')
      no-repeat;
    background-size: contain;
  }

  @media ${(props) => props.theme.tablet} {
    width: 50%;
    height: 100%;
  }
`;

export const WeatherDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  position: relative;

  & .temperature {
    font-size: 1.3rem;
    font-weight: bold;
  }

  & .message {
    margin-bottom: 0.7rem;
    padding-top: 0.5rem;
    color: gray;

    @media ${(props) => props.theme.tablet} {
      margin-bottom: 1rem;
    }
  }

  & .dust {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #8f8f8f;
    margin: 0 auto;

    & div {
      text-align: center;
    }

    & div:first-child {
      margin-bottom: 0.3rem;
    }

    & .lv1 {
      color: #32a1ff;
    }

    & .lv2 {
      color: #03c75a;
    }

    & .lv3 {
      color: #fd9b5a;
    }

    & .lv4 {
      color: #ff5959;
    }
  }

  & .sources {
    width: 100%;
    & span {
      position: absolute;
      right: 8px;
      bottom: 5px;
      font-size: 0.8rem;
      color: #949494;
    }

    @media ${(props) => props.theme.tablet} {
      bottom: -4.5rem;
    }
  }

  @media ${(props) => props.theme.tablet} {
    width: 50%;
    height: 100%;
  }
`;

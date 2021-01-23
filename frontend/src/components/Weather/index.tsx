import React from 'react'
import { WeatherContainer, WeatherDescription, WeatherImage } from './styles'

const Weather = () => {
  return (
    <WeatherContainer>
      <WeatherImage>
        Weather Image
      </WeatherImage>
      <WeatherDescription>
        Weather description
      </WeatherDescription>
    </WeatherContainer>
  )
}

export default Weather

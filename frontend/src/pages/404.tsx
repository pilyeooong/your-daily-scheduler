import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div>존재하지 않는 페이지 혹은 접근 할 수 없습니다</div>
      <Link to="/">메인화면으로 돌아가기</Link>
    </div>
  )
}

export default NotFound

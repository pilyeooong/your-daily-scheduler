const size = {
  mobile: '335px',
  mobileEnd: '757px',
  tablet: '758px',
  desktop: '1024px',
}

const theme = {
  mobile: `(min-width: ${size.mobile}) and (max-width: ${size.mobileEnd})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
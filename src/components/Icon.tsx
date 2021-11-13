import React from 'react';
import '../styles/Icon.css'

type IconProps = {
  src: string
}

const Icon = ({src}: IconProps): JSX.Element => {
  return (
    <div className='icon'>
      <img src={process.env.PUBLIC_URL + src} alt="icon"/>
    </div>
  );
};

export default Icon;
import React from 'react';
import Monster from '../../assets/monster.png';
import Image from 'material-ui-image';

const imageStyles = {
  position: 'relative',
  transform: 'translateX(50%) translateY(-50%)',
  width: '50%',
  heigth: '50%',
};
const LandingPage = () => {
  return <Image className='root' imageStyle={imageStyles} aspectRatio={3} src={Monster} />;
};

export default LandingPage;

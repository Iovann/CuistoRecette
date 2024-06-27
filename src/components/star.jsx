import React from 'react';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const Star = ({ count }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(count)) {
      stars.push(<IoIosStar key={i} className='px-1' color='#B55D51' size={30} />);
    } else if (i === Math.floor(count) && count % 1 !== 0) {
      stars.push(<IoIosStarHalf key={i} className='px-1' color='#B55D51' size={30} />);
    } else {
      stars.push(<IoIosStarOutline key={i} className='px-1' color='#B55D51' size={30} />);
    }
  }

  return (
    <div className="">
      {stars}
    </div>
  );
};

export default Star;
import React from 'react';
import TopBar from '@/shared/ui/top-bar/top-bar.tsx';
import { Heart, ShoppingCart, User } from 'react-feather';

const HeaderWidget = () => {
  return (
    <div className={'w-full flex flex-col items-center justify-center'}>
      <TopBar />

      <div
        className={
          'w-full flex items-center justify-center border-b-1 border-gray-200'
        }
      >
        <div
          className={
            'py-6 2xl:px-0 px-4 max-w-(--layout-area) w-full flex items-center justify-between'
          }
        >
          <h2 className={'text-2xl font-bold'}>voidly</h2>

          <div></div>

          <div className={'flex items-center gap-4'}>
            <ShoppingCart
              size={28}
              className={'text-gray-700 cursor-pointer'}
            />
            <User size={28} className={'text-gray-700 cursor-pointer'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWidget;

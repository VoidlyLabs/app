import React from 'react';
import { Mail, Phone } from 'react-feather';
import Link from 'next/link';

const TopBar = () => {
  return (
    <div className={'w-full bg-accent flex items-center justify-center'}>
      <div
        className={
          'max-w-(--layout-area) text-white flex justify-between w-full'
        }
      >
        <div
          className={
            'hidden sm:flex 2xl:px-0 px-4 gap-4 items-center text-sm font-normal'
          }
        >
          <div className={'flex items-center gap-2'}>
            <Phone size={16} />

            <Link href={'phone:+380441234567'}>
              <span>+380 (44) 123-45-67</span>
            </Link>
          </div>
          <div className={'flex gap-2 items-center'}>
            <Mail size={16} />
            <Link href={'mailto:info@voidly.ua'}>
              <span>info@voidly.ua</span>
            </Link>
          </div>
        </div>
        <div
          className={
            'flex items-center sm:justify-end justify-center w-full sm:w-auto pr-4 2xl:pr-0'
          }
        >
          <span className={'text-sm'}>Безкоштовна доставка від 1000грн</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

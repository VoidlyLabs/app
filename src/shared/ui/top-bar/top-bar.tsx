import React from 'react';

const TopBar = () => {
    return (
        <div className={'w-full bg-accent flex items-center justify-center'}>
            <div className={'max-w-[var(--layout-area)] text-white flex justify-between w-full'}>
                +380 (44) 123-45-67
            </div>
        </div>
    );
};

export default TopBar;
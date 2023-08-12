import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <div className='bg-[#D9D9D9] py-5'>
                <div className=' max-w-screen-lg mx-auto '>
                    <div className='text-[24px] font-normal flex justify-between'>
                        <p>Downpour Consultancy Services Assignment</p>

                    </div>
                </div>

            </div>
            <div className='h-12 mt-[-75px] drop-shadow' />
            <div className='flex justify-end max-w-screen-lg mx-auto mt-[-25px]'>
                <button className='text-[24px] font-normal'><Link href='/login'>Login</Link></button>
            </div>
        </div>
    );
};

export default Navbar;
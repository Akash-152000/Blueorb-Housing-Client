"use client"

import { toggleMobileMode } from '@/Store/responsiveSlice';
import { toggleDarkMode } from '@/Store/themeSlice';
import SmallProfileCard from '@/components/SmallProfileCard';
import { primaryBlack, primaryGrey, textWhite } from '@/constants/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';



function Header() {
    const theme = useSelector((state: any) => state.theme.darkMode)
    const isMobile = useSelector((state: any) => state.responsive.isMobile)
    const dispatch = useDispatch()
    const pathName = usePathname();


    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 500;

            // Only dispatch if there's a change in state
            if (isMobile !== isMobile) {
                dispatch(toggleMobileMode());
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch, isMobile]);

    return (
        <div className={`tablet:sticky top-0 z-10 ${theme ? 'dark ' : ''}`} >
            <div className='flex w-full justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite'>
                <div className='w-[30%] cursor-pointer'>
                    <img src="../Logo-blue-sm.png" alt="Logo" height={100} />
                </div>
                <div className='flex w-[30%] justify-end items-center'>

                    {!isMobile && (

                        <div
                            className='w-[10%] cursor-pointer'
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Notifications"
                        >
                            <IoNotificationsOutline size={20} color={`${primaryGrey}`} />
                        </div>
                    )}

                    <div className='cursor-pointer'><SmallProfileCard /></div>
                    <div
                        aria-label="Toggle dark mode"
                        onClick={() => dispatch(toggleDarkMode())}
                        className='ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2'
                    >
                        {
                            theme ?
                                <>
                                    <MdOutlineLightMode size={30} color={`${textWhite}`} />
                                </>
                                :
                                <>
                                    <MdOutlineDarkMode size={30} color={`${primaryBlack}`} />
                                </>


                        }
                    </div>
                </div>

            </div>
            {!isMobile && (
                <div className='grid grid-cols-12 border-b dark:bg-lightBlack bg-textWhite'>
                    <div className='sm:col-span-3'></div>
                    <div className='flex justify-around w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack'>
                        <Link href={'/'}><div className={`cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite ${pathName === '/' && ' bg-primaryBlue text-textWhite'}`}>Home</div></Link>

                        <Link href={'/projects'}>
                            <div className={`cursor-pointer hover:bg-primaryBlue px-6 py-2 text-textBlack hover:text-textWhite ${pathName === '/projects' && ' bg-primaryBlue text-textWhite'}`}>
                                Projects
                            </div>
                        </Link>

                        <Link href={'/properties'}><div className={`cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite ${pathName === '/properties' && ' bg-primaryBlue text-textWhite'}`}>Properties</div></Link>

                        <Link href={'/about'}><div className={`cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite ${pathName === '/about' && ' bg-primaryBlue text-textWhite'}`}>About</div></Link>

                        <Link href={'/contact'}><div className={`cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite ${pathName === '/contact' && ' bg-primaryBlue text-textWhite'}`}>Contact</div></Link>
                    </div>
                    <div className=' sm:col-span-3'></div>
                </div>
            )}

        </div>
    )
}

export default Header
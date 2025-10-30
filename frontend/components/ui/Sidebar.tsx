import React from 'react';
import { MdLibraryAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import Image from 'next/image'
import logo from '@/public/logo.png'
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="w-24 h-full bg-[#212121] text-white p-4 fixed top-0 left-0 border-r-2 border-r-[#2c2c2c] flex flex-col items-center">
            <Image src={logo} alt="logo" width={64}/>
            <div className='flex flex-col items-center gap-3 mt-4'>
                <Link href='/'>
                    <MdLibraryAdd className='text-2xl'/>
                </Link>
                <Link href='/'>
                    <FaSearch className='text-2xl'/>
                </Link>
                <Link href='/'>
                    <MdPhotoLibrary className='text-2xl'/>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;

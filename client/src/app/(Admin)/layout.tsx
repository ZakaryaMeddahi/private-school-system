'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuLogOut } from 'react-icons/lu';
import Logo from '@/components/Logo/Logo';
import { CgInbox } from 'react-icons/cg';
import { PiStudent } from 'react-icons/pi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { TbSquareLetterC } from 'react-icons/tb';

const Layout = ({ children }) => {

    const router = useRouter();

    const Logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="flex h-screen w-full">
            <div className="flex h-full w-1/4 flex-col bg-[#F1F2ED]">
                <div className="w-full pr-6.25">
                    <Logo fontSize='20px' fontWeight='500'/>
                </div>
                <hr className="border-t border-[#898C81]" />
                <div className="flex h-full w-full flex-col">
                    <Link href='/admin_dashboard/teachers'>
                        <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
                            <FaChalkboardTeacher color="#898C81" size='23px' />
                            <span className="text-[#898C81]">Teachers</span>
                        </div>
                    </Link>
                    <Link href='/admin_dashboard/students'>
                        <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
                            <PiStudent color="#898C81" size='23px' />
                            <span className="text-[#898C81]">Students</span>
                        </div>
                    </Link>
                    <Link href='/admin_dashboard/courses'>
                        <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
                            <TbSquareLetterC color="#898C81" size='23px' />
                            <span className="text-[#898C81]">Courses</span>
                        </div>
                    </Link>
                    <Link href='/admin_dashboard/enrollements'>
                        <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
                            <CgInbox color="#898C81" size='23px' />
                            <span className="text-[#898C81]">Enrollement Request</span>
                        </div>
                    </Link>
                </div>
                <div className="flex h-fit w-full flex-col">
                    <Link href='/chat'>
                        <div className="flex min-h-17.5 max-h-20 w-full flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]">
                            <IoChatbubblesOutline color="#898C81" size='23px' />
                            <span className="text-[#898C81]">Chat</span>
                        </div>
                    </Link>
                    <hr className="border-t border-[#898C81]" />
                    <div
                        className="flex min-h-17.5 max-h-20 w-full cursor-pointer flex-row items-center gap-1.25 pl-7.5 hover:bg-[whitesmoke]"
                        onClick={Logout}
                    >
                        <div className="scale-x-[-1]">
                            <LuLogOut color='#898C81' size='23px' />
                        </div>
                        <span className="text-[#898C81]">Logout</span>
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full flex-col">
                <div className="h-full w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

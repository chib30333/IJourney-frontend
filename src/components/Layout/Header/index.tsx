
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useAuth } from "../../../context/AuthContext";
import { useProgress } from "../../../context/ProgressContext";
import toast from "react-hot-toast";
import {
    ChevronDownIcon,
    SearchIcon,
    MenuIcon,
    XIcon,
    CheckCircle,
    LockKeyhole,
    LockKeyholeOpen,
    UserCircle2,
    Settings,
    LogOut
} from "lucide-react";

import { Input } from "../../../elements/input";
import { Button } from "../../../elements/buttons/button";

import LandingLogo from "../../../assets/image/landing-logo.png";
import UserProfileImage from "../../../assets/image/avatar/avatar4.jfif";

import { headerData } from "../../../datas/layoutData";

function Header() {
    const navigate = useNavigate();
    const { user, userProfile, logout } = useAuth();
    const { progress, currentMilestone, currentMilestoneChild } = useProgress();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const goToLogin = () => {
        navigate("/login");
    };

    const handlePage = (item: any) => {
        if (!item?.hasDropdown) {
            if (item.label === "Home") {
                window.location.replace("/");
            } else {
                if (item.href.includes("/")) {
                    navigate(item.href);
                } else {
                    navigate("/");

                    setTimeout(() => document.getElementById(item.href)?.scrollIntoView({ behavior: "smooth" }), 300);
                }
            }
        }
    }

    const goToMilestone = (item: any, index: number) => {
        console.log(currentMilestone, currentMilestoneChild);

        if (user) {
            if (currentMilestone && currentMilestoneChild) {
                if (index < currentMilestone) navigate(item.href);
                else {
                    toast.error("You have not unlocked this milestone yet.");
                }
            } else {
                if (Math.floor(progress?.summary.percent) === 100) navigate(item.href);
                else {
                    toast.error("You have not unlocked this milestone yet.");
                }
            }
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const onLogout = async () => {
        await logout();
        navigate("/");
    }

    const onProgress = async () => {
        navigate("/");

        setTimeout(() => document.getElementById("overRallProgress")?.scrollIntoView({ behavior: "smooth" }), 300);
    }

    return (
        <section className="flex flex-col items-start z-4 w-full fixed" id="">
            <nav className="flex sm:justify-between items-center w-full bg-custom px-8 py-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <div className="flex justify-between items-center relative flex-1 text-white">
                    <a href="/">
                        <img
                            className="relative w-36 h-8 cursor-pointer hover:opacity-90"
                            alt="Full logo white"
                            src={LandingLogo}
                        />
                    </a>
                </div>
                <div className="flex items-center gap-2 text-white font-ib-1 cursor-pointer">
                    {
                        user ?
                            <>
                                <Popover className="flex jusify-center h-full relative">
                                    <PopoverButton className="flex items-center cursor-pointer gap-x-1 font-semibold outline-0 group-hover:text-[#ff6f61] px-4 xl:px-8 group">
                                        <img src={UserProfileImage} className="rounded-full w-10 " />
                                        <span>{userProfile?.displayName}</span>
                                        <ChevronDownIcon aria-hidden="true" className="size-5" />
                                    </PopoverButton>

                                    <PopoverPanel
                                        transition
                                        className="absolute right-0 top-[110%] z-10 flex w-screen max-w-max px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                    >
                                        <div className="w-60 flex-auto overflow-hidden bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-sm/6 outline-1 -outline-offset-1 outline-white/80">
                                            <ul className="py-4 flex flex-col">
                                                <li className="group relative flex items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200" onClick={onProgress}>
                                                    <UserCircle2 size={20} />
                                                    <span>My Progress</span>
                                                </li>
                                                <li className="group relative flex items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200">
                                                    <Settings size={20} />
                                                    <span>Settings</span>
                                                </li>
                                                <li className="border border-gray-300"></li>
                                                <li className="group relative flex items-center gap-x-4 px-6 py-3 text-gray-500 hover:bg-gray-200" onClick={onLogout}>
                                                    <LogOut size={20} />
                                                    <span>Log Out</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </>
                            :
                            <Button onClick={goToLogin} className="cursor-pointer items-center justify-center relative h-auto rounded-2xl bg-[#ff6f61] hover:bg-[#ff6f61]/80 transition-colors text-white">
                                <div className="">
                                    Log In
                                </div>
                            </Button>

                    }
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden cursor-pointer"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <XIcon className="w-6 h-6" />
                        ) : (
                            <MenuIcon className="w-6 h-6" />
                        )}
                    </Button>
                </div>
            </nav>
            <div className={`w-full justify-center relative hidden lg:flex`}>
                <ul className="text-black bg-white px-8 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-[16px] absolute -top-6 flex flex-col lg:flex-row">
                    {headerData.navItems.map((item, index) => (
                        <li
                            key={index}
                            className={`${item.active && "text-[#ff6f61] border-b-3 cursor-pointer border-[#ff6f61]"} relative transition-opacity hover:opacity-90 hover:border-b-3 hover:border-[#ff6f61]`}
                        >
                            <Popover className="flex jusify-center h-full relative">
                                <PopoverButton onClick={() => handlePage(item)} className="flex items-center cursor-pointer gap-x-1 font-semibold outline-0 group-hover:text-[#ff6f61] px-4 xl:px-8 group py-2">
                                    <span>{item.label}</span>
                                    {item.hasDropdown && <ChevronDownIcon aria-hidden="true" className="size-5 transition" />}
                                </PopoverButton>

                                {item.hasDropdown && (
                                    <PopoverPanel
                                        transition
                                        className="absolute left-0 top-[110%] z-10 flex w-screen max-w-max px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                    >
                                        <div className="w-screen max-w-sm flex-auto overflow-hidden bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-sm/6 outline-1 -outline-offset-1 outline-white/80">
                                            <div className="py-4 flex flex-col">
                                                {headerData.solutions.map((item, index) => (
                                                    <div onClick={() => goToMilestone(item, index)} key={index} className={`group relative flex items-center gap-x-4 rounded-lg px-6 pt-2 pb-3 transition-colors hover:bg-gray-200 ${user && currentMilestone && (index < currentMilestone) ? "cursor-pointer" : progress?.summary.percent === 100 ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                                        {
                                                            user ? (
                                                                <div className="mt-1 flex size-8 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-white/8">
                                                                    {progress?.summary.percent === 100 ?
                                                                        <CheckCircle aria-hidden="true" color="#2ECC71" />
                                                                        : (
                                                                            currentMilestone ?
                                                                                <>
                                                                                    {(currentMilestone && index < currentMilestone - 1) && (
                                                                                        <CheckCircle aria-hidden="true" color="#2ECC71" />)}
                                                                                    {(currentMilestone && index === currentMilestone - 1) && (
                                                                                        <LockKeyholeOpen aria-hidden="true" color="#ff6f61" />)}
                                                                                    {(currentMilestone && index >= currentMilestone) && (
                                                                                        <LockKeyhole aria-hidden="true" color="#5c5c5c" />)}
                                                                                </>
                                                                                :
                                                                                <LockKeyhole aria-hidden="true" color="#5c5c5c" />
                                                                        )}
                                                                </div>
                                                            )
                                                                :
                                                                (
                                                                    <div className="mt-1 flex size-8 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-white/8">
                                                                        <LockKeyhole aria-hidden="true" color="#5c5c5c" />
                                                                    </div>
                                                                )
                                                        }
                                                        <div className="flex flex-col text-gray-800 group-hover:">
                                                            <span className="font-bold text-[14px]">{item.title}</span>
                                                            <span className="text-[12px] leading-3">{item.description}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </PopoverPanel>
                                )}
                            </Popover>
                        </li>
                    ))}
                    <li className="relative cursor-pointer transition-opacity hover:opacity-80 py-4">
                        <div className="hidden md:flex items-center gap-2 px-4 lg:xl-6 bg-white/10 backdrop-blur-sm border-l-2 border-[#ff6f61]">
                            <SearchIcon className="w-6 h-6 font-bold text-[#ff6f61]" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="hidden xl:block border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto shadow-none"
                            />
                        </div>
                    </li>
                </ul >
            </div >

        </section >
    );
};

export default Header;
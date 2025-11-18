import { Progress } from '../../../elements/progress';
import LogoImage from '../../../assets/image/milestones/logo-1.png';
import MenuIcon from '../../../assets/image/milestones/menu-icon.svg';

import { sidebarData } from '../../../datas/layoutData';

function Sidebar() {
    const url = document.baseURI.split('/');

    return (
        <div className='hidden absolute w-[300px] border-r-2 pt-2 border-[#84a8df] lg:fixed lg:block h-full'>
            <div className="flex flex-col items-start p-2 pt-4 gap-4">
                <div className="flex flex-col justify-center">
                    <img src={LogoImage} alt="Logo" />
                </div>
                <div className="w-full px-2">
                    <div className="flex justify-between">
                        <p className="text-left font-bold text-[#252b42] text-xl sm:text-[14px]">
                            Progress
                        </p>
                        <p className='font-bold'>{sidebarData.milestoneMenus[parseInt(url[url.length - 2].replace("milestone", "")) - 1].length}</p>
                    </div>
                    <div className="relative w-full h-2 bg-[#385581] rounded-full overflow-hidden">
                        <Progress
                            value={76}
                            className="h-full bg-[#385581] [&>div]:bg-[#5197ff]"
                        />
                    </div>
                </div>
                <div className="milestoneMenus flex flex-col gap-2 my-8 overflow-auto h-[680px]">
                    {sidebarData.milestoneMenus[parseInt(url[url.length - 2].replace("milestone", "")) - 1].map((menu, index) => (
                        <a href={menu.url} key={index} className="flex items-center gap-4 justify-start h-auto cursor-pointer group hover:bg-gray-200 px-4 py-2">
                            <img src={MenuIcon} alt="" />
                            <p className="text-left font-bold text-[#252b42]/80 text-xl sm:text-[18px]">{menu.title}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
import { Link } from 'react-router-dom';

import ImageBooks from '../../assets/image/books.png';
import Image115 from '../../assets/image/png/115.png';
import Image116 from '../../assets/image/png/116.png';
import Image117 from '../../assets/image/png/117.png';
import IconLeftArrow from "../../assets/image/left-arrow.svg";

function TalkingAboutUs() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-[#ffffff] flex-4 md:flex-1">
        <div className="mx-auto flex justify-center items-center h-full px-4 py-10 sm:px-6 lg:px-10">
          <div className="flex flex-col w-full">
            <div className="flex justify-start my-4 w-full">
              <Link to="/" className="flex gap-3 cursor-pointer hover:opacity-80">
                <img src={IconLeftArrow} alt="" className="w-3" />
                <span className="text-ib-2 text-[16px] font-bold">Go Home</span>
              </Link>
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex-1 flex flex-col justify-center items-center">
                <img src={ImageBooks} alt="" className='w-2/3' />
                <div className="flex flex-row gap-6 justify-between">
                    <div className="border-custom border-8 rounded-full p-4">
                      <img src={Image115} alt="" />
                    </div>
                    <div className="border-custom border-8 rounded-full p-4">
                      <img src={Image116} alt="" />
                    </div>
                    <div className="border-custom border-8 rounded-full p-4">
                      <img src={Image117} alt="" />
                    </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-6 p-6">
                <h3 className='font-bold uppercase text-ib-1'>Talking about us</h3>
                <p className='text-gray-700'>
                  We are great explorers. We are trying to get some advance in our lives.
                  We are great explorers. We are trying to get some advance in our lives.
                  We are great explorers. We are trying to get some advance in our lives.
                  We are great explorers. We are trying to get some advance in our lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TalkingAboutUs
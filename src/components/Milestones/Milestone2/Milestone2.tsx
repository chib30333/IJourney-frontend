
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';
import { CircleAlert } from "lucide-react";

import { CustomButton } from "../../../elements/buttons";

import ImageGuidePosts from "../../../assets/image/milestones/guideposts.png";

const guidePosts: any = [
    {
        title: 'Self-Awareness',
        text: 'Serves as an emotional radar to scan the landscape of your feelings, strengths and areas ready for growth',
    },
    {
        title: 'Effective Problem Solving',
        text: 'Instead of reacting on impluse, you’ll study the game board, strategize, and come up with solutions that checkmate the problem'
    },
    {
        title: 'Managing Emotions',
        text: 'Serves as your emotions steering wheel, When the road gets rough with stress, you’ll be able to pull over, breathe, and steer clear of impulse wrong turns'
    },
    {
        title: 'Smart Decision Making',
        text: 'A powerful tool helping your blend emotional wisdom with logical thinking to make the best choice'
    },
    {
        title: 'Using Empathy in Relationships',
        text: 'Your secret weapon to building connections with others,'
    }, {
        title: 'Taking Responsibility for Actions',
        text: 'Admitting mistakes shows maturity and honesty. It impactes does around you and taking steps to fix errors demonstrates care, strengthening your character'
    },
]

function GuidePost6() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/3", prevMilestoneId: "milestone2/2" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/3');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }
    const previous = () => {
        navigate('/milestones/milestone2/1');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.2: The 6 Guideposts to EQ</h3>
                <h6></h6>
            </div>
            <div className="flex flex-col gap-4">
                <h4 className='font-bold text-center'>Compass Points for Emotional Wisdom</h4>
                <h6 className='text-center'>Six core skills to guide you through emotions and choices. Begin with Guideposts 1 & 2 if you're a beginner.</h6>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                    {
                        guidePosts.map((item: any, index: number) => (
                            <div key={index} className="flex flex-row items-start justify-start gap-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-6">
                                <div className="w-[30px]">
                                    <CircleAlert size={30} className='h-fit' />
                                </div>
                                <div className="flex flex-col gap-2 wrap-anywhere">
                                    <h4 className='font-bold'>{`${index + 1}. ${item.title}`}</h4>
                                    <h6>{item.text}</h6>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex justify-center">
                <img src={ImageGuidePosts} alt="" className='w-1/2' />
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default GuidePost6
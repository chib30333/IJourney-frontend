
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

import ImageOpenBook from "../../../assets/image/milestones/open-book.png";
import ImageCloud from "../../../assets/image/milestones/cloud.png";
import IconFeeling from "../../../assets/image/milestones/feeling.svg";
import IconEmotion from "../../../assets/image/milestones/emotion.svg";
import IconArrow from "../../../assets/image/milestones/arrow.svg";


function Difference() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone1/3", prevMilestoneId: "milestone1/2" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone1/3');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone1/1');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M1.2: What’s the Difference?</h3>
                <h6>
                    Understanding the difference between&nbsp;
                    <span className='text-[#D42020]'>Emotions</span> and <span className='text-[#179E54]'>Feelings</span>
                    &nbsp;is essential for building self-awareness.
                </h6>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-row gap-4">
                    <div className="">
                        <img src={IconEmotion} alt="" className="min-w-6" />
                    </div>
                    <div className="">
                        <p className="text-[#D42020] font-bold">Emotions (The Alert)</p>
                        <p>These are the body's quick, natural and automatic chemical responses (like an adrenaline rush or a news alert).
                            They happen instantly.</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="">
                        <img src={IconFeeling} alt="" className="min-w-6" />
                    </div>
                    <div className="">
                        <p className="text-[#179E54] font-bold">Feelings (The Alert)</p>
                        <p>These are the meanings or stories your brain attaches to those emotions. They are subjective and last longer.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start gap-4 px-8 pt-10 pb-6 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <h5 className='font-bold uppercase tracking-[1px]'>Simple Analogy:</h5>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col justify-between items-center gap-4">
                        <img src={IconEmotion} alt="" className="w-8" />
                        <div className="items-center flex flex-col text-[#D42020]">
                            <p className="font-bold">Emotions</p>
                            <h6>(New Alert)</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <img src={IconArrow} alt="" />
                    </div>
                    <div className="flex flex-col justify-between items-center gap-4">
                        <img src={IconFeeling} alt="" className='w-8' />
                        <div className="items-center flex flex-col text-[#179E54]">
                            <p className="font-bold">Feelings</p>
                            <h6>(New Alert)</h6>
                        </div>
                    </div>
                </div>
                <h6 className="font-bold">The emotion is the immediate alert that something is happening. The feeling is the story you create about what that alert means.</h6>
            </div>
            <h6>Understanding this difference is the first step toward self-awareness, which helps you manage your reactions.</h6>
            <div className="flex flex-col px-4 py-6 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] gap-4">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <img src={ImageOpenBook} alt="" className="w-20" />
                    <h3 className="uppercase font-bold font-ib-5 wrap-anywhere">
                        <span className="text-[#D42020]">Kayla's</span>&nbsp;<span className="text-[#179E54]">story</span>
                    </h3>
                </div>
                <h6>
                    Kayla sat at her desk. the workbook spread out before her like a treasure map waiting to be explored. At just 14 years old, she found
                    herself caught in a whirlwind of emotions as she filled in the pages. Joy bubbled inside her as she considered the possibilities of her future, While.
                    fear nipped at her heels, whispering doubts into her mind.
                    Last spring, Kayla attended her best friend's sister's college graduation. an event that ignited a spark within her. As she watched graduates
                    beam with pride, clutching their diplomas, she couldn't help but wonder if she, too, could one day walk across that stage. The thought of
                    choosing a career, of discovering what she was truly passionate about, filled her with excitement. 'This workbook could be the beginning of my
                    journey.' she thought her heart racing with anticipation. However, the Joy was quickly overshadowed by the weight of self-doubt that
                    settled on her shoulders. Secretly, Kayla often wonders if she Is enough. Whispers of doubt filled her head as a knot formed in her stomach. She pictured going to
                    college, falling and being the laughing stock of her family. who unfortunately reinforces her Insecurities. ''What if I do all this work to
                    get there and It's not possi1ble to stay there?".
                    As she paused to re.fie.ct on he.r emotions using the Feelings Wheel, Kayla began to understand that her joy stemmed from the hope of self discovery.
                    while her fear was rooted in insecurity. This realization sparked a determination within her instead of allowing her insecurities to hold her back,
                    she resolved to focus on the possibilities and thought. "Maybe I can increase my confidence in what I can do when I start discovering who I am.
                    If I go to college and it gets hard, I can always ask for help". With newfound clarity, Kayla returned to her workbook. her pencil
                    moving with purpose as she had located her Finisher’s Spark She was excited to uncover her passions, to learn more about herself, and to
                    explore the careers that awaited her. Yes, there were challenges ahead, but she was ready to face them. Kayla knew that she had the power to
                    shape her future, one page at a time, beginning with crafting her Journeyer’s Statement.
                </h6>
                <div className="flex justify-center">
                    <img src={ImageCloud} alt="" />
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default Difference
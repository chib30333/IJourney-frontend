
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

import Image25 from "../../../assets/image/png/25.png";
import Image26 from "../../../assets/image/png/26.png";
import Image27 from "../../../assets/image/png/27.png";
import Image28 from "../../../assets/image/png/28.png";
import ImageBook from "../../../assets/image/milestones/open-book.png";

function IntroCharacter() {
    const navigate = useNavigate();
    const user = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/10" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/10');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone2/8');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h2 className="font-bold">M2.9: Intro to Character </h2>
                <h6>Bridging emotions to character strengths</h6>
            </div>
            <div className="flex flex-col gap-2">
                <h5 className='font-bold'>From Emotions to Character</h5>
                <h6>Now that you've explored your emotions through the Feelings Wheel and Emotional Intelligence concepts,
                    it's time to discover your inherent character strengths. Your character—the core traits that make you uniquely you— plays a crucial role in how you
                    navigate challenges, make decisions, and pursue your dreams.</h6>
            </div>
            <div className="flex flex-row justify-center">
                <img src={Image25} alt="" className='w-1/4' />
                <img src={Image26} alt="" className='w-1/4' />
                <img src={Image28} alt="" className='w-1/4' />
                <img src={Image27} alt="" className='w-1/4' />
            </div>
            <div className="flex flex-col gap-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6">
                <div className="flex flex-row gap-2 items-center">
                    <img src={ImageBook} alt="" className='w-30' />
                    <h3 className='font-extrabold italic'>
                        <span className='text-[#18E930]'>KAI</span>&nbsp;
                        <span className='text-[#F9AF46]'>+</span>&nbsp;
                        <span className='text-[#FA3131]'>TALIA’S</span>&nbsp;
                        <span className='text-[#F9AF46]'>STORY</span>&nbsp;
                    </h3>
                </div>
                <p>Once upon a time in the bustling town of Greenville, there lived a group of teens, each navigating the rocky terrain of middle school and their futures.
                    Among them were Kai. a bright and ambitious boy with dreams of becoming a doctor and Talia, a creative soul who loved drawing but often
                    doubted her abilities.
                    Kai was known for his confidence. He had always excelled in his classes and was a star athlete on the track team.
                    Kai believed that if he set his mind to it he could achieve anything. This unwavering self-belief was like a compass guiding him through
                    the uncertainties of adolescence.  His friends admired his determination and looked to him for advice on everything from study tips
                    to what to create in the upcoming iJourney Career Project Fair

                    This end-of-year event gave students the chance to create any project that reflected their potential career choice after completing the iJourney program.
                    Leaders from companies in the area would attend the fair, encourage the students and cast votes for their favorite projects. "Envisioning the Future"
                    awards were given out in various career-related categories.

                    Talia was known for her contagious smile. Anyone could spot her creative masterpiece of a backpack from a mile away. A few students were
                    willing to pay her to create a customized backpack for the upcoming school year, but she declined as she was too afraid of giving them
                    something they may not like.
                    Talia struggled with low self-esteem. Despite her confirmation her impressive artistic talent she often compared herself to others and felt
                    she didn't measure up. Her heart longed to pursue an art-related career, but every time she thought about it a nagging voice in her head
                    whispered that she wasn't good enough.Instead, she considered more conventional paths, like becoming an office administrator.
                    which felt safe but unexciting.

                    One sunny afternoon. while sitting at the track field after practice, Kai noticed Talia staring at her multi- watercolor painted hands resting
                    on her lap. "Hey, what's up?' he asked, walking towards her with concern.

                    Talia sighed, "We're four weeks away from the iJourney Career Project Fair and six weeks away from 8th grade graduation. which means,
                    we are one step closer to being high school freshmen That's one step closer to being a senior.
                    That's one step closer to post-graduation plans. That's one step closer to supposedly knowing what the heck I want to do with my life!"</p>
                <div className="flex flex-col justify-center p-4 gap-4">
                    <h4 className='font-extrabold'>Sounds a bit much, Huh, Well, here's the backstory</h4>
                    <p className=" bg-red-400 text-white p-3">Talia's older sister was recently promoted to a customer service supervisor at work. She watched her mom smile contagiously as she mixed chocolate cake
                        batter to celebrate Talia had a history of experiencing anxious thoughts and the thought of never achieving anything worthy of a cake (preferably strawberry)
                        celebration in honor of a promotion terrified her, She figured. "I have the recipe to making my mom proud. Why risk it?"
                    </p>
                </div>
                <p>Talia stated, "I love art but I don't know if I could actually make a career out of it. What if I fail
                    and let others and myself down?” Kai smiled gently, ”You know.Tali-a, everyone has strengths and weaknesses. Your art Is amazing!
                    You just need to believe in yourself a little more. If you love what you do, you'll find a way to
                    make it work Failure is a part of discovering what you were meant to do all along. Remember Jordan's story? Just recycle it!"

                    Talia looked at him, uncertainty still clouding her eyes."But what if I don't have what it takes?'
                    “What if you do?" Kai countered, his enthusiasm Infectious. 'You have so much potential! Think
                    about how resilient you are. Remember when you entered that art contest last year?
                    You didn't win but you kept going and created even more fantastic pieces."

                    Talia was guilty of mental filtering. She could never forget watching the desirable red ribbon
                    go to Alexander (who she' secretly called "Alexander the Great''), but shed forgotten how much her art has improved over the past year.
                    Kai placed a reassuring hand on her shoulder. ''Remember what we talked about? This is your chance to show the world what you love.
                    Whether they like it or not, your worth isn't defined by their opinions." Talia thanked Kai for his encouragement and decided to wait further
                    along in the program before deciding how to move forward.
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h6 className='font-bold'>Reflection Time</h6>
                <h6>Think about a time when your character was truly tested. This could be when you showed courage, faced a fear, stood up for what you belie ved in,
                    or persevered through a difficult situation. What character traits
                    did you demonstrate? Share your reflection below:</h6>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default IntroCharacter;
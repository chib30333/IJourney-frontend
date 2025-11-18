import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';
import ImageJowel1 from "../../../assets/image/milestones/jowel1.png"
import ImageJowel2 from "../../../assets/image/milestones/jowel2.png"
import ImageJowel3 from "../../../assets/image/milestones/jowel3.png"
import ImageJowel4 from "../../../assets/image/milestones/jowel4.png"
import Imagel9 from "../../../assets/image/png/19.png"

const EQTreasuredSecrets = [
    {
        image: ImageJowel1,
        text: "Increase Awareness Of Your Emotions",
        description: "As we've practiced earlier in the workbook, increasing awareness to our emotions and feeling is just the beginning to EI. However when we are able to do this successfully"
    },
    {
        image: ImageJowel2,
        text: "Develop A Mindful Understanding Of Others' Feelings",
        description: "Imagine being able to picture what someone else might be feeling, even it they haven't said a word! That magical ability is called empathy"
    },
    {
        image: ImageJowel3,
        text: "Manage Your Emotional Reactions",
        description: "We all have our moments where we feel tested and occasionally face those disappointing letdowns! It's super important to let your feeling. That's where our emotional reactions come in! How do we manage them?"
    },
    {
        image: ImageJowel4,
        text: "Choosing Your Mood",
        description: "Managing emotions can actually be quite an adventure! Think of it like selecting the perfect song for each moment. Where each mood is a different track waiting to be played"
    },
]

function EQTreasuredSecret() {
    const navigate = useNavigate();
    const user = useAuth();
    const [emotion, setEmotion] = useState<string>("");
    const [nextButtonDisabledState, setnextButtonDisabledState] = useState<boolean>(true);
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/7" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/7');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }
    const previous = () => {
        navigate('/milestones/milestone2/5');
    };

    const save = async () => {
        if (!user) {
            toast.error("You need to login to post a comment.");
        } else {
            try {
                const result = await submitMilestone('milestone2_6', { userId: user?.uid, responses: { emotion } });
                setnextButtonDisabledState(false);
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold">M2.6: EQ Treasured Secrets</h3>
                <h6></h6>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                {EQTreasuredSecrets.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col h-full w-full justify-center gap-3 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-6 wrap-anywhere">
                        <div className="flex flex-row gap-1">
                            <img src={item.image} alt="" className='w-10 h-10' />
                            <h5 className='font-bold uppercase text-center'>{item.text}</h5>
                            <img src={item.image} alt="" className='w-10 h-10' />
                        </div>
                        <h6 className='text-center'>{item.description}</h6>
                    </div>
                ))}
            </div>
            <div className="">
                <h4 className='font-bold'>The Problem</h4>
                <p>Mia was academically gifted, but she felt lonely and disconnected. When setbacks happened, she quickly became frustrated and often gave up —
                    and she struggled to relate naturally with her classmates.</p>
            </div>
            <div className="bg-white px-6 py-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-4">
                <h4 className='font-bold'>Why these secrets matter</h4>
                <p className=''>Developing these three habits builds a foundation for stronger relationships, better self-control, and more joyful learning. Think of them as daily tools —
                    like warming up before a run.
                </p>
                <ul className='list-decimal font-medium list-inside'>
                    <li><span>Awareness</span> - Practice daily</li>
                    <li><span>Management</span> - Pause & choose</li>
                    <li><span>Empathy</span> - Listen deeply</li>
                </ul>
            </div>
            <div className="flex flex-col gap-2 mt-6">
                <h6 className='font-bold'>Quick Practice — 90 Seconds</h6>
                <h6>Try this short practice to lock the lesson in:</h6>
                <div className="flex flex-col gap-2 md:flex-row md:justify-between justify-center items-start">
                    <ul className='list-decimal list-inside'>
                        <li>Pause and take 3 slow breaths.</li>
                        <li>Name one emotion you notice and write (e.g., "I feel nervous").</li>
                    </ul>
                    <img src={Imagel9} alt="" className='w-30' />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <Textarea
                    value={emotion}
                    placeholder="Describe the Your emotion you notice..."
                    rows={5}
                    onChange={(e: any) => setEmotion(e.target.value)}
                    className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                />
                <CustomButton onClickFunc={save} title='save' className='rounded-none w-auto justify-end' type='red' disabled={!emotion}></CustomButton>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={nextButtonDisabledState}></CustomButton>
            </div>
        </div>
    )
}

export default EQTreasuredSecret
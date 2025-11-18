import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { unlockNext } from '../../../controllers/courseController';
import { submitMilestone } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { Textarea } from '../../../elements/textarea';

const EQMatters: any = [
    {
        title: "Humor"
    },
    {
        title: "Honesty"
    },
    {
        title: "Bravery"
    },
    {
        title: "Kindness"
    },
    {
        title: "Love"
    }
]

function DefiningStrength() {
    const navigate = useNavigate();
    const user = useAuth();
    const [answers, setAnswers] = useState<Record<string, string>>({
        Humor: "",
        Honesty: "",
        Bravery: "",
        Kindness: "",
        Love: ""
    });
    const next = async () => {
        if (user) {
            try {
                await submitMilestone('milestone2_11', { userId: user?.uid, responses: { answers } });
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone2/12" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone2/12');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const allFilled = Object.values(answers).every(text => text.trim() !== "");

    const previous = () => {
        navigate('/milestones/milestone2/10');
    };

    const handleTextareaChange = (title: string, value: string) => {
        setAnswers(prev => ({
            ...prev,
            [title]: value
        }));
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M2.11: Defining Your Strengths</h3>
                <h6>Transform your abstract strengths into concrete evidence by connecting them to specific, recent actions from your life.
                    Like Luisa collecting her gems in the Valley of Strengths and Virtues, ground each strength in real experiences.</h6>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Inspiration from Luisa's Journey</h4>
                <h6>As Luisa explored the Valley of Strengths and Virtues, she discovered gems that represented her character strengths: Humor, Honesty, Bravery, Kindness, Appreciation of Beauty and Excellence, Gratitude, and Love. Each gem was found in places where these strengths were actively demonstrated through actions and experiences.
                    Now it's your turn! For each of your top 5 strengths, describe a specific moment when you demonstrated this strength.</h6>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Why EQ matters?</h4>
                <h6>EQ is extremely important because success in life, career, and relationships often depends more on how you handle yourself and others than on just being technically smart.</h6>
            </div>
            <div className="flex flex-col gap-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6">
                <ul className='flex flex-col gap-4'>
                    {EQMatters.map((item: any, index: number) => (
                        <li className='flex flex-col gap-2'>
                            <h5 className='font-bold'>{`${index + 1}.${item.title}`}</h5>
                            <h6>How did you use {item.title} last week?</h6>
                            <Textarea
                                value={answers[item.title] || ""}
                                onChange={(e) => handleTextareaChange(item.title, e.target.value)}
                                placeholder={`Describe the specific situation where you demonstrated ${item.title}...`}
                                rows={5}
                                className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                            />
                            <h5 className='font-bold text-center'>Be specific! Include what you did, when it happened, and the impact it had.</h5>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={!allFilled}></CustomButton>
            </div>
        </div>
    )
}

export default DefiningStrength;
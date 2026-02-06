import { useNavigate } from 'react-router-dom';
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';
import { submitMilestone } from '../../../controllers/courseController';

import { Textarea } from "../../../elements/textarea";
import { Progress } from '../../../elements/progress';
import { CustomButton } from '../../../elements/buttons';
import { Card, CardContent } from '../../../elements/card';

import { FeelingsWheel } from '../../FeelingsWheel/FeelingsWheel';

const emotions = [
    { value: "Happy" },
    { value: "Surprise" },
    { value: "Disgust" },
    { value: "Fear" },
    { value: "Angry" },
    { value: "Sad" },
    { value: "Startld" },
    { value: "Judge" },
    { value: "Amazed" },
    { value: "Contempt" },
    { value: "Shocked" }
];

function InteractiveFeelingsWheel() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [buttonDisabledStatus, setbuttonDisabledStatus] = useState<boolean>(true);
    const [emotion, setEmotion] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [savedEntry, setSavedEntry] = useState<Array<object>>([])
    const [nextButtonDisabledState, setnextButtonDisabledState] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            const getResponse = async () => {
                const result = await getMilestone('milestone1_4');
                if (result) {
                    setSavedEntry(result.responses.entries as Array<object>);
                    setbuttonDisabledStatus(false);
                    setnextButtonDisabledState(false);
                }
            }
            getResponse();
        }
    }, [user])

    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone1/5", prevMilestoneId: "milestone1/4" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone1/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone1/3');
    };

    const handleSaveEntry = () => {
        savedEntry.push({ emotion, description });
        setEmotion("");
        setDescription("");
    }

    const handleDeleteSavedEntry = (index: number) => {
        setSavedEntry(savedEntry.filter((item: any, i: number) => i !== index && { ...item }));
    }

    useEffect(() => {
        if (savedEntry.length >= 5) {
            setbuttonDisabledStatus(false);
        } else {
            setbuttonDisabledStatus(true);
        }
    }, [savedEntry.length])

    const save = async () => {
        if (user) {
            try {
                const result = await submitMilestone('milestone1_4', { userId: user?.uid, responses: { entries: savedEntry } });
                toast.success(result.message);
                setnextButtonDisabledState(false);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error("You need to login to save a Entries.");
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
                <h3 className="font-bold text-center">M1.4: The Interactive Feelings Wheel</h3>
                <h6>Click on specific emotions to explore and reflect on your feelings</h6>
            </div>
            <div className="flex items-center justify-center">
                <FeelingsWheel />
            </div>
            <div className="flex flex-col gap-6">
                <h4 className='font-bold'>Reflect on Your Emotion</h4>
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="emotion" className="font-bold flex-1">Select Emotion:</label>
                    <select name="" id="emotion" className="border p-2 flex-1" onChange={(e) => setEmotion(e.target.value)} value={emotion}>
                        <option value="">--- select ---</option>
                        {emotions.map((item, index) => (<option key={index} value={item.value}>{item.value}</option>))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <h5>When did you last feel <i className='font-bold'>Panicked</i>? Please describe the situation.</h5>
                    <Textarea
                        id="description"
                        placeholder="Describe the situation..."
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="resize-none text-gray-800 bg-white border-gray-500 placeholder:text-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <p className="text-left font-bold text-[#252b42] text-xl sm:text-[14px]">
                            Intensity: 0 (Moderate)
                        </p>
                    </div>
                    <div className="relative w-full h-2 bg-[#21CBDA] rounded-full overflow-hidden">
                        <Progress
                            value={0}
                            className="h-full bg-[#21CBDA] [&>div]:bg-[#1b9da8]"
                        />
                    </div>
                    <div className="flex justify-between">
                        <p className="text-left font-bold text-[#252b42] text-xl sm:text-[14px]">
                            1 - Mild
                        </p>
                        <p className='font-bold'>5 - Overwhelming</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <CustomButton onClickFunc={handleSaveEntry} title='Save Entry' className='rounded-full justify-end' type='sky' disabled={!emotion || !description}></CustomButton>
                </div>
                <div className="flex flex-col gap-4 p-6 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                    <h4 className="font-bold flex flex-row justify-between">
                        <span>Progress:</span><span>{savedEntry.length}</span>
                    </h4>
                    {
                        savedEntry.map((item: any, index: number) => (
                            <Card key={index} className="flex flex-col w-full rounded-none items-start overflow-hidden border-2 border-gray-300 border-dashed">
                                <CardContent className="flex flex-col items-start gap-2 py-3 px-5 relative w-full">
                                    <h5><span className="font-bold text-[#0B93CD]">Entry Saved</span></h5>
                                    <div className="flex justify-between w-full items-end">
                                        <div className="">
                                            <h6>
                                                <span className="font-semibold">Selected Emotion:</span>&nbsp;<span>{item.emotion}</span>
                                            </h6>
                                            <h6>
                                                <span className="font-semibold">Description:</span>&nbsp;<span>{item.description}</span>
                                            </h6>
                                        </div>
                                        <div onClick={() => handleDeleteSavedEntry(index)} className="p-2 rounded-full bg-[#ff6f61] border-2 border-[#ff6f61] hover:bg-[#ff6f61]/80 group cursor-pointer">
                                            <TrashIcon size={20} color='white' />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                    {savedEntry.length === 0 && <p className="text-gray-500">No entries saved.</p>}
                    <div className="flex justify-end gap-2">
                        <CustomButton onClickFunc={save} title='save' className='rounded-none' type='red' disabled={buttonDisabledStatus}></CustomButton>
                    </div>
                </div>
                <div className="flex justify-between w-full gap-2 text-center">
                    <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                    <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move' disabled={nextButtonDisabledState}></CustomButton>
                </div>
            </div>
        </div>
    )
}

export default InteractiveFeelingsWheel
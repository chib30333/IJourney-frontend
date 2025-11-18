import { Lightbulb } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";

function EducationalPlan() {
    const navigate = useNavigate();
    const user = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone6/1" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone6/1');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone5/3');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M5.5: Your Educational Journey Plan</h3>
                <h6>Creating Your Personalized Path Forward</h6>
            </div>
            <div className="flex flex-col gap-4">
                <div className="space-y-6">
                    <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold">Create Your Personalized Plan</h4>
                        <p className="mb-4">Based on what you've learned, create your personalized educational journey plan. Think about your goals, interests, and financial situation.</p>

                        <div className="mb-6">
                            <p className='font-bold'>Goal:</p>
                            <p></p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h5 className="font-semibold mb-2">My Preferred Path</h5>
                            <select className="w-full p-2 border rounded-md">
                                <option value="">Select your preferred educational path</option>
                                <option value="vocational">Vocational/Technical School</option>
                                <option value="associate">Associate Degree</option>
                                <option value="bachelor">Bachelor's Degree</option>
                                <option value="graduate">Graduate/Professional Degree</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <h5 className="font-semibold mb-2">Financial Planning</h5>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Scholarships I'll Apply For</label>
                                    <input type="text" placeholder="e.g., Merit-based scholarships" className="w-full p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Grants I'm Eligible For</label>
                                    <input type="text" placeholder="e.g., Pell Grant" className="w-full p-2 border rounded-md" />
                                </div>
                            </div>

                            <div className='mt-4'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Strategy</label>
                                <select className="w-full p-2 border rounded-md">
                                    <option value="">Select loan strategy</option>
                                    <option value="federal">Federal loans first</option>
                                    <option value="minimal">Minimal borrowing</option>
                                    <option value="none">No loans if possible</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h5 className="font-semibold mb-2">Action Steps</h5>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="step1" className="mt-1" />
                                    <label htmlFor="step1" className="text-sm">Research 3 colleges/programs that match my interests</label>
                                </div>
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="step2" className="mt-1" />
                                    <label htmlFor="step2" className="text-sm">Check admission requirements for each</label>
                                </div>
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="step3" className="mt-1" />
                                    <label htmlFor="step3" className="text-sm">Apply for at least 5 scholarships</label>
                                </div>
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="step4" className="mt-1" />
                                    <label htmlFor="step4" className="text-sm">Complete FAFSA application</label>
                                </div>
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="step5" className="mt-1" />
                                    <label htmlFor="step5" className="text-sm">Schedule a meeting with my counselor</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h5 className="text-xl font-bold mb-3">AI Chatbot Assistance</h5>
                        <p className="mb-4">Our AI chatbot can help you with your educational journey planning:</p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 mt-1" /> Ask about specific colleges or programs</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 mt-1" /> Get personalized scholarship recommendations</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 mt-1" /> Help with financial planning questions</div>
                            <div className="flex items-start gap-2"><Lightbulb className="w-5 h-5 mt-1" /> Connect you with resources for your specific interests</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default EducationalPlan;
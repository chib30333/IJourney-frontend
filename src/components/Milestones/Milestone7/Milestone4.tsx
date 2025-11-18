
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { unlockNext } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { Trophy, CheckCircle, Award } from 'lucide-react';
import { CustomButton } from "../../../elements/buttons";

function CelebrationCompletion() {
    const navigate = useNavigate();
    const user = useAuth();
    const next = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "milestone7/5" });
                toast.success(result.message);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
            navigate('/milestones/milestone7/5');
        } else {
            toast.error("You need to log in to unlock the next milestone.");
        }
    }

    const previous = () => {
        navigate('/milestones/milestone7/3');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M7.4: Celebration & Completion</h3>
                <h6>Congratulations on Completing Your iJourney!</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold mb-3 text-yellow-700">You've Completed Your iJourney!</h4>
                        <div className="flex flex-col items-center justify-center py-8">
                            <Trophy className="w-16 h-16 mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Congratulations Graduate!</h2>
                            <p className="text-center text-lg mb-6">
                                You've successfully completed "iJourney: A Path to Purpose" and have created a powerful foundation for your future.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg mb-4">
                            <h5 className="font-semibold text-yellow-700 mb-2">Your Accomplishments:</h5>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-yellow-600 mt-1" /> Completed all 7 milestones of self-discovery</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-yellow-600 mt-1" /> Created your personal Journeyer's Statement</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-yellow-600 mt-1" /> Developed your Career Project Fair presentation</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-yellow-600 mt-1" /> Set 3 SMART goals for your continued growth</li>
                                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-yellow-600 mt-1" /> Built a network of accountability partners</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">Your Digital Certificate</h4>
                        <div className="bg-white p-6 rounded-lg shadow mb-4">
                            <div className="flex flex-col items-center">
                                <div className="w-full max-w-md bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
                                    <div className="text-center mb-6">
                                        <h5 className="text-2xl font-bold ">iJourney: A Path to Purpose</h5>
                                        <p className="text-sm ">Certificate of Completion</p>
                                    </div>
                                    <div className="text-center mb-6">
                                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Award className="w-12 h-12 " />
                                        </div>
                                        <p className="text-lg font-semibold ">This certifies that</p>
                                        <p className="text-xl font-bold text-ib-1 mt-2">[User Name]</p>
                                        <p className="text-sm  mt-2">has successfully completed the iJourney program</p>
                                    </div>
                                    <div className="flex justify-between items-center text-sm ">
                                        <div>Date: {new Date().toLocaleDateString()}</div>
                                        <div>Signature: Asha McMillan, LPC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                                Download Certificate
                            </button>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h4 className="text-xl font-bold text-green-800 mb-3">Next Steps</h4>
                        <p className="mb-4">Your journey doesn't end here! Here are some ways to continue your growth:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Review Your Dashboard</h5>
                                <p className="text-sm">Access your saved responses, Journeyer's Statement, and SMART goals anytime.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Connect with Community</h5>
                                <p className="text-sm">Join our alumni network to share experiences and support each other.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Continue Learning</h5>
                                <p className="text-sm">Explore additional resources and workshops to deepen your skills.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2">Share Your Story</h5>
                                <p className="text-sm">Inspire others by sharing your journey and accomplishments.</p>
                            </div>
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

export default CelebrationCompletion;
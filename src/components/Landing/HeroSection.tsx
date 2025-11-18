import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import type { InputValues } from '../../lib/types';
import { heroSectionData } from '../../datas/landingData';
import { validateRegisterForm } from '../../lib/validation';
import { register } from '../../controllers/authController';
import { useAuth } from '../../hooks';
import { unlockNext } from '../../controllers/courseController';

import {
    Badge,
    Button,
    Card,
    CardContent,
    Input,
    Label,
    Progress
} from '../../elements';
import BlindEye from '../../assets/image/blind-eye.svg';
import BlindEyeOpen from '../../assets/image/blind-eye-open.svg';
import ImageHeader from '../../assets/image/guide-posts/title.png';
import ImageBook from '../../assets/image/book.png';


function HeroSection() {
    const user = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<Array<boolean>>([false, false]);
    const [inputValues, setInputValues] = useState<InputValues>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = inputValues;

        const { isValid, errors } = validateRegisterForm(name, email, password, confirmPassword);

        if (!isValid) {
            setErrors(errors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const data = await register(name, email, password, "user");
            setInputValues({ name: "", email: "", password: "", confirmPassword: "" });
            console.log(data);
            toast.success("🎉 Registration successful!");

            navigate('/');
        } catch (error: any) {
            console.log("Firebase error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputValues((prev) => ({ ...prev, [id]: value }));
    }

    const handleContinue = async () => {
        if (user) {
            try {
                const result = await unlockNext({ userId: user?.uid, milestoneId: "introduction/iam" });
                console.log(result)
                toast.success(result.message);
                navigate('/Introduction/iam');
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    return (
        <section className="pt-[120px] relative w-full slide flex justify-center">
            <div className="flex justify-center items-center md:justify-between flex-col lg:flex-row px-8 py-16 container gap-20 xl:gap-70">
                <div className="flex items-center justify-center flex-1 text-white w-full gap-3">
                    {/* <div className="flex-col items-start gap-10 w-full flex">
                        <div className="flex flex-col items-start w-full">
                            <div className="flex items-center justify-center gap-3 px-5 py-3 bg-[#2ecc7199] rounded-tap border-2 border-solid border-[#5ee088]">
                                <div className="flex items-center justify-center flex-1 font-subheading-uppercase-s7 font-ib-3 font-semibold tracking-[1px]">
                                    SURELY FIND YOUR OWN GREAT PURPOSE.
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-6 w-full">
                            <h1 className="flex items-center justify-center font-['IBM_Plex_Sans',Helvetica] font-bold text-[52px] tracking-[0] leading-[normal]">
                                IJourney : Path To Purpose
                            </h1>

                            <p className="flex items-center justify-center font-ib-3 font-normal text-2xl tracking-[0] leading-[normal]">
                                This will give you great purpose, faith, confidence and
                                courage.
                            </p>
                        </div>

                        <div className="flex items-center flex-col sm:flex-row gap-6 w-full font-ib-3">
                            <Button onClick={startMilestones} className="gap-3 px-6 py-3 cursor-pointer bg-[#ff6f61] items-center justify-center rounded-[100px] h-auto hover:bg-[#ff6f61]/90 transition-colors">
                                <span className="flex items-center justify-center w-fit text-[16px]">
                                    Get Start
                                </span>

                                <div className="gap-4 p-2 items-center justify-center rounded-[100px] bg-white">
                                    <ArrowRightIcon className="w-5 h-5 text-[#ff6f61]" />
                                </div>
                            </Button> 

                            <div className="flex items-center justify-center w-fit font-body-b5">
                                or
                            </div>

                            <Button onClick={goToLoginPage} className="gap-4 px-6 py-4 cursor-pointer border border-solid border-[#f9f9f9] items-center justify-center rounded-[100px] bg-transparent hover:bg-white/10 transition-colors h-auto">
                                <span className="flex items-center justify-center w-fit text-[16px]">
                                    Log In
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="items-start gap-5 w-full flex">
                        <img src={ImageBook} alt="" className="" />
                    </div> */}
                    <div className="flex flex-col gap-4 relative" id="guide">
                        <div className="border-r-4 border-white border-dashed h-full absolute left-[50%] z-1"></div>
                        <div className="flex flex-col justify-center items-center z-2">
                            <img src={ImageHeader} alt="" className="w-[300px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 gap-y-10">
                            {heroSectionData.guidePosts.map((post, index) => (
                                index % 2 === 0 ? (
                                    <div key={index} className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[${post.hoverBgColor}] justify-between items-center sm:rounded-[200px_0px_0px_200px] bg-[${post.bgColor}] p-3 pr-2 max-w-[200px] text-black font-bold opacity-0 animate-fade-in [animation-delay:${index + 1}00ms]`}>
                                        <div className={`p-1 bg-[${post.ImageColor}] rounded-full`}>
                                            <img src={post.image} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span>{post.number}.</span>
                                            <span>{post.description}</span>
                                        </div>
                                    </div>
                                ) :
                                    (
                                        <div key={index} className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[${post.hoverBgColor}] justify-between items-center sm:rounded-[0px_200px_200px_0px] bg-[${post.bgColor}] p-3 pl-2 max-w-[200px] text-black font-bold opacity-0 animate-fade-in [animation-delay:${index}00ms]`}>
                                            <div className="flex flex-col">
                                                <span>{post.number}.</span>
                                                <span>{post.description}</span>
                                            </div>
                                            <div className={`p-1 bg-[${post.ImageColor}] rounded-full`}>
                                                <img src={post.image} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                            </div>
                                        </div>
                                    )
                            ))}
                            {/* <div className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[#f1af82] justify-between items-center sm:rounded-[200px_0px_0px_200px] bg-[#ffccab] p-3 pr-2 max-w-[200px] text-black font-bold`}>
                                <div className={`p-1 bg-[#ffede2] rounded-full`}>
                                    <img src={IconLamp} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                </div>
                                <div className="flex flex-col text-right">
                                    <span>01.</span>
                                    <span>Increasing Self Awareness</span>
                                </div>
                            </div>
                            <div className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[#d27bec] justify-between items-center sm:rounded-[0px_200px_200px_0px] bg-[#d6a7e4] p-3 pl-2 max-w-[200px] text-black font-bold`}>
                                <div className="flex flex-col">
                                    <span>02.</span>
                                    <span>Effective Problem Solving</span>
                                </div>
                                <div className={`p-1 bg-[#f8e2ff] rounded-full`}>
                                    <img src={IconBrain} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                </div>
                            </div>
                            <div className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[#6adfe6] justify-between items-center sm:rounded-[200px_0px_0px_200px] bg-[#a8d2d4] p-3 pr-2 max-w-[200px] text-black font-bold`}>
                                <div className={`p-1 bg-[#daf2f4] rounded-full`}>
                                    <img src={IconControl} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                </div>
                                <div className="flex flex-col text-right">
                                    <span>03.</span>
                                    <span>Managine Emotions</span>
                                </div>
                            </div>
                            <div className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[#e6d779] justify-between items-center sm:rounded-[0px_200px_200px_0px] bg-[#efe6ab] p-3 pl-2 max-w-[200px] text-black font-bold`}>
                                <div className="flex flex-col">
                                    <span>04.</span>
                                    <span>Smart Decision Making</span>
                                </div>
                                <div className={`p-1 bg-[#fdf7d0] rounded-full`}>
                                    <img src={IconFriend} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                </div>
                            </div>
                            <div className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[#eb7cc2] justify-between items-center sm:rounded-[200px_0px_0px_200px] bg-[#f3b2db] p-3 pr-2 max-w-[200px] text-black font-bold`}>
                                <div className={`p-1 bg-[#ffe3f5] rounded-full`}>
                                    <img src={IconMark} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                </div>
                                <div className="flex flex-col text-right">
                                    <span>05.</span>
                                    <span>Using Empathy In Relationships</span>
                                </div>
                            </div>
                            <div className={`flex flex-col sm:flex-row gap-2 h-full cursor-pointer text-[12px] transition-colors hover:bg-[#f7887e] justify-between items-center sm:rounded-[0px_200px_200px_0px] bg-[#ffb7b0] p-3 pl-2 max-w-[200px] text-black font-bold`}>
                                <div className="flex flex-col">
                                    <span>06.</span>
                                    <span>Taking Responsibility for Actions</span>
                                </div>
                                <div className={`p-1 bg-[#ffdeda] rounded-full`}>
                                    <img src={IconPerson} alt="" className="rounded-full w-12 h-12 min-h-12 min-w-12" />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full opacity-0 animate-fade-in [animation-delay:200ms]">
                    {!user ?
                        <Card className="w-full border-0 rounded-none m-auto max-w-[460px]">
                            <CardContent className="flex flex-col items-center bg-white shadow-[0px_10px_10px_rgba(0,0,0,0.25)] gap-10 p-10">
                                <h4 className="text-center uppercase font-bold wrap-anywhere">
                                    Create Account
                                </h4>
                                <form className="flex flex-col items-start gap-2 w-full bg-white overflow-hidden" onSubmit={handleSubmit}>
                                    {
                                        heroSectionData.formFields.map((field, index) => (
                                            <div key={index} className="w-full flex flex-col">
                                                <Label
                                                    htmlFor={field.id}
                                                    className="relative w-fit font-ib-2 -mt-px font-normal text-ib text-base tracking-[0] leading-10 whitespace-nowrap"
                                                >
                                                    {field.label}
                                                </Label>
                                                <div className="relative w-full mb-2">
                                                    <Input
                                                        id={field.id}
                                                        type={field.type === "password" ? (showPassword[index - 2] ? "text" : "password") : field.type}
                                                        placeholder={field.placeholder}
                                                        onChange={handleChange}
                                                        className="w-full rounded-none border text-[16px] border-solid px-3 py-6 border-gray-300 font-ib-1 font-normal tracking-[0.20px] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    />
                                                    {field.type === "password" && (
                                                        <>
                                                            <img src={BlindEye} onClick={() => { setShowPassword(showPassword.map((item, i) => i === index - 2 ? !item : item)) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[index - 2] ? "hidden" : "show"}`} />
                                                            <img src={BlindEyeOpen} onClick={() => { setShowPassword(showPassword.map((item, i) => i === index - 2 ? !item : item)) }} alt="" className={`absolute cursor-pointer top-[calc(50%-12px)] right-2.5 w-5 h-5 text-ib ${showPassword[index - 2] ? "show" : "hidden"}`} />
                                                        </>
                                                    )}
                                                </div>
                                                {errors[field.id] && <Badge className='text-red-600'>{errors[field.id]}</Badge>}
                                            </div>
                                        ))}
                                    <Button type="submit" className="flex w-full h-auto cursor-pointer gap-3 px-6 py-3 bg-[#ff6f61] items-center justify-center relative rounded-full hover:bg-[#ff6f61]/80 transition-colors">
                                        <span className="relative flex items-center justify-center font-ib-3 text-[16px] font-medium tracking-[1.2px] text-white whitespace-pre-wrap">
                                            {
                                                loading ?
                                                    <div className='flex flex-col sm:flex-row justify-center items-center gap-2'>
                                                        <svg className="spinner" viewBox="0 0 24 24"></svg>
                                                        Creating Account...
                                                    </div>
                                                    : "Create Account"
                                            }
                                        </span>
                                    </Button>
                                </form>
                                <Link to="/login" className="font-bold underline text-ib-1 hover:text-ib-1/80">Log In</Link>
                            </CardContent>
                        </Card>
                        :
                        <div className="relative flex flex-col items-center">
                            <div className="max-w-[500px]">
                                <img
                                    className="w-full h-auto object-contain"
                                    alt="Journey illustration"
                                    src={ImageBook}
                                />
                            </div>

                            <Card className="absolute -bottom-28 left-0 right-0 rounded-t-3xl rounded-b-none border-0 shadow-2xl bg-white">
                                <CardContent className="p-6 sm:p-8 space-y-2 sm:space-y-6">
                                    <div className="space-y-2">
                                        <p className="font-extrabold text-[#252b42] sm:text-[24px] md:text-[40px] lg:text-[32px] 2xl:text-[40px]">
                                            Ready To Continue?
                                        </p>
                                        <div className="font-bold text-[#252b42] text-[14px] md:text-[16px] wrap-anyway flex flex-col sm:flex-row md:gap-2">
                                            <span className='font-bold'>Current Location:</span>
                                            <p className='text-ib-1'>Introduction</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative w-full h-3 bg-[#a55e57] rounded-full overflow-hidden mb-1">
                                            <Progress
                                                value={0}
                                                className="h-full bg-[#a55e57] [&>div]:bg-[#ff6f61]"
                                            />
                                        </div>
                                        <h5 className="text-center font-extrabold text-[#252b42]">
                                            0% completed
                                        </h5>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 w-full">
                                        <div className="flex-1 h-px bg-gray-300" />
                                        <Button onClick={handleContinue} className="px-8 py-3 bg-[#ff6f61] hover:bg-[#ff6f61]/90 rounded-full cursor-pointer active:scale-95">
                                            <span className="text-white">
                                                Continue Your Course
                                            </span>
                                        </Button>
                                        <div className="flex-1 h-px bg-gray-300" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>}
                </div>
            </div>
        </section >
    );
};

export default HeroSection;
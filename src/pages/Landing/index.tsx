import { Features, OverRall, Continue, Milestones, Video, HeroSection } from '../../components';
function Landing() {
    return (
        <div className="w-full scroll-smooth">
            <HeroSection />
            {/* <Introduction /> */}
            <div className="container mx-auto bg-white px-4">
                <Features />
                <OverRall />
                <Continue />
                <Milestones />
                <Video />
            </div>
        </div>
    )
}

export default Landing
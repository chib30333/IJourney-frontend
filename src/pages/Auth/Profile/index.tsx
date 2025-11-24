function Profile() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 text-center mb-8 md:mb-0">
                        <img src="https://i.pravatar.cc/300" alt="Profile Picture" className="rounded-full cursor-pointer w-48 h-48 mx-auto mb-4 border-4 border-custom transition-transform duration-300 hover:scale-105" />
                            <h4 className="text-2xl font-bold mb-2">John Doe</h4>
                            <p className="">Software Developer</p>
                            <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Edit Profile</button>
                    </div>
                    <div className="md:w-2/3 md:pl-8">
                        <h4 className="text-xl font-semibold mb-4">About Me</h4>
                        <p className="mb-6">
                            Passionate software developer with 5 years of experience in web technologies.
                            I love creating user-friendly applications and solving complex problems.
                        </p>
                        <h4 className="text-xl font-semibold mb-4">Skills</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm">JavaScript</span>
                            <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm">React</span>
                            <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm">Node.js</span>
                            <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm">Python</span>
                            <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm">SQL</span>
                        </div>
                        <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                john.doe@example.com
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h4.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                +1 (555) 123-4567
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                </svg>
                                San Francisco, CA
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
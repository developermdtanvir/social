function About() {
    return (
        <div className="space-y-2">
            <article className="space-y-5">
                <h1 className="text-4xl font-bold">Welcome to Network!</h1>
                <p>At Network, we are passionate about making a positive impact on our environment. Our platform is designed to bring together waste-conscious individuals like yourself who are committed to reducing waste and promoting recycling. We believe that by connecting people who share this common goal, we can create a stronger and more sustainable future for our planet.</p>
                <h1 className="text-4xl font-bold">Our Vision</h1>
                <p>We envision a world where waste is viewed as a valuable resource rather than a burden. By fostering a community of waste-conscious individuals, we strive to promote the principles of recycling, upcycling, and waste reduction. Together, we can build a greener and cleaner future for generations to come.</p>
            </article>
            <article className="space-y-4">
                <h1 className="text-4xl font-bold">This Project Uses Technology:</h1>
                <p className=" text-blue-500"> <span className="text-2xl text-white">Frontend:</span> HTML,CSS,JAVASCRIPT,Reactjs,Tailwindcss,Firebase Authentication</p>
                <p className=" text-blue-500"> <span className="text-2xl text-white">Backend:</span> Nodejs,Expressjs,Mongodb</p>
            </article>
            <article className=" space-y-4">
                <h1 className="text-4xl font-bold">How it Works</h1>
                <ol>
                    <span>1. Create Your Profile</span>
                    <p>Sign up and create your personalized profile, highlighting your interests, skills, and the type of waste materials you're interested in.</p>
                </ol>
                <ol>
                    <span>2. Connect with Others</span>
                    <p>Explore our vibrant community and connect with fellow waste-conscious individuals, recyclers, upcyclers, and artists who share your passion. Engage in conversations, share ideas, and collaborate on innovative recycling projects.</p>
                </ol>
                <ol>
                    <span>3. Share Waste, Gain Value:</span>
                    <p>Have waste materials lying around that could be repurposed? Share details about the waste items you have available, and our community members can express their interest in acquiring them. You can negotiate a fair exchange or even offer them for free to someone who can make the best use of them.</p>
                </ol>
                <ol>
                    <span>4. Buy and Sell Upcycled Creations:</span>
                    <p>Browse our marketplace to discover unique and upcycled products created by talented individuals within our community. Support sustainable businesses and find one-of-a-kind items that reflect your eco-friendly values. If you're an upcycler yourself, showcase your creations and sell them directly to our community members.</p>
                </ol>
                <ol>
                    <span>5. Learn and Inspire:</span>
                    <p>We believe in the power of education and inspiration. Through our blog, tutorials, and resources, you can learn more about waste reduction strategies, recycling techniques, and creative upcycling ideas. Share your own experiences and inspire others to make a difference.</p>
                </ol>
            </article>
            <div className="py-16">
                Join Network today and become part of a thriving community that is dedicated to transforming waste into valuable resources. Together, we can create a more sustainable future and make a lasting impact on our environment.
            </div>

            <div className="flex space-x-2">
                <a className="text-red-600 underline" href="https://www.facebook.com/profile.php?id=100069833970687" target="_blank">Md. Rakibul Ahsan Sajib</a>
                <a className="text-red-600 underline" href="https://www.facebook.com/profile.php?id=100033748102786" target="_blank">Ajmie Tabassum</a>

            </div>
        </div>
    )
}

export default About;
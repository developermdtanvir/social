function Home() {
    return (
        <div className=" mt-20 w-full mx-auto">
            <div className="form-control w-full max-w-xs">
                <input onClick={() => window.my_modal_3.showModal()} type="text" placeholder="Whats On Your Mind" className="input input-bordered w-full max-w-xs rounded-full" />
                <label className="label">
                    <span className="label-text-alt">Bottom Left label</span>
                    <span className="label-text-alt">Bottom Right label</span>
                </label>
            </div>
        </div>
    )
}

export default Home;
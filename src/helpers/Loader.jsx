export const Loader = () => {
    return (
        <div className="loader">
            <svg>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" result="gooey"/>
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}

export const SkeletonLoader = () => {
    return (
        <div className="container">
            <div className="list pre">
                <div className="items">
                    <div className="item rect"></div>
                    <div className="item line"></div>
                    <div className="item line"></div>
                    <div className="item line"></div>
                    <div className="item line"></div>
                    <div className="item line"></div>
                    <div className="item line"></div>
                </div>
            </div>
        </div>
    )
}
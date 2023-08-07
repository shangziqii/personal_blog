import { Outlet } from "react-router-dom"

function Text() {
    return (
        <>
            <div>title</div>
            <div>body</div>
            <div>end</div>
            <Outlet></Outlet>
        </>
    )
}

export default Text
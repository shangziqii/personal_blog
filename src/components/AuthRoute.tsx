import { ComponentType, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getTokentf } from './../api'
import { AxiosResponse } from 'axios'

//跳转前先判断token的有效性
const AuthRoute = ({ element: Component, ...rest }: { element: ComponentType }) => {
    const [validToken, setValidToken] = useState<boolean | undefined>(undefined)
    useEffect(() => {
        getTokentf().then(({ data }: AxiosResponse) => {
            if (data.status === 0) {
                setValidToken(true)
            }
            else {
                setValidToken(false)
            }
        }).catch(() => {
            setValidToken(false)
        })
    }, [])

    if (validToken === undefined) {
        return <div>Loading...</div>
    }
    if (validToken === true) {
        return (
            <Component />
        )
    }
    else {
        return <Navigate to="/login" />
    }
}

export default AuthRoute
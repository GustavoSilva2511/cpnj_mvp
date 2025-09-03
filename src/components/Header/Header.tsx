import type React from 'react'
import './Header.css'

export default function Header(props: any) {
    return (
        <>
            <header>
                <h2>{props.title}</h2>
            </header>
        </>
    )
}
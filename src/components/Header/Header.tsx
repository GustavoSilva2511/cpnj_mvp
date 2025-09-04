import './Header.css'
type Props = {
    title: string
}
export default function Header({ title }: Props) {
    return (
        <>
            <header>
                <h2>{title}</h2>
            </header>
        </>
    )
}
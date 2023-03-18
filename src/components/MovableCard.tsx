import { ReactNode, useEffect, useRef } from "react"
import styled from "styled-components"

interface MovableCardProps {
    children: ReactNode
}

export default function MovableCard({ children }: MovableCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const glareRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        function handleMouseMove(card: HTMLDivElement, glare: HTMLDivElement) {
            return function (event: MouseEvent) {
                const { clientX, clientY } = event
                const x = clientX - card.offsetLeft
                const y = clientY - card.offsetTop
                const height = card.offsetHeight
                const width = card.offsetWidth

                card.style.transform = `
                    perspective(500px)
                    rotateX(${(y - height / 2) / 10}deg)
                    rotateY(${(width / 2 - x) / 10}deg)
                `

                glare.style.background = `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(255,255,255,1) 5%,
                        rgba(255,255,255,0.5) 30%, 
                        rgba(59,28,5,0.4) 100%
                    )
                `

                card.classList.remove('animate')
            }
        }

        function handleMouseOut(card: HTMLDivElement, glare: HTMLDivElement) {
            return function () {
                card.classList.add('animate')

                card.style.transform = `rotateX(0deg)`
                glare.style.background = 'radial-gradient(rgba(255,255,255,0.8) 20%, rgba(59,28,5,0.4) 100%)'
            }
        }

        if (cardRef.current && glareRef.current) {
            const card = cardRef.current
            const glare = glareRef.current
            const onMouseMove = handleMouseMove(card, glare)
            const onMouseOut = handleMouseOut(card, glare)
            card.addEventListener('mousemove', onMouseMove)
            card.addEventListener('mouseout', onMouseOut)
            return () => {
                card.removeEventListener('mousemove', () => onMouseMove)
                card.removeEventListener('mouseout', () => onMouseOut)
            }
        }
    }, [cardRef])

    return <MovableCardContainer ref={cardRef}>
        {children}
        <Glare ref={glareRef} />
    </MovableCardContainer>
}

const MovableCardContainer = styled.div`
    position: relative;

    &.animate {
        transition: transform 1s;
    }
`

const Glare = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: 1em;
    opacity: 0.5;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 10%, rgba(59,28,5,0.4) 100%);
`
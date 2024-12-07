export function createArrow(
    fromEl: HTMLElement,
    toEl: HTMLElement,
    svgContainer: SVGSVGElement
): void {
    const svgNS = 'http://www.w3.org/2000/svg'
    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const svgRect = svgContainer.getBoundingClientRect()

    const calculatePoints = (): string => {
        let fromX: number,
            fromY: number,
            toX: number,
            toY: number,
            bendX: number,
            bendY: number

        if (fromEl.id === 'bar1') {
            // Координаты центров элементов относительно SVG
            fromX = fromRect.left + fromRect.width / 2 - svgRect.left
            fromY = fromRect.top - svgRect.top
            toX = toRect.left - svgRect.left
            toY = toRect.top + toRect.height / 2 - svgRect.top

            // Промежуточная точка для изгиба
            bendY = fromY + (toY - fromY)

            return `${fromX},${fromY - 10} ${fromX},${bendY} ${toX - 2},${toY}`
        } else if (fromEl.id === 'bar2') {
            fromX = fromRect.right - fromRect.width / 3 - svgRect.left
            fromY = fromRect.top - svgRect.top
            toX = toRect.left - svgRect.left
            toY = toRect.top + toRect.height / 2 - svgRect.top

            bendY = fromY + (toY - fromY)

            return `${fromX},${fromY - 10} ${fromX},${bendY} ${toX - 2},${toY}`
        } else if (toEl.id === 'bar2') {
            fromX = fromRect.right - svgRect.left
            fromY = fromRect.top + fromRect.height / 2 - svgRect.top
            toX = toRect.left + toRect.width / 3 - svgRect.left
            toY = toRect.top - svgRect.top

            bendX = fromX + (toX - fromX)

            return `${fromX + 2},${fromY} ${bendX},${fromY} ${toX},${toY - 10}`
        } else {
            fromX = fromRect.right - svgRect.left
            fromY = fromRect.top + fromRect.height / 2 - svgRect.top
            toX = toRect.left + toRect.width / 2 - svgRect.left
            toY = toRect.top - svgRect.top

            bendX = fromX + (toX - fromX)

            return `${fromX + 2},${fromY} ${bendX},${fromY} ${toX},${toY - 10}`
        }
    }

    const createMarkerEnd = (): void => {
        if (!svgContainer.querySelector('defs')) {
            const defs = document.createElementNS(svgNS, 'defs')
            const endMarker = document.createElementNS(svgNS, 'marker')

            endMarker.setAttribute('id', 'endMarker')
            endMarker.setAttribute('markerWidth', '10')
            endMarker.setAttribute('markerHeight', '10')
            endMarker.setAttribute('viewBox', '-5 -5 10 10')
            endMarker.setAttribute('orient', 'auto')

            const arrow = document.createElementNS(svgNS, 'path')
            arrow.setAttribute('d', 'M 0 0 L -5 -5 M 0 0 L -5 5 z')
            arrow.setAttribute('stroke', 'black')
            endMarker.appendChild(arrow)

            defs.appendChild(endMarker)
            svgContainer.appendChild(defs)
        }
    }

    const createPoliline = (): void => {
        const polyline = document.createElementNS(svgNS, 'polyline')

        polyline.setAttribute('stroke', 'black')
        polyline.setAttribute('stroke-width', '1')
        polyline.setAttribute('fill', 'none')
        polyline.setAttribute('points', calculatePoints())

        if (fromEl.id === 'dif1' || fromEl.id === 'dif2') {
            polyline.setAttribute('marker-end', 'url(#endMarker)')
        }
        svgContainer.appendChild(polyline)
    }

    createMarkerEnd()
    createPoliline()
}

export function createArrow(
    fromEl: HTMLElement,
    toEl: HTMLElement,
    svgContainer: SVGSVGElement
): void {
    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const svgRect = svgContainer.getBoundingClientRect()
    let fromX: number = 0
    let fromY: number = 0
    let toX: number = 0
    let toY: number = 0
    let bendX: number = 0
    let bendY: number = 0

    const svgNS = 'http://www.w3.org/2000/svg'

    // Создание polyline с прямым углом
    const polyline = document.createElementNS(svgNS, 'polyline')

    polyline.setAttribute('stroke', 'black')
    polyline.setAttribute('stroke-width', '1')
    polyline.setAttribute('fill', 'none')
    if (fromEl.id === 'dif1' || fromEl.id === 'dif2') {
        polyline.setAttribute('marker-end', 'url(#endMarker)')
    }

    // Зависимости от атрибута id елементов для координат
    if (fromEl.id === 'bar1') {
        fromX = fromRect.left + fromRect.width / 2 - svgRect.left
        fromY = fromRect.top - svgRect.top
        toX = toRect.left - svgRect.left
        toY = toRect.top + toRect.height / 2 - svgRect.top

        // Промежуточная точка для изгиба
        bendY = fromY + (toY - fromY)

        polyline.setAttribute(
            'points',
            `${fromX},${fromY} ${fromX},${bendY} ${toX},${toY}`
        )
    } else if (fromEl.id === 'bar2') {
        fromX = fromRect.right - fromRect.width / 3 - svgRect.left
        fromY = fromRect.top - svgRect.top
        toX = toRect.left - svgRect.left
        toY = toRect.top + toRect.height / 2 - svgRect.top

        // Промежуточная точка для изгиба
        bendY = fromY + (toY - fromY)

        polyline.setAttribute(
            'points',
            `${fromX},${fromY} ${fromX},${bendY} ${toX},${toY}`
        )
    } else if (toEl.id === 'bar2') {
        // Координаты центров элементов относительно SVG
        fromX = fromRect.right - svgRect.left
        fromY = fromRect.top + fromRect.height / 2 - svgRect.top
        toX = toRect.left + toRect.width / 3 - svgRect.left
        toY = toRect.top - svgRect.top

        // Промежуточная точка для изгиба
        bendX = fromX + (toX - fromX)

        polyline.setAttribute(
            'points',
            `${fromX},${fromY} ${bendX},${fromY} ${toX},${toY}`
        )
    } else {
        // Координаты центров элементов относительно SVG
        fromX = fromRect.right - svgRect.left
        fromY = fromRect.top + fromRect.height / 2 - svgRect.top
        toX = toRect.left + toRect.width / 2 - svgRect.left
        toY = toRect.top - svgRect.top

        // Промежуточная точка для изгиба
        bendX = fromX + (toX - fromX)

        polyline.setAttribute(
            'points',
            `${fromX},${fromY} ${bendX},${fromY} ${toX},${toY}`
        )
    }

    // Создание маркера для конца
    let defs = svgContainer.querySelector('defs')
    if (!defs) {
        defs = document.createElementNS(svgNS, 'defs')
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

    // Добавляем polyline в SVG
    svgContainer.appendChild(polyline)
}

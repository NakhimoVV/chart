export function createArrow(
    fromEl: HTMLElement,
    toEl: HTMLElement,
    svgContainer: SVGSVGElement
): void {
    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const svgRect = svgContainer.getBoundingClientRect()

    // Координаты центров элементов относительно SVG
    const fromX = fromRect.right - svgRect.left
    const fromY = fromRect.top + fromRect.height / 2 - svgRect.top
    const toX = toRect.left + toRect.width / 2 - svgRect.left
    const toY = toRect.top - svgRect.top

    // Промежуточная точка для изгиба (для X)
    const bendX = (fromX + toX) / 2

    // Очистка SVG перед добавлением новой стрелки
    svgContainer.innerHTML = ''

    const svgNS = 'http://www.w3.org/2000/svg'

    // Создание polyline с двумя прямыми углами
    const polyline = document.createElementNS(svgNS, 'polyline')
    polyline.setAttribute(
        'points',
        `${fromX},${fromY} ${bendX},${fromY} ${toX},${toY}`
    )
    polyline.setAttribute('stroke', 'black')
    polyline.setAttribute('stroke-width', '2')
    polyline.setAttribute('fill', 'none')
    polyline.setAttribute('marker-end', 'url(#endMarker)') // маркер на конце
    polyline.setAttribute('marker-mid', 'url(#midMarker)') // маркер в середине

    // Создание маркера для конца
    const endMarker = document.createElementNS(svgNS, 'marker')
    endMarker.setAttribute('id', 'endMarker')
    endMarker.setAttribute('markerWidth', '10')
    endMarker.setAttribute('markerHeight', '10')
    endMarker.setAttribute('viewBox', '-5 -5 10 10')
    endMarker.setAttribute('orient', 'auto')
    // Рисуем стрелку для endMarker
    const arrow = document.createElementNS(svgNS, 'path')
    arrow.setAttribute('d', 'M 0 0 L -5 -5 M 0 0 L -5 5 z')
    arrow.setAttribute('stroke', 'black')
    // Добавляем стрелку в маркер
    endMarker.appendChild(arrow)

    // Добавляем маркеры в SVG
    svgContainer.appendChild(endMarker)

    // Добавляем polyline в SVG
    svgContainer.appendChild(polyline)
}

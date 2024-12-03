export function createArrow(fromElement: HTMLElement, toElement: HTMLElement) {
    const fromRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()

    const x1 = fromRect.right // Правая граница первого элемента
    const y1 = fromRect.top + fromRect.height / 2 // Середина по вертикали

    const x2 = toRect.left // Левая граница второго элемента
    const y2 = toRect.top + toRect.height / 2 // Середина по вертикали

    return `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" marker-end="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="black"/>
          </marker>
        </defs>
      </svg>`
}

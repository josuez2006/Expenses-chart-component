fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            makeChartElement(element.day, element.amount)
        })
        highlightTheHigherElement()
    }
    )




const chart = document.getElementById('chart')

function makeChartElement(day, amount) {
    const element = document.createElement('div');
    element.classList.add('chart__element')

    const box = makeChartBox(amount)
    const label = makeChartLabel(day)
    
    element.appendChild(box)
    element.appendChild(label)

    chart.appendChild(element)
}

function makeChartBox(amount) {
    const percentage = String(amount) + '%'

    const box = document.createElement('div')
    box.classList.add('chart__value')
    box.style.height = percentage
    box.ariaValueText = amount

    const tooltip = makeToolTip(amount)
    box.appendChild(tooltip)

    return box
}

function makeChartLabel(day) {
    const label = document.createElement('span');
    label.textContent = day

    return label
}

function makeToolTip(amount) {
    const tooltip = document.createElement('div')
    tooltip.textContent = '$' + String(amount)
    tooltip.classList.add('tooltip')

    return tooltip
}

function highlightTheHigherElement() {
    const elementsAmount = []
    const elementsAmountLenght = chart.children.length

    for(i = 0; i < elementsAmountLenght; i++) {
        const elementAmount = chart.children[i].firstChild.ariaValueText
        elementsAmount.push(elementAmount)
    }

    const highestAmount = elementsAmount.reduce((a, b) => Math.max(a, b), -Infinity);

    
    for(i = 0; i < elementsAmountLenght; i++) {
        const element = chart.children[i].firstChild
        const amount = element.ariaValueText

        if (amount == highestAmount) {
            element.classList.add('chart__value--highlighted')
        }
    }

}



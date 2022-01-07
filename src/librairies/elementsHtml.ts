function getInputById(id: string):HTMLInputElement {
    return <HTMLInputElement>getElementById(id)
}

function getSelectById(id: string):HTMLSelectElement {
    return <HTMLSelectElement>getElementById(id)
}

function getElementById(id: string, parent: Element|null = null) {
    if (parent != null) {
        return parent.querySelector("#" + id)
    }
    else {
        return document.querySelector("#" + id)
    }
}

function getValueOrPlaceholder(element:HTMLInputElement): string{
    if(element.value != "") return element.value
    return element.placeholder
}

function removeOptions(selectElement:HTMLSelectElement) {
    for (let i = selectElement.options.length; i >= 0; i--) {
        selectElement.remove(i)
    }
}

function hide(id: string){
    var element = document.getElementById(id)
    hideElement(element)
}

function hideElement(element: HTMLElement){
    if(element != undefined){
        element.style.display = "none"
    }
}

function show(id: string, defaultClass: string = "block"){
    var element = document.getElementById(id)
    showElement(element, defaultClass)
}

function showElement(element: HTMLElement, defaultClass: string = "block"){
    if(element != undefined){
        element.style.display = defaultClass
    }
}

function addOptionToSelect(parent: HTMLSelectElement, text:string, value: number|string, isSelected: boolean = false){
    const opt = document.createElement("option")
    opt.text = text
    opt.value = String(value)
    if(isSelected) opt.selected = true
    parent.appendChild(opt)
}

function addDefaultOptionToSelect(parent: HTMLSelectElement, isSelected: boolean = false){
    addOptionToSelect(parent, "—", "", isSelected)
}

function getSelectByIdFromEnum<E>(idSelect:string, e: any, defaultValue: E|null) {
    let selection = getSelectById(idSelect)
    removeOptions(selection)
    const entries = getAllEnumEntries(e)
    for (let i = 0; i < entries.length; i++) {
        let option = document.createElement("option")
        option.text = entries[i][0]
        option.value = entries[i][1]
        option.selected = entries[i][1] === defaultValue

        if(entries[i][0] === "None") {
            option.text = "—"
        }

        selection.add(option)
    }
}

function setValueIfNotEqual(controle: HTMLInputElement, value: string|number, compareValue: string|number){
    if(value != compareValue){
        controle.value = String(value)
    }
}
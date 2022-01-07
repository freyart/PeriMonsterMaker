function showPlusMinus(value: number) : string {
    if(value >= 0) return "+" + value
    return String(value)
}

function showNullsAsQuadra(value: number|null) {
    if(value === null) return "—"
    else return showPlusMinus(value)
}

function endsWithDot(value: string): string {
    if(value.endsWith(".")) return value
    return value += "."
}

function getNumberOrNull(value: string | number | null) : number | null{
    if(typeof(value) === "string"){
        if(value === "") return null
        return Number(value)
    }
    else return value
}

export default function combineNames(names) {
    let name = ""

    for (const i in names) {
        if (names[i] != null && names[i] != '') {
            name += ` ${names[i]}`
        }
    }
    name = name.trim()

    if (name == '') return '-'

    return name
}
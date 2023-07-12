
// /// Validation
// function validateEmpty(data: string, name: string) {
//     if (data) return null
//     return name + " is Required"
// }

// function validateEmail(input: string) {
//     var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (validRegex.test(input)) {
//         return null;
//     } else {
//         return "Email is invalid";
//     }
// }

// function validatePhone(input: string) {
//     const min = 10
//     const max = 14
//     const firstChar = "08"
//     var validRegex = /^\b08+\d/;
//     if (validRegex.test(input)) {
//         if (input.length >= min && input.length <= max) {
//             return null;
//         }
//     }
//     return "Phone number is invalid";
// }

// function notEmptyValue(data: string) {
//     return Object.values(data).some((v) => {
//         return v != null
//     })
// }

// /// Hooks

// function useDataStore() {
//     const [data, setData] = React.useState({
//         "value": {
//             'name': '',
//             'phone': '',
//             'email': '',
//             'company': '',
//             'service': 'Development',
//             'budget': '50000'
//         },
//         "error": {},
//         "auto_validate": false
//     })

//     function validate(values: {name: string}) {
//         var e = {}
//         e['name'] = validateEmpty(values.name, "Name")
//         e['phone'] = validateEmpty(values.phone, "Phone")
//         if (!e['phone']) {
//             e['phone'] = validatePhone(values.phone)
//         }
//         e['email'] = validateEmpty(values.email, "Email")
//         if (!e['email']) {
//             e['email'] = validateEmail(values.email)
//         }
//         e['company'] = validateEmpty(values.company, "Company")

//         return e
//     }

//     function updateValue(key, value) {
//         const newData = { ...data, value: { ...data.value, [key]: value } }
//         if (data.auto_validate) {
//             const error = validate(newData.value)
//             newData.error = error
//         }
//         setData(newData)
//     }

//     function setAutoValidate() {
//         const newData = { ...data, "auto_validate": true }
//         const error = validate(newData.value)

//         newData.error = error
//         setData(newData)
//         return notEmptyValue(error) ? error : null
//     }

//     function isError() {
//         return notEmptyValue(data.error)
//     }

//     return { data, updateValue, setAutoValidate, isError }
// }

// function useFocuser(inputRefs: {key: React.RefObject<HTMLInputElement>}) {
//     // const inputRefs = inputRefs

//     // console.log("Use ref generated only once")
//     // for (let i = 0; i < inputNames.length; i++) {
//     //     inputRefs[inputNames[i]] = React.useRef()
//     // }

//     function requestFocus(errors : boolean) {
//         console.log(errors)
//         for (const key in inputRefs) {
//             const containError = errors[key]
//             console.log(`Contain Error ${containError} ${key}`)
//             if (containError) {
//                 inputRefs[key].current.focus()
//                 break
//             }
//         }
//     }

//     return { requestFocus, inputRefs }
// }
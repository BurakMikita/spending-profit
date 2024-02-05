

export const formatDate = (dataString:string): string => {
const date = new Date(dataString)
const options = {
    year : "numeric",
    month: "long",
    day: "numeric"
} as any

 return date.toLocaleDateString("us-US", options)
}
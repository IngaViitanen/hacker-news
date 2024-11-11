import { AxiosError } from "axios"

export const handleError = (err: unknown) => {
    if(err instanceof AxiosError) {
        alert('🥺 Network Error: ' + err.message)
    } else if(err instanceof Error) {
        alert('😩 Something went wrong: ' + err.message)
    } else {
        alert('Congrats someone royally F:d up 👀')
    }
}
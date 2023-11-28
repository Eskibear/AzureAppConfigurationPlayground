import { getMessage } from "../lib/data";

export default async function Page() {
    const message = await getMessage() as string;
    return <p>{message}</p>;
}
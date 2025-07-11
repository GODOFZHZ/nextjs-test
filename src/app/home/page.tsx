export default async function Page(props) {
    const data = await fetchData();
    return (
        <div>
            <h1>home</h1>
            <h1>Hello, Next.js!{process.env.NEXT_RUNTIME}</h1>
            {JSON.stringify(data)}
        </div>
    );
}
async function fetchData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', { cache: 'force-cache', next: { revalidate: 3600 } })
    console.log(res.status)
    return res.json()
}
// export const runtime = 'edge';
export const revalidate = 60;
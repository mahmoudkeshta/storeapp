export default async function post() {
   const response = await fetch (
 
"https://jsonplaceholder.typicode.com/posts",
{
    next:{
        revalidate:60
    }
}
   );
   const tode= await response.json();
   console.log(tode)
    return (
        <div>
            <h1>Holl</h1>
            <h1>{tode.title}</h1>
        
        </div>
    );
}
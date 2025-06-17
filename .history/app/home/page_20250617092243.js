export default async function post() {
   const response = await fetch (
 
"https://codeeio.com/ecommerc/Products/view.php",
{
    next:{
        revalidate:60
    }
}
   );
   const tode= await response.json();
    return (
        <div>
            <h1>Holl</h1>
            <h1>{tode.nameproducts[0]}</h1>
        
        </div>
    );
}
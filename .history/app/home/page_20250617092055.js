export default async function post() {
   const response = await fetch (
 
"https://codeeio.com/ecommerc/Products/view.php",
{
    next:{
        revalidate:60
    }
}
   );

    return (
        <div>
            <h1>Holl</h1>
            <h1>{DataTransfer.nameproducts}</h1>
        
        </div>
    );
}
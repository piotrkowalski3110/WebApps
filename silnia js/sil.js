function silnia(x,y,z)
{
    let wyn = 1;
    let tablica = [x,y,z];

    for(let i=0; i<3; i++)
    {
        wyn = 1;
        for(let j=1; j<=tablica[i]; j++)
        {
            wyn *= j;
        }
        console.log("PK "+wyn);
    }
}

console.log(silnia(2,4,6))
async function detail() {
        var Proid = (localStorage.getItem('d'));
        console.log(Proid)
        let prod = await fetch('./base.json');
        prod = await prod.json()
        prod= prod.itens
        console.log(prod)
        change(prod[Proid])
    }
    function change(prod){
    var count=prod['rating']['count']
    var descri=prod['description']
    var img=prod['image']
    var pri=prod['price']
    var ti=prod['title']
    var clas=prod['rating']['rate']

    const stars2= stCount(clas)
    document.getElementById('Est').innerHTML=`${stars2}`
    var gend=prod['gender']
    var yea=prod['year']
    var Aut=prod['brandName']
    console.log(gend, yea, Aut)
    document.getElementById("count").textContent=`Votos ${count}`
    document.getElementById("gen").textContent=`Generos: ${gend}`
    document.getElementById("ye").textContent=`Ano de lançamento: ${yea}`
    document.getElementById("brand").textContent=`Autor: ${Aut}`
    document.getElementById("descr").textContent=descri
    document.getElementById("im").src=img
    document.getElementById("titl").textContent=ti
    document.getElementById("descr").style.fontSize="15px"
    document.getElementById("preco").textContent=`R$${pri}`
    }


    function stCount(rate) {
        let stars = '';
      
        if (rate >= 1 && rate <= 10) {
          const fullStars = Math.floor(rate / 2);
          const halfStar = rate % 2 === 1;
      
          for (let i = 0; i < fullStars; i++) {
            stars += `<i class='fas fa-star'></i>`;
          }
      
          if (halfStar) {
            stars += `<i class='fa-regular fa-star-half-stroke'></i>`;
          }
      
          const remainingStars = 5 - Math.ceil(rate / 2);
      
          for (let i = 0; i < remainingStars; i++) {
            stars += `<i class='fa-regular fa-star'></i>`;
          }
        } else {
          stars = `<i class='fa-regular fa-star'></i>
                   <i class='fa-regular fa-star'></i>
                   <i class='fa-regular fa-star'></i>
                   <i class='fa-regular fa-star'></i>
                   <i class='fa-regular fa-star'></i>`;
        }
      
        return stars;
      }
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let totalContainer = document.querySelector("#totalprice");
let count = document.querySelector("#count");
let Category = document.querySelector("#Category");
let submit = document.querySelector("#submit");


// total price 

const total = ()=>{
    
    if ( price.value == ""){
        totalContainer.textContent = "please add price first";
        totalContainer.style.fontSize = "20px";
        
        price.focus()
        
    }
    else{
        tot = Number(price.value) + Number(taxes.value) + Number(ads.value) - Number(discount.value)
        totalContainer.innerHTML = tot
        totalContainer.style.background = " rgb(76, 192, 192"
    }
}
const mode ="create"
// create data
localStorage.getItem('product') !=null ? data = JSON.parse(localStorage.product ) : data =[]


submit.addEventListener("click" , ()=>{
    if ( mode !== "update"){
        const info = {
        title : title.value,
        price : price.value,
        ads : ads.value,
        taxes : taxes.value,
        discount : discount.value,
        Category: Category.value,
        total : totalContainer.innerHTML,
            
    }
        if (Number(count.value) > 1 ){
            for (let i= 0 ;i < Number(count.value);i++ ){
                data.push(info);
            }
        } else{
            data.push(info);
            
    console.log(data,info,"data that i push into the local storage");
        }
   
    }


    else if (mode == "update"){
        const info = {
            title : title.value,
            price : price.value,
            ads : ads.value,
            taxes : taxes.value,
            discount : discount.value,
            Category: Category.value,
            total : totalContainer.innerHTML,
        }  
        submit.value = "create"
        data[index] = info 
        mode ="create"

        
    }
    
   
    
     // clear data 
     title.value = "";
     price.value = "";
     ads.value ="";
     taxes.value="";
     discount.value="";
     Category.value= ""
     count.value= ""
     totalContainer.innerHTML="total" 

    

     submit.blur()  
     localStorage.setItem('product' , JSON.stringify(data))
     showdata(data)


})

// read data 

const showdata = (data)=>{
    document.querySelector("#tbody").innerHTML =data.map((d,rowIndex)=>{
        return(
            ` <tr>
            <td>${rowIndex}</td>
            <td>${d.title}</td>
            <td>${d.price}</td>
            <td>${d.taxes}</td>
            <td>${d.ads}</td>
            <td>${d.discount}</td>
            <td>${d.Category}</td>
            <td>${d.total}</td>
            <td class="edit">
                <button class="update" onclick="updateFun(${rowIndex})">update</button>
                <button class="delete" onclick="deleteObject(${rowIndex})">delete</button>
            </td>
        </tr>`
        )
    }).join("")
}

showdata(data)

function deleteObject (i) {
    data.splice(i ,1)
    localStorage.setItem('product' , JSON.stringify(data))
    showdata(data)
}


// update 

const  updateFun = (i)=>{
    info = data[i]
    title.value = info.title
    price.value = info.price
    taxes.value = info.taxes
    ads.value = info.ads
    discount.value = info.discount
    Category.value = info.Category
    count.style.display = "none"
    submit.value = "update"
    mode  =  "update"
    index = i
    
}




const search  = document.querySelector("#search")
const searchTitle = document.querySelector("#searchTitle")
const searchCat = document.querySelector("#searchCat")



searchCat.addEventListener('click',()=>{
    search.placeholder = "search by category"
    search.addEventListener("keyup",(e)=>{
        val = e.target.value
      showdata(
        data.filter(
            (d )=>d.Category.includes(val)
        )
      ) 
})
})
searchTitle.addEventListener('click',()=>{
    search.placeholder = "search by title"
    search.addEventListener("keyup",(e )=>{
        val = e.target.value
      showdata(
        data.filter(
            (d )=>d.title.includes(val)
        )
      ) 
})
})

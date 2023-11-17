let form =document.getElementById('form');
let itemList=document.getElementById('items');



// adding event to form 
form.addEventListener("submit" ,getValue);

// adding remove event
// itemList.addEventListener("click",removeItem);

// // adding edit event
// itemList.addEventListener("click",editItem);


// get value function
 async function getValue(event) {
    event.preventDefault();
    // getting users value of name email and phone
  let Inputname=document.getElementById('name').value;
  let email=document.getElementById('email').value;
  let phone=document.getElementById('phone').value;

    
    let obj={
        "name":Inputname,
        "email":email,
        "phoneNumber":phone
    };
    // storing values in crudcrud 
   let postData=await axios.post("https://crudcrud.com/api/1513da9700aa41909e9d17e3db98756d/value",obj)
    // console.log(postData)
    // showing values in the screen 
    showUser(obj);

 }
window.addEventListener("DOMContentLoaded",async ()=>{
    let data=await axios.get("https://crudcrud.com/api/1513da9700aa41909e9d17e3db98756d/value");
    for(let i=0;i<data.data.length;i++){
        showUser(data.data[i]);
    }    
})

 function showUser(item){
    
    let Inputname=item.name;
    let email=item.email;
    let phone=item.phoneNumber;

    // creating new li
    let li=document.createElement("li");

    // creating a textNode 
    let nameNode=document.createTextNode(Inputname);
    let emailNode=document.createTextNode(email);
    let phoneNode=document.createTextNode(phone);

    // creating delete button
    let button= document.createElement('button');
    button.className="delete";
    button.appendChild(document.createTextNode("delete"));
    
    // creating edit button 
    let edit=document.createElement("button");
    edit.className="edit";
    edit.appendChild(document.createTextNode("edit"));
    
    // appeding the text node to the li
    li.append(nameNode,emailNode,phoneNode,button,edit);
    li.appendChild(document.createElement("br"));

    // appending li to itemlist
    itemList.appendChild(li)
 }

//  // function remove item
// function removeItem(e){
//     if(e.target.classList.contains("delete")){
//         let li=e.target.parentElement;
//         itemList.removeChild(li);

//         // removing item from local storage
//         let itemName = li.childNodes[0].textContent;
//         localStorage.removeItem(itemName);
//         console.log(itemName);
//     }
// }
   
// // edit item function 
// function editItem(e){
//     if(e.target.classList.contains("edit")){
//         let li=e.target.parentElement;
//         itemList.removeChild(li);

//         // removing item from local storage
//         let itemName = li.childNodes[0].textContent;
//         let Inputname = document.getElementById('name');
//         let email = document.getElementById('email');
//         let phone = document.getElementById('phone');

//         Inputname.value = li.childNodes[0].textContent;
        
//         Inputname.value= li.childNodes[0].textContent;
//         email.value=li.childNodes[1].textContent;
//         phone.value=li.childNodes[2].textContent;

//         localStorage.removeItem(itemName);
// }
// }